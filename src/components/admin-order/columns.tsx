import { ColumnDef } from '@tanstack/react-table'
import { VariantProps } from 'class-variance-authority'
import { Download } from 'lucide-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'sonner'

import { Badge, badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { AdminOrder, CommonPicture, ResponseList, Status } from '@/types/admin-order'
import { downloadFile } from '@/util/download'

export const adminOrderColumns = (handleCheckbox: (id: number) => void): ColumnDef<AdminOrder>[] => [
  {
    id: 'select',
    header: '',
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => {
          row.toggleSelected(!!value)
          value && handleCheckbox((row.getValue('responseList') as ResponseList[])[0].pictureGenerateResponseId)
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'createdAt',
    header: '주문 일시',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date
      const formatted = new Date(date).toISOString().slice(0, 19).replace('T', ' ')
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'pictureGenerateRequestId',
    header: '주문넘버',
    cell: ({ row }) => {
      return <div>A{row.getValue('pictureGenerateRequestId')}</div>
    },
  },
  { accessorKey: 'requesterEmail', header: 'email' },
  { accessorKey: 'userGender', header: '성별' },
  {
    accessorKey: 'prompt',
    header: '주문 내용',
    cell: ({ row }) => {
      return (
        <div>
          <p className="w-[100px] whitespace-pre-wrap">{row.getValue('prompt')}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'promptAdvanced',
    header: '추천 프롬프트',
    cell: ({ row }) => {
      const prompt = row.getValue('promptAdvanced') as string
      return (
        <CopyToClipboard
          text={prompt}
          onCopy={() => {
            toast('프롬프트 복사가 완료 되었습니다.', {
              description: prompt.length > 20 ? prompt.slice(0, 20) + '...' : prompt,
            })
          }}
        >
          <p className="truncate cursor-pointer w-[150px] h-[20px]">{prompt}</p>
        </CopyToClipboard>
      )
    },
  },
  {
    accessorKey: 'posePicture',
    header: '구도 참고 사진',
    cell: ({ row }) => {
      const userPic = row.getValue('posePicture') as CommonPicture[] | null
      const handlePicDownload = () => {
        if (!userPic) return
        userPic.map(pic => {
          downloadFile(pic.url, pic.key.split('.png')[0])
        })
      }
      return (
        <Button variant="outline" size="default" onClick={handlePicDownload} disabled={!userPic}>
          <Download className="w-4 h-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'facePictureList',
    header: '사용자 사진',
    cell: ({ row }) => {
      const userPic = row.getValue('facePictureList') as CommonPicture[] | null
      const handlePicDownload = () => {
        if (!userPic) return
        userPic.map(pic => {
          downloadFile(pic.url, pic.key.split('.png')[0])
        })
      }
      return (
        <Button variant="outline" size="default" onClick={handlePicDownload} disabled={!userPic}>
          <Download className="w-4 h-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: 'responseList',
    header: '상태',
    cell: ({ row }) => {
      const status = (row.getValue('responseList') as ResponseList[])[0].responseStatus as Exclude<Status, 'ALL'>

      const statusConfig: Record<
        Exclude<Status, 'ALL'>,
        { text: string; variant: VariantProps<typeof badgeVariants>['variant'] }
      > = {
        BEFORE_WORK: { text: '작업대기', variant: 'destructive' },
        IN_PROGRESS: { text: '작업 중', variant: 'outline' },
        COMPLETED: { text: '작업완료', variant: 'default' },
        EXPIRED: { text: '만료', variant: 'destructive' },
      }

      return <Badge variant={statusConfig[status].variant}>{statusConfig[status].text}</Badge>
    },
    filterFn: 'equalsString',
  },
  {
    accessorKey: 'adminInCharge',
    header: '담당자',
    cell: ({ row }) => {
      const adminInCharge = (row.getValue('responseList') as ResponseList[])[0].adminInCharge as string
      return <div>{adminInCharge === '' ? '-' : adminInCharge}</div>
    },
  },
  {
    id: 'uploadPic',
    header: '사진업로드',
  },
  { id: 'checkPic', header: '사진확인' },
  {
    id: 'sendPic',
    header: '사진전송',
  },
]

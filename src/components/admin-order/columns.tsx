import { ColumnDef } from '@tanstack/react-table'
import { cx, VariantProps } from 'class-variance-authority'
import { Download } from 'lucide-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'sonner'

import { Badge, badgeVariants } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { AdminOrder, CommonPicture, ResponseList, Status } from '@/types/admin-order'
import { downloadFile } from '@/util/download'

interface AdminOrderProps {
  handleCheckbox: (id: number) => void
  files: File[]
  preview: string[]
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  handleDeleteFile: (index: number) => void
  handlePictureUpload: (file: File, pictureGenerateResponseId: number) => void
}
export const adminOrderColumns = ({
  handleCheckbox,
  files,
  preview,
  handleDeleteFile,
  handleFileChange,
  handlePictureUpload,
}: AdminOrderProps): ColumnDef<AdminOrder>[] => [
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
  { accessorKey: 'sex', header: '성별' },
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
      const userPic = row.getValue('posePicture') as CommonPicture | null
      const handlePicDownload = () => {
        if (!userPic) return
        downloadFile(userPic.url, userPic.key)
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
          downloadFile(pic.url, pic.key)
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
    accessorKey: 'uploadPic',
    header: '사진업로드',
    cell: ({ row }) => {
      const pictureFromServer = (row.getValue('responseList') as ResponseList[])[0].pictureCompletedList ?? []
      return (
        <label
          htmlFor={row.id}
          className={cx(
            buttonVariants({ variant: pictureFromServer.length > 0 ? 'ghost' : 'outline' }),
            'cursor-pointer',
          )}
        >
          업로드
          <Input
            id={row.id}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={e => handleFileChange(e, row.index)}
            disabled={pictureFromServer.length > 0}
          />
        </label>
      )
    },
  },
  {
    accessorKey: 'checkPic',
    header: '사진확인',
    cell: ({ row }) => {
      const pictureFromServer = (row.getValue('responseList') as ResponseList[])[0].pictureCompletedList ?? []
      if (pictureFromServer[0]) {
        return (
          <Button variant="outline" onClick={() => downloadFile(pictureFromServer[0].url, pictureFromServer[0].key)}>
            <Download className="w-4 h-4" />
          </Button>
        )
      }
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" disabled={!preview[row.index] && !pictureFromServer?.length}>
              사진 확인
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="mb-5">사진 확인</DialogTitle>
              {preview[row.index] === undefined ? (
                <div className="flex items-center justify-center w-full bg-gray-100 rounded-md h-96">
                  이미지가 없습니다.
                </div>
              ) : (
                <img src={preview[row.index]} alt="preview" className="object-cover w-full rounded-md h-96" />
              )}
            </DialogHeader>
            <div className="grid gap-4 py-4"></div>
            <DialogFooter>
              <Button onClick={() => handleDeleteFile(row.index)}>삭제하기</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    accessorKey: 'sendPic',
    header: '사진전송',
    cell: ({ row }) => {
      return (
        <Button
          size="default"
          disabled={!files[row.index]}
          onClick={() =>
            handlePictureUpload(
              files[row.index],
              (row.getValue('responseList') as ResponseList[])[0].pictureGenerateResponseId,
            )
          }
        >
          전송
        </Button>
      )
    },
  },
]

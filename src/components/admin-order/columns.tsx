import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown, Download } from 'lucide-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AdminOrder, FacePictureList, PosePicture, Status } from '@/types/admin-order'
import { downloadFile } from '@/util/download'

export const adminOrderColumns = (): ColumnDef<AdminOrder>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
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
      const userPic = row.getValue('posePicture') as PosePicture[] | null
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
      const userPic = row.getValue('facePictureList') as FacePictureList[] | null
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
    accessorKey: 'requestStatus',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('requestStatus') as Status
      const statusKR = () => {
        switch (status) {
          case 'ASSIGNING':
            return '작업대기'
          case 'IN_PROGRESS':
            return '작업 중'
          case 'COMPLETED':
            return '작업완료'
          default:
            return '작업대기'
        }
      }
      const handleStatusVariant = () => {
        switch (status) {
          case 'ASSIGNING':
            return 'destructive'
          case 'IN_PROGRESS':
            return 'outline'
          case 'COMPLETED':
            return 'default'
          default:
            return 'outline'
        }
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Badge variant={handleStatusVariant()}>
                {statusKR()}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>작업완료</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>작업 중</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>작업대기</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    filterFn: 'equalsString',
  },
  {
    accessorKey: 'assigned',
    header: '담당자',
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

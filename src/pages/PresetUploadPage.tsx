import { presetUploadColumns } from '@/components/preset-upload/columns'
import { DataTable } from '@/components/preset-upload/data-table'
import { preset } from '@/lib/mocks/preset'
const PresetUploadPage = () => {
  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-5 text-2xl font-semibold">Preset Upload</h1>
      <DataTable columns={presetUploadColumns} data={preset} />
    </div>
  )
}

export default PresetUploadPage

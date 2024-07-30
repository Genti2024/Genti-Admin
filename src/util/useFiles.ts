import { useCallback, useState } from 'react'

export const useFiles = () => {
  const [files, setFiles] = useState<File[]>([])
  const [preview, setPreview] = useState<string[]>([])

  const handleFilePreview = useCallback((file: File, index: number) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreview(prev => {
        const newPreview = [...prev]
        newPreview[index] = reader.result as string
        return newPreview
      })
    }
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      if (!e.target.files?.length) return
      const currentFile = e.target.files[0]
      const fileType = currentFile.type
      if (!fileType.includes('image')) return
      setFiles(prev => {
        const newFiles = [...prev]
        newFiles[index] = currentFile
        return newFiles
      })
      handleFilePreview(currentFile, index)
    },
    [handleFilePreview],
  )

  const handleDeleteFile = useCallback(
    (index: number) => {
      setFiles(files.filter((_, i) => i !== index))
      setPreview(preview.filter((_, i) => i !== index))
    },
    [files, preview],
  )
  return { files, preview, handleFileChange, handleDeleteFile }
}

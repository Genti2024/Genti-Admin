import { useCallback, useMemo, useState } from 'react'

export const useFiles = (filesRef: React.MutableRefObject<(HTMLInputElement | null)[]>, length: number) => {
  const [preview, setPreview] = useState<string[]>(new Array(length).fill(''))
  const [btnDisabled, setBtnDisabled] = useState<boolean[]>(new Array(length).fill(true))

  const currentFiles = useMemo(() => filesRef.current as HTMLInputElement[], [filesRef])
  const currentFile = useMemo(() => (index: number) => filesRef.current[index]?.files as FileList, [filesRef])

  const handleFileInput = useCallback(
    (index: number) => {
      filesRef.current[index]?.click()
    },
    [filesRef],
  )

  const handleFileUpload = useCallback(
    (index: number) => {
      // 미리보기가 존재하면 return
      const img = currentFile(index)[0]
      const reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onload = () => {
        setPreview(prev => {
          const newPreview = [...prev]
          newPreview[index] = reader.result as string
          return newPreview
        })
      }
    },
    [currentFile],
  )

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, rowIndex: number) => {
    const isDisabled = !e.target.files?.length
    setBtnDisabled(prev => prev.map((item, i) => (i === rowIndex ? isDisabled : item)))
  }, [])

  const handleFileDelete = useCallback(
    (index: number) => {
      setPreview(prev => prev.map((item, i) => (i === index ? '' : item)))
      setBtnDisabled(prev => prev.map((item, i) => (i === index ? true : item)))
      currentFiles[index].files = null
    },
    [currentFiles],
  )
  return {
    handleFileInput,
    currentFiles,
    currentFile,
    handleFileUpload,
    preview,
    btnDisabled,
    handleFileChange,
    handleFileDelete,
  }
}

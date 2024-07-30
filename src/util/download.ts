const toDataURL = async (url: string) => {
  const response = await fetch(url)
  const blob = await response.blob()
  return URL.createObjectURL(blob)
}

export const downloadFile = async (url: string, fileName?: string) => {
  const a = document.createElement('a')
  a.href = await toDataURL(url)
  const regex = /([^/]+?\.(jpg|jpeg|png|gif|bmp|tiff|webp))/i // 확장자를 포함한 파일 이름 매칭
  const result = fileName?.match(regex) ?? 'download.png'
  a.download = result[0]

  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    window.URL.revokeObjectURL(url)
  }, 60000)
  document.body.removeChild(a)
  a.remove()
}

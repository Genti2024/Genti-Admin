const toDataURL = async (url: string) => {
  const response = await fetch(url)
  const blob = await response.blob()
  return URL.createObjectURL(blob)
}

export const downloadFile = async (url: string, fileName?: string) => {
  const a = document.createElement('a')
  a.href = await toDataURL(url)
  a.download = fileName ?? 'download'

  document.body.appendChild(a)
  a.click()
  setTimeout(() => {
    window.URL.revokeObjectURL(url)
  }, 60000)
  document.body.removeChild(a)
  a.remove()
}

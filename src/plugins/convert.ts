export const toBase64 = (string: string) => {
  console.log('string', string)
  return `data:image/jpeg;base64,${string}`
}

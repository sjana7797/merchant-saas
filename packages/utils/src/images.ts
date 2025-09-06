export function getImageUrl(image: string) {
  const host = process.env.NEXT_PUBLIC_CDN_HOST;
  return `${host}/${image}`;
}

export function buildFileUrl(file: string) {
  const host = process.env.NEXT_PUBLIC_CDN_HOST;
  return `${host}/${file}`;
}

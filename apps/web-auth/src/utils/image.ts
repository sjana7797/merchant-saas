export const getImageUrl = (image: string) => {
  const host = import.meta.env.VITE_PUBLIC_CDN_HOST;

  return `${host}/${image}`;
};

export const sanitizeFilename = (title: string): string => {
  return (title ?? '').replace(/[^\w\s]/g, '').trim();
};

export const toTitleCase = (str: string): string =>
  str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const getMoviePosterUrl = (title: string): string[] => {
  const original = sanitizeFilename(title);
  const fallback = toTitleCase(original);
  return [
    `https://moviepostersintex11.blob.core.windows.net/intex/Movie%20Posters/${encodeURIComponent(original)}.jpg`,
    `https://moviepostersintex11.blob.core.windows.net/intex/Movie%20Posters/${encodeURIComponent(fallback)}.jpg`,
    `/img/apple-touch-icon.png`,
  ];
};

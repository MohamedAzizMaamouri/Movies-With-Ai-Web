export const tmdbImage = (path: string | null, size = "w500") => {
  if (!path) return "/window.svg"; // fallback to window.svg
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
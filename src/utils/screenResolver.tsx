export function screenResolver() {
  const isMobile = typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  return isMobile ? "/src/screensMobile" : "/src/screensWeb";
}

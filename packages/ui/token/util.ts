/**
 * 알파값을 포함한 색상 생성
 * @example withAlpha('#0080FF', 0.5) => 'rgba(0, 128, 255, 0.5)'
 */
export function withAlpha(hexColor: string, alpha: number): string {
  const hex = hexColor.replace("#", "");
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

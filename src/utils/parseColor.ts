export default function parseColor(color): string {
  const { rgb } = color
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
}

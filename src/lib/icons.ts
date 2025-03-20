import {
  IconDefinition
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

interface SocialIcons {
  [key: string] : IconDefinition
}

const icons: SocialIcons = {
  "envelope"     : faEnvelope,
}

export function getSVGIcon(icon: string) : string {
  if (!icon || !icons.hasOwnProperty(icon)) return ""

  const [width, height, , , path] = icons[icon].icon

  return `
    <svg viewBox="0 0 ${width} ${height}">
      <path d="${path}" />
    </svg>
    `
}
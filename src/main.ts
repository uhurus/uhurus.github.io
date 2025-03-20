import { getSVGIcon } from './lib/icons'
import './style/'

document.querySelectorAll<HTMLElement>(".icon")
  .forEach(async (element: HTMLElement) => {
    const icon: string = Array
      .from(element.classList)
      .find((item: string) => item !== "icon")!

    setTimeout(() => element.focus(), 3000)
    return element.innerHTML = getSVGIcon(icon) + element.innerHTML
  })

let timeout = 500
document.querySelectorAll<HTMLSpanElement>("#hero span")
.forEach((item: HTMLSpanElement) => {
  const text = item.innerText == "u" ? "uuuu" : item.innerText
  const message = new SpeechSynthesisUtterance(item.innerText)
  message.lang = text == "hu" ? "en" : "es"
  setTimeout(() => item.focus(), timeout += 500)
  return item.onclick = () => speechSynthesis.speak(message)
})
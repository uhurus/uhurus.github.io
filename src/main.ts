import { getSVGIcon } from './lib/icons'
import './style/'

document.querySelectorAll<HTMLElement>(".icon")
  .forEach(async (element: HTMLElement) => {
    const icon: string = Array
      .from(element.classList)
      .find((item: string) => item !== "icon")!
    return element.innerHTML = getSVGIcon(icon) + element.innerHTML
  })

document.querySelectorAll<HTMLSpanElement>("#hero span")
  .forEach((item: HTMLSpanElement) => {
    const text = item.innerText == "u"? "uuuu" : item.innerText
    const message = new SpeechSynthesisUtterance(item.innerText)
    message.lang = text == "hu"? "en" : "es"
    return item.onclick = () => speechSynthesis.speak(message)
  })
declare const umami: { track: (event: string) => void }

export function umamiTrack(event: string) {
  if ("umami" in window) return umami.track(event)
  return false
}

/**
 * Scroll depth — fires once per threshold on any page.
 * Skips tracking during programmatic scrolls (hash navigation).
 * Emits: scroll:25, scroll:50, scroll:75, scroll:100
 */
export function initScrollDepth() {
  if (typeof document === "undefined") return
  const thresholds = [25, 50, 75, 100]
  const fired = new Set<number>()
  let paused = false

  // Pause tracking when hash changes (programmatic scroll to section)
  const onHashChange = () => {
    paused = true
    setTimeout(() => { paused = false }, 1500)
  }
  window.addEventListener("hashchange", onHashChange)

  // Also pause on initial load if URL has a hash
  if (window.location.hash) {
    paused = true
    setTimeout(() => { paused = false }, 1500)
  }

  const sentinel = document.createElement("div")
  sentinel.setAttribute("aria-hidden", "true")
  sentinel.style.cssText = "position:absolute;left:-9999px;pointer-events:none;height:1px;width:1px;"

  thresholds.forEach((pct) => {
    const marker = document.createElement("div")
    marker.dataset.scrollDepth = String(pct)
    marker.style.cssText = `position:absolute;left:-9999px;top:${pct}vh;pointer-events:none;height:1px;width:1px;`
    sentinel.appendChild(marker)
  })

  document.body.appendChild(sentinel)

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || paused) return
        const pct = Number((entry.target as HTMLElement).dataset.scrollDepth)
        if (pct && !fired.has(pct)) {
          fired.add(pct)
          umamiTrack(`scroll:${pct}`)
        }
      })
    },
    { threshold: 0 }
  )

  thresholds.forEach((pct) => {
    const marker = sentinel.querySelector(`[data-scroll-depth="${pct}"]`)
    if (marker) io.observe(marker)
  })
}

/**
 * Section engagement — observe [data-track="name"] elements.
 * Emits: section:{name}
 */
export function initSectionTracking() {
  if (typeof document === "undefined") return
  const sections = document.querySelectorAll<HTMLElement>("[data-track]")
  if (!sections.length) return

  const fired = new Set<string>()

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const name = (entry.target as HTMLElement).dataset.track
        if (name && !fired.has(name)) {
          fired.add(name)
          umamiTrack(`section:${name}`)
        }
      })
    },
    { threshold: 0.15 }
  )

  sections.forEach((el) => io.observe(el))
}

/**
 * Click tracking — delegates on [data-track-click] elements.
 * Emits: click:{name}
 */
export function initClickTracking() {
  if (typeof document === "undefined") return
  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-track-click]")
    if (target) {
      const name = target.dataset.trackClick
      if (name) umamiTrack(`click:${name}`)
    }
  }, { passive: true })
}

import { coreNodes } from "../../lib/schema"

export const GET = async () => {
  return new Response(JSON.stringify({ "@context": "https://schema.org", "@graph": coreNodes }, null, 2), {
    headers: {
      "Content-Type": "application/ld+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}

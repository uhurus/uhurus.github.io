import { serviceNodes } from "../../lib/schema"

export const GET = async () => {
  const services = await serviceNodes()
  return new Response(JSON.stringify({ "@context": "https://schema.org", "@graph": services }, null, 2), {
    headers: {
      "Content-Type": "application/ld+json; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}

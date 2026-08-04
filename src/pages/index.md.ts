export const GET = () => {
  const markdown = `
# uhurus — Laboratorio de producto e innovación

Laboratorio de producto e innovación. Diseño y desarrollo de soluciones digitales de alto impacto en toda España.

## Servicios
- **Diseño de producto**: definimos el problema y la solución antes de escribir código.
- **Prueba de concepto (MVP)**: sacamos el núcleo de tu idea en semanas y lo probamos con clientes reales.
- **Desarrollo completo**: construimos la versión que aguanta tráfico y factura.
- **Desarrollo MVP**: el núcleo de tu idea en semanas, con clientes reales.
- **Software a medida**: herramientas que se adaptan a cómo trabajas.
- **Modernización de sistemas legacy**: modernizamos lo que te frena sin tirar lo que factura.
- **Iteración**: medimos, aprendemos y mejoramos con datos de uso real.
- **Fintech**: cobros, repartos y conexiones con bancos y pasarelas.

## Por qué uhurus
No vendemos horas. Hemos trabajado donde fallar cuesta caro (banca y pagos) y aplicamos esa exigencia a cada proyecto. Métricas desde el día 1 y decisiones con datos, no a ojo.

## Contacto
Email: hola@uhurus.com · Barakaldo, Bizkaia (servicios en toda España)
  `.trim();

  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};

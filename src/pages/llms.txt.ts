export const GET = () => {
  const summary = `
# uhurus — Laboratorio de producto e innovación

uhurus es un laboratorio de producto e innovación. Diseño y desarrollo de soluciones digitales de alto impacto en toda España.

## Servicios Principales
- **Diseño de producto**: definimos el problema y la solución antes de escribir código.
- **Prueba de concepto (MVP)**: sacamos el núcleo de tu idea en semanas y lo probamos con clientes reales.
- **Desarrollo completo**: construimos la versión que aguanta tráfico y factura.
- **Desarrollo MVP**: el núcleo de tu idea en semanas, con clientes reales.
- **Software a medida**: herramientas que se adaptan a cómo trabajas.
- **Modernización de sistemas legacy**: modernizamos lo que te frena sin tirar lo que factura.
- **Iteración**: medimos, aprendemos y mejoramos con datos de uso real.
- **Fintech**: cobros, repartos y conexiones con bancos y pasarelas.

## Propuesta de Valor
- No vendemos horas: entregamos producto funcionando y medimos el resultado.
- Hemos trabajado donde fallar cuesta caro (banca y pagos) y aplicamos esa exigencia a cada proyecto.
- Métricas desde el día 1 y decisiones con datos, no a ojo.
- Ciclos en semanas, no en trimestres.

## Contacto
- Email: hola@uhurus.com
- Ubicación: Barakaldo, Bizkaia (servicios en toda España)
- LinkedIn: https://www.linkedin.com/company/uhurus
  `.trim();

  return new Response(summary, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

# Samoset Barbershop

Landing responsive para mostrar trabajos y recibir reservas directamente por
WhatsApp. Creada con Next.js, React, TypeScript y Tailwind CSS.

## Qué incluye

- Portada responsive optimizada para móvil.
- Dos vídeos verticales editados y preparados para web.
- Botones de reserva que abren WhatsApp con un mensaje ya escrito.
- Precio, servicios y llamada a la acción.
- Panel de administración opcional en `/admin` para el sistema anterior de
  Supabase.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Comprobar antes de publicar

```bash
npm run check
npm run build
```

La página pública no necesita variables de entorno. Para usar el panel opcional
de Supabase, copia `.env.example` a `.env.local` y añade las dos claves indicadas.

Solo pueden entrar al panel las cuentas con `app_metadata.role = 'admin'`. Ejecuta
`supabase/schema.sql` en el SQL Editor y asigna ese rol a tu cuenta con la consulta
que aparece al principio del archivo. Desactiva también los registros nuevos en
Supabase → Authentication → Sign In / Providers.

## Publicar

Puedes subir el proyecto a GitHub e importarlo en Vercel. El comando de build es
`npm run build`; la carpeta de salida la detecta Next.js automáticamente.

Los vídeos originales `.MOV` y la carpeta temporal de revisión están ignorados
por Git y Vercel. Los archivos optimizados que sí deben publicarse están en
`public/videos/`.

## Cambios rápidos

- Número y mensaje de WhatsApp: `lib/site-config.ts`
- Textos y estructura de la portada: `app/page.tsx`
- Estilos globales: `app/globals.css`
- Vídeo y control de sonido: `components/ShowcaseVideo.tsx`
- Créditos de música: `CREDITS.md`

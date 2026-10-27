# Publicar el sitio OLPEX

El sitio se exporta como HTML/CSS/JS estático (`output: "export"` en `site/next.config.ts`).
No necesita Node.js en el servidor, así que funciona en HostGator y en Amazon por igual.

## 1. Generar el sitio

```bash
cd site
npm ci
npm run images   # solo si cambiaron las fotos de ../Fotos
npm run build    # genera site/out/
npx serve out    # prueba local en http://localhost:3000
```

Todo el contenido de `site/out/` es el sitio. Incluye `.htaccess` (lo usa HostGator) y `404.html`.

## 2a. HostGator (cPanel)

1. cPanel → **Administrador de archivos** → `public_html/`.
2. Subir **el contenido** de `site/out/` (no la carpeta `out` en sí). Para muchos archivos: comprimir
   `out/` en un `.zip`, subirlo y usar **Extraer**.
3. Activar archivos ocultos (Configuración → *Show Hidden Files*) y confirmar que `.htaccess` quedó subido.
4. cPanel → **SSL/TLS Status** → ejecutar **AutoSSL** para el dominio. El `.htaccess` ya redirige a HTTPS.

Por FTP es lo mismo: copiar el contenido de `site/out/` dentro de `public_html/`.

## 2b. Amazon

### Opción A: AWS Amplify Hosting (recomendada, despliega en cada push)

1. Amplify → **Create new app** → GitHub → repositorio `Aquintek/olpex-web`, rama `main`.
2. Marcar *My app is a monorepo* con raíz `site`, o usar esta configuración de build:

   ```yaml
   version: 1
   applications:
     - appRoot: site
       frontend:
         phases:
           preBuild:
             commands: [npm ci]
           build:
             commands: [npm run build]
         artifacts:
           baseDirectory: out
           files: ['**/*']
         cache:
           paths: [node_modules/**/*]
   ```
3. En *Rewrites and redirects*, agregar `</^[^.]+$|\.(?!(css|js|png|jpg|jpeg|webp|svg|ico|woff2|txt|xml|json)$)([^.]+$)/>` → `/404.html` con código `404`.
4. **Domain management** → conectar `olpex.net` (Amplify emite el certificado SSL).

### Opción B: S3 + CloudFront

```bash
aws s3 sync site/out s3://NOMBRE-DEL-BUCKET --delete
```

- CloudFront con el bucket como origen (Origin Access Control), *Default root object* `index.html`.
- *Error pages*: 403 y 404 → `/404.html` con respuesta 404.
- Para que `/carpeta/` sirva `carpeta/index.html`, agregar una CloudFront Function en *viewer request*
  que añada `index.html` a las URL que terminan en `/`.
- Certificado en ACM (región `us-east-1`) para `olpex.net`.
- Después de cada `sync`: `aws cloudfront create-invalidation --distribution-id ID --paths "/*"`.

## Dominio

`SITE_URL` en `site/src/app/layout.tsx` está como `https://olpex.net` (canónica, Open Graph, datos
estructurados). Si el sitio vive en otro dominio, cambiarlo ahí antes del build.

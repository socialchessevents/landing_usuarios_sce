# Chess Events - Landing Page PRD

## Resumen
Landing page estática en Next.js para Chess Events, una app de ajedrez presencial.

## Implementado (Enero 2026)

### Tecnología
- Next.js 16 con App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion para animaciones
- Página 100% estática

### Secciones de la Landing
1. **Hero** - Mensaje principal "El ajedrez vuelve al tablero real" con CTAs
2. **¿Qué es?** - 6 cards explicando funcionalidades principales
3. **Timeline de Funcionalidades** - Red social, torneos, eventos, seguimiento en vivo, gamificación
4. **SCE Points** - Explicación de los espacios colaboradores (bares, cafeterías)
5. **Cómo funciona** - 4 pasos para empezar
6. **Formulario Beta** - Captación de usuarios (Nombre, Ciudad, Email*)
7. **Footer** - Logo, enlace a encuesta

### Configuración
Archivo `/src/config.ts` para personalizar:
- `betaSignupApi`: URL del endpoint para el formulario
- `surveyUrl`: URL de la encuesta de Google Forms
- `contactEmail`: Email de contacto

### Formulario Beta
- Campos: Nombre (opcional), Ciudad (opcional), Email (requerido)
- Actualmente en modo demo (console.log)
- Para conectar a un backend real, modificar `betaSignupApi` en config.ts
- Compatible con: Formspree, Netlify Forms, API propia

## Colores
- Primary: #5c330a (marrón chocolate)
- Background: #F5F0E8 (beige claro)
- Accent: #8B5A2B (marrón claro)

## Logo
https://customer-assets.emergentagent.com/job_playmate-chess/artifacts/p4fd6hj4_Presentacio%CC%81n%20app%20y%20MVP.png

## URLs Importantes
- Encuesta: https://docs.google.com/forms/d/e/1FAIpQLSeQFsCSq0LHRU47WYyAxKZjKn6UHFWJ8_cXQNDjMMa7bYhRKw/viewform?usp=dialog

## Para Deploy Estático
```bash
cd frontend
yarn build
# Los archivos estáticos están en .next/
# O usar: yarn export para generar en /out
```

## Siguientes Pasos
- [ ] Configurar endpoint real para formulario beta (Formspree, API propia, etc.)
- [ ] Añadir analytics (Google Analytics, Plausible, etc.)
- [ ] Optimizar imágenes con next/image
- [ ] Añadir meta tags de Open Graph para compartir

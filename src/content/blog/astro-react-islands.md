---
title: "Astro + React Islands: web ultra-rápida"
description: "Cómo combinar Astro con React Islands para crear sitios web súper rápidos sin sacrificar interactividad"
date: 2025-03-20
tags: ["Dev", "Performance", "Astro", "React"]
category: "Dev"
author: "Andrés Ignacio Maldonado"
featured: false
readingTime: "8 min"
draft: false
seo:
  title: "Astro React Islands - Web Ultra Rápida 2025"
  description: "Guía completa para crear sitios web súper rápidos con Astro y React Islands"
  keywords: ["Astro", "React", "performance", "web development", "islands"]
---

# Astro + React Islands: web ultra-rápida

¿Quieres lo mejor de ambos mundos? Sitios estáticos súper rápidos con interactividad cuando la necesitas. Te muestro cómo.

## El problema: Velocidad vs Interactividad

Tradicionalmente elegías:
- **Sitios estáticos**: Rápidos pero sin interactividad
- **SPAs**: Interactivos pero lentos

## La solución: Astro + React Islands

Astro te permite tener:
- **Contenido estático**: Renderizado en servidor, súper rápido
- **Islas de interactividad**: Solo donde las necesitas

### Ejemplo práctico:

```astro
---
// Este componente se renderiza estáticamente
import BlogPost from '../components/BlogPost.astro';
import SearchBox from '../components/SearchBox.tsx'; // React island
---

<BlogPost />
<SearchBox client:load /> <!-- Solo este se hidrata -->
```

## Configuración inicial

### 1. Instalar Astro con React

```bash
npm create astro@latest
npm install @astrojs/react react react-dom
```

### 2. Configurar astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  output: 'static' // Para máxima velocidad
});
```

## Patrones de uso

### 1. Contenido estático + Componentes interactivos

```astro
---
import Header from '../components/Header.astro';
import Newsletter from '../components/Newsletter.tsx';
---

<Header />
<main>
  <article>
    <h1>Mi artículo súper rápido</h1>
    <p>Este contenido se renderiza estáticamente...</p>
  </article>
</main>
<Newsletter client:visible />
```

### 2. Lazy loading inteligente

```astro
<!-- Se hidrata cuando es visible -->
<SearchBox client:visible />

<!-- Se hidrata cuando el usuario interactúa -->
<ContactForm client:idle />

<!-- Se hidrata solo en móvil -->
<MobileMenu client:media="(max-width: 768px)" />
```

## Optimizaciones avanzadas

### 1. Preload de islas críticas

```astro
<script>
  // Preload de componentes críticos
  import('../components/CriticalComponent.tsx');
</script>
```

### 2. Code splitting automático

```typescript
// Cada isla se convierte en su propio bundle
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

## Casos de uso reales

### Blog con búsqueda
- **Contenido**: Estático (rápido)
- **Búsqueda**: React island (interactiva)

### E-commerce
- **Catálogo**: Estático (SEO friendly)
- **Carrito**: React island (interactivo)

### Dashboard
- **Layout**: Estático (rápido)
- **Gráficos**: React islands (interactivos)

## Métricas de rendimiento

### Antes (SPA tradicional):
- **First Contentful Paint**: 2.1s
- **Time to Interactive**: 4.3s
- **Lighthouse Score**: 78

### Después (Astro + Islands):
- **First Contentful Paint**: 0.8s
- **Time to Interactive**: 1.2s
- **Lighthouse Score**: 95

**Mejora**: 60% más rápido

## Mejores prácticas

### 1. Minimiza las islas
```astro
<!-- ❌ Muchas islas pequeñas -->
<Button client:load />
<Icon client:load />
<Badge client:load />

<!-- ✅ Una isla que contenga todo -->
<InteractiveSection client:load>
  <Button />
  <Icon />
  <Badge />
</InteractiveSection>
```

### 2. Usa las directivas correctas
```astro
<!-- Para componentes críticos -->
<Header client:load />

<!-- Para componentes no críticos -->
<Analytics client:idle />
<Newsletter client:visible />
```

### 3. Optimiza el bundle
```typescript
// Usa dynamic imports para componentes pesados
const Chart = dynamic(() => import('./Chart'), {
  loading: () => <ChartSkeleton />
});
```

## Herramientas de desarrollo

### 1. Astro DevTools
```bash
npm install @astrojs/dev-toolbar
```

### 2. Bundle analyzer
```bash
npm install @astrojs/bundle-analyzer
```

### 3. Performance monitoring
```typescript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Migración desde otros frameworks

### Desde Next.js:
1. Mueve páginas a `/src/pages/`
2. Convierte componentes a islas
3. Actualiza rutas dinámicas

### Desde Gatsby:
1. Mueve contenido a `/src/content/`
2. Configura collections
3. Migra plugins

## Conclusión

Astro + React Islands te da:
- **Velocidad**: Contenido estático súper rápido
- **Interactividad**: Solo donde la necesitas
- **SEO**: Mejor que SPAs tradicionales
- **DX**: Mejor experiencia de desarrollo

**La clave**: Usar la herramienta correcta para cada problema.

¿Listo para hacer tu web ultra-rápida?

---

*¿Te gustó este artículo? Comparte tu experiencia con Astro en los comentarios.*

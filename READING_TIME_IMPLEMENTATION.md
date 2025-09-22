# Implementación del Cálculo Automático del Tiempo de Lectura

## Resumen

Se ha implementado un sistema automático para calcular el tiempo de lectura de los artículos del blog basado en el contenido real del artículo, utilizando una fórmula estándar de 120 palabras por minuto. **El cálculo se realiza automáticamente en build time para todos los artículos, sin necesidad de especificar `readingTime` manualmente en el frontmatter.**

## Funcionalidades Implementadas

### 1. Función de Cálculo (`calculateReadingTime`)

```typescript
calculateReadingTime(content: string, wordsPerMinute: number = 120): string
```

- **Parámetros:**
  - `content`: Contenido del artículo en markdown
  - `wordsPerMinute`: Velocidad de lectura (default: 120 palabras/min)

- **Características:**
  - Remueve el frontmatter del contenido
  - Filtra código, enlaces, imágenes y elementos de formato
  - Cuenta solo el texto real del artículo
  - Retorna el tiempo en formato "X min"

### 2. Funciones de Blog Actualizadas

#### Funciones principales que calculan automáticamente el tiempo de lectura:

- `getAllPosts(includeDrafts?, wordsPerMinute?)` - Todos los posts con tiempo calculado automáticamente
- `getLatestPost(includeDrafts?, wordsPerMinute?)` - Post más reciente con tiempo calculado automáticamente
- `getRecentPosts(includeDrafts?, limit?, wordsPerMinute?)` - Posts recientes con tiempo calculado automáticamente

#### Funciones adicionales que también calculan automáticamente:

- `getPostsByCategory()` - Posts por categoría con tiempo calculado
- `getPostsByTags()` - Posts por etiquetas con tiempo calculado
- `getFeaturedPosts()` - Posts destacados con tiempo calculado

### 3. Páginas Actualizadas

- **`/src/pages/blog.astro`**: Ahora usa `getAllPosts()` (calcula automáticamente)
- **`/src/pages/index.astro`**: Ahora usa `getLatestPost()` (calcula automáticamente)

## Ejemplo de Uso

```typescript
import { 
  getAllPosts, 
  getLatestPost,
  calculateReadingTime 
} from "../lib/blog";

// Obtener todos los posts con tiempo de lectura calculado automáticamente
const posts = await getAllPosts();

// Obtener el post más reciente con tiempo calculado automáticamente
const latestPost = await getLatestPost();

// Calcular tiempo de lectura personalizado
const customReadingTime = calculateReadingTime(content, 200); // 200 palabras/min

// Usar con velocidad de lectura personalizada
const posts = await getAllPosts(false, 200); // 200 palabras/min
```

## Configuración

### Velocidad de Lectura Personalizable

Puedes ajustar la velocidad de lectura en las funciones:

```typescript
// Para lectores más rápidos (200 palabras/min)
const posts = await getAllPosts(false, 200);

// Para lectores más lentos (120 palabras/min)  
const posts = await getAllPosts(false, 120);
```

### Esquema de Contenido

El campo `readingTime` en el esquema de contenido es opcional:

```typescript
readingTime: z.string().optional(), // Se calcula automáticamente si no se proporciona
```

## Algoritmo de Cálculo

1. **Limpieza del contenido:**
   - Remueve frontmatter YAML
   - Elimina bloques de código (```)
   - Elimina código inline (`)
   - Remueve enlaces pero mantiene el texto
   - Elimina headers (#)
   - Remueve formato markdown (**bold**, *italic*)
   - Elimina imágenes
   - Remueve listas (-, *, +, 1.)

2. **Conteo de palabras:**
   - Divide el texto por espacios
   - Filtra palabras vacías
   - Cuenta palabras válidas

3. **Cálculo del tiempo:**
   - Divide palabras totales entre palabras por minuto
   - Redondea hacia arriba (Math.ceil)
   - Formato: "X min"

## Beneficios

- ✅ **Automático**: No requiere configuración manual
- ✅ **Preciso**: Basado en contenido real del artículo
- ✅ **Configurable**: Velocidad de lectura personalizable
- ✅ **Compatible**: Mantiene funciones existentes
- ✅ **Eficiente**: Se calcula en build time
- ✅ **Estándar**: Usa fórmula reconocida (120 palabras/min)

## Migración

Las páginas existentes se actualizaron automáticamente. **No se requieren cambios adicionales en el código existente.**

**Todas las funciones principales ahora calculan automáticamente el tiempo de lectura:**
- `getAllPosts()` - Calcula automáticamente
- `getLatestPost()` - Calcula automáticamente  
- `getRecentPosts()` - Calcula automáticamente

**No es necesario especificar `readingTime` en el frontmatter de los artículos.** El sistema lo calcula automáticamente en build time.

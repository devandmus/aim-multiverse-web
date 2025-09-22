import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

/**
 * Calcula el tiempo de lectura estimado basado en el contenido del artículo
 * @param content - Contenido del artículo en markdown
 * @param wordsPerMinute - Palabras por minuto (default: 120)
 * @returns Tiempo de lectura en formato "X min"
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 120): string {
  // Remover frontmatter del contenido
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n/, '');

  // Remover código y bloques de código para contar solo texto
  const textOnly = contentWithoutFrontmatter
    .replace(/```[\s\S]*?```/g, '') // Remover bloques de código
    .replace(/`[^`]*`/g, '') // Remover código inline
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Remover enlaces pero mantener texto
    .replace(/#{1,6}\s+/g, '') // Remover headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remover bold
    .replace(/\*([^*]+)\*/g, '$1') // Remover italic
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '') // Remover imágenes
    .replace(/^\s*[-*+]\s+/gm, '') // Remover listas
    .replace(/^\s*\d+\.\s+/gm, '') // Remover listas numeradas
    .replace(/\n+/g, ' ') // Reemplazar saltos de línea con espacios
    .trim();

  // Contar palabras
  const wordCount = textOnly.split(/\s+/).filter(word => word.length > 0).length;

  // Calcular minutos
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Retornar en formato "X min"
  return `${minutes} min`;
}

/**
 * Obtiene todos los posts del blog filtrados por estado de borrador
 * @param includeDrafts - Si incluir posts en borrador (default: false)
 * @param wordsPerMinute - Palabras por minuto para el cálculo (default: 120)
 * @returns Array de posts del blog con tiempo de lectura calculado automáticamente
 */
export async function getAllPosts(includeDrafts: boolean = false, wordsPerMinute: number = 120): Promise<CollectionEntry<'blog'>[]> {
  const allPosts = await getCollection('blog');

  // Filtrar borradores si es necesario
  const filteredPosts = includeDrafts ? allPosts : allPosts.filter(post => !post.data.draft);

  // Procesar cada post para calcular el tiempo de lectura automáticamente
  const postsWithReadingTime = filteredPosts.map(post => {
    const readingTime = calculateReadingTime(post.body, wordsPerMinute);

    return {
      ...post,
      data: {
        ...post.data,
        readingTime
      }
    };
  });

  // Ordenar por fecha (más recientes primero)
  return postsWithReadingTime.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}


/**
 * Obtiene el post más reciente del blog
 * @param includeDrafts - Si incluir posts en borrador (default: false)
 * @param wordsPerMinute - Palabras por minuto para el cálculo (default: 120)
 * @returns El post más reciente con tiempo de lectura calculado o null si no hay posts
 */
export async function getLatestPost(includeDrafts: boolean = false, wordsPerMinute: number = 120): Promise<CollectionEntry<'blog'> | null> {
  const posts = await getAllPosts(includeDrafts, wordsPerMinute);

  if (posts.length === 0) {
    return null;
  }

  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())[0];
}


/**
 * Obtiene posts ordenados por fecha (más recientes primero)
 * @param includeDrafts - Si incluir posts en borrador (default: false)
 * @param limit - Número máximo de posts a retornar (default: sin límite)
 * @param wordsPerMinute - Palabras por minuto para el cálculo (default: 120)
 * @returns Array de posts ordenados por fecha con tiempo de lectura calculado
 */
export async function getRecentPosts(
  includeDrafts: boolean = false,
  limit?: number,
  wordsPerMinute: number = 120
): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts(includeDrafts, wordsPerMinute);

  const sortedPosts = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return limit ? sortedPosts.slice(0, limit) : sortedPosts;
}


/**
 * Obtiene posts por categoría
 * @param category - Categoría a filtrar
 * @param includeDrafts - Si incluir posts en borrador (default: false)
 * @returns Array de posts de la categoría especificada
 */
export async function getPostsByCategory(
  category: string,
  includeDrafts: boolean = false
): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts(includeDrafts);

  return posts.filter(post =>
    post.data.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Obtiene posts por etiquetas
 * @param tags - Array de etiquetas a filtrar
 * @param includeDrafts - Si incluir posts en borrador (default: false)
 * @param matchAll - Si debe coincidir con todas las etiquetas (default: false)
 * @returns Array de posts que coinciden con las etiquetas
 */
export async function getPostsByTags(
  tags: string[],
  includeDrafts: boolean = false,
  matchAll: boolean = false
): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts(includeDrafts);

  return posts.filter(post => {
    if (!post.data.tags || post.data.tags.length === 0) {
      return false;
    }

    if (matchAll) {
      // Debe tener todas las etiquetas
      return tags.every(tag =>
        post.data.tags!.some(postTag =>
          postTag.toLowerCase() === tag.toLowerCase()
        )
      );
    } else {
      // Debe tener al menos una etiqueta
      return tags.some(tag =>
        post.data.tags!.some(postTag =>
          postTag.toLowerCase() === tag.toLowerCase()
        )
      );
    }
  });
}

/**
 * Obtiene posts destacados
 * @param includeDrafts - Si incluir posts en borrador (default: false)
 * @returns Array de posts marcados como destacados
 */
export async function getFeaturedPosts(includeDrafts: boolean = false): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts(includeDrafts);

  return posts.filter(post => post.data.featured);
}

/**
 * Función para obtener el color basado en la categoría
 * @param category - Categoría del post
 * @returns Color correspondiente a la categoría
 */
import { getColorByCategory as getColorByCategoryFromConfig } from "./tagConfig";

export function getColorByCategory(category: string): "pink" | "yellow" | "cyan" | "purple" {
  return getColorByCategoryFromConfig(category);
}

/**
 * Obtiene estadísticas del blog
 * @param includeDrafts - Si incluir posts en borrador (default: false)
 * @returns Objeto con estadísticas del blog
 */
export async function getBlogStats(includeDrafts: boolean = false): Promise<{
  totalPosts: number;
  featuredPosts: number;
  categories: Record<string, number>;
  tags: Record<string, number>;
  latestPostDate: Date | null;
}> {
  const posts = await getAllPosts(includeDrafts);

  const categories: Record<string, number> = {};
  const tags: Record<string, number> = {};
  let latestPostDate: Date | null = null;

  posts.forEach(post => {
    // Contar categorías
    if (post.data.category) {
      categories[post.data.category] = (categories[post.data.category] || 0) + 1;
    }

    // Contar etiquetas
    if (post.data.tags) {
      post.data.tags.forEach(tag => {
        tags[tag] = (tags[tag] || 0) + 1;
      });
    }

    // Encontrar la fecha más reciente
    if (!latestPostDate || post.data.date > latestPostDate) {
      latestPostDate = post.data.date;
    }
  });

  return {
    totalPosts: posts.length,
    featuredPosts: posts.filter(post => post.data.featured).length,
    categories,
    tags,
    latestPostDate
  };
}


/**
 * Obtiene sugerencias aleatorias de posts
 * @param allPosts - Array de todos los posts
 * @param excludeSlug - Slug del post a excluir (opcional)
 * @param maxResults - Número máximo de resultados (default: 3)
 * @returns Array de posts aleatorios
 */
export function getRandomSuggestions(
  allPosts: CollectionEntry<'blog'>[],
  excludeSlug?: string,
  maxResults: number = 3
): CollectionEntry<'blog'>[] {
  const filteredPosts = allPosts.filter(post =>
    post.id !== excludeSlug && !post.data.draft
  );

  const shuffled = filteredPosts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, maxResults);
}

/**
 * Convierte el ID de un post a una URL válida del blog
 * @param postId - ID del post (ej: "ai-assistant-kpis/index.md")
 * @returns URL válida (ej: "/blog/ai-assistant-kpis")
 */
export function getPostUrl(postId: string): string {
  const cleanId = postId.replace('/index.md', '');
  return `/blog/${cleanId}`;
}

/**
 * Obtiene el color de un tag basado en la categoría del post
 * @param tag - Tag individual
 * @param category - Categoría del post
 * @returns Color correspondiente al tag
 */
import { getTagConfig } from "./tagConfig";

export function getTagColor(tag: string, category: string): "pink" | "yellow" | "cyan" | "purple" {
  const config = getTagConfig(tag);
  return config.color;
}

/**
 * Obtiene los colores de todos los tags de un post
 * @param tags - Array de tags
 * @param category - Categoría del post
 * @returns Array de objetos con tag y color
 */
export function getTagsWithColors(
  tags: string[],
  category: string
): Array<{ tag: string; color: "pink" | "yellow" | "cyan" | "purple" }> {
  return tags.map(tag => ({
    tag,
    color: getTagColor(tag, category)
  }));
}

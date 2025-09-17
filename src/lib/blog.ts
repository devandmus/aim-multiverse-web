import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

/**
 * Obtiene todos los posts del blog filtrados por estado de borrador
 * @param includeDrafts - Si incluir posts en borrador (default: false)
 * @returns Array de posts del blog
 */
export async function getAllPosts(includeDrafts: boolean = false): Promise<CollectionEntry<'blog'>[]> {
    const allPosts = await getCollection('blog');

    if (includeDrafts) {
        return allPosts;
    }

    return allPosts.filter(post => !post.data.draft);
}

/**
 * Obtiene el post más reciente del blog
 * @param includeDrafts - Si incluir posts en borrador (default: false)
 * @returns El post más reciente o null si no hay posts
 */
export async function getLatestPost(includeDrafts: boolean = false): Promise<CollectionEntry<'blog'> | null> {
    const posts = await getAllPosts(includeDrafts);

    if (posts.length === 0) {
        return null;
    }

    return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())[0];
}

/**
 * Obtiene posts ordenados por fecha (más recientes primero)
 * @param includeDrafts - Si incluir posts en borrador (default: false)
 * @param limit - Número máximo de posts a retornar (default: sin límite)
 * @returns Array de posts ordenados por fecha
 */
export async function getRecentPosts(
    includeDrafts: boolean = false,
    limit?: number
): Promise<CollectionEntry<'blog'>[]> {
    const posts = await getAllPosts(includeDrafts);

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
export function getColorByCategory(category: string): "pink" | "yellow" | "cyan" | "purple" {
    switch (category.toLowerCase()) {
        case "ai":
        case "artificial intelligence":
        case "inteligencia artificial":
            return "pink";
        case "development":
        case "tech":
        case "programming":
        case "desarrollo":
        case "tecnología":
            return "cyan";
        case "leadership":
        case "management":
        case "liderazgo":
        case "gestión":
            return "yellow";
        case "design":
        case "ux":
        case "ui":
        case "diseño":
            return "purple";
        default:
            return "cyan";
    }
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
 * Busca posts por término en título y descripción
 * @param searchTerm - Término de búsqueda
 * @param includeDrafts - Si incluir posts en borrador (default: false)
 * @returns Array de posts que coinciden con la búsqueda
 */
export async function searchPosts(
    searchTerm: string,
    includeDrafts: boolean = false
): Promise<CollectionEntry<'blog'>[]> {
    const posts = await getAllPosts(includeDrafts);
    const term = searchTerm.toLowerCase();

    return posts.filter(post =>
        post.data.title.toLowerCase().includes(term) ||
        post.data.description.toLowerCase().includes(term) ||
        (post.data.tags && post.data.tags.some(tag =>
            tag.toLowerCase().includes(term)
        )) ||
        (post.data.category && post.data.category.toLowerCase().includes(term))
    );
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
export function getTagColor(tag: string, category: string): "pink" | "yellow" | "cyan" | "purple" {
    // Mapeo específico de tags a colores
    const tagColorMap: Record<string, "pink" | "yellow" | "cyan" | "purple"> = {
        // Tags de AI
        "AI": "pink",
        "Inteligencia Artificial": "pink",
        "Automatización": "pink",
        "Machine Learning": "pink",
        "ChatGPT": "pink",
        "OpenAI": "pink",
        "LLM": "pink",

        // Tags de Desarrollo
        "Desarrollo": "cyan",
        "Programación": "cyan",
        "JavaScript": "cyan",
        "TypeScript": "cyan",
        "React": "cyan",
        "Astro": "cyan",
        "Node.js": "cyan",
        "Frontend": "cyan",
        "Backend": "cyan",
        "API": "cyan",
        "Web": "cyan",
        "Tech": "cyan",
        "Código": "cyan",

        // Tags de Liderazgo
        "Liderazgo": "yellow",
        "Management": "yellow",
        "Gestión": "yellow",
        "Equipos": "yellow",
        "Teams": "yellow",
        "Productividad": "yellow",
        "Hábitos": "yellow",
        "OKR": "yellow",
        "KPIs": "yellow",
        "Estrategia": "yellow",
        "Negocio": "yellow",

        // Tags de Diseño
        "Diseño": "purple",
        "UX": "purple",
        "UI": "purple",
        "Design": "purple",
        "Experiencia": "purple",
        "Usabilidad": "purple",
        "Interface": "purple",

        // Tags de Música
        "Música": "pink",
        "Guitarra": "pink",
        "Audio": "pink",
        "Producción": "pink",
        "Sonido": "pink",

        // Tags de Marketing
        "Marketing": "yellow",
        "Growth": "purple",
        "Conversión": "yellow",
        "SEO": "yellow",
        "Analytics": "cyan",
        "Performance": "cyan",
        "Optimización": "cyan",
    };

    // Buscar el tag en el mapeo específico
    const specificColor = tagColorMap[tag];
    if (specificColor) {
        return specificColor;
    }

    // Si no se encuentra, usar el color de la categoría
    return getColorByCategory(category);
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

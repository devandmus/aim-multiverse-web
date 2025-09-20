import type { CollectionEntry } from 'astro:content';

export interface RelatedArticle {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    category: string;
    date: Date;
    readingTime: string;
    featured: boolean;
    url: string;
    relevanceScore: number;
}

/**
 * Calcula artículos relacionados basado en tags, categoría y contenido
 */
export function getRelatedArticles(
    currentPost: CollectionEntry<'blog'>,
    allPosts: CollectionEntry<'blog'>[],
    maxResults: number = 3
): RelatedArticle[] {
    // Filtrar posts publicados y excluir el post actual
    const publishedPosts = allPosts.filter(post =>
        !post.data.draft && post.slug !== currentPost.slug
    );

    // Calcular puntuación de relevancia para cada post
    const scoredPosts = publishedPosts.map(post => ({
        ...post,
        relevanceScore: calculateRelevanceScore(currentPost, post)
    }));

    // Ordenar por relevancia (mayor puntuación primero)
    scoredPosts.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Tomar los primeros resultados y formatear
    return scoredPosts
        .slice(0, maxResults)
        .map(post => ({
            slug: post.slug,
            title: post.data.title,
            description: post.data.description,
            tags: post.data.tags || [],
            category: post.data.category || '',
            date: post.data.date,
            readingTime: post.data.readingTime || '',
            featured: post.data.featured || false,
            url: `/blog/${post.slug}`,
            relevanceScore: post.relevanceScore
        }));
}

/**
 * Calcula la puntuación de relevancia entre dos posts
 */
function calculateRelevanceScore(
    currentPost: CollectionEntry<'blog'>,
    candidatePost: CollectionEntry<'blog'>
): number {
    let score = 0;

    // 1. Coincidencia de tags (peso alto)
    const currentTags = currentPost.data.tags || [];
    const candidateTags = candidatePost.data.tags || [];

    const commonTags = currentTags.filter(tag =>
        candidateTags.includes(tag)
    );

    if (commonTags.length > 0) {
        score += commonTags.length * 10; // 10 puntos por tag común
    }

    // 2. Misma categoría (peso medio)
    if (currentPost.data.category === candidatePost.data.category) {
        score += 15;
    }

    // 3. Posts destacados (peso bajo)
    if (candidatePost.data.featured) {
        score += 5;
    }

    // 4. Similitud en el contenido (análisis básico)
    const contentSimilarity = calculateContentSimilarity(
        currentPost.body,
        candidatePost.body
    );
    score += contentSimilarity * 2;

    // 5. Penalizar posts muy antiguos (para mantener relevancia temporal)
    const daysDiff = Math.abs(
        currentPost.data.date.getTime() - candidatePost.data.date.getTime()
    ) / (1000 * 60 * 60 * 24);

    if (daysDiff > 365) {
        score -= 5; // Penalizar posts de más de un año
    }

    // 6. Bonus por posts recientes (pero no demasiado)
    if (daysDiff < 30) {
        score += 3; // Bonus por posts muy recientes
    }

    return Math.max(0, score); // Asegurar que no sea negativo
}

/**
 * Calcula similitud básica entre dos textos
 */
function calculateContentSimilarity(text1: string, text2: string): number {
    // Normalizar textos
    const normalizeText = (text: string) =>
        text
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ') // Remover puntuación
            .replace(/\s+/g, ' ') // Normalizar espacios
            .trim();

    const normalized1 = normalizeText(text1);
    const normalized2 = normalizeText(text2);

    // Obtener palabras únicas de cada texto
    const words1 = new Set(normalized1.split(' '));
    const words2 = new Set(normalized2.split(' '));

    // Calcular intersección
    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);

    // Calcular coeficiente de Jaccard
    return intersection.size / union.size;
}

/**
 * Obtiene sugerencias aleatorias para el sidebar o footer
 */
export function getRandomSuggestions(
    allPosts: CollectionEntry<'blog'>[],
    excludeSlug?: string,
    maxResults: number = 5
): RelatedArticle[] {
    const publishedPosts = allPosts.filter(post =>
        !post.data.draft && post.slug !== excludeSlug
    );

    // Mezclar array y tomar los primeros resultados
    const shuffled = [...publishedPosts].sort(() => 0.5 - Math.random());

    return shuffled
        .slice(0, maxResults)
        .map(post => ({
            slug: post.slug,
            title: post.data.title,
            description: post.data.description,
            tags: post.data.tags || [],
            category: post.data.category || '',
            date: post.data.date,
            readingTime: post.data.readingTime || '',
            featured: post.data.featured || false,
            url: `/blog/${post.slug}`,
            relevanceScore: 0 // No relevante para sugerencias aleatorias
        }));
}

/**
 * Obtiene artículos por categoría
 */
export function getArticlesByCategory(
    allPosts: CollectionEntry<'blog'>[],
    category: string,
    excludeSlug?: string,
    maxResults: number = 6
): RelatedArticle[] {
    const publishedPosts = allPosts.filter(post =>
        !post.data.draft &&
        post.data.category === category &&
        post.slug !== excludeSlug
    );

    return publishedPosts
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
        .slice(0, maxResults)
        .map(post => ({
            slug: post.slug,
            title: post.data.title,
            description: post.data.description,
            tags: post.data.tags || [],
            category: post.data.category || '',
            date: post.data.date,
            readingTime: post.data.readingTime || '',
            featured: post.data.featured || false,
            url: `/blog/${post.slug}`,
            relevanceScore: 0
        }));
}

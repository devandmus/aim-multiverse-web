import { getCollection } from 'astro:content';

/**
 * API endpoint para búsqueda en tiempo real
 * Genera el índice de búsqueda dinámicamente
 */
export async function GET({ url }) {
    try {
        const searchParams = url.searchParams;
        const query = searchParams.get('q') || '';
        const category = searchParams.get('category') || '';
        const tags = searchParams.get('tags') || '';
        const limit = parseInt(searchParams.get('limit') || '10');

        // Obtener todos los artículos
        const posts = await getCollection('blog');
        const publishedPosts = posts.filter(post => !post.data.draft);

        // Crear índice de búsqueda
        const searchIndex = publishedPosts.map(post => {
            const contentText = post.body
                .replace(/[#*`\[\]()]/g, '')
                .replace(/\s+/g, ' ')
                .trim();

            return {
                id: post.slug,
                title: post.data.title,
                description: post.data.description,
                content: contentText,
                tags: post.data.tags || [],
                category: post.data.category || '',
                author: post.data.author,
                date: post.data.date.toISOString(),
                readingTime: post.data.readingTime || '',
                featured: post.data.featured || false,
                url: `/blog/${post.slug}`,
                searchText: `${post.data.title} ${post.data.description} ${contentText}`.toLowerCase(),
                wordCount: contentText.split(' ').length
            };
        });

        // Filtrar por categoría
        let filteredResults = category
            ? searchIndex.filter(post => post.category.toLowerCase() === category.toLowerCase())
            : searchIndex;

        // Filtrar por tags
        if (tags) {
            const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
            filteredResults = filteredResults.filter(post =>
                post.tags.some(tag => tagArray.includes(tag.toLowerCase()))
            );
        }

        // Buscar por query
        let results = filteredResults;
        if (query) {
            const queryLower = query.toLowerCase();
            results = filteredResults.filter(post =>
                post.searchText.includes(queryLower) ||
                post.tags.some(tag => tag.toLowerCase().includes(queryLower)) ||
                post.category.toLowerCase().includes(queryLower)
            );

            // Ordenar por relevancia (título > descripción > contenido)
            results.sort((a, b) => {
                const scoreA = calculateRelevanceScore(a, queryLower);
                const scoreB = calculateRelevanceScore(b, queryLower);
                return scoreB - scoreA;
            });
        } else {
            // Sin query, ordenar por fecha
            results.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        // Limitar resultados
        const limitedResults = results.slice(0, limit);

        return new Response(JSON.stringify({
            success: true,
            query,
            total: results.length,
            results: limitedResults,
            filters: {
                category,
                tags: tags ? tags.split(',').map(tag => tag.trim()) : []
            }
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300' // Cache por 5 minutos
            }
        });

    } catch (error) {
        console.error('Error en búsqueda:', error);

        return new Response(JSON.stringify({
            success: false,
            error: 'Error interno del servidor',
            results: []
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

/**
 * Calcula la puntuación de relevancia para un resultado
 */
function calculateRelevanceScore(post, query) {
    let score = 0;

    // Puntos por coincidencia en título
    if (post.title.toLowerCase().includes(query)) {
        score += 10;
    }

    // Puntos por coincidencia en descripción
    if (post.description.toLowerCase().includes(query)) {
        score += 5;
    }

    // Puntos por coincidencia en tags
    const tagMatches = post.tags.filter(tag =>
        tag.toLowerCase().includes(query)
    ).length;
    score += tagMatches * 3;

    // Puntos por coincidencia en categoría
    if (post.category.toLowerCase().includes(query)) {
        score += 2;
    }

    // Puntos por coincidencia en contenido
    const contentMatches = (post.content.toLowerCase().match(new RegExp(query, 'g')) || []).length;
    score += contentMatches * 1;

    // Bonus por artículo destacado
    if (post.featured) {
        score += 1;
    }

    return score;
}

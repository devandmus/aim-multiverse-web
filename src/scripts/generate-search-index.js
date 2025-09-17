import { getCollection } from 'astro:content';
import fs from 'fs/promises';
import path from 'path';

/**
 * Genera un índice de búsqueda JSON a partir de los artículos del blog
 * Este archivo se ejecuta durante el build para crear un índice optimizado
 */
async function generateSearchIndex() {
    try {
        console.log('🔍 Generando índice de búsqueda...');

        // Obtener todos los artículos del blog
        const posts = await getCollection('blog');

        // Filtrar solo artículos publicados
        const publishedPosts = posts.filter(post => !post.data.draft);

        // Crear índice optimizado para búsqueda
        const searchIndex = publishedPosts.map(post => {
            // Extraer texto del contenido para búsqueda
            const contentText = post.body
                .replace(/[#*`\[\]()]/g, '') // Remover markdown
                .replace(/\s+/g, ' ') // Normalizar espacios
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
                // Campos para búsqueda ponderada
                searchText: `${post.data.title} ${post.data.description} ${contentText}`.toLowerCase(),
                // Metadatos adicionales
                wordCount: contentText.split(' ').length,
                lastModified: post.data.updatedDate?.toISOString() || post.data.date.toISOString()
            };
        });

        // Ordenar por fecha (más recientes primero)
        searchIndex.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Crear directorio público si no existe
        const publicDir = path.join(process.cwd(), 'public');
        await fs.mkdir(publicDir, { recursive: true });

        // Escribir índice de búsqueda
        const indexPath = path.join(publicDir, 'search-index.json');
        await fs.writeFile(indexPath, JSON.stringify(searchIndex, null, 2));

        console.log(`✅ Índice de búsqueda generado: ${searchIndex.length} artículos`);
        console.log(`📁 Ubicación: ${indexPath}`);

        // Generar también un índice de sugerencias (para artículos relacionados)
        const suggestionsIndex = searchIndex.map(post => ({
            id: post.id,
            title: post.title,
            tags: post.tags,
            category: post.category,
            featured: post.featured,
            url: post.url
        }));

        const suggestionsPath = path.join(publicDir, 'suggestions-index.json');
        await fs.writeFile(suggestionsPath, JSON.stringify(suggestionsIndex, null, 2));

        console.log(`✅ Índice de sugerencias generado: ${suggestionsIndex.length} artículos`);
        console.log(`📁 Ubicación: ${suggestionsPath}`);

        return {
            searchIndex: searchIndex.length,
            suggestionsIndex: suggestionsIndex.length
        };

    } catch (error) {
        console.error('❌ Error generando índice de búsqueda:', error);
        throw error;
    }
}

// Ejecutar si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
    generateSearchIndex()
        .then((result) => {
            console.log('🎉 Proceso completado exitosamente');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Proceso falló:', error);
            process.exit(1);
        });
}

export default generateSearchIndex;

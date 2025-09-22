// Configuración centralizada de tags y colores
export interface TagConfig {
    name: string;
    color: "pink" | "yellow" | "cyan" | "purple";
    displayName: string;
}

export const TAG_CONFIGS: TagConfig[] = [
    // AI & Tecnología
    {
        name: "AI",
        color: "pink",
        displayName: "AI"
    },

    // Desarrollo & Tech

    {
        name: "Tech",
        color: "cyan",
        displayName: "Tech"
    },

    // Liderazgo & Management
    {
        name: "Leadership",
        color: "yellow",
        displayName: "Leadership"
    },

    // Marketing & Growth
    {
        name: "Marketing",
        color: "yellow",
        displayName: "Marketing"
    },

    // Música & Creatividad
    {
        name: "Music",
        color: "purple",
        displayName: "Music"
    }
];

// Función para obtener la configuración de un tag
export function getTagConfig(tagName: string): TagConfig {
    const config = TAG_CONFIGS.find(config =>
        config.name.toLowerCase() === tagName.toLowerCase()
    );

    if (!config) {
        // Default fallback
        return {
            name: tagName,
            color: "cyan",
            displayName: tagName
        };
    }

    return config;
}

// Función para obtener el color de una categoría
export function getColorByCategory(category: string): "pink" | "yellow" | "cyan" | "purple" {
    const config = getTagConfig(category);
    return config.color;
}

// Función para obtener el nombre de display de un tag
export function getTagDisplayName(tagName: string): string {
    const config = getTagConfig(tagName);
    return config.displayName;
}

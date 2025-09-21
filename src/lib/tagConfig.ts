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
    {
        name: "Artificial Intelligence",
        color: "pink",
        displayName: "AI"
    },
    {
        name: "Inteligencia Artificial",
        color: "pink",
        displayName: "AI"
    },

    // Desarrollo & Tech
    {
        name: "Development",
        color: "cyan",
        displayName: "Dev"
    },
    {
        name: "Tech",
        color: "cyan",
        displayName: "Dev"
    },
    {
        name: "Programming",
        color: "cyan",
        displayName: "Dev"
    },
    {
        name: "Desarrollo",
        color: "cyan",
        displayName: "Dev"
    },
    {
        name: "Tecnología",
        color: "cyan",
        displayName: "Dev"
    },

    // Liderazgo & Management
    {
        name: "Leadership",
        color: "yellow",
        displayName: "Liderazgo"
    },
    {
        name: "Management",
        color: "yellow",
        displayName: "Liderazgo"
    },
    {
        name: "Liderazgo",
        color: "yellow",
        displayName: "Liderazgo"
    },
    {
        name: "Gestión",
        color: "yellow",
        displayName: "Liderazgo"
    },

    // Design & UX
    {
        name: "Design",
        color: "purple",
        displayName: "Design"
    },
    {
        name: "UX",
        color: "purple",
        displayName: "Design"
    },
    {
        name: "UI",
        color: "purple",
        displayName: "Design"
    },
    {
        name: "Diseño",
        color: "purple",
        displayName: "Design"
    },

    // Marketing & Growth
    {
        name: "Marketing",
        color: "yellow",
        displayName: "Marketing"
    },
    {
        name: "Growth",
        color: "yellow",
        displayName: "Growth"
    },
    {
        name: "Conversión",
        color: "yellow",
        displayName: "Growth"
    },

    // Música & Creatividad
    {
        name: "Música",
        color: "purple",
        displayName: "Música"
    },
    {
        name: "Music",
        color: "purple",
        displayName: "Música"
    },
    {
        name: "Creatividad",
        color: "purple",
        displayName: "Música"
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

import GRAPHQL_URL from "../../env";

export type ThemeBlockType = "title" | "text" | "image";

export interface ThemeBlock {
    id: string;
    block_type: ThemeBlockType;
    title?: string;
    text?: string;
    image?: string;
    order: number;
}

const API_HOST = 'http://localhost:8000';

export const getThemeBlocks = async (
    themeId: string | number
): Promise<ThemeBlock[]> => {
    const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
        query GetThemeBlocks($themeId: ID!) {
          themeBlocks(themeId: $themeId) {
            id
            blockType
            title
            text
            image
            order
          }
        }
      `,
            variables: {
                themeId: Number(themeId),
            },
        }),
    });

    const json = await response.json();

    console.log("GetThemeBlocks response:", json);

    if (json.errors) {
        console.error("GraphQL errors:", json.errors);
        throw new Error(
            json.errors.map((e: any) => e.message).join("\n")
        );
    }

    if (!json.data || !json.data.themeBlocks) {
        console.error("Invalid GraphQL response shape:", json);
        throw new Error("themeBlocks is undefined");
    }

    return json.data.themeBlocks.map((b: any) => ({
        id: b.id,
        block_type: b.blockType.toLowerCase(),
        title: b.title,
        text: b.text,
        image: b.image,
        order: b.order,
    }));
};

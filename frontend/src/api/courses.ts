import GRAPHQL_URL from "../../env";

export interface CourseData {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    difficulty: string;
}

export const getCourses = async (): Promise<CourseData[]> => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
				query GetCourses($pagination: PaginationInput!) {
					courses(pagination: $pagination) {
						id
						name
						description
						price
						duration
						difficulty
					}
				}
			`,
            variables: {
                pagination: {
                    offset: 0,
                    limit: 3,
                },
            },
        }),
    });

    const result = await response.json();

    if (result.errors) {
        throw new Error(result.errors.map((e: any) => e.message).join('\n'));
    }

    return result.data.courses;
};

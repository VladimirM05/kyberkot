import GRAPHQL_URL from "../../env";

export interface CourseTheme {
  id: string;
  name: string;
  order: number;
}

export const getCourseThemes = async (courseId: string): Promise<CourseTheme[]> => {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetCourseThemes($courseId: ID!) {
          courseThemes(courseId: $courseId) {
            id
            name
            order
          }
        }
      `,
      variables: { courseId },
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
    throw new Error(json.errors.map((e: any) => e.message).join('\n'));
  }

  if (!json.data?.courseThemes) {
    console.error('Invalid response:', json);
    throw new Error('courseThemes is undefined');
  }

  return json.data.courseThemes;
};

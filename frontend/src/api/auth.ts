import GRAPHQL_URL from "../../env";

export const authenticateUser = async (
    username: string,
    password: string
): Promise<boolean> => {
    const response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query: `
        query AuthenticateUser($username: String!, $password: String!) {
          authenticateUser(username: $username, password: $password) {
            isAuthenticated
          }
        }
      `,
            variables: {
                username,
                password,
            },
        }),
    });

    const result = await response.json();

    if (result.errors) {
        throw new Error(result.errors.map((e: any) => e.message).join("\n"));
    }

    return result.data.authenticateUser.isAuthenticated;
};

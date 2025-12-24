const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL as string;

if (!GRAPHQL_URL) {
  throw new Error('REACT_APP_GRAPHQL_URL is not defined');
}

export default GRAPHQL_URL;
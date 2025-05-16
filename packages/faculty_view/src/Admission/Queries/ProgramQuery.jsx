// Queries/ProgramQuery.js
console.log("ProgramQuery loaded"); // Add this at the top of Queries/ProgramQuery.js
import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

const ProgramPageQuery = createQueryStrLazy(`
  query ProgramPage {
    programPage {
      __typename
      id
      name
    }
  }
`);

export const ProgramPageAsyncAction = createAsyncGraphQLAction(ProgramPageQuery);

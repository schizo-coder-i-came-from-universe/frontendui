// Queries/ProgramQuery.js
console.log("ProgramQuery loaded"); // Add this at the top of Queries/ProgramQuery.js
import { createAsyncGraphQLAction, createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared";

/**
 * GraphQL query for fetching program page information.
 * Retrieves basic program details including ID and name.
 * 
 * @returns {Object} Program page data
 * @returns {string} returns.id - UUID of the program
 * @returns {string} returns.name - Name of the program
 * @returns {string} returns.__typename - GraphQL typename for the object
 * 
 * @example
 * // Fetch program page data
 * const result = await ProgramPageAsyncAction();
 * console.log('Program:', result.programPage.name);
 * 
 * @example
 * // Use in React component
 * const [programData, setProgramData] = useState(null);
 * 
 * useEffect(() => {
 *   ProgramPageAsyncAction().then(result => {
 *     setProgramData(result.programPage);
 *   });
 * }, []);
 */
const ProgramPageQuery = createQueryStrLazy(`
  query ProgramPage {
    programPage {
      __typename
      id
      name
    }
  }
`);

/**
 * Async action creator for fetching program page data.
 * Provides a Redux-compatible action creator for program page queries.
 * 
 * @function
 * @returns {Function} Redux action creator function that fetches program page data
 */
export const ProgramPageAsyncAction = createAsyncGraphQLAction(ProgramPageQuery);

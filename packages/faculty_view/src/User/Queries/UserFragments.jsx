import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

/**
 * GraphQL fragment containing basic user information fields.
 * 
 * This fragment includes essential user identification and contact data:
 * - System fields (__typename, id, lastchange)
 * - Personal information (name, surname, email)
 */
export const UserLinkFragment = createQueryStrLazy(
`
fragment UserLink on UserGQLModel {
  __typename
  id
  lastchange
  name
  surname
  email
}
`)

/**
 * GraphQL fragment extending UserLink with medium-level user details.
 * 
 * Currently includes all fields from UserLink fragment. This fragment
 * serves as a foundation for more detailed user queries while maintaining
 * a moderate level of data fetching.
 * 
 * @extends UserLinkFragment
 */
export const UserMediumFragment = createQueryStrLazy(
`
fragment UserMedium on UserGQLModel {
  ...UserLink
}
`, UserLinkFragment)

/**
 * GraphQL fragment containing comprehensive user information.
 * 
 * This fragment extends UserMedium with detailed membership information:
 * - All basic and medium user fields
 * - Active memberships with group details
 * - Group type information for organizational hierarchy
 * 
 * Use this fragment when you need complete user data including their
 * organizational affiliations and group memberships.
 * 
 * @extends UserMediumFragment
 */
export const UserLargeFragment = createQueryStrLazy(
`
fragment UserLarge on UserGQLModel {
  ...UserMedium  
  memberships(where: {valid: {_eq: true}}) {
    __typename
    id
    valid
    startdate
    enddate
    group {
      id
      name
      grouptype {
        id
        name
      }
    }
  }
}
`, UserMediumFragment)
  
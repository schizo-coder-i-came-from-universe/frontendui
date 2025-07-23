import { createQueryStrLazy } from "@hrbolek/uoisfrontend-gql-shared"

/**
 * GraphQL fragment for basic group entity information.
 * 
 * This fragment defines the minimal set of fields needed for group identification
 * and basic display, including type information, identifiers, names, and timestamps.
 * 
 * @constant
 * @type {string}
 * 
 * @returns {Object} Fragment containing:
 * @returns {string} __typename - The GraphQL type name
 * @returns {string} id - Unique identifier (UUID)
 * @returns {string} lastchange - Last modification timestamp
 * @returns {string} name - Group name in the default language
 * @returns {string} nameEn - Group name in English
 */
export const GroupLinkFragment = createQueryStrLazy(
`
fragment GroupLink on GroupGQLModel {
  __typename
  id
  lastchange
  name
  nameEn
}
`)

/**
 * GraphQL fragment for medium-level group entity information.
 * 
 * This fragment extends GroupLinkFragment with additional fields suitable
 * for detailed views and forms. Currently includes all fields from GroupLinkFragment.
 * 
 * @constant
 * @type {string}
 * 
 * @returns {Object} Fragment containing all fields from GroupLinkFragment plus additional medium-level details.
 */
export const GroupMediumFragment = createQueryStrLazy(
`
fragment GroupMedium on GroupGQLModel {
  ...GroupLink
}
`, GroupLinkFragment)

/**
 * GraphQL fragment for complete group entity information.
 * 
 * This fragment includes all available fields for a group entity, suitable
 * for comprehensive views and full entity operations. Currently includes
 * all fields from GroupMediumFragment.
 * 
 * @constant
 * @type {string}
 * 
 * @returns {Object} Fragment containing all fields from GroupMediumFragment plus additional comprehensive details.
 */
export const GroupLargeFragment = createQueryStrLazy(
`
fragment GroupLarge on GroupGQLModel {
  ...GroupMedium
}
`, GroupMediumFragment)
  
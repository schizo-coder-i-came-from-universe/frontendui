import { createAsyncGraphQLAction, ItemActions, useAsyncAction } from '@hrbolek/uoisfrontend-gql-shared';
import { CreateDelayer, DeleteButton, Input } from '@hrbolek/uoisfrontend-shared';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserUpdateAsyncAction, UserReadAsyncAction } from '../Queries';
import { UserMediumEditableContent } from './UserMediumEditableContent';
let value = 0;

/**
 * GraphQL query action for searching groups by name pattern
 * Fetches groups that match the provided name pattern using case-insensitive search
 */
const QueryGroupAsyncAction = createAsyncGraphQLAction(`query ($pattern: String!){
  groupPage(where: {name :{_ilike: $pattern}}) {
    __typename
    id
    name
  }
}`)


/**
 * Redux thunk action creator for updating user memberships
 * 
 * Processes membership insertion response and updates the user in Redux store
 * if the insertion was successful.
 * 
 * @param {Object} jsonData - The response data from membership insertion mutation
 * @param {Object} jsonData.data - The data object containing membershipInsert result
 * @param {Object} jsonData.data.membershipInsert - The membership insertion result
 * @returns {Function} Redux thunk function
 * 
 * @example
 * ```javascript
 * dispatch(updateMembershipsForUser(membershipResponse))
 * ```
 */
export const updateMembershipsForUser = (jsonData) => async (dispatch, getState, next = (jsonResult) => jsonResult) => {
    console.log("updateMembershipsForUser.jsonData", jsonData)
    const membership = jsonData?.data?.membershipInsert;
    if (membership) {
        const {__typename} = membership
        if (__typename === "MembershipGQLModel") {
            const {user} = membership
            dispatch(ItemActions.item_update(user));
        } 
    }
}

/**
 * GraphQL mutation action for inserting user memberships
 * Creates a new membership relationship between a user and a group
 * with optional start and end dates
 */
const MembeshipInsertAsyncAction = createAsyncGraphQLAction(`mutation membershipInsert($userId: UUID!, $groupId: UUID!, $id: UUID, $startdate: DateTime, $enddate: DateTime) {
  membershipInsert(membership: {userId: $userId, groupId: $groupId, id: $id, startdate: $startdate, enddate: $enddate}) {
    ... on MembershipGQLModel { ...Membership }
    ... on InsertError { ...InsertError }
  }
}

fragment InsertError on InsertError {
  __typename
  input
  failed
  msg
}

fragment Membership on MembershipGQLModel {
  __typename
  id
  user {
    id
    name
    surname
    memberships {
      id
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
  group {
    id
    name
    grouptype { 
        id
        name
    }

  }
  startdate
  enddate
}`
// , updateMembershipsForUser
)

/**
 * Local Group Display Component
 * 
 * Renders a clickable group item that can be selected for membership assignment.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.group - The group object to display
 * @param {string} props.group.id - The group's unique identifier
 * @param {string} props.group.name - The group's display name
 * @param {Function} props.onSelect - Callback function called when group is selected
 * @returns {JSX.Element} A div containing a clickable group link
 * 
 * @example
 * ```jsx
 * <LocalGroup 
 *   group={{id: "123", name: "Development Team"}} 
 *   onSelect={handleGroupSelect} 
 * />
 * ```
 */
const LocalGroup = ({group, onSelect}) => {
    const onClick = () => {
        console.log("LocalGroup.onClick", group.id, group.name)
        onSelect(group)
    }
    return (
        <div>
            <a onClick={onClick} href="#">{group.name} [{group.id}]</a>
        </div>
    )
}

/**
 * Helper function to update user with new membership
 * 
 * Updates the user object in Redux store by adding the new membership
 * to the user's memberships array if the membership creation was successful.
 * 
 * @param {Object} user - The user object to update
 * @param {Object} membership - The membership object returned from GraphQL mutation
 * @param {string} membership.__typename - The GraphQL typename of the membership
 * @param {Function} dispatch - Redux dispatch function
 * 
 * @example
 * ```javascript
 * followUpUserUpdate(currentUser, newMembership, dispatch)
 * ```
 */
const followUpUserUpdate = (user, membership, dispatch) => {
    const {__typename} = membership
    if (__typename === "MembershipGQLModel") {
        const {memberships} = user
        const newMemberships = [...memberships, membership]
        const newUser = {...user, memberships: newMemberships}
        dispatch(ItemActions.item_update(newUser));
    } 
}

/**
 * User Data Management Component
 * 
 * A comprehensive React component for managing user data including:
 * - Group membership assignment through search and selection
 * - User email editing with real-time updates
 * - Interactive counter demonstration
 * - Loading states and error handling
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.user - The user object containing user information
 * @param {string} props.user.id - The user's unique identifier
 * @param {string} props.user.email - The user's email address
 * @param {Array} props.user.memberships - Array of user's current group memberships
 * @returns {JSX.Element} A div containing user data management interface
 * 
 * @example
 * ```jsx
 * <UserData user={{
 *   id: "user-123",
 *   email: "user@example.com",
 *   memberships: []
 * }} />
 * ```
 * 
 * Features:
 * - Real-time group search with debounced input
 * - Click-to-add group membership
 * - Inline email editing
 * - Counter state management demonstration
 * - Comprehensive error handling and loading states
 */
export const UserData = ({user}) => {
    const {loading, error, fetch } = useAsyncAction(QueryGroupAsyncAction, {}, {deferred: true});
    const {loading: loadingInsert, error: errorInsert, fetch: fetchInsert} = useAsyncAction(MembeshipInsertAsyncAction, {}, {deferred: true});
    
    const {fetch: refetchUser} = useAsyncAction(UserReadAsyncAction, {}, {deferred: true});

    const [state, setState] = useState(value);
    const [groups, setGroups] = useState([]);
    const [delayer, setDelayer] = useState(() => CreateDelayer(1000));
    const dispatch = useDispatch()

    const onClick = () => {
        value = value + 1;
        const newState = state + 1;
        setState(newState);
    }
    const onSelect = (group) => {
        console.log("UserData.onSelect", group.id, group.name)
        
        const insertParams = {
            userId: user.id,
            groupId: group.id,
            id: crypto.randomUUID(),
            startdate: new Date().toISOString().replace("Z", ""),
            enddate: null
        }

        console.log("UserData.onSelect.insertParams", insertParams)

        fetchInsert(insertParams).then(
            // json => refetchUser({id: user.id})
            // json => {
            //     console.log("UserData.onSelect.json", json)
            //     const membership = json;
            //     if (membership) {
            //         const {__typename} = membership
            //         if (__typename === "MembershipGQLModel") {
            //             const {memberships} = user
            //             const newMemberships = [...memberships, membership]
            //             const newUser = {...user, memberships: newMemberships}
            //             dispatch(ItemActions.item_update(newUser));
            //         } 
            //     } else {
            //         console.error("UserData.onSelect.membershipInsert.error", json)
            //     }
            // }
            json => followUpUserUpdate(user, json, dispatch)
        )
        .catch((error) => {
            console.error("UserData.onSelect.membership.error", error)
        })
    }
    const onChange = (e) => {
        const data = e.target.value;
        if (data.length > 2) {
            delayer(() => fetch({ pattern: `%${data}%` }).then(
                json => {
                    const groups = json?.data?.groupPage || []
                    setGroups(groups)
                    console.log(json)
                    return json
                }
            ))
        }
        console.log("UserData.onChange.data", data)
    }
    const onDelete = () => {
        console.log("UserData.onDelete")
    }
    
    return (
        <div>
            UserData {value}, {state}
            <button className="btn btn-success" onClick={onClick}>Increment</button><br />
            <input className='form-control' type="text" defaultValue={"demo"} onChange={onChange}/>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {JSON.stringify(error)}</div>}
            {groups && groups.map((group) => {
                return <LocalGroup key={group.id} group={group} onSelect={onSelect}/>
            })}
            <UserEmailEdit user={user} />
            <DeleteButton onClick={onDelete}>D</DeleteButton>
        </div>
    )
}


/**
 * User Email Edit Component
 * 
 * A React component that provides inline editing capabilities for user email
 * and other user properties. Updates are sent immediately on change.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.user - The user object to edit
 * @param {string} props.user.email - The user's current email address
 * @param {string} props.user.id - The user's unique identifier
 * @returns {JSX.Element} A div containing editable user fields
 * 
 * @example
 * ```jsx
 * <UserEmailEdit user={{
 *   id: "user-123",
 *   email: "current@example.com"
 * }} />
 * ```
 * 
 * Features:
 * - Real-time email updates on input change
 * - Generic field editing through onChange2 handler
 * - Loading state indication during updates
 * - Error handling and display
 * - Integration with UserMediumEditableContent component
 */
export const UserEmailEdit = ({user}) => {
    const {loading, error, fetch } = useAsyncAction(UserUpdateAsyncAction, {}, {deferred: true});
    const onChange = (e) => {
        const email = e.target.value;
        const newUser = {...user, email: email}
        fetch(newUser)

    }
    const onChange2 = (e) => {
        const newValue = e.target.value;
        const id = e.target.id;
        const newUser = {...user, [id]: newValue}
        fetch(newUser)
    }   
    return (
        <div>
            {loading && <div>Ukládám...</div>}
            {error && <div>Došlo k chybě: {JSON.stringify(error)}</div>}
            <input type="text" className='form-control' defaultValue={user.email} onChange={onChange} />
            
            <UserMediumEditableContent user={user} onChange={onChange2} />
        </div>
    )
}
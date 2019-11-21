import client from "./graphQL-client";
import gql from "graphql-tag";

/**
 * The User Object
 * @typedef {Object} UserObject
 * @property {String} email - email
 * @property {String} password - password min 6 chars
 * @property {String} displayName - Display Name
 * @property {String} phoneNumber - user full phoneNumber
 * @property {String} type - user type 'admin' or 'user'
 */

/**
 * add user to the auth and user database
 * @param {UserObject} user
 *
 * @returns {Promise}
 */
export const addUser = user => {
  return client.mutate({
    mutation: gql`
      mutation($user: NewUser!) {
        addUser(user: $user) {
          user {
            email
            uid
            phoneNumber
            displayName
            type
          }
          message
          success
        }
      }
    `,
    variables: { user }
  });
};

/**
 * Delete user out of the auth database
 * @param {Sting} uid unique user ID
 *
 * @returns {Promise}
 */
export const deleteUser = uid => {
  return client.mutate({
    mutation: gql`
      mutation($uid: ID!) {
        deleteUser(uid: $uid) {
          message
          success
        }
      }
    `,
    variables: { uid }
  });
};

/**
 * 
 * @param {String} uid unique user ID
 * @param {UserObject} data kays and values to edit
 *
 * @returns {Promise}
 */
export const editUser = (uid, data) => {
  return client.mutate({
    mutation: gql`
      mutation($uid: ID!, $data: EditUserInput!) {
        editUser(uid: $uid, data: $data) {
          user {
            email
            uid
            phoneNumber
            displayName
            type
          }
          message
          success
        }
      }
    `,
    variables: { uid, data }
  });
};

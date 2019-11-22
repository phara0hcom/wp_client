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
          success!
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
          success!
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
          success!
        }
      }
    `,
    variables: { uid, data }
  });
};
/**
 *
 * @param {String} phoneNumber PhoneNumber string
 *
 * @returns {Promise}
 */
export const sendSms = phoneNumber => {
  return client.mutate({
    mutation: gql`
      mutation($phoneNumber: String!) {
        sendSms(phoneNumber: $phoneNumber) {
          id
          message
          success!
        }
      }
    `,
    variables: { phoneNumber }
  });
};

/**
 * /signUp/:id route on signup
 * @param {String} id Id that is in the url
 * @param {String} email
 * @param {String} password
 *
 * * @returns {Promise}
 */
export const signUp = (id, email, password) => {
  return client.mutate({
    mutation: gql`
      mutation($id: ID!, $password: String!, $email: String!) {
        signUp(id: $id, password: $password, email: $email) {
          message
          success!
        }
      }
    `,
    variables: { id, password, email }
  });
};

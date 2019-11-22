import client from "./graphQL-client";
import gql from "graphql-tag";

/**
 * Resolves the auth db and the user db and returns the data
 * @param {Number} maxUsers maximum of returned users Max of this is 1000
 * @param {String} nextPageToken documentation is a but vague on this
 *
 * @returns {Promise}
 */
export const listUsers = (maxUsers = 1000) => {
  return client.query({
    query: gql`
      query($maxUsers: Int!) {
        listUsers(max: $maxUsers) {
          users {
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
    variables: { maxUsers }
  });
};

/**
 * ony does a query in the User database
 * @param {String} column the column you want to search in
 * @param {String} compare the kind of comparison you wan to make '==', '>' '!=' etc.
 * @param {String|Number} value the value you want to find or compare against
 *
 * @returns {Promise}
 */
export const queryUserDb = (column, compare, value) => {
  return client.query({
    query: gql`
      query($column: String!, $compare: String!, $value: String!) {
        queryUserDb(column: $column, compare: $compare, value: $value) {
          users {
            uid
            type
          }
          message
          success
        }
      }
    `,
    variables: { column, compare, value }
  });
};

/**
 * Checks if the auth token is still active and correct
 * @param {String} token token receiver after login and stored in a cookie
 *
 * @returns {Promise}
 */
export const authToken = token => {
  return client.query({
    query: gql`
      query($token: ID!) {
        authToken(token: $token) {
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
    variables: { token }
  });
};

/**
 * resolves one user with the unique id
 * @param {string} uid uniqueId from the Auth db
 *
 * @returns {Promise}
 */
export const getUser = uid => {
  return client.query({
    query: gql`
      query($uid: ID!) {
        getUser(uid: $uid) {
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
    variables: { uid }
  });
};

/**
 * Resets password by creating a link where the user can set a new password
 * @param {String} email
 *
 * @returns {Promise} {date: {sendReset: success {Boolean}, message: {string} }}
 */
export const resetUserPassword = email => {
  return client.query({
    query: gql`
      query($email: String!) {
        sendReset(email: $email) {
          message
          success
        }
      }
    `,
    variables: { email }
  });
};

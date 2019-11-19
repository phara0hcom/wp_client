import client from "./graphQL-client";
import gql from "graphql-tag";

/**
 *
 * @param {Number} maxUsers maximum of returned users Max of this is 1000
 * @param {String} nextPageToken documentation is a but vague on this
 *
 * @returns {Promise}
 */
export const listUsers = (maxUsers = 1000, nextPageToken = null) => {
  return client.query({
    query: gql`
      query($maxUsers: Int!, $nextPageToken: String) {
        listUsers(max: $maxUsers, nextPageToken: $nextPageToken) {
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
    variables: { maxUsers, nextPageToken }
  });
};

/**
 *
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

export const authToken = token => {
  return client.query({
    query: gql`
      query($token: String!) {
        authToken(token: $token) {
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
    variables: { token }
  });
};

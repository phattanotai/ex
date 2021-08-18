import gql from 'graphql-tag';

export const LOGIN = gql `

query doLogin($username: String, $password: String){
  doLogin(username: $username, password: $password) {
   accessToken
   userData {
      users_name
      users_address
      users_city
      users_region
      users_tel
      users_email
      job_position
      branch_id
      branch_name
      usergroup_id
      usergroup_name
  }
 }
} 
`;

export const REGISTER = gql `
mutation doRegister($userDataInput: [usersInput]!){
  doRegister(userData: $userDataInput){
    isRegister
    isUsername
  }
}
`;

export const ChECKLOGIN = gql `
query checkLogin{
  checkLogin {
    isToken
  }
} `;
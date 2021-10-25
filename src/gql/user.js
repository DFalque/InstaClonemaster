import { gql } from "@apollo/client";

const userRegisterFunction = gql`
  mutation register($input: UserInput) {
    register(input: $input) {
      name
      username
      email
      password
    }
  }
`;

const userLoginFunction = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      Token
    }
  }
`;

const GET_USER = gql`
  query getUser($id: ID, $username: String) {
    getUser(id: $id, username: $username) {
      id
      name
      username
      email
      siteWeb
      description
      avatar
    }
  }
`;

const UPDATE_AVATAR = gql`
  mutation updateAvatar($file: Upload) {
    updateAvatar(file: $file) {
      status
      urlAvatar
    }
  }
`;

const DELETE_AVATAR = gql`
  mutation deleteAvatar {
    deleteAvatar
  }
`;

const SEARCH = gql`
  query search($search: String) {
    search(search: $search) {
      name
      username
      avatar
    }
  }
`;

export {
  userRegisterFunction,
  userLoginFunction,
  GET_USER,
  UPDATE_AVATAR,
  DELETE_AVATAR,
  SEARCH,
};

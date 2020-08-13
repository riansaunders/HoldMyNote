import {gql} from "@apollo/client"

export const FIND_NOTE = gql`
  query FindNote($id: String!) {
    note(id: $id) {
      id
      author
      when
      title
      isPrivate
      isAnonymous
      isList
      items {
        content
        complete
      }
    }
  }
`;


export const FIND_NOTES = gql`
  query FindNote {
    notes {
      id
      author
      when
      title
      isPrivate
      isAnonymous
      isList
      items {
        content
        complete
      }
    }
  }
`;

export const FIND_USER_NOTES = gql`
  query FindNote($userID: String!) {
    userNotes(userID: $userID) {
      id
      author
      when
      title
      isPrivate
      isAnonymous
      isList
      items {
        content
        complete
      }
    }
  }
`;

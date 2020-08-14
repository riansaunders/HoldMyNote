import { gql } from "@apollo/client";

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

export const DELETE_NOTE = gql`
  mutation DeleteNote($input: DeleteNoteInput!) {
    deleteNote(input: $input) {
      id
    }
  }
`;
export const CREATE_NOTE = gql`
  mutation CreateNote($input: NoteInput!) {
    createNote(input: $input) {
      id
    }
  }
`;
export const UPDATE_NOTE = gql`
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      id
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

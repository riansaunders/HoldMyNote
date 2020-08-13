/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NoteInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateNote
// ====================================================

export interface CreateNote_createNote {
  __typename: "Note";
  id: string;
}

export interface CreateNote {
  createNote: CreateNote_createNote;
}

export interface CreateNoteVariables {
  input: NoteInput;
}

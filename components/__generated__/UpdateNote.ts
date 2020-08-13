/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateNoteInput } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateNote
// ====================================================

export interface UpdateNote_updateNote {
  __typename: "Note";
  id: string;
}

export interface UpdateNote {
  updateNote: UpdateNote_updateNote;
}

export interface UpdateNoteVariables {
  input: UpdateNoteInput;
}

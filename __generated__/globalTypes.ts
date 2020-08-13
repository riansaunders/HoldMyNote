/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface NoteInput {
  title: string;
  isPrivate?: boolean | null;
  isAnonymous?: boolean | null;
  isList?: boolean | null;
  itemsInput: NoteItemInput[];
}

export interface NoteItemInput {
  complete?: boolean | null;
  content: string;
}

export interface UpdateNoteInput {
  id: string;
  title: string;
  isPrivate?: boolean | null;
  isAnonymous?: boolean | null;
  isList?: boolean | null;
  itemsInput: NoteItemInput[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================

export interface INoteItem {
  id: number;
  content: string;
  complete?: boolean;
}

export interface INote {
  id: string;
  author?: string,
  when?: string,
  title?: string;
  isPrivate: boolean;
  isAnonymous: boolean;
  isListView: boolean;
  items: INoteItem[];
}

export type Bookmark = {
  id: string,
  name: string,
  url: string,
  iconUrl: string,
  order: number,
};

export type Group = {
  id: string,
  name: string,
  column: number,
  bookmarkList: Bookmark[],
};

export type AppData = {
  groups: Group[],
};

export type ButtonClickHandler = () => void;

export type SaveBookmarkHandler = (bookmark: Bookmark) => void;

export type SaveGroupHandler = (group: Group) => void;

export type Option = {
  value: string | number,
  label: string,
};

export type Options = Option[];

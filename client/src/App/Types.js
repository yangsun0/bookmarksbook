export type Bookmark = {
  id: number,
  name: string,
  url: string,
  iconUrl: string,
};

export type Group = {
  id: number,
  name: string,
  column: number,
  bookmarkList?: Bookmark[],
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

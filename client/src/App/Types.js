export type Bookmark = {
  id: number,
  name: string,
  url: string,
  iconUrl: string,
};

export type Group = {
  id: number,
  name: string,
  column: 1 | 2,
  bookmarkList: Bookmark[],
};

export type AppData = {
  groups: Group[],
};

export type ButtonClickHandler = () => void;

import type { AppData } from "./Types";

export function getSampleData(): AppData {
  const data: AppData = {
    groups: [
      {
        id: 1,
        name: "Favorite",
        column: 1,
        bookmarkList: [
          {
            id: 1,
            name: "Google",
            url: "https://www.google.com",
            iconUrl: "https://www.google.com/favicon.ico",
          },
          {
            id: 2,
            name: "Google",
            url: "https://www.google.com",
            iconUrl: "https://www.google.com/favicon.ico",
          },
        ],
      },
      {
        id: 2,
        name: "Favorite",
        column: 2,
        bookmarkList: [
          {
            id: 1,
            name: "Google",
            url: "https://www.google.com",
            iconUrl: "https://www.google.com/favicon.ico",
          },
          {
            id: 2,
            name: "Google",
            url: "https://www.google.com",
            iconUrl: "https://www.google.com/favicon.ico",
          },
        ],
      },
    ],
  };
  return data;
}

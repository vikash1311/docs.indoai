export const theme = {
  colors: {
    navy: "#1b2a4a",
    blue: "#2653d6",
    blueLight: "#eef2fd",
    green: "#2f9e6e",
    text: "#23262f",
    textMuted: "#5b6270",
    border: "#e4e7ee",
    bg: "#ffffff",
    appSidebar: "#12213f",
    appSidebarActive: "#2653d6",
  },
} as const;

export type AppTheme = typeof theme;

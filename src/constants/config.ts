const APP_CONFIG = {
  baseUrl: import.meta.env.VITE_APP_BASE_URL
}

export enum WatchMode {
  pagination,
  scroll
}

export type WatchModeType = WatchMode.pagination | WatchMode.scroll

export default APP_CONFIG

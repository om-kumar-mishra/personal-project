declare global {
  interface Window {
    env: any;
  }
}

// change with your own variables
type EnvType = {
  VITE_REACT_APP_HDFC_BASE_URL: string;
  VITE_REACT_APP_BASE_URL: string;
  VITE_REACT_APP_GET_VERSION_TOKEN: string;
  VITE_REACT_IDLE_TIMEOUT_MS: string;
  VITE_REACT_PROMPT_TIME_BEFORE_IDLE_MS: string;
  VITE_REACT_GOOGLE_MAPS_API_KEY: string;
};
export const env: EnvType = { ...import.meta.env, ...window.env };

const localApiUrl = "http://localhost:4050";
const productionApiUrl = "https://movie-app-production-a69f.up.railway.app";

export const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? productionApiUrl : localApiUrl);
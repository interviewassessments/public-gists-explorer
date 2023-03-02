import { fetchAPIResponse } from "./apiRequest";

export const fetchPublicGistsAPI = (gisturl: string, init: RequestInit) => fetchAPIResponse(gisturl, init);
import { fetchAPIResponse } from "./apiRequest";

export const fetchForkedUsersAPI = (forkedUserUrl: string, init: RequestInit) => fetchAPIResponse(forkedUserUrl, init);
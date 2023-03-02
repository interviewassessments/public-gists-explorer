export interface error {
  message: string;
}

export interface OwnerInfo {
  login: string;
  id: bigint;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface FileData {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: bigint;
}

export interface FilesInfo {
  [key: string]: FileData;
}

export interface GistsData {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: FilesInfo[];
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  comments: number;
  user: string | null;
  comments_url: string;
  owner: OwnerInfo;
  truncated: boolean;
}

export interface PublicGistsState {
  loading: boolean;
  gists: GistsData[];
  error: error;
  isEndReached: boolean,
  forkedUsers: GistsData[] | undefined;
}

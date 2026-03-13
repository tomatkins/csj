export type Profile = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  x_handle?: string | null;
  facebook_url?: string | null;
  youtube_url?: string | null;
  created_at?: string;
};

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

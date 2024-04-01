export interface User {
  id: string;
  token: string;
  avatar?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  followers: number;
  following: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  private: boolean;
  pins: Pin[] | null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface Pin {
  id: string;
  user: User;
  image: string;
  title?: string;
  description?: string;
  link?: string;
  tags?: string[];
  commentable?: boolean;
  board_id?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}


export interface User {
  id: string;
  image?: string | null;
  name: string;
  username: string;
  bio?: string | null;
  email: string;
  emailVerified: Date;
  password: string;
  role: 'user' | 'admin';
}

export interface Post {
  id: string;
  createdAt: Date;
  text?: string | null;
  userId: string;
  photos: Photo[];
  user: User;
  likes: object[];
  parentPostId?:  String | null;
  parentPost?: Post | null;
  replies: Post[];
  notification: object[];
  Comment: object[];
}

export interface Photo {
  id: string;    
  photo: string;
  description?: string | null;
  userId?: string | null;  
  albumId?: string | null;   
  createdAt: Date; 
  updatedAt: Date;  
  Comment: object[];
  PhotoLike: object[];
  album?: object | null;
  user?: User | null;
  Post?: Post | null;    
  postId?: string | null
}
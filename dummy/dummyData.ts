import { Post, User } from "@/db_types";

export const dummyUser: User[] = [
  {
    id: '1',
    name: 'otosakaell',
    username: 'else',
    email: 'fachrylord0@gmail.com',
    emailVerified: new Date(),
    password: 'password',
    role: 'user',
    image: 'https://i.pinimg.com/564x/46/8f/f7/468ff75d1880f3469826abc0f42dd786.jpg',
    bio: 'wnna be ur vacuum cleaner'
  },
  {
    id: '2',
    name: 'yudiyahrian',
    username: 'mikuchan006',
    email: 'blazinspeed@gmail.com',
    emailVerified: new Date(),
    password: 'password',
    role: 'user',
    image: 'https://i.pinimg.com/736x/f3/bc/96/f3bc968c357b468c77096448f96a87db.jpg',
    bio: '1-7-21'
  },
  {
    id: '3',
    name: 'vrlstevnn',
    username: 'Varell',
    email: 'steven@gmail.com',
    emailVerified: new Date(),
    password: 'password',
    role: 'user',
    image: 'https://i.pinimg.com/564x/0c/71/55/0c7155a2455c8637e34404c967904ee8.jpg',
    bio: ''
  },
]

export const dummyPost: Post[] = [
  {
    id: '1',
    createdAt: new Date(),
    userId: '1',
    user: dummyUser[0],
    text: 'Overthinking consumes you alive',
    photos: [
      {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        photo: 'https://i.pinimg.com/564x/fb/50/fa/fb50fa882709bf169f4aa9c096d8358c.jpg',
        Comment: [],
        PhotoLike: [],
      },
      {
        id: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
        photo: 'https://i.pinimg.com/564x/25/98/3f/25983f59220ef30bfc64e8582d977473.jpg',
        Comment: [],
        PhotoLike: [],
      },
    ],
    likes: [],
    Comment: [
      {
        id: '1',
        createdAt: new Date(),
        userId: '2',
        user: dummyUser[1],
        text: 'kasihan alive dikonsumsi',
      },
      {
        id: '2',
        createdAt: new Date(),
        userId: '3',
        user: dummyUser[2],
        text: 'aishh shiball',
      },
    ],
    parentPost: null,
    notification: [],
    replies: [],
  },
  {
    id: '2',
    createdAt: new Date(),
    userId: '1',
    user: dummyUser[2],
    text: '',
    photos: [
      {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        photo: 'https://i.pinimg.com/736x/f8/3a/1c/f83a1cdc3e1b5588f6e47f4effd5359c.jpg',
        Comment: [],
        PhotoLike: [],
      },
      {
        id: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
        photo: 'https://i.pinimg.com/564x/eb/af/7a/ebaf7a2b035887b7ee40dc59d3dfbd54.jpg',
        Comment: [],
        PhotoLike: [],
      },
      {
        id: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
        photo: 'https://i.pinimg.com/564x/8d/61/7b/8d617b3fc63e055240b5ddcd07a0bd84.jpg',
        Comment: [],
        PhotoLike: [],
      },
    ],
    likes: [],
    Comment: [],
    parentPost: null,
    notification: [],
    replies: [],
  },
  {
    id: '3',
    createdAt: new Date(),
    userId: '1',
    user: dummyUser[0],
    text: 'hukum berpacaran pada bulan puasa?',
    photos: [],
    likes: [],
    Comment: [
      {
        id: '2',
        createdAt: new Date(),
        userId: '3',
        user: dummyUser[2],
        text: 'break dulu gasih ri',
      },
    ],
    parentPost: null,
    notification: [],
    replies: [],
  },
  {
    id: '4',
    createdAt: new Date(),
    userId: '1',
    user: dummyUser[1],
    text: 'No more FF (Frieren Friday) 💔💔',
    photos: [
      {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        photo: 'https://i.pinimg.com/736x/0e/9b/96/0e9b960fe8d11d45de106f0dd9cc0edb.jpg',
        Comment: [],
        PhotoLike: [],
      },
    ],
    likes: [],
    Comment: [],
    parentPost: null,
    notification: [],
    replies: [],
  },
]
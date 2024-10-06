interface Post {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  previewImage?: string;
  published: boolean;
  publishedAt?: Date;
  author?: User;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: Comment[];
  bookmarks?: Bookmark[];
  likes?: Like[];
  topics?: Topic[];
  categories?: Category[];
}

// Assuming you have the following interfaces defined for related models
interface User {
  id: string;
  email: string;
  image?: string;
  name?: string;
  // Add other fields as necessary
}

interface Topic extends Category {}

interface Category {
  id: string;
  name: string;
  // Add other fields as necessary
}

interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  // Add other fields as necessary
}

interface Bookmark {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
  // Add other fields as necessary
}

interface Like {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
  // Add other fields as necessary
}

interface CategoryToPost {
  postId: string;
  categoryId: string;
  // Add other fields as necessary
}

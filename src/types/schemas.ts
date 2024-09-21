interface Post {
  id: string;
  title: string;
  content?: string;
  published: boolean;
  author: User;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  bookmarks: Bookmark[];
  likes: Like[];
  categories: CategoryToPost[];
}

// Assuming you have the following interfaces defined for related models
interface User {
  id: string;
  email: string;
  name?: string;
  // Add other fields as necessary
}

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

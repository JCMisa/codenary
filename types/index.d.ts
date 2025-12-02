declare interface ActionState<T> {
  data?: T;
  error?: string;
}

declare interface UserType {
  id: number;
  userId: string;
  name: string;
  email: string;
  image?: string | null;
  points: number;
  subscription?: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

declare interface CourseType {
  id: number;
  courseId: string;
  createdBy: string;
  title: string;
  desc?: string | null;
  bannerImage?: string | null;
  level: string;
  tags: string | null;
  createdAt: Date;
  updatedAt: Date;
}

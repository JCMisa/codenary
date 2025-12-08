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
  enrolledCourses?: [{ courseId: string }] | null;
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

declare interface CourseChapterType {
  id: number;
  courseChapterId: string;
  courseId: string;
  name: string;
  desc?: string | null;
  exercises: [
    {
      name: string;
      slug: string;
      xp: number;
      difficulty: string;
    }
  ];
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

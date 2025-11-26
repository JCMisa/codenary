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

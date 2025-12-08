import z from "zod";

// 1. Define Sub-Schemas for modularity
const exerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required"),
  slug: z.string().optional(), // You might generate this backend-side or dynamically
  xp: z.number().min(0, "XP must be a positive number"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
});

const chapterSchema = z.object({
  name: z.string().min(1, "Chapter name is required"),
  desc: z.string().optional(),
  // Matching the 'exercises: json()' from Drizzle and your Interface
  exercises: z.array(exerciseSchema).optional(),
});

// 2. Main Form Schema
export const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  desc: z.string().optional(),
  bannerImage: z.url("Must be a valid URL").optional().or(z.literal("")),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  tags: z.string().optional(), // Storing as comma separated string or single tag
  chapters: z.array(chapterSchema), // Nested Array for Chapters
});

export type FormValues = z.infer<typeof formSchema>;

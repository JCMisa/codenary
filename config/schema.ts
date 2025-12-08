import {
  index,
  integer,
  json,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: varchar("userId", { length: 255 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    image: text("image"),
    points: integer().default(0),
    subscription: varchar("subscription"),
    role: varchar("role").default("user").notNull(),
    enrolledCourses: json(),
    createdAt: timestamp("createdAt")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updatedAt")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("usersTable_userId_idx").on(table.userId),
    index("usersTable_email_idx").on(table.email),
  ]
);

export const coursesTable = pgTable(
  "courses",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId: varchar("courseId").notNull().unique(),
    createdBy: varchar("createdBy")
      .notNull()
      .references(() => usersTable.email, { onDelete: "cascade" }),
    title: varchar({ length: 255 }).notNull(),
    desc: varchar({ length: 255 }),
    bannerImage: text("bannerImage"),
    level: varchar("level").default("Beginner").notNull(),
    tags: varchar("tags"),
    createdAt: timestamp("createdAt")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updatedAt")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("coursesTable_courseId_idx").on(table.courseId),
    index("coursesTable_createdBy_idx").on(table.createdBy),
  ]
);

export const courseChaptersTable = pgTable(
  "courseChapters",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    courseChapterId: varchar("courseChapterId").notNull().unique(),
    courseId: varchar("courseId")
      .notNull()
      .references(() => coursesTable.courseId, { onDelete: "cascade" }),
    name: varchar({ length: 255 }).notNull(),
    desc: varchar({ length: 255 }),
    exercises: json(),
    position: integer("position").notNull(),
    createdAt: timestamp("createdAt")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updatedAt")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("courseChaptersTable_courseCapterId_idx").on(
      table.courseChapterId
    ),
  ]
);

import Header from "@/app/_components/Header";
import Image from "next/image";
import CourseList from "./_components/CourseList";

const Courses = () => {
  return (
    <main className="flex flex-col items-center pb-5">
      <Header headerFor="dashboard" />

      <section className="w-full">
        <div className="relative">
          <Image
            src={"/course-banner.gif"}
            alt="course-banner"
            width={1200}
            height={300}
            className="w-full h-[300px] object-cover"
          />

          <div className="absolute top-0 h-full pt-24 px-10 md:px-20 lg:px-36 bg-linear-to-r from-black/80 to-white-50/50">
            <h2 className="font-game text-6xl">Explore All Courses</h2>
            <p className="font-game text-2xl">
              Explore all courses and enroll to learn to increase your skills!
            </p>
          </div>
        </div>

        <div className="mt-8 px-10 md:px-20 lg:px-36">
          <h2 className="font-game text-4xl">All Courses</h2>
          <CourseList />
        </div>
      </section>
    </main>
  );
};

export default Courses;

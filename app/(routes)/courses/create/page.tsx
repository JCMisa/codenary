import BackButton from "@/app/_components/BackButton";
import CreateCourseForm from "../_components/CreateCourseForm";
import Image from "next/image";

const CreateCourse = () => {
  return (
    <main className="flex flex-col py-5 px-10 gap-2">
      <BackButton label="Back to Dashboard" />

      <section className="flex flex-col gap-2">
        <div className="flex gap-3 items-center">
          <Image
            src={"/machine.webp"}
            alt="welcome-banner-image"
            width={120}
            height={120}
          />
          <h2 className="font-game font-bold text-4xl tracking-widest">
            Create Your Course
          </h2>
        </div>
        <CreateCourseForm />
      </section>
    </main>
  );
};

export default CreateCourse;

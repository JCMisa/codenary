import Header from "@/app/_components/Header";
import WelcomeBanner from "./_components/WelcomeBanner";
import EnrolledCourses from "./_components/EnrolledCourses";
import ExploreMore from "./_components/ExploreMore";
import InviteFriend from "./_components/InviteFriend";
import UserStatus from "./_components/UserStatus";
import UpgradeToPro from "./_components/UpgradeToPro";

const Dashboard = () => {
  return (
    <main className="flex flex-col items-center px-10 md:px-20 lg:px-36 xl:px-48 pb-5">
      <Header headerFor="dashboard" />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-7">
        <div className="md:col-span-2">
          <WelcomeBanner />
          <EnrolledCourses />
          <ExploreMore />
          <InviteFriend />
        </div>

        <div>
          <UserStatus />
          <UpgradeToPro />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;

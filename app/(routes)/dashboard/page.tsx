import Header from "@/app/_components/Header";
import WelcomeBanner from "./_components/WelcomeBanner";

const Dashboard = () => {
  return (
    <main className="flex flex-col items-center px-10 md:px-20 lg:px-36 xl:px-48">
      <Header headerFor="dashboard" />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-7">
        <div className="md:col-span-2">
          <WelcomeBanner />
        </div>

        <div>RIGHT</div>
      </section>
    </main>
  );
};

export default Dashboard;

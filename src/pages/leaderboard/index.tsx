// Layout
import MainLayout from "../../layouts/MainLayout";

// Components
import Footer from "../../components/Footer/Footer";
import LeaderboardTable from "../../components/LeaderboardTable/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <MainLayout>
      <div className="w-full flex flex-col mt-3 p-3">
        <h1 className="text-left font-semibold text-4xl">
          Holaplex Creator Leaderboard
        </h1>
        <span className="text-left italic mt-3 text-gray-500">*Updated every 24hrs</span>
      </div>
      <LeaderboardTable />
      <Footer />
    </MainLayout>
  );
}

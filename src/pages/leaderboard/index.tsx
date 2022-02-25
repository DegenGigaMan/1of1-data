import LeaderboardTable from "../../components/LeaderboardTable/LeaderboardTable";
import MainLayout from "../../layouts/MainLayout";

export default function LeaderboardPage() {
  return (
    <MainLayout>
      <div className="w-full flex flex-col p-2">
        <h1 className="text-left font-semibold text-4xl">
          Holaplex Creator Leaderboard
        </h1>
        <span className="text-right italic">*Updated every 24hrs</span>
      </div>
      <LeaderboardTable />
    </MainLayout>
  );
}

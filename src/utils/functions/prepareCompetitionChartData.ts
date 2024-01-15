import StatsData from "../interfaces/statsData";

const prepareCompetitionChartData = (stats: StatsData) => {
  let data: ChartData[] = [];

  if (stats !== undefined) {
    data.push({
      label: "League",
      value: stats.totalMatchesInCompetition.league,
      color: "#0088FE",
    });

    data.push({
      label: "Cup",
      value: stats.totalMatchesInCompetition.cup,
      color: "#00C49F",
    });

    data.push({
      label: "Friendly",
      value: stats.totalMatchesInCompetition.friendly,
      color: "#ba34eb",
    });
  }

  return data;
};

export default prepareCompetitionChartData;

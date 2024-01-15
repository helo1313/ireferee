import StatsData from "../interfaces/statsData";

const prepareRoleChartData = (stats: StatsData) => {
  let data: ChartData[] = [];

  if (stats !== undefined) {
    data.push({
      label: "Referee",
      value: stats.totalMatches.referee,
      color: "#0088FE",
    });

    data.push({
      label: "Assistant referee",
      value: stats.totalMatches.assistantRefeere,
      color: "#00C49F",
    });
  }

  return data;
};

export default prepareRoleChartData;

import StatsData from "../interfaces/statsData";

const prepareAgeCategoryChartData = (stats: StatsData) => {
  let data: ChartData[] = [];

  if (stats !== undefined) {
    data.push({
      label: "Junior",
      value: stats.totalMatchesInAgeCategory.junior,
      color: "#0088FE",
    });

    data.push({
      label: "Senior",
      value: stats.totalMatchesInAgeCategory.senior,
      color: "#00C49F",
    });
  }

  return data;
};

export default prepareAgeCategoryChartData;

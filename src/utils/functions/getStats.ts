import MatchData from "../interfaces/matchData";
import StatsData from "../interfaces/statsData";

export const getStats: (data: MatchData[]) => StatsData = (data) => {
  let totalMatches = { refeere: 0, assistantRefeere: 0 };
  let totalMatchesInAgeCategory = { junior: 0, senior: 0 };
  let totalMatchesInCompetition = { league: 0, cup: 0, friendly: 0 };
  let totalGoals = 0;
  //let totalPenalty = 0;
  let totalYellowCards = 0;
  let totalRedCards = 0;
  let totalDistance = 0;
  let totalPerformance = 0;
  let mostGoalsInSingleMatch = 0;

  data.forEach((match) => {
    if (match.status !== "Finished") {
      return;
    }

    if (match.role === "Refeere") {
      totalMatches.refeere += 1;
    } else {
      totalMatches.assistantRefeere += 1;
    }

    if (match.ageCategory === "Junior") {
      totalMatchesInAgeCategory.junior += 1;
    } else {
      totalMatchesInAgeCategory.senior += 1;
    }

    if (match.competition === "League") {
      totalMatchesInCompetition.league += 1;
    } else if (match.competition === "Cup") {
      totalMatchesInCompetition.cup += 1;
    } else {
      totalMatchesInCompetition.friendly += 1;
    }

    const goalsInMatch = match.homeScore + match.awayScore;
    if (goalsInMatch > mostGoalsInSingleMatch) {
      mostGoalsInSingleMatch = goalsInMatch;
    }

    totalGoals += goalsInMatch;
    totalYellowCards += match.yellowCards;
    totalRedCards += match.redCards;
    totalDistance += match.distanceCovered;
    totalPerformance += match.overall;
  });

  const totalMatchesSum = totalMatches.refeere + totalMatches.assistantRefeere;

  let stats: StatsData = {
    mostGoalsInSingleMatch: mostGoalsInSingleMatch,
    totalGoals: totalGoals,
    avgGoals: totalGoals / totalMatchesSum,
    totalMatches: totalMatches,
    totalMatchesInAgeCategory: totalMatchesInAgeCategory,
    totalMatchesInCompetition: totalMatchesInCompetition,
    totalYellowCards: totalYellowCards,
    avgYellowCards: totalYellowCards / totalMatchesSum,
    totalRedCards: totalRedCards,
    avgRedCards: totalRedCards / totalMatchesSum,
    totalDistance: totalDistance,
    avgDistance: totalDistance / totalMatchesSum,
    avgPerformance: totalPerformance / totalMatchesSum,
  };

  return stats;
};

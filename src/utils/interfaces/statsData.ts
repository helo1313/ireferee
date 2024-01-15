interface StatsData {
  //mostFrequentlySeenClub: string;
  mostGoalsInSingleMatch: number;
  totalGoals: number;
  avgGoals: number;
  totalMatches: { referee: number; assistantRefeere: number };
  totalMatchesInAgeCategory: { junior: number; senior: number };
  totalMatchesInCompetition: { league: number; cup: number; friendly: number };
  //totalPenalty: number;
  //avgPenalty: number;
  totalYellowCards: number;
  avgYellowCards: number;
  totalRedCards: number;
  avgRedCards: number;
  totalDistance: number;
  avgDistance: number;
  avgPerformance: number;
}

export default StatsData;

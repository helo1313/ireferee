interface MatchData {
  homeTeam: string;
  awayTeam: string;
  date: string;
  status: string;
  role: string;
  ageCategory: string;
  competition: string;

  homeScore: number;
  awayScore: number;
  yellowCards: number;
  redCards: number;

  overall: number;
  distanceCovered: number;
  description: string;
}

export default MatchData;

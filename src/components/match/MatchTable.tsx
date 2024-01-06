import MatchData from "@/utils/interfaces/matchData";
import classes from "./matchTable.module.scss";
import MatchRow from "./MatchRow";

const DOMMY_DATA: MatchData[] = [
  {
    homeTeam: "GKS Zukowo",
    awayTeam: "Pomorzanin Gdynia",
    status: "Finished",
    role: "Referee",
    ageCategory: "Senior",
    competition: "Cup",
    homeScore: 1,
    awayScore: 2,
    yellowCards: 3,
    redCards: 1,
    overall: 8,
    distanceCovered: 5,
    description: "Very good game",
  },
  {
    homeTeam: "Stoczniowiec Gdańsk",
    awayTeam: "KP Gdynia",
    status: "Finished",
    role: "Referee",
    ageCategory: "Senior",
    competition: "Cup",
    homeScore: 3,
    awayScore: 1,
    yellowCards: 5,
    redCards: 0,
    overall: 9,
    distanceCovered: 10,
    description: "Shit team",
  },
  {
    homeTeam: "GKS Zukowo",
    awayTeam: "Pomorzanin Gdynia",
    status: "Finished",
    role: "Assistant referee",
    ageCategory: "Senior",
    competition: "Cup",
    homeScore: 1,
    awayScore: 2,
    yellowCards: 3,
    redCards: 1,
    overall: 8,
    distanceCovered: 5,
    description: "Very good game",
  },
  {
    homeTeam: "Stoczniowiec Gdańsk",
    awayTeam: "KP Gdynia",
    status: "Planned",
    role: "Referee",
    ageCategory: "Senior",
    competition: "Cup",
    homeScore: 3,
    awayScore: 1,
    yellowCards: 5,
    redCards: 0,
    overall: 4,
    distanceCovered: 10,
    description: "Shit team",
  },
];

const MatchTable: React.FC = () => {
  return (
    <div className={classes.matchRow}>
      {DOMMY_DATA.map((match) => (
        <MatchRow data={match} />
      ))}
    </div>
  );
};

export default MatchTable;

import MatchData from "@/utils/interfaces/matchData";
import classes from "./matchRow.module.scss";
import StarRatingDisplay from "../starRating/StarRatingDisplay";
import { MdEdit } from "react-icons/md";
import { FaTrash, FaEye } from "react-icons/fa";

interface Match {
  data: MatchData;
}

const MatchRow: React.FC<Match> = ({ data }) => {
  return (
    <div className={classes.matchRow}>
      <div className={classes.teamsContainer}>
        <p>{data.homeTeam}</p>
        <p>-</p>
        <p>{data.awayTeam}</p>
      </div>
      <p>{data.role}</p>
      <StarRatingDisplay value={data.overall} />
      <p>{data.status}</p>

      <div className={classes.actionContainer}>
        <button className={classes.action}>
          <FaEye />
        </button>
        <button className={classes.action}>
          <MdEdit />
        </button>
        <button className={classes.action}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default MatchRow;

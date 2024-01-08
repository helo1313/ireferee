import MatchData from "@/utils/interfaces/matchData";
import classes from "./matchRow.module.scss";
import StarRatingDisplay from "../starRating/StarRatingDisplay";
import { MdEdit } from "react-icons/md";
import { FaTrash, FaEye } from "react-icons/fa";

import { GiWhistle } from "react-icons/gi";
import { FaFlagCheckered, FaFlag } from "react-icons/fa6";

interface Match {
  data: MatchData;
}

const MatchRow: React.FC<Match> = ({ data }) => {
  return (
    <div className={classes.matchRow}>
      <p className={classes.roleIcon}>
        {data.role === "Referee" ? <GiWhistle /> : <FaFlag />}
      </p>
      <div className={classes.teamsContainer}>
        <p>{data.homeTeam}</p>
        <p className={classes.spacer}>-</p>
        <p>{data.awayTeam}</p>
      </div>

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

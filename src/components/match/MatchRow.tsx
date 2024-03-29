import MatchData from "@/utils/interfaces/matchData";
import classes from "./matchRow.module.scss";
import StarRatingDisplay from "../starRating/StarRatingDisplay";
import { MdEdit } from "react-icons/md";
import { FaTrash, FaEye } from "react-icons/fa";

import { GiWhistle } from "react-icons/gi";
import { FaFlagCheckered, FaFlag } from "react-icons/fa6";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";

import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";

interface Match {
  data: MatchData;
}

const MatchRow: React.FC<Match> = ({ data }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const deleteMatch = async () => {
    if (user) {
      await deleteDoc(doc(db, user.uid, data.id));
    }
  };

  const viewMatch = () => {
    if (user) {
      router.push(`${user.uid}/view/${data.id}`);
    }
  };

  const editMatch = () => {
    if (user) {
      router.push(`${user.uid}/edit/${data.id}`);
    }
  };

  return (
    <div className={classes.matchRow}>
      <p>{data.date}</p>
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
        <button className={classes.action} onClick={viewMatch}>
          <FaEye />
        </button>
        <button className={classes.action} onClick={editMatch}>
          <MdEdit />
        </button>
        <button className={classes.action} onClick={deleteMatch}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default MatchRow;

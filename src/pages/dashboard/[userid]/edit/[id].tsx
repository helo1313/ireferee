import OptionPicker from "@/components/ui/optionPicker/OptionPicker";

import classes from "../../../../styles/Pages/edit/matchEdit.module.scss";
import Input from "@/components/ui/input/Input";
import CardsPicker from "@/components/cardsPicker/cartsPicker";
import StarRatingPicker from "@/components/starRating/StarRatingPicker";
import Textarea from "@/components/ui/textarea/Textarea";
import { useEffect, useState } from "react";
import useInputState from "@/utils/hooks/useInputState";
import { useRouter } from "next/router";
import MatchData from "@/utils/interfaces/matchData";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function MatchEdit() {
  const [status, setStatus] = useState("Planned");
  const [role, setRole] = useState("Referee");
  const [yellowCards, setYellowCards] = useState(0);
  const [redCards, setRedCards] = useState(0);
  const [overall, setOverall] = useState(0);
  const [description, setDescription] = useState("");
  const [
    homeTeamScore,
    setHomeTeamScore,
    homeTeamScoreError,
    setHomeTeamScoreError,
  ] = useInputState();
  const [
    awayTeamScore,
    setAwayTeamScore,
    awayTeamScoreError,
    setAwayTeamScoreError,
  ] = useInputState();
  const [
    distanceCovered,
    setDistanceCovered,
    distanceCoveredError,
    setDistanceCoveredError,
  ] = useInputState();

  const router = useRouter();
  const { userid, id } = router.query;

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [data, setData] = useState<MatchData | undefined>();

  useEffect(() => {
    fetchMatchData();
  }, [userid, id]);

  const fetchMatchData = async () => {
    if (!userid || !id) {
      return;
    }

    setIsLoadingData(true);

    const docRef = doc(db, userid as string, id as string);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();

    setData(docData as MatchData);
    setIsLoadingData(false);
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    setStatus(data.status);
    setRole(data.role);
    setYellowCards(data.yellowCards);
    setRedCards(data.redCards);
    setOverall(data.overall);
    setDescription(data.description);

    setHomeTeamScore(data.homeScore.toString());
    setAwayTeamScore(data.awayScore.toString());
    setDistanceCovered(data.distanceCovered.toString());
  }, [data]);

  const onEditSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitMatch();
  };

  const submitMatch = async () => {
    const docRef = doc(db, userid as string, id as string);
    const res = await updateDoc(docRef, {
      status: status,
      role: role,

      homeScore: +homeTeamScore,
      awayScore: +awayTeamScore,
      yellowCards: yellowCards,
      redCards: redCards,

      overall: overall,
      distanceCovered: +distanceCovered,
      description: description,
    });
  };

  return (
    <form className={classes.newMatch} onSubmit={onEditSubmit}>
      <h2>Edit match</h2>
      <h4>General</h4>
      <OptionPicker
        label="Status"
        options={["Planned", "Finished"]}
        value={status}
        setValue={setStatus}
      />

      {status === "Finished" ? (
        <>
          <div className={classes.matchSummary}>
            <h4 className={classes.section}>Match summary</h4>
            <div className={classes.teams}>
              <Input
                name="Home score"
                type="number"
                label="Home score"
                labelAlign="right"
                placeholder="Enter team score"
                value={homeTeamScore}
                setValue={setHomeTeamScore}
                error={homeTeamScoreError}
              />
              <p> vs </p>
              <Input
                name="Away score"
                type="number"
                label="Away score"
                placeholder="Enter team score"
                value={awayTeamScore}
                setValue={setAwayTeamScore}
                error={awayTeamScoreError}
              />
            </div>

            {role === "Referee" && (
              <>
                <CardsPicker
                  type="yellow-card"
                  label="Yellow cards"
                  value={yellowCards}
                  setValue={setYellowCards}
                />
                <CardsPicker
                  type="red-card"
                  label="Red cards"
                  value={redCards}
                  setValue={setRedCards}
                />
              </>
            )}
          </div>
          <div className={classes.performance}>
            <h4 className={classes.section}>Performance</h4>
            <StarRatingPicker
              label="Overall"
              value={overall}
              setValue={setOverall}
            />

            <Input
              name="Distance"
              type="number"
              label="Distance covered in km"
              placeholder="Enter distance covered"
              value={distanceCovered}
              setValue={setDistanceCovered}
              error={distanceCoveredError}
            />

            <Textarea
              label="Describe your performance"
              value={description}
              setValue={setDescription}
            />
          </div>
        </>
      ) : (
        <h4 className={classes.section}>
          Match summary and performance will be avaiable when match is marked as
          finished
        </h4>
      )}

      <button type="submit" className={classes.submitButton}>
        Confirm edit
      </button>
    </form>
  );
}

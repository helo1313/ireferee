import Input from "@/components/ui/input/Input";
import classes from "../../styles/Pages/new-match.module.scss";
import { useState } from "react";
import OptionPicker from "@/components/ui/optionPicker/OptionPicker";
import CardsPicker from "@/components/cardsPicker/cartsPicker";
import Textarea from "@/components/ui/textarea/Textarea";
import useInputState from "@/utils/hooks/useInputState";
import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import MatchData from "@/utils/interfaces/matchData";
import StarRatingPicker from "@/components/starRating/StarRatingPicker";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { MATCHES_ROUTE } from "@/utils/constants/routes";

export default function NewMatch() {
  const [homeTeam, setHomeTeam, homeTeamError, setHomeTeamError] =
    useInputState();
  const [awayTeam, setAwayTeam, awayTeamError, setAwayTeamError] =
    useInputState();

  const [date, setDate, dateError, setDateError] = useInputState();

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

  const [status, setStatus] = useState("Planned");
  const [role, setRole] = useState("Referee");
  const [ageCategory, setAgeCategory] = useState("Senior");
  const [competition, setCompetition] = useState("League");

  const [yellowCards, setYellowCards] = useState(0);
  const [redCards, setRedCards] = useState(0);

  const [overall, setOverall] = useState(0);
  const [description, setDescription] = useState("");

  const [user] = useAuthState(auth);
  const router = useRouter();

  const validateMatch: () => boolean = () => {
    let matchIsValid = true;

    if (homeTeam.trim() === "") {
      matchIsValid = false;
      setHomeTeamError("Invalid home team name");
    }

    if (awayTeam.trim() === "") {
      matchIsValid = false;
      setAwayTeamError("Invalid away team name");
    }

    return matchIsValid;
  };

  const submitMatch = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendMatch({
      id: uuidv4(),
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      date: date,
      status: status,
      role: role,
      ageCategory: ageCategory,
      competition: competition,

      homeScore: +homeTeamScore,
      awayScore: +awayTeamScore,
      yellowCards: yellowCards,
      redCards: redCards,

      overall: overall,
      distanceCovered: +distanceCovered,
      description: description,
    });
  };

  const sendMatch = async (data: MatchData) => {
    try {
      if (!user) {
        throw new Error("User is not logged in.");
      }

      await setDoc(doc(db, user.uid, data.id), data);

      router.push(MATCHES_ROUTE);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={classes.newMatch} onSubmit={submitMatch}>
      <h2>Add match</h2>
      <h4>General</h4>
      <div className={classes.teams}>
        <Input
          name="Home team"
          type="text"
          label="Home team"
          labelAlign="right"
          placeholder="Enter team name"
          value={homeTeam}
          setValue={setHomeTeam}
          error={homeTeamError}
        />
        <p> vs </p>
        <Input
          name="Away team"
          type="text"
          label="Away team"
          placeholder="Enter team name"
          value={awayTeam}
          setValue={setAwayTeam}
          error={awayTeamError}
        />
      </div>
      <Input
        name="Test"
        type="date"
        label="Match date"
        placeholder="Enter match date"
        value={date}
        setValue={setDate}
        error={dateError}
      />
      <OptionPicker
        label="Status"
        options={["Planned", "Finished"]}
        value={status}
        setValue={setStatus}
      />
      <OptionPicker
        label="Role"
        options={["Referee", "Assistant referee"]}
        value={role}
        setValue={setRole}
      />
      <OptionPicker
        label="Age category"
        options={["Senior", "Junior"]}
        value={ageCategory}
        setValue={setAgeCategory}
      />
      <OptionPicker
        label="Competition"
        options={["League", "Cup", "Friendly"]}
        value={competition}
        setValue={setCompetition}
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
        Add match
      </button>
    </form>
  );
}

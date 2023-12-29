import Input from "@/components/ui/input/Input";
import classes from "../../styles/Pages/new-match.module.scss";
import { useState } from "react";
import OptionPicker from "@/components/ui/optionPicker/OptionPicker";

export default function NewMatch() {
  const [test, setTest] = useState("");

  return (
    <div className={classes.newMatch}>
      <h2>Add match</h2>

      <h4>General</h4>
      <OptionPicker
        options={[
          { id: 0, label: "Planned" },
          { id: 1, label: "Finished" },
        ]}
      />

      <div className={classes.teams}>
        <Input
          name="Home team"
          type="text"
          label="Home team"
          labelAlign="right"
          placeholder="Enter team name"
          value={test}
          setValue={setTest}
          error={test}
        />
        <p> vs </p>
        <Input
          name="Away team"
          type="text"
          label="Away team"
          placeholder="Enter team name"
          value={test}
          setValue={setTest}
          error={test}
        />
      </div>
    </div>
  );
}

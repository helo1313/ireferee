import Input from "@/components/ui/input/Input";
import classes from "../../styles/Pages/new-match.module.scss";
import { useState } from "react";
import OptionPicker from "@/components/ui/optionPicker/OptionPicker";
import StarRating from "@/components/starRating/StarRating";
import CardsPicker from "@/components/cardsPicker/cartsPicker";

export default function NewMatch() {
  const [test, setTest] = useState("");

  return (
    <div className={classes.newMatch}>
      <h2>Add match</h2>

      <h4>General</h4>

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
      <OptionPicker
        label="Status"
        options={[
          { id: 0, label: "Planned" },
          { id: 1, label: "Finished" },
        ]}
      />

      <OptionPicker
        label="Role"
        options={[
          { id: 0, label: "Referee" },
          { id: 1, label: "Assistant referee" },
        ]}
      />

      <OptionPicker
        label="Age category"
        options={[
          { id: 0, label: "Senior" },
          { id: 1, label: "Junior" },
        ]}
      />

      <OptionPicker
        label="Competition"
        options={[
          { id: 0, label: "League" },
          { id: 1, label: "Cup" },
          { id: 2, label: "Friendly" },
        ]}
      />

      <div className={classes.matchSummary}>
        <h4 className={classes.section}>Match summary</h4>

        <div className={classes.teams}>
          <Input
            name="Home score"
            type="number"
            label="Home score"
            labelAlign="right"
            placeholder="Enter team score"
            value={test}
            setValue={setTest}
            error={test}
          />
          <p> vs </p>
          <Input
            name="Away score"
            type="number"
            label="Away score"
            placeholder="Enter team score"
            value={test}
            setValue={setTest}
            error={test}
          />
        </div>

        <CardsPicker type="yellow-card" label="Yellow cards" />
        <CardsPicker type="red-card" label="Red cards" />
      </div>

      <div className={classes.performance}>
        <h4 className={classes.section}>Performance</h4>
        <StarRating label="Overall" />

        <Input
          name="Distance"
          type="number"
          label="Distance covered in km"
          placeholder="Enter distance covered"
          value={test}
          setValue={setTest}
          error={test}
        />
      </div>
    </div>
  );
}
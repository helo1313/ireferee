import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import classes from "./OptionPicker.module.scss";
import OptionPickerButton from "./OptionPickerButton";

interface OptionPickerProps extends PropsWithChildren {
  label?: string;
  options: string[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const OptionPicker: React.FC<OptionPickerProps> = (props) => {
  return (
    <div className={classes.optionPicker}>
      {props.label && <p className={classes.label}>{props.label}</p>}
      <div className={classes.optionsWrapper}>
        {props.options.map((option) => (
          <OptionPickerButton
            key={option}
            id={option}
            active={option === props.value}
            label={option}
            onPick={props.setValue}
          />
        ))}
      </div>
    </div>
  );
};

export default OptionPicker;

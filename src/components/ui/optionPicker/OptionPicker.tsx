import { PropsWithChildren, useState } from "react";
import classes from "./OptionPicker.module.scss";
import OptionPickerButton from "./OptionPickerButton";

interface OptionPickerProps extends PropsWithChildren {
  options: { id: number; label: string }[];
}

const OptionPicker: React.FC<OptionPickerProps> = (props) => {
  const [pickedIndex, setPickedIndex] = useState(0);

  return (
    <div className={classes.optionPicker}>
      {props.options.map((option) => (
        <OptionPickerButton
          key={option.id}
          id={option.id}
          active={option.id === pickedIndex}
          label={option.label}
          onPick={setPickedIndex}
        />
      ))}
    </div>
  );
};

export default OptionPicker;

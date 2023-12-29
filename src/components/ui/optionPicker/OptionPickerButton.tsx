import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import classes from "./OptionPickerButton.module.scss";

interface OptionPickerButtonProps extends PropsWithChildren {
  id: number;
  label: string;
  active: boolean;
  onPick: Dispatch<SetStateAction<number>>;
}

const OptionPickerButton: React.FC<OptionPickerButtonProps> = (props) => {
  const onOptionClick = () => {
    props.onPick(props.id);
  };

  return (
    <button
      onClick={onOptionClick}
      className={`${classes.optionButton} ${
        props.active ? classes.active : undefined
      }`}
    >
      {props.label}
    </button>
  );
};

export default OptionPickerButton;

import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import classes from "./OptionPickerButton.module.scss";

interface OptionPickerButtonProps extends PropsWithChildren {
  id: string;
  label: string;
  active: boolean;
  onPick: Dispatch<SetStateAction<string>>;
}

const OptionPickerButton: React.FC<OptionPickerButtonProps> = (props) => {
  const onOptionClick = () => {
    props.onPick(props.id);
  };

  return (
    <button
      type="button"
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

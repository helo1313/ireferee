import { Dispatch, SetStateAction } from "react";
import classes from "./textarea.module.scss";

interface TextareaProps {
  label?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <div className={classes.textarea}>
      {props.label && <p className={classes.label}>{props.label}</p>}
      <textarea
        value={props.value}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          props.setValue(event.target.value)
        }
      />
    </div>
  );
};

export default Textarea;

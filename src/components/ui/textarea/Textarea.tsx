import classes from "./textarea.module.scss";

interface TextareaProps {
  label?: string;
}

const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <div className={classes.textarea}>
      {props.label && <p className={classes.label}>{props.label}</p>}
      <textarea />
    </div>
  );
};

export default Textarea;

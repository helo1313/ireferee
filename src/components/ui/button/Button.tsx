import { PropsWithChildren } from "react";

import classes from "./button.module.scss";

interface ButtonProps extends PropsWithChildren {
  onClick: () => void;
  type?: string;
}

const getButtonType = (type: string) => {
  if (type === undefined) {
    return null;
  }

  switch (type) {
    case "primary":
      return classes.primary;
    case "secondary":
      return classes.secondary;
    case "inline":
      return classes.inline;
    default:
      return null;
  }
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={`${classes.button} ${getButtonType(props.type!)}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;

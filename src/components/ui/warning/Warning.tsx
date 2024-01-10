import { PropsWithChildren } from "react";

import { GoAlertFill } from "react-icons/go";

import classes from "./warning.module.scss";

const Warning: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.warning}>
      <GoAlertFill /> {children}
    </div>
  );
};

export default Warning;

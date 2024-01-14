import { PropsWithChildren } from "react";

import classes from "./stat.module.scss";

interface StatProps extends PropsWithChildren {
  label: string;
  value: string;
}

const Stat: React.FC<StatProps> = (props) => {
  return (
    <div className={classes.stat}>
      {props.children}
      <div className={classes.statsData}>
        <p className={classes.value}>{props.value}</p>
        <p className={classes.desc}>{props.label}</p>
      </div>
    </div>
  );
};

export default Stat;

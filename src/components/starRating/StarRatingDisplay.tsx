import { PropsWithChildren } from "react";
import { FaStar } from "react-icons/fa";

import classes from "./starRatingPicker.module.scss";

interface StarRatingProps extends PropsWithChildren {
  value: number;
}

const StarRatingDisplay: React.FC<StarRatingProps> = (props) => {
  const stars = Array(10).fill(0);

  return (
    <div className={classes.starRatingDisplay}>
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            size={18}
            className={props.value > index ? classes.starActive : undefined}
          />
        );
      })}
    </div>
  );
};

export default StarRatingDisplay;

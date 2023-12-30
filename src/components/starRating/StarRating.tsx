import { PropsWithChildren, useState } from "react";
import { FaStar } from "react-icons/fa";

import classes from "./starRating.module.scss";

interface StarRatingProps extends PropsWithChildren {
  label?: string;
}

const StarRating: React.FC<StarRatingProps> = (props) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const stars = Array(10).fill(0);

  const handleClick: (value: number) => void = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver: (value: number) => void = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave: (value: number) => void = () => {
    setHoverValue(undefined);
  };

  return (
    <div className={classes.starRating}>
      {props.label && <p className={classes.label}>{props.label}</p>}
      <div className={classes.starRatingWrapper}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              className={
                (hoverValue || currentValue) > index
                  ? classes.starActive
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;

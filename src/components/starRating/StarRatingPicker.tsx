import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { FaStar } from "react-icons/fa";

import classes from "./starRatingPicker.module.scss";

interface StarRatingProps extends PropsWithChildren {
  label?: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const StarRatingPicker: React.FC<StarRatingProps> = (props) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const stars = Array(10).fill(0);

  const handleClick: (value: number) => void = (value) => {
    props.setValue(value);
  };

  const handleMouseOver: (value: number) => void = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave: (value: number) => void = () => {
    setHoverValue(undefined);
  };

  return (
    <div className={classes.starRatingPicker}>
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
                (hoverValue || props.value) > index
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

export default StarRatingPicker;

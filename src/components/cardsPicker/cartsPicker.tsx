import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { GiCardJoker } from "react-icons/gi";

import classes from "./cartsPicker.module.scss";

interface cardsPickerProps extends PropsWithChildren {
  label?: string;
  type: "red-card" | "yellow-card";
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const CardsPicker: React.FC<cardsPickerProps> = (props) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const stars = Array(15).fill(0);

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
    <div className={classes.cardPicker}>
      {props.label && <p className={classes.label}>{props.label}</p>}
      <div className={classes.cardPickerWrapper}>
        {stars.map((_, index) => {
          return (
            <GiCardJoker
              key={index}
              size={28}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              className={
                (hoverValue || props.value) > index
                  ? props.type === "red-card"
                    ? classes.cardRedActive
                    : classes.cardYellowActive
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardsPicker;

import Image from "next/image";

import classes from "./logo.module.scss";

const Logo: React.FC = () => {
  return (
    <div className={classes.logo}>
      <Image src="/Images/ball.png" alt="ball image" width={48} height={48} />
      <div className={classes.nameContainer}>
        <p>iReferee</p>
      </div>
    </div>
  );
};

export default Logo;

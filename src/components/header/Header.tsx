import Link from "next/link";
import { useRouter } from "next/router";
import {
  ABOUT_ROUTE,
  LOGIN_ROUTE,
  MATCHES_ROUTE,
  STATS_ROUTE,
} from "@/utils/constants/routes";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

import Logo from "../logo/Logo";
import Button from "../ui/button/Button";

import classes from "./header.module.scss";

const Header: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const loggedOutHeader = (
    <ul>
      <li>
        <Button
          onClick={() => {
            router.push(LOGIN_ROUTE);
          }}
          styleType="primary"
        >
          {" "}
          Login
        </Button>
      </li>
    </ul>
  );

  const loggedInHeader = (
    <ul>
      <li>
        <Link href={ABOUT_ROUTE}>About site</Link>
      </li>
      <li>
        <Link href={STATS_ROUTE}>My stats</Link>
      </li>
      <li>
        <Link href={MATCHES_ROUTE}>My matches</Link>
      </li>
      <li>
        <Button
          onClick={() => {
            signOut(auth);
            router.push("/");
          }}
          styleType="primary"
        >
          {" "}
          Sign out
        </Button>
      </li>
    </ul>
  );

  return (
    <div className={classes.header}>
      <div className={classes.content}>
        <Logo />

        <nav className={classes.navigation}>
          {user ? loggedInHeader : loggedOutHeader}
        </nav>
      </div>
    </div>
  );
};

export default Header;

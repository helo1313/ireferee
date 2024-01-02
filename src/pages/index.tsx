import { Inter } from "next/font/google";

import { useRouter } from "next/router";
import {
  ABOUT_ROUTE,
  LOGIN_ROUTE,
  SIGN_UP_ROUTE,
} from "@/utils/constants/routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useEffect } from "react";

import Button from "@/components/ui/button/Button";

import classes from "../styles/Pages/home.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <div className={classes.home}>
      <main className={classes.mainContainer}>
        <h3>iReferee</h3>
        <h1>
          Track your career and <span>develop</span>
        </h1>
        <div className={classes.buttonContainer}>
          <Button
            onClick={() => {
              router.push(SIGN_UP_ROUTE);
            }}
            styleType="primary"
          >
            {" "}
            Sign Up
          </Button>
          <Button
            onClick={() => {
              router.push(ABOUT_ROUTE);
            }}
            styleType="secondary"
          >
            {" "}
            About site
          </Button>
        </div>
        <p>
          {" "}
          Already have account ?{" "}
          <Button
            onClick={() => {
              router.push(LOGIN_ROUTE);
            }}
            styleType="inline"
          >
            {" "}
            Login
          </Button>
        </p>
      </main>
    </div>
  );
}

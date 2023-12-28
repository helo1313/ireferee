import { useEffect, useState } from "react";
import classes from "../styles/Pages/login.module.scss";
import Input from "@/components/ui/input/Input";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/router";

export default function Login() {
  const [user] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showLoginError, setShowLoginError] = useState(false);

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  const handleLogin = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(email, password);

      if (res === undefined) {
        setEmail("");
        setPassword("");
        setShowLoginError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.login}>
      <h2>Log in to your account</h2>
      <form className={classes.form} onSubmit={handleLogin}>
        <Input
          name="email"
          type="text"
          label="Email address"
          placeholder="Enter your email here"
          value={email}
          setValue={setEmail}
          error={emailError}
        />
        <Input
          name="password"
          type="password"
          label=" Password"
          placeholder="Enter your password here"
          value={password}
          setValue={setPassword}
          error={passwordError}
        />
        {showLoginError ? (
          <p className={classes.errorLabel}>
            Login failed, incorrect user or password
          </p>
        ) : undefined}

        <button className={classes.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

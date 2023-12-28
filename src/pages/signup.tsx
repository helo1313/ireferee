import { useState } from "react";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

import Input from "@/components/ui/input/Input";

import classes from "../styles/Pages/signup.module.scss";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (password !== confirmPassword) {
        setPassword("");
        setConfirmPassword("");
        setSignUpError("Passwords must be the same");
        return;
      }

      const res = await createUserWithEmailAndPassword(email, password);

      if (res === undefined) {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSignUpError("Fail to sign up");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.signUp}>
      <h2>Create new account</h2>
      <form className={classes.form} onSubmit={handleSignUp}>
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
          label="Password"
          placeholder="Enter your password here"
          value={password}
          setValue={setPassword}
          error={passwordError}
        />

        <Input
          name="confirm password"
          type="password"
          label="Confirm password"
          placeholder="Enter your password here again"
          value={confirmPassword}
          setValue={setConfirmPassword}
          error={confirmPasswordError}
        />

        {signUpError.length !== 0 ? (
          <p className={classes.errorLabel}>{signUpError}</p>
        ) : undefined}

        <button className={classes.button} type="submit">
          Create account
        </button>
      </form>
    </div>
  );
}

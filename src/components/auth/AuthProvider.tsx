import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";

import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

import { LOGIN_ROUTE } from "@/utils/constants/routes";

const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const [user, loadingUser] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loadingUser) {
      router.push(LOGIN_ROUTE);
    }
  }, [user, loadingUser]);

  return <>{props.children}</>;
};

export default AuthProvider;

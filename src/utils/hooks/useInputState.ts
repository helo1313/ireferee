import { Dispatch, SetStateAction, useState } from "react";

const useInputState: () => [
  string,
  Dispatch<SetStateAction<string>>,
  string,
  Dispatch<SetStateAction<string>>
] = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  return [value, setValue, error, setError];
};

export default useInputState;

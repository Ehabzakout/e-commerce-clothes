import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "loading" | "available" | "notAvailable" | "failed";
const useEmailAvailability = () => {
  const [checkEmailStatus, setCheckEmailStatus] = useState<TStatus>("idle");
  const [enteredEmail, setEnteredEmail] = useState<string | null>(null);
  const checkEmailvalidity = async (email: string) => {
    setCheckEmailStatus("loading");
    setEnteredEmail(email);
    try {
      const { data } = await axios.get(
        `http://localhost:5005/users?email=${email}`,
      );

      if (data.length) {
        setCheckEmailStatus("notAvailable");
      } else {
        setCheckEmailStatus("available");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setCheckEmailStatus("failed");
    }
  };
  const resetEnteredEmail = () => {
    setEnteredEmail(null);
    setCheckEmailStatus("idle");
  };
  return {
    checkEmailStatus,
    checkEmailvalidity,
    enteredEmail,
    resetEnteredEmail,
  };
};
export default useEmailAvailability;

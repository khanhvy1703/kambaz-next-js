import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    const currentUser = await client.profile(); // returns null if 401
    dispatch(setCurrentUser(currentUser));
    setPending(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) return null;

  return children;
}

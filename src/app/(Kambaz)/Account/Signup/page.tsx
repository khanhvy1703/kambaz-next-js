"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const signup = async () => {
    const currentUser = await client.signup({
      username: user.username,
      password: user.password,
    });
    dispatch(setCurrentUser(currentUser));
    redirect("/Account/Profile");
  };

  return (
    <div
      id="wd-signup-screen"
      className="wd-signup-screen p-4"
      style={{ maxWidth: "400px" }}
    >
      <h1>Signup</h1>

      <FormControl
        id="wd-username"
        placeholder="username"
        className="wd-username mb-2"
        value={user.username}
        onChange={(e) =>
          setUser({ ...user, username: (e.target as HTMLInputElement).value })
        }
      />

      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="wd-password mb-2"
        value={user.password}
        onChange={(e) =>
          setUser({ ...user, password: (e.target as HTMLInputElement).value })
        }
      />

      <button
        id="wd-signup-btn"
        onClick={signup}
        className="wd-signup-btn btn btn-primary w-100 mb-2"
        type="button"
      >
        Signup
      </button>

      <Link id="wd-signin-link" href="/Account/Signin">
        Signin
      </Link>
    </div>
  );
}

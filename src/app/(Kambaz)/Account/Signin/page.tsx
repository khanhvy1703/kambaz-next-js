"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();

  const signin = async () => {
    const user =  await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    redirect("/Dashboard");
  };


  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h1>Sign In</h1>

      <FormControl
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="mb-2"
        placeholder="Username"
        id="wd-username"
      />

      <FormControl
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="mb-2"
        placeholder="Password"
        type="password"
        id="wd-password"
      />

      <Button onClick={signin} id="wd-signin-btn" className="w-100" variant="primary">
        Sign In
      </Button>

      <div className="mt-2 text-center">
        <Link id="wd-signup-link" href="/Kambaz/Account/Signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}
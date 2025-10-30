"use client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { Button, FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  const [profile, setProfile] = useState<any>({
    username: "VyLe",
    password: "123",
    firstName: "Vy",
    lastName: "Le",
    dob: "2000-01-01",
    email: "vy@le",
    role: "FACULTY",
  });

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  useEffect(() => {
    if (!currentUser) {
      redirect("/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser]);

  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  return (
    <div id="wd-profile-screen" className="p-3" style={{ maxWidth: "400px" }}>
      <h1>Profile</h1>

      <FormControl
        id="wd-username"
        placeholder="username"
        defaultValue={profile.username}
        className="mb-2"
        onChange={(e) =>
          setProfile({ ...profile, username: e.target.value })
        }
      />

      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        defaultValue={profile.password}
        className="mb-2"
        onChange={(e) =>
          setProfile({ ...profile, password: e.target.value })
        }
      />

      <FormControl
        id="wd-firstname"
        placeholder="First Name"
        defaultValue={profile.firstName}
        className="mb-2"
        onChange={(e) =>
          setProfile({ ...profile, firstName: e.target.value })
        }
      />

      <FormControl
        id="wd-lastname"
        placeholder="Last Name"
        defaultValue={profile.lastName}
        className="mb-2"
        onChange={(e) =>
          setProfile({ ...profile, lastName: e.target.value })
        }
      />

      <FormControl
        id="wd-dob"
        type="date"
        defaultValue={profile.dob}
        className="mb-2"
        onChange={(e) =>
          setProfile({ ...profile, dob: e.target.value })
        }
      />

      <FormControl
        id="wd-email"
        type="email"
        defaultValue={profile.email}
        className="mb-2"
        onChange={(e) =>
          setProfile({ ...profile, email: e.target.value })
        }
      />

      <FormSelect
        id="wd-role"
        defaultValue={profile.role}
        className="mb-2"
        onChange={(e) =>
          setProfile({ ...profile, role: e.target.value })
        }
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>

      <Button
        id="wd-signout-btn"
        className="btn btn-danger w-100"
        onClick={signout}
      >
        Signout
      </Button>
    </div>
  );
}

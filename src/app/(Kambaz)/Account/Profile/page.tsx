"use client";
import Link from "next/link";
import { FormControl, FormSelect } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>

      <FormControl
        id="wd-username"
        placeholder="username"
        defaultValue="VyLe"
        className="mb-2"
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        defaultValue="123"
        className="mb-2"
      />
      <FormControl
        id="wd-firstname"
        placeholder="First Name"
        defaultValue="Vy"
        className="mb-2"
      />
      <FormControl
        id="wd-lastname"
        placeholder="Last Name"
        defaultValue="Le"
        className="mb-2"
      />
      <FormControl
        id="wd-dob"
        type="date"
        defaultValue="2000-01-01"
        className="mb-2"
      />
      <FormControl
        id="wd-email"
        type="email"
        defaultValue="vy@le"
        className="mb-2"
      />
      <FormSelect id="wd-role" defaultValue="FACULTY" className="mb-2">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>

      <Link
        href="/Account/Signin"
        id="wd-signout-btn"
        className="btn btn-danger w-100"
      >
        Signout
      </Link>
    </div>
  );
}

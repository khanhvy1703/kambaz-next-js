"use client";

import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FormControl, FormSelect } from "react-bootstrap";
import * as client from "../../../Account/client";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const [editing, setEditing] = useState(false);

  // Editable fields
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedRole, setUpdatedRole] = useState("");

  const fetchUser = async () => {
    if (!uid) return;
    const u = await client.findUserById(uid);
    setUser(u);

    // Initialize editable fields
    setUpdatedName(`${u.firstName} ${u.lastName}`);
    setUpdatedEmail(u.email || "");
    setUpdatedRole(u.role || "USER");
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  const saveUser = async () => {
    // handle multiple-word names correctly
    const parts = updatedName.trim().split(" ");
    const firstName = parts.shift() || "";
    const lastName = parts.join(" ") || "";

    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email: updatedEmail,
      role: updatedRole,
    };

    await client.updateUser(updatedUser);

    setUser(updatedUser);
    setEditing(false);
    onClose(); // closes the right panel and triggers refresh in parent
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      {/* CLOSE BUTTON */}
      <button
        onClick={onClose}
        className="btn position-absolute top-0 end-0 m-2"
      >
        <IoCloseSharp className="fs-1" />
      </button>

      {/* USER ICON */}
      <div className="text-center mt-4">
        <FaUserCircle className="text-secondary fs-1" />
      </div>

      <hr />

      {/* NAME + EDIT ICON */}
      <div className="text-danger fs-4 mb-3 position-relative">
        {!editing ? (
          <>
            <FaPencil
              onClick={() => setEditing(true)}
              className="position-absolute end-0 mt-2 fs-5"
              style={{ cursor: "pointer" }}
            />
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setEditing(true)}
            >
              {user.firstName} {user.lastName}
            </div>
          </>
        ) : (
          <>
            <FaCheck
              onClick={saveUser}
              className="position-absolute end-0 mt-2 fs-5"
              style={{ cursor: "pointer" }}
            />
            <FormControl
              className="w-75"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveUser();
              }}
            />
          </>
        )}
      </div>

      {/* EDITABLE EMAIL */}
      <div className="mb-3">
        <b>Email:</b>{" "}
        {editing ? (
          <FormControl
            type="email"
            className="w-75 mt-1"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
        ) : (
          <span>{user.email}</span>
        )}
      </div>

      {/* EDITABLE ROLE */}
      <div className="mb-3">
        <b>Role:</b>{" "}
        {editing ? (
          <FormSelect
            className="w-75 mt-1"
            value={updatedRole}
            onChange={(e) => setUpdatedRole(e.target.value)}
          >
            <option value="STUDENT">STUDENT</option>
            <option value="TA">TA</option>
            <option value="FACULTY">FACULTY</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </FormSelect>
        ) : (
          <span>{user.role}</span>
        )}
      </div>

      {/* NON-EDITABLE FIELDS */}
      <div className="mb-2">
        <b>Login ID:</b> <span>{user.loginId}</span>
      </div>

      <div className="mb-2">
        <b>Section:</b> <span>{user.section}</span>
      </div>

      <div className="mb-2">
        <b>Total Activity:</b> <span>{user.totalActivity}</span>
      </div>

      <hr />

      {/* DELETE BUTTON */}
      <button
        onClick={async () => {
          await client.deleteUser(uid);
          onClose();
        }}
        className="btn btn-danger float-end"
      >
        Delete
      </button>

      {/* CANCEL BUTTON */}
      <button
        onClick={onClose}
        className="btn btn-secondary float-end me-2"
      >
        Cancel
      </button>
    </div>
  );
}

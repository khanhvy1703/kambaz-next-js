"use client";

import React from "react";
import { useParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { users, enrollments } from "../../../../Database";

export default function PeopleTable() {
  const { cid } = useParams();

  // Filter users enrolled in the current course
  const courseUsers = users.filter((usr) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === usr._id && enrollment.course === cid
    )
  );

  return (
    <div id="wd-people-table" className="p-3">
      <h4 className="mb-4">People</h4>
      <table className="table table-striped align-middle">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {courseUsers.map((user) => (
            <tr key={user._id}>
              {/* Full Name with icon */}
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-5 text-secondary" />
                <span className="fw-bold">
                  {user.firstName} {user.lastName}
                </span>
              </td>

              {/* Other fields */}
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">
                {new Date(user.lastActivity).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {courseUsers.length === 0 && (
        <p className="text-muted text-center mt-3">
          No users enrolled in this course.
        </p>
      )}
    </div>
  );
}
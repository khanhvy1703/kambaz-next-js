"use client";

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "../Details";

export default function PeopleTable({
  users = [],
  fetchUsers,
}: {
  users?: any[];
  fetchUsers: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);

  return (
    <div id="wd-people-table" className="p-3">
      {/* DETAILS POPUP */}
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers();
          }}
        />
      )}

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
          {users.map((user: any) => (
            <tr key={user._id}>
              {/* FULL NAME + ICON + CLICK TO VIEW DETAILS */}
              <td className="wd-full-name text-nowrap">
                <span
                  className="text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setShowDetails(true);
                    setShowUserId(user._id);
                  }}
                >
                  <FaUserCircle className="me-2 fs-5 text-secondary" />
                  <span className="fw-bold">
                    {user.firstName} {user.lastName}
                  </span>
                </span>
              </td>

              {/* LOGIN ID */}
              <td className="wd-login-id">{user.loginId || "--"}</td>

              {/* SECTION */}
              <td className="wd-section">{user.section || "--"}</td>

              {/* ROLE */}
              <td className="wd-role">{user.role || "STUDENT"}</td>

              {/* LAST ACTIVITY */}
              <td className="wd-last-activity">
                {user.lastActivity
                  ? new Date(user.lastActivity).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "--"}
              </td>

              {/* TOTAL ACTIVITY */}
              <td className="wd-total-activity">{user.totalActivity ?? "--"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <p className="text-muted text-center mt-3">
          No users enrolled in this course.
        </p>
      )}
    </div>
  );
}

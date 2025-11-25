"use client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import * as client from "../client";
import { useParams } from "next/navigation";
import PeopleTable from "../../Courses/[cid]/People/Table/page";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();

  const fetchUsers = async () => {
    const data = await client.findAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });

    setUsers([...users, user]);
  };

  return (
    <div>
      <h3>Users</h3>

      <button
        onClick={createUser}
        className="float-end btn btn-danger wd-add-people"
      >
        <FaPlus className="me-2" />
        Users
      </button>

      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./PeopleTable";
import * as coursesClient from "../../../client";

export default function PeopleTablePage() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!cid) return;
    const data = await coursesClient.findUsersForCourse(cid as string);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div className="p-4">
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}

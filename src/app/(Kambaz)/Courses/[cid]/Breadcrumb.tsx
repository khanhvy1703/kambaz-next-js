"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { assignments } from "../../Database";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();

  const parts = pathname.split("/").filter(Boolean);
  const section = parts.includes("Assignments") ? "Assignments" : "";
  const assignmentId = parts.pop(); // last part of the path

  const assignment = assignments.find((a) => a._id === assignmentId);

  return (
    <span style={{ color: "#d32f2f", fontWeight: 500 }}>
      {course?.name}
      {section && ` > ${section}`}
      {assignment && ` > ${assignment.title}`}
    </span>
  );
}

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

  const sectionParts = parts.slice(2);

  let breadcrumb = course?.name || "";

  if (sectionParts.length > 0) {
    const section = sectionParts[0]; 
    breadcrumb += ` > ${section}`;
    if (section === "Assignments" && sectionParts.length > 1) {
      const assignmentId = sectionParts[1];
      const assignment = assignments.find((a) => a._id === assignmentId);
      if (assignment) {
        breadcrumb += ` > ${assignment.title}`;
      }
    }
  }

  return (
    <span style={{ color: "#d32f2f", fontWeight: 500 }}>
      {breadcrumb}
    </span>
  );
}

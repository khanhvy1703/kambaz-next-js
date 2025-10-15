"use client";

import Link from "next/link";
import { ListGroup } from "react-bootstrap";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
  // 🧭 Get the current course ID from the route
  const { cid } = useParams();
  const pathname = usePathname();

  // 🧱 Define links once
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation">
      <ListGroup className="wd list-group fs-5 rounded-0">
        {links.map((label) => {
          const href =
            label === "People"
              ? `/Courses/${cid}/People/Table`
              : `/Courses/${cid}/${label}`;

          const isActive =
            pathname === href ||
            pathname.startsWith(href + "/") ||
            pathname.endsWith(`/${label}`);

          return (
            <Link
              key={label}
              href={href}
              id={`wd-course-${label.toLowerCase()}-link`}
              className={`list-group-item border-0 ${
                isActive ? "active" : "text-danger"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </ListGroup>
    </div>
  );
}

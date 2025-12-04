"use client";

import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

import Session from "../../Account/Session";   // <-- ✅ ADD THIS
import CourseNavigation from "./Navigation";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {

  return (
    <Session>
      <InnerCoursesLayout>
        {children}
      </InnerCoursesLayout>
    </Session>
  );
}

function InnerCoursesLayout({ children }: any) {
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const course = courses.find((c: any) => c._id === cid);

  const [showNav, setShowNav] = useState(true);
  const toggleNav = () => setShowNav(!showNav);

  return (
    <div id="wd-courses">
      <h2 className="d-flex align-items-center mt-2">
        <FaAlignJustify
          className="me-3 fs-4 mb-1 text-danger"
          role="button"
          onClick={toggleNav}
          style={{ cursor: "pointer" }}
        />
        <Breadcrumb course={course} />
      </h2>

      <hr />

      <div className="d-flex">
        {showNav && (
          <div
            className="me-3"
            id="wd-course-navigation"
            style={{ width: "200px" }}
          >
            <CourseNavigation />
          </div>
        )}

        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}

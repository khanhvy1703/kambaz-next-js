"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
} from "../Courses/reducer";
import {
  toggleShowAllCourses,
  enrollUser,
  unenrollUser,
} from "../Enrollment/reducer";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments, showAllCourses } = useSelector(
    (state: any) => state.enrollmentsReducer
  );

  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const userId = currentUser?._id;
  const userRole = currentUser?.role;
  const isFaculty = ["FACULTY", "ADMIN"].includes(userRole);

  // 🧮 Courses user is enrolled in
  const userCourseIds = enrollments
    .filter((e: any) => e.user === userId)
    .map((e: any) => e.course);

  // 🎛️ Courses visible depending on toggle
  const visibleCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => userCourseIds.includes(c._id));

  const handleEnroll = (courseId: string) =>
    dispatch(enrollUser({ userId, courseId }));

  const handleUnenroll = (courseId: string) =>
    dispatch(unenrollUser({ userId, courseId }));

  return (
    <div className="p-4" id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>

        {/* 🔵 Enrollments Toggle Button */}
        {!isFaculty && (
          <Button
            variant="primary"
            onClick={() => dispatch(toggleShowAllCourses())}
          >
            {showAllCourses ? "Show My Courses" : "Show All Courses"}
          </Button>
        )}
      </div>

      <hr />

      {/* 🧑‍🏫 Faculty Course Management */}
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={() => dispatch(updateCourse(course))}
            >
              Update
            </button>
          </h5>

          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            placeholder="Course Name"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            rows={3}
            placeholder="Course Description"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />

          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "My Courses"} ({visibleCourses.length})
      </h2>
      <hr />

      {/* 🧾 Courses Grid */}
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c: any) => {
            const enrolled = userCourseIds.includes(c._id);
            return (
              <Col key={c._id} style={{ width: "300px" }}>
                <Card>
                  <Link
                    href={
                      isFaculty || enrolled
                        ? `/Courses/${c._id}/Home`
                        : "/Dashboard"
                    }
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      src={c.image || "/images/reactjs.jpg"}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>
                      <CardText
                        className="overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </CardText>

                      <div className="d-flex justify-content-between align-items-center">
                        <Button variant="primary">Go</Button>

                        {/* 🧑‍🎓 Student Enroll/Unenroll */}
                        {!isFaculty && (
                          <Button
                            variant={enrolled ? "danger" : "success"}
                            onClick={(e) => {
                              e.preventDefault();
                              enrolled
                                ? handleUnenroll(c._id)
                                : handleEnroll(c._id);
                            }}
                          >
                            {enrolled ? "Unenroll" : "Enroll"}
                          </Button>
                        )}

                        {/* 🧑‍🏫 Faculty Edit/Delete */}
                        {isFaculty && (
                          <div>
                            <Button
                              variant="warning"
                              onClick={(event) => {
                                event.preventDefault();
                                setCourse(c);
                              }}
                              className="me-1"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              onClick={(event) => {
                                event.preventDefault();
                                dispatch(deleteCourse(c._id));
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

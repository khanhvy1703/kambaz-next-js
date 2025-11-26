"use client";

import { useState, useEffect } from "react";
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
  setCourses,
} from "../Courses/reducer";
import { toggleShowAllCourses } from "../Enrollment/reducer";
import * as coursesClient from "../Courses/client";
import { setEnrollments } from "../Enrollment/reducer";

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

  const userCourseIds = enrollments
    .filter((e: any) => e && e.course)
    .map((e: any) => e.course);

  const fetchCourses = async () => {
    try {
      if (!currentUser) {
        dispatch(setCourses([]));
        return;
      }

      let data;

      if (isFaculty || showAllCourses) {
        // Faculty always see all courses
        // Students: "Show All Courses" = all courses
        data = await coursesClient.fetchAllCourses();
      } else {
        // Students: "Show My Courses" = only enrolled courses from server
        data = await coursesClient.findMyCourses();
      }

      dispatch(setCourses(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?._id, showAllCourses, isFaculty]);

  useEffect(() => {
    const loadEnrollments = async () => {
      if (currentUser) {
        const courses = await coursesClient.findMyCourses();
        const normalized = courses
          .filter((c: any) => c && c._id) // ⬅ FIX: prevent null crashes
          .map((c: any) => ({
            user: currentUser._id,
            course: c._id,
          }));
        dispatch(setEnrollments(normalized));
      }
    };
    loadEnrollments();
  }, [currentUser]);

  const visibleCourses = courses;

  const handleEnroll = async (courseId: string) => {
    await coursesClient.enrollIntoCourse(currentUser._id, courseId);
    const courses = await coursesClient.findMyCourses();
    const mapped = courses.map((c: any) => ({
      user: currentUser._id,
      course: c._id,
    }));
    dispatch(setEnrollments(mapped));
    await fetchCourses();
  };

  const handleUnenroll = async (courseId: string) => {
    await coursesClient.unenrollFromCourse(currentUser._id, courseId);
    const courses = await coursesClient.findMyCourses();
    const mapped = courses.map((c: any) => ({
      user: currentUser._id,
      course: c._id,
    }));
    dispatch(setEnrollments(mapped));
    await fetchCourses();
  };

  const onAddNewCourse = async () => {
    const newCourse = await coursesClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await coursesClient.updateCourse(course);
    dispatch(
      setCourses(courses.map((c: any) => (c._id === course._id ? course : c)))
    );
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard</h1>

        {/* 🔵 Enrollments Toggle Button (students only) */}
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
              onClick={onAddNewCourse}
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
            >
              Add
            </button>
            <button
              onClick={onUpdateCourse}
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
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
        {isFaculty
          ? "All Courses"
          : showAllCourses
          ? "All Courses"
          : "My Courses"}{" "}
        ({visibleCourses.length})
      </h2>
      <hr />

      {/* 🧾 Courses Grid */}
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c: any) => {
            // In "My Courses" mode, everything visible is enrolled.
            // In "All Courses" mode, rely on client-side enrollments.
            const enrolled = isFaculty
              ? false
              : showAllCourses
              ? userCourseIds.includes(c._id)
              : true;

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
                                onDeleteCourse(c._id);
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

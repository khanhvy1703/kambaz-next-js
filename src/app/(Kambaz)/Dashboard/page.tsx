// app/(Kambaz)/Dashboard/page.tsx
import Link from "next/link";
import { Row, Col, Card, CardBody } from "react-bootstrap";
import { MdAssignment } from "react-icons/md";

export default function Dashboard() {
  const courses = [
    {
      id: "1234",
      code: "CS1234",
      title: "React JS",
      term: "202610_1 Fall 2025 Semester Full Term",
      link: "/Courses/1234/Home",
      color: "#334d35",
    },
    {
      id: "2345",
      code: "CS2345",
      title: "Next.js",
      term: "202610_1 Fall 2025 Semester Full Term",
      link: "/Courses/2345/Home",
      color: "#4a3f6d",
    },
    {
      id: "3456",
      code: "CS3456",
      title: "Node.js",
      term: "202610_1 Fall 2025 Semester Full Term",
      link: "/Courses/3456/Home",
      color: "#1f4d5c",
    },
    {
      id: "4567",
      code: "CS4567",
      title: "MongoDB",
      term: "202610_1 Fall 2025 Semester Full Term",
      link: "/Courses/4567/Home",
      color: "#5c3d31",
    },
    {
      id: "5678",
      code: "CS5678",
      title: "HTML & CSS",
      term: "202610_1 Fall 2025 Semester Full Term",
      link: "/Courses/5678/Home",
      color: "#4d392b",
    },
    {
      id: "6789",
      code: "CS6789",
      title: "JavaScript",
      term: "202610_1 Fall 2025 Semester Full Term",
      link: "/Courses/6789/Home",
      color: "#3a4d2b",
    },
    {
      id: "7890",
      code: "CS7890",
      title: "TypeScript",
      term: "202610_1 Fall 2025 Semester Full Term",
      link: "/Courses/7890/Home",
      color: "#2f3d5c",
    },
  ];

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <Row xs={1} md={4} className="g-4">
        {courses.map((course) => (
          <Col key={course.id} style={{ width: "260px" }}>
            <Card className="shadow-sm border-0 rounded-3 overflow-hidden">
              <Link
                href={course.link}
                className="text-decoration-none text-dark"
              >
                {/* Banner */}
                <div
                  style={{
                    height: "140px",
                    backgroundColor: course.color,
                  }}
                ></div>

                {/* Info */}
                <CardBody>
                  <h6
                    className="fw-bold text-truncate"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {course.code} {course.title}
                  </h6>
                  <p
                    className="text-muted mb-1 small text-truncate"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {course.code}.{course.id}.202610
                  </p>
                  <p
                    className="text-muted small"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {course.term}
                  </p>
                  
                  <div className="d-flex justify-content-start mt-2">
                    <MdAssignment size={22} color="#555" />
                  </div>
                </CardBody>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

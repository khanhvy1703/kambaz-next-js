"use client";

import {
  Button,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FaPlus, FaSearch, FaCheckCircle } from "react-icons/fa";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdAssignment } from "react-icons/md";
import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments-screen" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "250px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control placeholder="Search..." />
        </InputGroup>
        <div>
          <Button className="btn-group-custom me-2">
            <FaPlus className="me-1" /> Group
          </Button>
          <Button className="btn-assignment-custom">
            <FaPlus className="me-1" /> Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0">
        <ListGroupItem className="p-3 fs-6 bg-light fw-bold d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            <span className="d-flex align-items-center">
              <IoMdArrowDropdown className="me-1" />
              ASSIGNMENTS
            </span>
          </div>
          <span className="d-flex align-items-center">
            <span className="assignment-percent">40% of Total</span>
            <FaPlus color="#6c757d" className="ms-2" />
            <IoEllipsisVertical className="ms-2 fs-5" />
          </span>
        </ListGroupItem>

        {/* A1 */}
        <ListGroupItem className="assignment-item p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            <MdAssignment className="text-success me-2 fs-4" />
            <div>
              <Link
                href="/Courses/1234/Assignments/1"
                className="fw-bold text-dark text-decoration-none"
              >
                A1
              </Link>
              <div className="small">
                <span className="text-danger fw-bold">Multiple Modules</span> |{" "}
                <span className="fw-bold text-muted">Not available until</span>{" "}
                <span className="text-muted">May 6 at 12:00am</span> |{" "}
                <span className="fw-bold text-muted">Due</span>{" "}
                <span className="text-muted"> May 13 at 11:59pm</span> |{" "}
                <span className="text-muted">100 pts</span>
              </div>
            </div>
          </div>
          <div className="text-nowrap">
            <FaCheckCircle className="text-success me-3" />
            <IoEllipsisVertical className="fs-4" />
          </div>
        </ListGroupItem>

        {/* A2 */}
        <ListGroupItem className="assignment-item p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            <MdAssignment className="text-success me-2 fs-4" />
            <div>
              <Link
                href="/Courses/1234/Assignments/2"
                className="fw-bold text-dark text-decoration-none"
              >
                A2
              </Link>
              <div className="small">
                <span className="text-danger fw-bold">Multiple Modules</span> |{" "}
                <span className="fw-bold text-muted">Not available until</span>{" "}
                <span className="text-muted">May 13 at 12:00am</span> |{" "}
                <span className="fw-bold text-muted">Due</span>{" "}
                <span className="text-muted"> May 20 at 11:59pm</span> |{" "}
                <span className="text-muted">100 pts</span>
              </div>
            </div>
          </div>
          <div className="text-nowrap">
            <FaCheckCircle className="text-success me-3" />
            <IoEllipsisVertical className="fs-4" />
          </div>
        </ListGroupItem>

        {/* A3 */}
        <ListGroupItem className="assignment-item p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            <MdAssignment className="text-success me-2 fs-4" />
            <div>
              <Link
                href="/Courses/1234/Assignments/3"
                className="fw-bold text-dark text-decoration-none"
              >
                A3
              </Link>
              <div className="small">
                <span className="text-danger fw-bold">Multiple Modules</span> |{" "}
                <span className="fw-bold text-muted">Not available until</span>{" "}
                <span className="text-muted">May 20 at 12:00am</span> |{" "}
                <span className="fw-bold text-muted">Due</span>{" "}
                <span className="text-muted"> May 27 at 11:59pm</span> |{" "}
                <span className="text-muted">100 pts</span>
              </div>
            </div>
          </div>
          <div className="text-nowrap">
            <FaCheckCircle className="text-success me-3" />
            <IoEllipsisVertical className="fs-4" />
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

"use client";

import {
  Button,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FaPlus, FaSearch, FaCheckCircle } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdAssignment } from "react-icons/md";
import Link from "next/link";
import { useParams } from "next/navigation";
import { assignments } from "../../../Database"; // ✅ use named import now

export default function Assignments() {
  const { cid } = useParams();

  // Filter assignments for the current course
  const courseAssignments = assignments.filter((a) => a.course === cid);

  return (
    <div id="wd-assignments-screen" className="p-3">
      {/* --- Top Toolbar --- */}
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

      {/* --- Assignment Group Header --- */}
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

        {/* --- Dynamic Assignment Items --- */}
        {courseAssignments.map((a) => (
          <ListGroupItem
            key={a._id}
            className="assignment-item p-3 d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-5" />
              <MdAssignment className="text-success me-2 fs-4" />

              <div>
                {/* Assignment Title */}
                <Link
                  href={`/Courses/${cid}/Assignments/${a._id}`}
                  className="fw-bold text-dark text-decoration-none"
                >
                  {a.title}
                </Link>

                {/* Assignment Meta Info */}
                <div className="small">
                  <span className="text-danger fw-bold">Multiple Modules</span>{" "}
                  |{" "}
                  <span className="fw-bold text-muted">Not available until</span>{" "}
                  <span className="text-muted">
                    {new Date(a.availableFrom).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>{" "}
                  | <span className="fw-bold text-muted">Due</span>{" "}
                  <span className="text-muted">
                    {new Date(a.dueDate).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>{" "}
                  | <span className="text-muted">{a.points} pts</span>
                </div>
              </div>
            </div>

            {/* Icons on the right */}
            <div className="text-nowrap">
              <FaCheckCircle className="text-success me-3" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

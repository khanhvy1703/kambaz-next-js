"use client";

import {
  Button,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Modal,
} from "react-bootstrap";
import { FaPlus, FaSearch, FaCheckCircle, FaTrash } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdAssignment } from "react-icons/md";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import * as client from "../../client";
import { setAssignments, deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!cid) return;
      try {
        const data = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(data));
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      }
    };
    fetchAssignments();
  }, [cid, dispatch]);

  const courseAssignments = assignments.filter((a: any) => a.course === cid);
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  const isFaculty = ["FACULTY", "TA"].includes(currentUser?.role);

  const handleDeleteClick = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  // ✅ Delete assignment from backend + state
  const confirmDelete = async () => {
    if (selectedAssignment) {
      try {
        await client.deleteAssignment(selectedAssignment._id);
        dispatch(deleteAssignment(selectedAssignment._id));
      } catch (error) {
        console.error("Failed to delete assignment:", error);
      }
    }
    setShowModal(false);
  };

  return (
    <div id="wd-assignments-screen" className="p-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "250px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control placeholder="Search..." />
        </InputGroup>

        {isFaculty && (
          <div>
            <Button className="btn-group-custom me-2">
              <FaPlus className="me-1" /> Group
            </Button>
            <Button
              className="btn-assignment-custom"
              onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
            >
              <FaPlus className="me-1" /> Assignment
            </Button>
          </div>
        )}
      </div>

      {/* Assignment List */}
      <ListGroup className="rounded-0">
        <ListGroupItem className="p-3 fs-6 bg-light fw-bold d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            <IoMdArrowDropdown className="me-1" />
            ASSIGNMENTS
          </div>
          <span className="assignment-percent">40% of Total</span>
        </ListGroupItem>

        {courseAssignments.length === 0 ? (
          <ListGroupItem className="text-muted text-center p-3">
            No assignments yet.
          </ListGroupItem>
        ) : (
          courseAssignments.map((a: any) => (
            <ListGroupItem
              key={a._id}
              className="p-3 d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-5" />
                <MdAssignment className="text-success me-2 fs-4" />

                <div>
                  <Link
                    href={`/Courses/${cid}/Assignments/${a._id}`}
                    className="fw-bold text-dark text-decoration-none"
                  >
                    {a.title || "Untitled Assignment"}
                  </Link>

                  <div className="small">
                    <span className="text-danger fw-bold">Multiple Modules</span> |{" "}
                    <span className="fw-bold text-muted">Not available until</span>{" "}
                    <span className="text-muted">
                      {a.availableFrom
                        ? new Date(a.availableFrom).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "N/A"}
                    </span>{" "}
                    | <span className="fw-bold text-muted">Due</span>{" "}
                    <span className="text-muted">
                      {a.dueDate
                        ? new Date(a.dueDate).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "N/A"}
                    </span>{" "}
                    | <span className="text-muted">{a.points ?? 0} pts</span>
                  </div>
                </div>
              </div>

              <div className="text-nowrap d-flex align-items-center">
                <FaCheckCircle className="text-success me-3" />
                {isFaculty && (
                  <FaTrash
                    className="text-danger me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteClick(a)}
                  />
                )}
                <IoEllipsisVertical className="fs-4" />
              </div>
            </ListGroupItem>
          ))
        )}
      </ListGroup>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedAssignment?.title || "this assignment"}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

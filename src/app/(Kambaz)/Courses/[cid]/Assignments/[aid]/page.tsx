"use client";

import { Form, Button, Row, Col } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import * as client from "../../../client";
import { addAssignment, updateAssignment } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const existingAssignment = assignments.find((a: any) => a._id === aid);

  // ✅ Default structure for new assignments
  const defaultForm = {
    _id: uuidv4(),
    course: cid,
    title: "",
    description: "",
    points: 100,
    assignmentGroup: "ASSIGNMENTS",
    displayGradeAs: "Percentage",
    submissionType: "Online",
    assignTo: "Everyone",
    dueDate: new Date().toISOString().slice(0, 16),
    availableFrom: new Date().toISOString().slice(0, 16),
    availableUntil: new Date().toISOString().slice(0, 16),
  };

  // ✅ Merge defaults with existing assignment if editing
  const mergedAssignment = existingAssignment
    ? {
        ...defaultForm,
        ...existingAssignment,
        dueDate: existingAssignment.dueDate
          ? new Date(existingAssignment.dueDate).toISOString().slice(0, 16)
          : defaultForm.dueDate,
        availableFrom: existingAssignment.availableFrom
          ? new Date(existingAssignment.availableFrom)
              .toISOString()
              .slice(0, 16)
          : defaultForm.availableFrom,
        availableUntil: existingAssignment.availableUntil
          ? new Date(existingAssignment.availableUntil)
              .toISOString()
              .slice(0, 16)
          : defaultForm.availableUntil,
      }
    : defaultForm;

  const [form, setForm] = useState<any>(mergedAssignment);

  // ✅ When existing assignment changes, update form
  useEffect(() => {
    if (existingAssignment) {
      setForm(mergedAssignment);
    }
  }, [existingAssignment]);

  // ✅ Fetch assignment from server when editing
  useEffect(() => {
    const fetchAssignment = async () => {
      if (!aid) return;
      try {
        const data = await client.findAssignmentsForCourse(cid as string);
        const assignment = data.find((a: any) => a._id === aid);
        if (assignment) {
          // Merge with defaults to avoid undefined fields
          setForm({ ...defaultForm, ...assignment });
        }
      } catch (e) {
        console.error("Failed to fetch assignment:", e);
      }
    };
    fetchAssignment();
  }, [aid, cid]);

  // ✅ Handle save
  const handleSave = async () => {
    const updatedForm = {
      ...form,
      dueDate: new Date(form.dueDate).toISOString(),
      availableFrom: new Date(form.availableFrom).toISOString(),
      availableUntil: new Date(form.availableUntil).toISOString(),
    };

    try {
      if (existingAssignment) {
        const updated = await client.updateAssignment(aid as string, updatedForm);
        dispatch(updateAssignment(updated));
      } else {
        const newAssignment = await client.createAssignmentForCourse(
          cid as string,
          updatedForm
        );
        dispatch(addAssignment(newAssignment));
      }
      router.push(`/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Failed to save assignment. Check server logs for details.");
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        {/* Assignment Title */}
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={form.title || ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Form.Group>

        <Row className="justify-content-end">
          <Col sm={11}>
            {/* Points */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Points
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  value={form.points ?? 0}
                  onChange={(e) =>
                    setForm({ ...form, points: Number(e.target.value) })
                  }
                />
              </Col>
            </Form.Group>

            {/* Assignment Group */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Assignment Group
              </Form.Label>
              <Col sm={10}>
                <Form.Select
                  value={form.assignmentGroup || "ASSIGNMENTS"}
                  onChange={(e) =>
                    setForm({ ...form, assignmentGroup: e.target.value })
                  }
                >
                  <option>ASSIGNMENTS</option>
                  <option>QUIZZES</option>
                  <option>EXAMS</option>
                  <option>PROJECT</option>
                </Form.Select>
              </Col>
            </Form.Group>

            {/* Display Grade */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Display Grade as
              </Form.Label>
              <Col sm={10}>
                <Form.Select
                  value={form.displayGradeAs || "Percentage"}
                  onChange={(e) =>
                    setForm({ ...form, displayGradeAs: e.target.value })
                  }
                >
                  <option>Percentage</option>
                  <option>Points</option>
                  <option>Letter Grade</option>
                  <option>Complete/Incomplete</option>
                </Form.Select>
              </Col>
            </Form.Group>

            {/* Submission Type */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Submission Type
              </Form.Label>
              <Col sm={10}>
                <div className="mt-2 p-3 border rounded">
                  <Form.Select
                    value={form.submissionType || "Online"}
                    onChange={(e) =>
                      setForm({ ...form, submissionType: e.target.value })
                    }
                  >
                    <option>Online</option>
                    <option>On Paper</option>
                    <option>No Submission</option>
                  </Form.Select>
                </div>
              </Col>
            </Form.Group>

            {/* Assign Section */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Assign
              </Form.Label>
              <Col sm={10}>
                <div className="mt-3 p-3 border rounded">
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label className="fw-bold">Assign to</Form.Label>
                    <Form.Control
                      type="text"
                      value={form.assignTo || ""}
                      onChange={(e) =>
                        setForm({ ...form, assignTo: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group as={Col} className="mb-3">
                    <Form.Label className="fw-bold">Due</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={form.dueDate || ""}
                      onChange={(e) =>
                        setForm({ ...form, dueDate: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Row>
                    <Col sm={6}>
                      <Form.Group as={Col} className="mb-3">
                        <Form.Label className="fw-bold">
                          Available From
                        </Form.Label>
                        <Form.Control
                          type="datetime-local"
                          value={form.availableFrom || ""}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              availableFrom: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group as={Col} className="mb-3">
                        <Form.Label className="fw-bold">Until</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          value={form.availableUntil || ""}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              availableUntil: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons */}
        <div className="border-top pt-3 d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

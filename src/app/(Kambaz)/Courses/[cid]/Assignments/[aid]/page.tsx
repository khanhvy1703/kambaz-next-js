"use client";

import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue="A1" />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
          />
        </Form.Group>

        <Row className="justify-content-end">
          <Col sm={11}>
            {/* Points */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={1}>
                Points
              </Form.Label>
              <Col sm={11}>
                <Form.Control type="text" defaultValue={100} />
              </Col>
            </Form.Group>
            {/* Assignment Group */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={1}>
                Assignment Group
              </Form.Label>
              <Col sm={11}>
                <Form.Select defaultValue="ASSIGNMENTS">
                  <option>ASSIGNMENTS</option>
                  <option>QUIZZES</option>
                  <option>EXAMS</option>
                  <option>PROJECT</option>
                </Form.Select>
              </Col>
            </Form.Group>
            {/* Display Grade */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={1}>
                Display Grade as
              </Form.Label>
              <Col sm={11}>
                <Form.Select defaultValue="Percentage">
                  <option>Percentage</option>
                  <option>Points</option>
                  <option>Letter Grade</option>
                  <option>Complete/Incomplete</option>
                </Form.Select>
              </Col>
            </Form.Group>
            {/* Submission Type */}{" "}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={1}>
                Submission Type
              </Form.Label>
              <Col sm={11}>
                <div className="mt-2 p-3 border rounded">
                  <Form.Select defaultValue="Online">
                    <option>Online</option>
                    <option>On Paper</option>
                    <option>No Submission</option>
                  </Form.Select>
                  <div className="mt-3">
                    <strong>Online Entry Options</strong>
                  </div>

                  <div>
                    <Form.Check
                      className="mt-3"
                      type="checkbox"
                      label="Text Entry"
                    />
                    <Form.Check
                      className="mt-3"
                      type="checkbox"
                      label="Website URL"
                      defaultChecked
                    />
                    <Form.Check
                      className="mt-3"
                      type="checkbox"
                      label="Media Recordings"
                    />
                    <Form.Check
                      className="mt-3"
                      type="checkbox"
                      label="Student Annotation"
                    />
                    <Form.Check
                      className="mt-3"
                      type="checkbox"
                      label="File Uploads"
                    />
                  </div>
                </div>
              </Col>
            </Form.Group>
            {/* Assign To */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={1}>
                Assign
              </Form.Label>
              <Col sm={11}>
                <div className="mt-3 p-3 border rounded">
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label column sm={3} className="fw-bold">
                      Assign to
                    </Form.Label>
                    <Col sm={12}>
                      <Form.Control type="text" defaultValue="Everyone" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Col} className="mb-3">
                    <Form.Label column sm={3} className="fw-bold">
                      Due
                    </Form.Label>
                    <Col sm={12}>
                      <Form.Control
                        type="datetime-local"
                        defaultValue="2024-05-13"
                      />
                    </Col>
                  </Form.Group>

                  <Row>
                    <Col sm={6}>
                      <Form.Group as={Col} className="mb-3">
                        <Form.Label column sm={5} className="fw-bold">
                          Available From
                        </Form.Label>
                        <Col sm={12}>
                          <Form.Control
                            type="datetime-local"
                            defaultValue="2024-05-06"
                          />
                        </Col>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group as={Col} className="mb-3">
                        <Form.Label column sm={3} className="fw-bold">
                          Until
                        </Form.Label>
                        <Col sm={12}>
                          <Form.Control type="datetime-local" defaultValue=""/>
                        </Col>
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
          <Button variant="secondary" className="me-2">
            Cancel
          </Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}

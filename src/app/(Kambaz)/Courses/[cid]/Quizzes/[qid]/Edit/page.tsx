"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Tabs, Tab, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import QuestionsEditor from "./QuestionsEditor";


export default function QuizEditorPage() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER_A6;

  const [quiz, setQuiz] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");

  const loadQuiz = async () => {
    const { data } = await axios.get(`${SERVER}/api/quizzes/${qid}`, {
      withCredentials: true,
    });

    setQuiz({
      title: "",
      description: "",
      type: "Graded Quiz",
      group: "QUIZZES",
      shuffleAnswers: false,
      timeLimitEnabled: false,
      timeLimit: 20,
      multipleAttempts: false,
      showCorrectAnswers: false,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestions: false,
      dueDate: "",
      availableAt: "",
      availableUntil: "",
      ...data,
    });
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  if (!quiz) return <div className="p-4">Loading...</div>;

  const update = (field: string, value: any) => {
    setQuiz({ ...quiz, [field]: value });
  };

  const handleSave = async (publish = false) => {
    const totalPoints = quiz.questions?.reduce(
      (sum: number, q: any) => sum + (q.points || 0),
      0
    );

    const updated = {
      ...quiz,
      points: totalPoints,
      published: publish || quiz.published,
    };

    await axios.put(`${SERVER}/api/quizzes/${qid}`, updated, {
      withCredentials: true,
    });

    if (publish) router.push(`/Courses/${cid}/Quizzes`);
    else router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-2">
          <Button
            variant="secondary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSave(false)}>
            Save
          </Button>
          <Button variant="success" onClick={() => handleSave(true)}>
            Save & Publish
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onSelect={(key: any) => setActiveTab(key)}
        className="mb-3"
      >
        <Tab eventKey="details" title="Details">
          <div className="p-3 border bg-white rounded">
            {/* Title */}
            <Form.Group className="mb-3">
              <Form.Label>
                <strong>Title</strong>
              </Form.Label>
              <Form.Control
                value={quiz.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-4">
              <Form.Label>
                <strong>Description</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={quiz.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </Form.Group>

            {/* Quiz Type */}
            <Row className="mb-3">
              <Col md={4} className="text-end fw-bold">
                Quiz Type:
              </Col>
              <Col md={8}>
                <Form.Select
                  value={quiz.type}
                  onChange={(e) => update("type", e.target.value)}
                >
                  <option>Graded Quiz</option>
                  <option>Practice Quiz</option>
                  <option>Graded Survey</option>
                  <option>Ungraded Survey</option>
                </Form.Select>
              </Col>
            </Row>

            {/* Assignment Group */}
            <Row className="mb-4">
              <Col md={4} className="text-end fw-bold">
                Assignment Group:
              </Col>
              <Col md={8}>
                <Form.Select
                  value={quiz.group}
                  onChange={(e) => update("group", e.target.value)}
                >
                  <option>QUIZZES</option>
                  <option>EXAMS</option>
                  <option>ASSIGNMENTS</option>
                  <option>PROJECT</option>
                </Form.Select>
              </Col>
            </Row>

            {/* POINTS (computed, read-only) */}
            <Row className="mb-4">
              <Col md={4} className="text-end fw-bold">
                Points:
              </Col>
              <Col md={8}>
                <Form.Control
                  type="number"
                  value={quiz.questions?.reduce(
                    (sum: number, q: any) => sum + (q.points || 0),
                    0
                  )}
                  readOnly
                  disabled
                />
                <div className="text-muted small">
                  Automatically calculated from question points
                </div>
              </Col>
            </Row>

            <hr />

            {/* OPTIONS */}
            <h5 className="fw-bold mb-3">Options</h5>

            {/* Shuffle */}
            <Form.Check
              className="mb-2"
              type="checkbox"
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers}
              onChange={(e) => update("shuffleAnswers", e.target.checked)}
            />

            {/* Time Limit */}
            <Row className="align-items-center mb-3">
              <Col xs="auto">
                <Form.Check
                  type="checkbox"
                  label="Time Limit"
                  checked={quiz.timeLimitEnabled}
                  onChange={(e) => update("timeLimitEnabled", e.target.checked)}
                />
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) => update("timeLimit", Number(e.target.value))}
                />
              </Col>
              <Col>Minutes</Col>
            </Row>

            {/* Multiple Attempts */}
            <Form.Check
              className="mb-2"
              type="checkbox"
              label="Allow Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) => update("multipleAttempts", e.target.checked)}
            />

            {/* Show Correct Answers */}
            <Form.Check
              className="mb-2"
              type="checkbox"
              label="Show Correct Answers"
              checked={quiz.showCorrectAnswers}
              onChange={(e) => update("showCorrectAnswers", e.target.checked)}
            />

            {/* Access Code */}
            <Form.Group className="mb-3">
              <Form.Label>
                <strong>Access Code</strong>
              </Form.Label>
              <Form.Control
                value={quiz.accessCode || ""}
                onChange={(e) => update("accessCode", e.target.value)}
              />
            </Form.Group>

            {/* One Question at a Time */}
            <Form.Check
              className="mb-2"
              type="checkbox"
              label="One Question at a Time"
              checked={quiz.oneQuestionAtATime}
              onChange={(e) => update("oneQuestionAtATime", e.target.checked)}
            />

            {/* Webcam Required */}
            <Form.Check
              className="mb-2"
              type="checkbox"
              label="Webcam Required"
              checked={quiz.webcamRequired}
              onChange={(e) => update("webcamRequired", e.target.checked)}
            />

            {/* Lock Questions */}
            <Form.Check
              className="mb-4"
              type="checkbox"
              label="Lock Questions After Answering"
              checked={quiz.lockQuestions}
              onChange={(e) => update("lockQuestions", e.target.checked)}
            />

            <hr />

            {/* DATES */}
            <h5 className="fw-bold mb-3">Assign</h5>

            {/* Due */}
            <Row className="mb-3">
              <Col md={4} className="text-end fw-bold">
                Due
              </Col>
              <Col md={8}>
                <Form.Control
                  type="datetime-local"
                  value={quiz.dueDate?.slice(0, 16) || ""}
                  onChange={(e) => update("dueDate", e.target.value)}
                />
              </Col>
            </Row>

            {/* Available From */}
            <Row className="mb-3">
              <Col md={4} className="text-end fw-bold">
                Available From
              </Col>
              <Col md={8}>
                <Form.Control
                  type="datetime-local"
                  value={quiz.availableAt?.slice(0, 16) || ""}
                  onChange={(e) => update("availableAt", e.target.value)}
                />
              </Col>
            </Row>

            {/* Until */}
            <Row className="mb-3">
              <Col md={4} className="text-end fw-bold">
                Until
              </Col>
              <Col md={8}>
                <Form.Control
                  type="datetime-local"
                  value={quiz.availableUntil?.slice(0, 16) || ""}
                  onChange={(e) => update("availableUntil", e.target.value)}
                />
              </Col>
            </Row>
          </div>
        </Tab>

        {/* QUESTIONS TAB */}
        <Tab eventKey="questions" title="Questions">
          <div className="p-3 border bg-white rounded">
            <QuestionsEditor quiz={quiz} setQuiz={setQuiz} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

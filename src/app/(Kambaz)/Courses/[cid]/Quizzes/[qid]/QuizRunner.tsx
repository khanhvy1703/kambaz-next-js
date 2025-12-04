"use client";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function QuizRunner({ quiz, isFaculty, onSubmit }: any) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);

  const q = quiz.questions[current];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [q._id]: value });
  };

  const handleSubmit = async () => {
    if (isFaculty) return; // faculty cannot submit

    const attempt = await onSubmit(answers); // returned from page handler
    setResult(attempt);                      // contains score + answers
    setSubmitted(true);
  };

  // ===========================================================
  // R E S U L T   P A G E
  // ===========================================================
  if (submitted && result) {
    return (
      <div className="p-4 border rounded bg-white">

        <h2 className="fw-bold mb-3">{quiz.title} — Results</h2>

        <div className="alert alert-info">
          You scored <strong>{result.score}</strong> out of{" "}
          <strong>{quiz.points}</strong> points.
        </div>

        <hr />

        <h4 className="fw-bold mb-3">Your Answers</h4>

        {quiz.questions.map((qn: any, i: number) => {
          const studentAns = result.answers[qn._id];
          const correct =
            qn.type === "FILL"
              ? qn.correctAnswer.some(
                  (x: string) =>
                    x.toLowerCase().trim() === studentAns?.toLowerCase().trim()
                )
              : qn.correctAnswer[0] === studentAns;

          return (
            <div
              key={qn._id}
              className={`border rounded p-3 mb-3 ${
                correct ? "border-success bg-success-subtle" : "border-danger bg-danger-subtle"
              }`}
            >
              <div className="d-flex justify-content-between">
                <h5 className="mb-2">Question {i + 1}</h5>
                <div className="fw-bold">{qn.points} pts</div>
              </div>

              <div className="mb-2">{qn.questionDescription}</div>

              {/* student answer */}
              <div>
                <strong>Your Answer:</strong>{" "}
                <span className={correct ? "text-success" : "text-danger"}>
                  {studentAns || "(No answer)"}
                </span>
              </div>

              {/* correct answer */}
              {!correct && (
                <div className="mt-1">
                  <strong>Correct Answer:</strong>{" "}
                  <span className="text-success">
                    {qn.type === "FILL"
                      ? qn.correctAnswer.join(", ")
                      : qn.correctAnswer[0]}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        <Button
          className="mt-2"
          variant="secondary"
          onClick={() =>
            (window.location.href = `/Courses/${quiz.course}/Quizzes/${quiz._id}`)
          }
        >
          Back to Quiz Details
        </Button>
      </div>
    );
  }

  // ===========================================================
  // Q U I Z   T A K I N G   P A G E
  // ===========================================================
  return (
    <div className="p-4 border rounded bg-white">
      {/* ====================== WARNING BANNER ====================== */}
      {isFaculty && (
        <div className="alert alert-warning text-danger mb-3 py-2">
          ⚠ This is a preview of the published version of the quiz
        </div>
      )}

      {/* ====================== TITLE + START TIME ====================== */}
      <h3 className="fw-bold mb-1">{quiz.title}</h3>
      <div className="text-muted mb-4">
        Started: {new Date().toLocaleString()}
      </div>

      <h5 className="fw-bold mb-3">Quiz Instructions</h5>
      <div style={{ border: "2px solid gray", marginBottom: "10px" }}></div>

      {/* ====================== QUESTION CARD ====================== */}
      <div className="border rounded p-3 mb-3">
        <div className="d-flex justify-content-between mb-2">
          <div className="fw-bold">Question {current + 1}</div>
          <span className="text-muted small">{q.points} pts</span>
        </div>

        {/* QUESTION TEXT */}
        <div className="ms-4 mb-3">{q.questionDescription}</div>

        {/* ANSWERS */}
        <div className="ms-4">
          {q.type === "TF" &&
            ["True", "False"].map((opt) => (
              <Form.Check
                key={opt}
                type="radio"
                label={opt}
                name={q._id}
                className="mb-2"
                checked={answers[q._id] === opt}
                onChange={() => handleAnswer(opt)}
              />
            ))}

          {q.type === "MC" &&
            q.choices.map((opt: string, i: number) => (
              <Form.Check
                key={i}
                type="radio"
                label={opt}
                name={q._id}
                className="mb-2"
                checked={answers[q._id] === opt}
                onChange={() => handleAnswer(opt)}
              />
            ))}

          {q.type === "FILL" && (
            <Form.Control
              placeholder="Enter your answer..."
              value={answers[q._id] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
            />
          )}
        </div>
      </div>

      {/* ====================== NAVIGATION ====================== */}
      <div className="d-flex justify-content-end mb-3">
        {current < quiz.questions.length - 1 && (
          <Button
            variant="light"
            className="border"
            onClick={() => setCurrent((c) => c + 1)}
          >
            Next ▸
          </Button>
        )}
      </div>

      {/* ====================== CANVAS-STYLE FOOTER ====================== */}
      <div className="d-flex justify-content-between align-items-center border rounded bg-light px-3 py-2 mb-3">
        <div className="text-muted">
          Quiz saved at {new Date().toLocaleString()}
        </div>

        <Button
          variant="primary"
          disabled={isFaculty}
          onClick={handleSubmit}
        >
          Submit Quiz
        </Button>
      </div>

      {/* ====================== KEEP EDITING (FACULTY) ====================== */}
      {isFaculty && (
        <Button
          variant="light"
          className="w-100 border mb-4"
          onClick={() =>
            (window.location.href = `/Courses/${quiz.course}/Quizzes/${quiz._id}/Edit`)
          }
        >
          🖉 Keep Editing This Quiz
        </Button>
      )}

      {/* ====================== QUESTION LIST ====================== */}
      <h5 className="fw-bold mb-2">Questions</h5>

      <ul className="list-unstyled ms-2">
        {quiz.questions.map((qn: any, i: number) => {
          const isCurrent = current === i;
          const isAnswered = answers[qn._id] && answers[qn._id] !== "";

          let color = "text-secondary";
          if (isAnswered) color = "text-danger";
          if (isCurrent) color = "text-dark fw-bold text-decoration-underline";

          return (
            <li
              key={qn._id}
              onClick={() => setCurrent(i)}
              style={{ cursor: "pointer" }}
              className={`${color} mb-1`}
            >
              Question {i + 1}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

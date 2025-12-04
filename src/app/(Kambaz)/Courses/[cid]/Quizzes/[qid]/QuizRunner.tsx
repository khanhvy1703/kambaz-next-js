"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function QuizRunner({ quiz, isFaculty }: any) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

  const q = quiz.questions[current];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [q._id]: value });
  };

  const handleSubmit = async () => {
    const startedAt = quiz.startedAt || new Date();

    // SCORE CALCULATION
    let score = 0;
    quiz.questions.forEach((q: any) => {
      const userAnswer = answers[q._id];

      if (q.type === "MC" || q.type === "TF") {
        if (userAnswer === q.correctAnswer[0]) score += q.points;
      }

      if (q.type === "FILL") {
        const correct = q.correctAnswer.map((a: any) => a.toLowerCase().trim());
        if (correct.includes(userAnswer?.toLowerCase().trim()))
          score += q.points;
      }
    });

    await axios.post(
      `${SERVER}/api/quizzes/${quiz._id}/attempts`,
      {
        answers,
        startedAt,
        finishedAt: new Date(),
      },
      { withCredentials: true }
    );

    router.push(`/Courses/${quiz.course}/Quizzes/${quiz._id}`);
  };

  return (
    <div className="p-4 border rounded bg-white">
      {/* ====================== WARNING ====================== */}
      {isFaculty && (
        <div className="alert alert-warning text-danger mb-3 py-2">
          ⚠ This is a preview of the published version of the quiz
        </div>
      )}

      {/* ====================== HEADER ====================== */}
      <h3 className="fw-bold mb-1">{quiz.title}</h3>
      <div className="text-muted mb-4">
        Started: {new Date().toLocaleString()}
      </div>

      <h5 className="fw-bold mb-3">Quiz Instructions</h5>
      <div style={{ border: "2px solid gray", marginBottom: "10px" }}></div>

      {/* ====================== QUESTION CARD ====================== */}
      <div className="border rounded p-3 mb-3">
        <div className="d-flex justify-content-between mb-2">
          <div className="fw-bold">{q.title}</div>
          <span className="text-muted small">{q.points} pts</span>
        </div>

        <div className="ms-4 mb-3">{q.questionDescription}</div>

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
      <div className="d-flex justify-content-between mb-3">
        {current > 0 ? (
          <Button
            variant="light"
            className="border"
            onClick={() => setCurrent((c) => c - 1)}
          >
            ◂ Prev
          </Button>
        ) : (
          <div></div>
        )}

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

      {/* ====================== FOOTER ====================== */}
      <div className="d-flex justify-content-between align-items-center border rounded bg-light px-3 py-2 mb-3">
        <div className="text-muted">
          Quiz saved at {new Date().toLocaleString()}
        </div>

        <Button variant="primary" disabled={isFaculty} onClick={handleSubmit}>
          Submit Quiz
        </Button>
      </div>

      {/* ====================== KEEP EDITING ====================== */}
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

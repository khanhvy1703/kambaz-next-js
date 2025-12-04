"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "react-bootstrap";
import { togglePublishQuiz } from "../client";

export default function QuizDetailsPage() {
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const router = useRouter();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const [quiz, setQuiz] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);

  const SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

  const loadQuiz = async () => {
    const { data } = await axios.get(`${SERVER}/api/quizzes/${qid}`, {
      withCredentials: true,
    });
    setQuiz(data);
  };

  const loadAttempts = async () => {
    const { data } = await axios.get(`${SERVER}/api/quizzes/${qid}/attempts`, {
      withCredentials: true,
    });
    setAttempts(data);
  };

  useEffect(() => {
    loadQuiz();
    loadAttempts();
  }, []);

  if (!quiz) return <div className="p-4">Loading...</div>;

  const formatDate = (d: string) => {
    if (!d) return "—";
    return new Date(d).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const now = new Date();
  const availableAt = quiz.availableAt ? new Date(quiz.availableAt) : null;
  const availableUntil = quiz.availableUntil
    ? new Date(quiz.availableUntil)
    : null;

  const isAvailable =
    quiz.published &&
    (!availableAt || now >= availableAt) &&
    (!availableUntil || now <= availableUntil);

  const availabilityReason = () => {
    if (!quiz.published) return "This quiz is not published yet.";
    if (availableAt && now < availableAt)
      return `This quiz is not available until ${formatDate(
        quiz.availableAt
      )}.`;
    if (availableUntil && now > availableUntil)
      return "This quiz is now closed.";
    return null;
  };

  const attemptsUsed = attempts.length;
  const attemptLimit = quiz.multipleAttempts ? quiz.attemptsAllowed : 1;
  const attemptsLeft = Math.max(attemptLimit - attemptsUsed, 0);

  return (
    <div className="p-4">
      {/* TOP BUTTONS */}
      <div className="d-flex justify-content-end gap-2 mb-3">
        {isFaculty ? (
          <>
            <Button
              variant={quiz.published ? "warning" : "success"}
              className="border"
              onClick={async () => {
                await togglePublishQuiz(cid, qid);
                loadQuiz(); // refresh UI after toggle
              }}
            >
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
            <Button
              variant="light"
              className="border"
              onClick={() =>
                router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)
              }
            >
              Preview
            </Button>

            <Button
              variant="secondary"
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`)}
            >
              Edit
            </Button>
          </>
        ) : isAvailable ? (
          <Button
            variant={
              attempts.length >= quiz.attemptsAllowed ? "secondary" : "primary"
            }
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Take`)}
            disabled={attempts.length >= quiz.attemptsAllowed}
          >
            Start Quiz
          </Button>
        ) : (
          <Button variant="secondary" disabled>
            {availabilityReason()}
          </Button>
        )}
      </div>

      {/* TITLE */}
      <h2 className="fw-bold mb-4">{quiz.title}</h2>

      {/* DETAILS CARD */}
      <div className="border rounded p-4 bg-white">
        <div className="row mb-4">
          <div className="col-5 text-end fw-bold">Quiz Type</div>
          <div className="col-7">{quiz.type ?? "Graded Quiz"}</div>

          <div className="col-5 text-end fw-bold mt-2">Points</div>
          <div className="col-7 mt-2">{quiz.points ?? 0}</div>

          <div className="col-5 text-end fw-bold mt-2">Assignment Group</div>
          <div className="col-7 mt-2">{quiz.group ?? "QUIZZES"}</div>

          <div className="col-5 text-end fw-bold mt-2">Shuffle Answers</div>
          <div className="col-7 mt-2">{quiz.shuffleAnswers ? "Yes" : "No"}</div>

          <div className="col-5 text-end fw-bold mt-2">Time Limit</div>
          <div className="col-7 mt-2">{quiz.timeLimit ?? 20} Minutes</div>

          <div className="col-5 text-end fw-bold mt-2">Multiple Attempts</div>
          <div className="col-7 mt-2">
            {quiz.multipleAttempts ? "Yes" : "No"}
          </div>

          {quiz.multipleAttempts && (
            <>
              <div className="col-5 text-end fw-bold mt-2">Attempt Limit</div>
              <div className="col-7 mt-2">{quiz.attemptsAllowed}</div>
            </>
          )}

          <div className="col-5 text-end fw-bold mt-2">
            Show Correct Answers
          </div>
          <div className="col-7 mt-2">
            {quiz.showCorrectAnswers ? "Immediately" : "No"}
          </div>

          <div className="col-5 text-end fw-bold mt-2">Access Code</div>
          <div className="col-7 mt-2">{quiz.accessCode || "None"}</div>

          <div className="col-5 text-end fw-bold mt-2">
            One Question at a Time
          </div>
          <div className="col-7 mt-2">
            {quiz.oneQuestionAtATime ? "Yes" : "No"}
          </div>

          <div className="col-5 text-end fw-bold mt-2">Webcam Required</div>
          <div className="col-7 mt-2">{quiz.webcamRequired ? "Yes" : "No"}</div>

          <div className="col-5 text-end fw-bold mt-2">
            Lock Questions After Answering
          </div>
          <div className="col-7 mt-2">{quiz.lockQuestions ? "Yes" : "No"}</div>
        </div>

        <hr />

        <div className="row mt-3 fw-bold text-center">
          <div className="col">Due</div>
          <div className="col">For</div>
          <div className="col">Available from</div>
          <div className="col">Until</div>
        </div>

        <div className="row text-center mt-1">
          <div className="col">{formatDate(quiz.dueDate)}</div>
          <div className="col">Everyone</div>
          <div className="col">{formatDate(quiz.availableAt)}</div>
          <div className="col">{formatDate(quiz.availableUntil)}</div>
        </div>
      </div>
      {/* ===================== ATTEMPT HISTORY (MINIMAL) ===================== */}
      {isStudent && (
        <div className="mt-4 p-3 border rounded bg-white">
          <h4 className="fw-bold mb-3">Attempt History</h4>

          {/* Show Attempts Left */}
          <div className="mb-2 text-muted">
            Attempts Left:{" "}
            <strong>
              {quiz.multipleAttempts ? attemptsLeft : attemptsLeft}
            </strong>
          </div>

          {attempts.length === 0 ? (
            <div className="text-muted">No attempts yet.</div>
          ) : (
            <table className="table mb-0">
              <thead>
                <tr>
                  <th style={{ width: "20%" }}></th>
                  <th>Attempt</th>
                  <th>Score</th>
                </tr>
              </thead>

              <tbody>
                {attempts
                  .sort((a, b) => b.attemptNumber - a.attemptNumber)
                  .map((att, idx) => (
                    <tr key={att._id}>
                      <td className="fw-bold text-danger">
                        {idx === 0 ? "LATEST" : ""}
                      </td>

                      <td className="text-danger">
                        Attempt {att.attemptNumber}
                      </td>

                      <td>
                        {att.score} out of {quiz.points}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

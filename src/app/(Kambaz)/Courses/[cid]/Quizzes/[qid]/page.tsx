"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function QuizDetailsPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);

  const SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER_A6;

  const loadQuiz = async () => {
    const { data } = await axios.get(`${SERVER}/api/quizzes/${qid}`, {
      withCredentials: true,
    });
    setQuiz(data);
  };

  useEffect(() => {
    loadQuiz();
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

  return (
    <div className="p-4">
      {/* TOP BUTTONS */}
      <div className="d-flex justify-content-end gap-2 mb-3">
        {isFaculty ? (
          <>
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
        ) : (
          <Button
            variant="primary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Take`)}
          >
            Start Quiz
          </Button>
        )}
      </div>

      {/* TITLE */}
      <h2 className="fw-bold mb-4">{quiz.title}</h2>

      {/* OUTER BORDER BOX */}
      <div className="border rounded p-4 bg-white">
        {/* TWO COLUMN PROPERTY TABLE */}
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
    </div>
  );
}

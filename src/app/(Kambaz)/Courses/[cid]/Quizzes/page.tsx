"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import {
  findQuizzesForCourse,
  createQuiz,
  deleteQuiz,
  togglePublishQuiz,
} from "./client";

import {
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";

import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export default function QuizzesPage() {
  const { cid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const loadQuizzes = async () => {
    const data = await findQuizzesForCourse(cid as string);

    let visible = data;

    if (isStudent) {
      visible = data.filter((q: any) => q.published);
    }

    visible = visible.sort((a: any, b: any) => {
      const aTime = a?.availableAt ? new Date(a.availableAt).getTime() : 0;
      const bTime = b?.availableAt ? new Date(b.availableAt).getTime() : 0;
      return aTime - bTime;
    });

    const loadAttemptsForQuiz = async (quizId: string) => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api/quizzes/${quizId}/attempts`,
        { withCredentials: true }
      );
      return data;
    };

    if (isStudent) {
      const quizzesWithAttempts = await Promise.all(
        visible.map(async (q: any) => {
          const attempts = await loadAttemptsForQuiz(q._id);
          const bestScore =
            attempts.length > 0
              ? Math.max(...attempts.map((a: any) => a.score))
              : null;

          return { ...q, attempts, bestScore };
        })
      );

      setQuizzes(quizzesWithAttempts);
      setFilteredQuizzes(quizzesWithAttempts);
    } else {
      setQuizzes(visible);
      setFilteredQuizzes(visible);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    setFilteredQuizzes(
      quizzes.filter((q) => q.title.toLowerCase().includes(term))
    );
  }, [search, quizzes]);

  const handleAddQuiz = async () => {
    const quiz = await createQuiz(cid as string);
    router.push(`/Courses/${cid}/Quizzes/${quiz._id}/Edit`);
  };

  const handleDeleteQuiz = async () => {
    if (openMenu) {
      await deleteQuiz(cid as string, openMenu);
      setOpenMenu(null);
      loadQuizzes();
    }
  };

  const handlePublish = async (qid: string) => {
    await togglePublishQuiz(cid as string, qid);
    setOpenMenu(null);
    loadQuizzes();
  };

  const availabilityStatus = (quiz: any) => {
    const now = new Date();

    const availableAt = quiz.availableAt ? new Date(quiz.availableAt) : null;
    const availableUntil = quiz.availableUntil
      ? new Date(quiz.availableUntil)
      : null;

    if (availableAt && now < availableAt) {
      return {
        text: `Not available until ${availableAt.toLocaleString()}`,
        status: "notyet",
      };
    }

    if (availableUntil && now > availableUntil) {
      return { text: "Closed", status: "closed" };
    }

    return { text: "Available", status: "available" };
  };

  return (
    <div id="wd-quizzes-screen" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup style={{ width: "250px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        {isFaculty && (
          <Button className="btn-assignment-custom" onClick={handleAddQuiz}>
            + Quiz
          </Button>
        )}
      </div>

      <ListGroup className="rounded-0">
        <ListGroupItem className="p-3 fs-6 bg-light fw-bold d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            QUIZZES
          </div>
          <span className="text-muted">{filteredQuizzes.length} items</span>
        </ListGroupItem>

        {filteredQuizzes.length === 0 && (
          <ListGroupItem className="text-center text-muted p-3">
            No quizzes yet. Click + Quiz to add one.
          </ListGroupItem>
        )}

        {filteredQuizzes.map((quiz) => (
          <ListGroupItem
            key={quiz._id}
            className="p-3 d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-5 mt-1" />

              <div>
                {/* TITLE */}
                <div
                  className="fw-bold text-dark"
                  role="button"
                  onClick={() =>
                    router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)
                  }
                >
                  {quiz.title}
                </div>

                {/* Availability */}
                {(() => {
                  const status = availabilityStatus(quiz);

                  return (
                    <div className="small mt-1 d-flex gap-2">
                      <AiOutlineClockCircle size={14} className="mt-1" />

                      <span
                        className={
                          status.status === "available"
                            ? "fw-bold text-danger" // red & bold
                            : "fw-bold" // bold only
                        }
                      >
                        {status.text}
                      </span>
                    </div>
                  );
                })()}

                {/* Due Date */}
                {quiz.dueDate && (
                  <div className="small text-muted mt-1 d-flex gap-2">
                    <AiOutlineCalendar size={14} className="mt-1" />
                    Due {new Date(quiz.dueDate).toLocaleDateString()}
                  </div>
                )}

                {/* Meta Info */}
                <div className="small mt-1 text-muted d-flex flex-wrap gap-2">
                  {/* Question Count */}
                  <span>{quiz.questions?.length ?? 0} Questions</span>

                  {/* Divider */}
                  <span>|</span>

                  {/* SCORE (Student) or TOTAL PTS (Faculty) */}
                  {isStudent ? (
                    <span>
                      {quiz.bestScore !== null
                        ? `${quiz.bestScore} / ${quiz.points} pts`
                        : `-- / ${quiz.points} pts`}
                    </span>
                  ) : (
                    <span>{quiz.points} pts</span>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT ACTIONS */}
            <div className="text-nowrap d-flex align-items-center">
              {/* PUBLISH ICON (faculty only) */}
              {isFaculty && (
                <span
                  className="me-3 fs-5"
                  role="button"
                  onClick={() => handlePublish(quiz._id)}
                >
                  {quiz.published ? "✅" : "🚫"}
                </span>
              )}

              {/* THREE DOT MENU */}
              {isFaculty && (
                <div className="position-relative">
                  <BsThreeDotsVertical
                    className="fs-4"
                    role="button"
                    onClick={() =>
                      setOpenMenu(openMenu === quiz._id ? null : quiz._id)
                    }
                  />

                  {openMenu === quiz._id && (
                    <div
                      className="position-absolute bg-white border shadow-sm rounded p-1"
                      style={{
                        right: 0,
                        top: "30px",
                        width: "120px",
                        zIndex: 10,
                      }}
                    >
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          router.push(
                            `/Courses/${cid}/Quizzes/${quiz._id}/Edit`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="dropdown-item text-danger"
                        onClick={handleDeleteQuiz}
                      >
                        Delete
                      </button>

                      <button
                        className="dropdown-item"
                        onClick={() => handlePublish(quiz._id)}
                      >
                        {quiz.published ? "Unpublish" : "Publish"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

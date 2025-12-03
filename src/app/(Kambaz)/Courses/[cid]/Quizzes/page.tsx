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

export default function QuizzesPage() {
  const { cid } = useParams();
  const router = useRouter();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const loadQuizzes = async () => {
    const data = await findQuizzesForCourse(cid as string);
    setQuizzes(data);
    setFilteredQuizzes(data);
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  // 🔍 Search filtering
  useEffect(() => {
    const term = search.toLowerCase();
    setFilteredQuizzes(
      quizzes.filter((q) => q.title.toLowerCase().includes(term))
    );
  }, [search, quizzes]);

  /** 🆕 UPDATED: Create quiz → go to EDITOR */
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

    if (quiz.availableAt && now < new Date(quiz.availableAt)) {
      return `Not available until ${new Date(quiz.availableAt).toLocaleString()}`;
    }

    if (quiz.availableUntil && now > new Date(quiz.availableUntil)) {
      return "Closed";
    }

    return "Available";
  };

  return (
    <div id="wd-quizzes-screen" className="p-3">
      {/* Header w/Search + Add */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Search Bar */}
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

        {/* Add Quiz */}
        {isFaculty && (
          <Button className="btn-assignment-custom" onClick={handleAddQuiz}>
            + Quiz
          </Button>
        )}
      </div>

      {/* List Header */}
      <ListGroup className="rounded-0">
        <ListGroupItem className="p-3 fs-6 bg-light fw-bold d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            QUIZZES
          </div>
          <span className="text-muted">{filteredQuizzes.length} items</span>
        </ListGroupItem>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <ListGroupItem className="text-center text-muted p-3">
            No quizzes found.
          </ListGroupItem>
        )}

        {/* Quizzes */}
        {filteredQuizzes.map((quiz) => (
          <ListGroupItem
            key={quiz._id}
            className="p-3 d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-start">
              <BsGripVertical className="me-2 fs-5 mt-1" />

              <div>
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
                <div className="small text-muted mt-1 d-flex gap-2">
                  <AiOutlineClockCircle size={14} className="mt-1" />
                  {availabilityStatus(quiz)}
                </div>

                {/* Due Date */}
                {quiz.dueDate && (
                  <div className="small text-muted mt-1 d-flex gap-2">
                    <AiOutlineCalendar size={14} className="mt-1" />
                    Due {new Date(quiz.dueDate).toLocaleDateString()}
                  </div>
                )}

                {/* Meta */}
                <div className="small mt-1 text-muted">
                  {quiz.points ?? 0} pts • {quiz.questions?.length ?? 0} Questions
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="text-nowrap d-flex align-items-center">
              {isFaculty && (
                <span
                  className="me-3 fs-5"
                  role="button"
                  onClick={() => handlePublish(quiz._id)}
                >
                  {quiz.published ? "✅" : "🚫"}
                </span>
              )}

              {/* 3-dot menu */}
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
                          router.push(`/Courses/${cid}/Quizzes/${quiz._id}/Edit`)
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

import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function QuestionsEditor({ quiz, setQuiz }: any) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempQuestion, setTempQuestion] = useState<any>(null);

  const addQuestion = () => {
    const newQ = {
      _id: crypto.randomUUID(),
      title: "New Question",
      type: "MC",
      text: "",
      choices: [],
      correctAnswer: [],
      points: 1,
    };

    setQuiz({ ...quiz, questions: [...quiz.questions, newQ] });
    setEditingIndex(quiz.questions.length);
    setTempQuestion(newQ);
  };

  // -------------------------------------------------------------
  const editQuestion = (index: number) => {
    setEditingIndex(index);
    setTempQuestion({ ...quiz.questions[index] });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setTempQuestion(null);
  };

  // -------------------------------------------------------------
  const saveQuestion = () => {
    const updated = [...quiz.questions];
    updated[editingIndex!] = tempQuestion;
    setQuiz({ ...quiz, questions: updated });
    setEditingIndex(null);
    setTempQuestion(null);
  };

  const deleteQuestion = (index: number) => {
    const updated = quiz.questions.filter((_: any, i: number) => i !== index);
    setQuiz({ ...quiz, questions: updated });
  };

  // -------------------------------------------------------------
  // AUTO-ADJUST STRUCTURE WHEN TYPE CHANGES
  // -------------------------------------------------------------
  const updateType = (type: string) => {
    let updated = { ...tempQuestion, type };

    if (type === "MC") {
      updated.choices = ["Option 1", "Option 2"];
      updated.correctAnswer = ["Option 1"];
    }

    if (type === "TF") {
      updated.choices = ["True", "False"];
      updated.correctAnswer = ["True"];
    }

    if (type === "FILL") {
      updated.choices = [];
      updated.correctAnswer = [""];
    }

    setTempQuestion(updated);
  };

  // -------------------------------------------------------------
  return (
    <div>
      <Button className="mb-3" onClick={addQuestion}>
        + New Question
      </Button>

      {quiz.questions.length === 0 && (
        <div className="text-muted">No questions yet.</div>
      )}

      {quiz.questions.map((q: any, index: number) => (
        <div key={q._id} className="border rounded p-3 mb-3">
          {editingIndex === index ? (
            <>
              {/* HEADER BAR */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-2 w-75">
                  <Form.Control
                    className="fw-bold"
                    value={tempQuestion.title}
                    onChange={(e) =>
                      setTempQuestion({ ...tempQuestion, title: e.target.value })
                    }
                  />

                  <Form.Select
                    value={tempQuestion.type}
                    onChange={(e) => updateType(e.target.value)}
                  >
                    <option value="MC">Multiple Choice</option>
                    <option value="TF">True / False</option>
                    <option value="FILL">Fill in Blank</option>
                  </Form.Select>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted">pts:</span>
                  <Form.Control
                    type="number"
                    style={{ width: "70px" }}
                    value={tempQuestion.points}
                    onChange={(e) =>
                      setTempQuestion({
                        ...tempQuestion,
                        points: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              {/* QUESTION TEXT */}
              <div className="mb-3">
                <label className="fw-bold mb-1">Question:</label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your question..."
                  value={tempQuestion.text || ""}
                  onChange={(e) =>
                    setTempQuestion({ ...tempQuestion, text: e.target.value })
                  }
                />
              </div>

              {/* ======================================================
                        MULTIPLE CHOICE
                 ====================================================== */}
              {tempQuestion.type === "MC" && (
                <>
                  <div className="fw-bold mb-2">Answers:</div>

                  {tempQuestion.choices.map((choice: string, i: number) => {
                    const isCorrect = tempQuestion.correctAnswer[0] === choice;

                    return (
                      <div
                        key={i}
                        className={`p-2 mb-2 d-flex align-items-center rounded border ${
                          isCorrect
                            ? "border-success bg-success-subtle"
                            : "bg-light"
                        }`}
                      >
                        {/* Radio correct */}
                        <Form.Check
                          type="radio"
                          name="mc-correct"
                          className="me-2"
                          checked={isCorrect}
                          onChange={() =>
                            setTempQuestion({
                              ...tempQuestion,
                              correctAnswer: [choice],
                            })
                          }
                        />

                        {/* Choice input */}
                        <Form.Control
                          className="me-2"
                          value={choice}
                          onChange={(e) => {
                            const updated = [...tempQuestion.choices];
                            updated[i] = e.target.value;
                            setTempQuestion({
                              ...tempQuestion,
                              choices: updated,
                            });
                          }}
                        />

                        {/* Delete choice */}
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => {
                            const updatedChoices =
                              tempQuestion.choices.filter(
                                (_: any, idx: number) => idx !== i
                              );

                            const updatedCorrect =
                              tempQuestion.correctAnswer[0] === choice
                                ? [""]
                                : tempQuestion.correctAnswer;

                            setTempQuestion({
                              ...tempQuestion,
                              choices: updatedChoices,
                              correctAnswer: updatedCorrect,
                            });
                          }}
                        >
                          ✕
                        </Button>
                      </div>
                    );
                  })}

                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() =>
                      setTempQuestion({
                        ...tempQuestion,
                        choices: [...tempQuestion.choices, ""],
                      })
                    }
                  >
                    + Add Another Answer
                  </Button>
                </>
              )}

              {/* ======================================================
                        TRUE / FALSE
                 ====================================================== */}
              {tempQuestion.type === "TF" && (
                <>
                  <div className="fw-bold mb-2">Answers:</div>

                  {["True", "False"].map((val) => (
                    <div
                      key={val}
                      className={`p-2 mb-2 d-flex align-items-center rounded border ${
                        tempQuestion.correctAnswer[0] === val
                          ? "border-success bg-success-subtle"
                          : "bg-light"
                      }`}
                    >
                      <Form.Check
                        type="radio"
                        name="tf-correct"
                        className="me-2"
                        checked={tempQuestion.correctAnswer[0] === val}
                        onChange={() =>
                          setTempQuestion({ ...tempQuestion, correctAnswer: [val] })
                        }
                      />
                      <span className="fw-semibold">{val}</span>
                    </div>
                  ))}
                </>
              )}

              {/* ======================================================
                        FILL IN THE BLANK
                 ====================================================== */}
              {tempQuestion.type === "FILL" && (
                <>
                  <div className="fw-bold mb-2">
                    Possible Correct Answers (case-insensitive):
                  </div>

                  {tempQuestion.correctAnswer.map((ans: string, i: number) => (
                    <div
                      key={i}
                      className="p-2 mb-2 d-flex align-items-center rounded border bg-light"
                    >
                      <Form.Control
                        className="me-2"
                        placeholder={`Answer ${i + 1}`}
                        value={ans}
                        onChange={(e) => {
                          const updated = [...tempQuestion.correctAnswer];
                          updated[i] = e.target.value;
                          setTempQuestion({
                            ...tempQuestion,
                            correctAnswer: updated,
                          });
                        }}
                      />

                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          const updated = tempQuestion.correctAnswer.filter(
                            (_: any, idx: number) => idx !== i
                          );
                          setTempQuestion({
                            ...tempQuestion,
                            correctAnswer: updated,
                          });
                        }}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() =>
                      setTempQuestion({
                        ...tempQuestion,
                        correctAnswer: [...tempQuestion.correctAnswer, ""],
                      })
                    }
                  >
                    + Add Another Answer
                  </Button>
                </>
              )}

              {/* SAVE / CANCEL */}
              <div className="mt-3 d-flex gap-2">
                <Button variant="secondary" onClick={cancelEdit}>
                  Cancel
                </Button>
                <Button variant="success" onClick={saveQuestion}>
                  Save Question
                </Button>
              </div>
            </>
          ) : (
            /* PREVIEW MODE */
            <div className="d-flex justify-content-between">
              <div>
                <h5>{q.title}</h5>
                <div className="text-muted small">
                  {q.type} • {q.points} pts
                </div>
              </div>

              <div className="d-flex gap-2">
                <Button size="sm" onClick={() => editQuestion(index)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteQuestion(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

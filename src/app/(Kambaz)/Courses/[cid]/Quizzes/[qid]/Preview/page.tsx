"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import QuizRunner from "../QuizRunner";
import React from "react";

export default function PreviewPage({ params }: any) {
  const { qid } = React.use(params) as { qid: string };
  const [quiz, setQuiz] = useState<any>(null);

  const SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

  const loadQuiz = async () => {
    const { data } = await axios.get(`${SERVER}/api/quizzes/${qid}`);
    setQuiz(data);
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  if (!quiz) return <div className="p-4">Loading...</div>;

  return (
    <QuizRunner quiz={quiz} isFaculty={true}/>
  );
}

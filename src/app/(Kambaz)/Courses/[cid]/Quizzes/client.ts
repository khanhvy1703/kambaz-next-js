"use client";

import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER_A6;
const QUIZZES_API = `${SERVER}/api/courses`;

export const findQuizzesForCourse = async (cid: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${cid}/quizzes`);
  return response.data;
};

export const createQuiz = async (cid: string) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${cid}/quizzes`,
    { title: "New Quiz", published: false }
  );
  return response.data;
};

export const deleteQuiz = async (cid: string, qid: string) => {
  const response = await axiosWithCredentials.delete(
    `${SERVER}/api/quizzes/${qid}`
  );
  return response.data;
};

export const togglePublishQuiz = async (cid: string, qid: string) => {
  const response = await axiosWithCredentials.put(
    `${SERVER}/api/quizzes/${qid}/publish`
  );
  return response.data;
};



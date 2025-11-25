import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/users/current/enrollments`;

export const enroll = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${ENROLLMENTS_API}/${courseId}`
  );
  return data;
};

export const unenroll = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${ENROLLMENTS_API}/${courseId}`
  );
  return data;
};

export const findMyEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}`);
  return data;
};

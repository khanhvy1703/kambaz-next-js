"use client";

import { Provider } from "react-redux";
import store from "../store";

export const dynamic = "force-dynamic"; // 👈 prevent prerender

export default function ReduxExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
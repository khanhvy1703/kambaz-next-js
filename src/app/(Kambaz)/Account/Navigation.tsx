"use client";
import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="d-flex flex-column">
      <Link
        href="Signin"
        className="fw-bold border-start border-3 border-dark ps-3 py-1 text-dark text-decoration-none mb-2 p-3"
      >
        Signin
      </Link>
      <Link
        href="Signup"
        className="text-danger ps-3 py-1 text-decoration-none mb-2 p-3"
      >
        Signup
      </Link>
      <Link
        href="Profile"
        className="text-danger ps-3 py-1 text-decoration-none p-3"
      >
        Profile
      </Link>
    </div>
  );
}

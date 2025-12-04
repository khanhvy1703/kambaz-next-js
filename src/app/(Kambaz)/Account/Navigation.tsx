"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const pathname = usePathname();

  const links = currentUser ? ["Profile" , "Groupinfo"] : ["Signin", "Signup", "Groupinfo"];

  return (
    <div id="wd-account-navigation" className="d-flex flex-column">
      {currentUser?.role === "ADMIN" && (
        <Link
          href="/Account/Users"
          className={`ps-3 py-2 mb-2 fw-bold text-decoration-none ${
            pathname.toLowerCase().includes("users")
              ? "border-start border-3 border-dark text-dark"
              : "text-danger"
          }`}
        >
          Users
        </Link>
      )}

      {links.map((link) => {
        const active = pathname.toLowerCase().includes(link.toLowerCase());
        return (
          <Link
            key={link}
            href={`/Account/${link}`}
            className={`ps-3 py-2 mb-2 fw-bold text-decoration-none ${
              active
                ? "border-start border-3 border-dark text-dark"
                : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}

      
    </div>
  );
}

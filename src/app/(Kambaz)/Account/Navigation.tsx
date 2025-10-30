"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const pathname = usePathname();
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <div id="wd-account-navigation" className="d-flex flex-column">
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

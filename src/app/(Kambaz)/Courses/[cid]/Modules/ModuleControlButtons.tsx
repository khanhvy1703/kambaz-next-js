"use client";

import { FaTrash, FaPlus, FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  return (
    <div className="d-flex align-items-center">
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-3"
        style={{ cursor: "pointer" }}
      />
      <FaTrash
        className="text-danger me-2 mb-1"
        style={{ cursor: "pointer" }}
        onClick={() => deleteModule(moduleId)}
      />
      <GreenCheckmark />
      <FaPlus color="#6c757d" className="ms-2" />
      <IoEllipsisVertical className="ms-2 fs-5" />
    </div>
  );
}

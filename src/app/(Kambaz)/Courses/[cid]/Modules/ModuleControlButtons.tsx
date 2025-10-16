import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaPlus } from "react-icons/fa6";

export default function ModuleControlButtons() {
  return (
    <div className="d-flex align-items-center">
      <GreenCheckmark />
      <FaPlus color="#6c757d" className="ms-2" />
      <IoEllipsisVertical className="ms-2 fs-5" />
    </div>
  );
}

"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import GreenCheckmark from "./GreenCheckmark";
import { FaPlus } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as db from "../../../Database";

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules.filter((module) => module.course === cid);

  return (
    <div id="wd-modules-screen" className="p-3">
      <ModulesControls />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0">
        {modules.map((module) => (
          <div key={module._id}>
            {/* Module Header */}
            <ListGroupItem className="p-3 fs-6 bg-light d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-5" />
                <span className="d-flex align-items-center">{module.name}</span>
              </div>
              <span className="d-flex align-items-center">
                <GreenCheckmark />
                <FaPlus color="#6c757d" className="ms-2" />
                <IoEllipsisVertical className="ms-2 fs-5" />
                <ModuleControlButtons />
              </span>
            </ListGroupItem>

            {/* Lessons under this module */}
            {module.lessons?.map((lesson) => (
              <ListGroupItem
                key={lesson._id}
                className="assignment-item p-3 d-flex justify-content-between align-items-center ps-5"
              >
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-5 text-muted" />
                  {lesson.name}
                </div>
                <LessonControlButtons />
              </ListGroupItem>
            ))}
          </div>
        ))}
      </ListGroup>
    </div>
  );
}

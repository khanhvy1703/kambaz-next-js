"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { FaPlus } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import Link from "next/link";
import { MdAssignment } from "react-icons/md";

export default function Modules() {
  return (
    <div id="wd-modules-screen" className="p-3">
      <ModulesControls />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0">
        {/* Module 1 */}
        <ListGroupItem className="p-3 fs-6 bg-light d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            <span className="d-flex align-items-center">Week 2</span>
          </div>
          <span className="d-flex align-items-center">
            <GreenCheckmark />
            <FaPlus color="#6c757d" className="ms-2" />
            <IoEllipsisVertical className="ms-2 fs-5" />
          </span>
        </ListGroupItem>

        <ListGroupItem className="assignment-item p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            LEARNING OBJECTIVES
            </div>
          <div className="text-nowrap">
            <LessonControlButtons />
          </div>
        </ListGroupItem>

        <ListGroupItem className="assignment-item p-3 d-flex justify-content-between align-items-center ps-5">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5 text-muted" />
            Introduction to the course
          </div>
          <LessonControlButtons />
        </ListGroupItem>

        <ListGroupItem className="assignment-item p-3 d-flex justify-content-between align-items-center ps-5">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5 text-muted" />
            Learn what is Web Development
          </div>
          <LessonControlButtons />
        </ListGroupItem>

        <ListGroupItem className="assignment-item p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            READING
            </div>
          <div className="text-nowrap">
            <LessonControlButtons />
          </div>
        </ListGroupItem>

        <ListGroupItem className="assignment-item p-3 d-flex justify-content-between align-items-center ps-5">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5 text-muted" />
            Full Stack Developer - Chapter 1 - Introduction
          </div>
          <LessonControlButtons />
        </ListGroupItem>

        <ListGroupItem className="assignment-item p-3 d-flex justify-content-between align-items-center ps-5">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5 text-muted" />
            Full Stack Developer - Chapter 2 - UI
          </div>
          <LessonControlButtons />
        </ListGroupItem>

        <ListGroupItem className="assignment-item p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            SLIDES
            </div>
          <div className="text-nowrap">
            <LessonControlButtons />
          </div>
        </ListGroupItem>

        {/* Module 2 */}
        <ListGroupItem className="p-3 mt-5 fs-6 bg-light d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            <span className="d-flex align-items-center">Week 2</span>
          </div>
          <span className="d-flex align-items-center">
            <GreenCheckmark />
            <FaPlus color="#6c757d" className="ms-2" />
            <IoEllipsisVertical className="ms-2 fs-5" />
          </span>
        </ListGroupItem>

        <ListGroupItem className="assignment-item p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            LESSION 1
            </div>
          <div className="text-nowrap">
            <LessonControlButtons />
          </div>
        </ListGroupItem>

        <ListGroupItem className="assignment-item p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            LESSION 2
            </div>
          <div className="text-nowrap">
            <LessonControlButtons />
          </div>
        </ListGroupItem>

        <ListGroupItem className="assignment-item p-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <BsGripVertical className="me-2 fs-5" />
            LESSION 3
            </div>
          <div className="text-nowrap">
            <LessonControlButtons />
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}

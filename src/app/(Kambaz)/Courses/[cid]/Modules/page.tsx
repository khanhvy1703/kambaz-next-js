"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  editModule,
  updateModule,
} from "./reducer";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const [moduleName, setModuleName] = useState("");

  return (
    <div id="wd-modules-screen" className="p-3">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />

      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <div key={module._id}>
              <ListGroupItem className="p-3 fs-6 bg-light d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center w-100">
                  <BsGripVertical className="me-2 fs-5" />
                  {!module.editing && <span>{module.name}</span>}
                  {module.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name}
                      autoFocus
                    />
                  )}
                </div>

                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) =>
                    dispatch(deleteModule(moduleId))
                  }
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </ListGroupItem>

              {module.lessons?.map((lesson: any) => (
                <ListGroupItem
                  key={lesson._id}
                  className="p-3 ps-5 d-flex justify-content-between align-items-center"
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

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule as deleteModuleLocal,
  editModule,
  updateModule as updateModuleLocal,
  setModules,
} from "./reducer";

import * as client from "../../client";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const [moduleName, setModuleName] = useState("");

  const fetchModules = async () => {
    const data = await client.findModulesForCourse(cid as string);
    dispatch(setModules(data));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = await client.createModuleForCourse(cid as string, {
      name: moduleName,
    });
    dispatch(setModules([...modules, newModule]));
    setModuleName("");
  };

  const onUpdateModule = async (module: any) => {
    const saved = await client.updateModule(module);
    const newList = modules.map((m: any) =>
      m._id === module._id ? saved : m
    );
    dispatch(setModules(newList));
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  return (
    <div id="wd-modules-screen" className="p-3">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse}
      />

      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.map((module: any) => (
          <div key={module._id}>
            <ListGroupItem className="p-3 fs-6 bg-light d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center w-100">
                <BsGripVertical className="me-2 fs-5" />

                {/* DISPLAY MODE */}
                {!module.editing && <span>{module.name}</span>}

                {/* EDIT MODE */}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    value={module.name}
                    autoFocus
                    onChange={(e) =>
                      dispatch(
                        updateModuleLocal({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}
              </div>

              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={() => onRemoveModule(module._id)}
                editModule={() => dispatch(editModule(module._id))}
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

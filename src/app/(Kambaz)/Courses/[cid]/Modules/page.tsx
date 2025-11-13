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
  setModules,
  addModule,
  editModule,
  updateModule,
  deleteModule,
} from "./reducer";
import * as client from "../../client";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const [moduleName, setModuleName] = useState("");
  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await client.createModuleForCourse(cid as string, newModule);
    dispatch(setModules([...modules, module]));
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    await client.updateModule(module);
    const newModules = modules.map((m: any) => m._id === module._id ? module : m );
    dispatch(setModules(newModules));
  };

  useEffect(() => {
    fetchModules();
  }, []);

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
                        onUpdateModule({ ...module, editing: false });
                      }
                    }}
                    defaultValue={module.name}
                    autoFocus
                  />
                )}
              </div>

              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
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

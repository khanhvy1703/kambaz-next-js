"use client";

import { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";

type ModulesControlsProps = {
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
};

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: ModulesControlsProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* Collapse All Button */}
      <Button
        variant="secondary"
        size="sm"
        className="float-end me-2"
        id="wd-collapse-all"
      >
        Collapse All
      </Button>

      {/* View Progress Button */}
      <Button
        variant="secondary"
        size="sm"
        className="float-end me-2"
        id="wd-view-progress"
      >
        View Progress
      </Button>

      {/* Publish Dropdown */}
      <Dropdown className="float-end me-2">
        <DropdownToggle
          variant="secondary"
          size="sm"
          id="wd-publish-all-btn"
          className="d-flex align-items-center gap-1"
        >
          <GreenCheckmark /> <span>Publish All</span>
        </DropdownToggle>

        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            <GreenCheckmark /> Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            <GreenCheckmark /> Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Add Module Button */}
      <Button
        variant="danger"
        size="sm"
        className="me-1 float-end"
        id="wd-add-module-btn"
        onClick={handleShow}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      {/* Modal Editor */}
      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}

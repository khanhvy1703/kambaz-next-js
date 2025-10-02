import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaBell, FaChartBar } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { AiOutlineHome } from "react-icons/ai";
import { BsCalendar3, BsMegaphone } from "react-icons/bs";
import { Button } from "react-bootstrap";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "250px" }}>
      <h2>Course Status</h2>

      {/* Unpublish / Publish row */}
      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button
            variant="secondary"
            size="sm"
            className="w-100 text-nowrap"
            id="wd-unpublish-btn"
          >
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
          </Button>
        </div>
        <div className="w-50">
          <Button
            variant="success"
            size="sm"
            className="w-100"
            id="wd-publish-btn"
          >
            <FaCheckCircle className="me-2 fs-5" /> Publish
          </Button>
        </div>
      </div>

      <br />

      {/* Stacked buttons */}
      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content
      </Button>

      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
      </Button>

      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <AiOutlineHome className="me-2 fs-5" /> Choose Home Page
      </Button>

      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <BsMegaphone className="me-2 fs-5" /> New Announcement
      </Button>

      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <FaChartBar className="me-2 fs-5" /> New Analytics
      </Button>

      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <BsCalendar3 className="me-2 fs-5" /> View Course Calendar
      </Button>

      <Button variant="secondary" size="sm" className="w-100 mt-1 text-start">
        <FaBell className="me-2 fs-5" /> View Course Notifications
      </Button>
    </div>
  );
}
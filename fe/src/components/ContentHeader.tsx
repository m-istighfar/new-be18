import React from "react";
import { Row, Col, Button } from "antd";
import formattedDate from "../helper/formatDateTD";
import TaskSortingControls from "../components/TaskSortingControls";
import TaskFilterControls from "../components/TaskFilterControls";

interface FilterOptions {
  priority?: string;
  status?: string;
  dueDate?: Date;
}

interface ContentHeaderProps {
  count?: number;
  onShowModal: () => void;
  onSortChange: (sortOrder: "asc" | "desc") => void;
  onFilterChange: (filters: FilterOptions) => void;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  count,
  onShowModal,
  onSortChange,
  onFilterChange,
}) => (
  <Row justify="space-between" align="middle" className="content-header">
    <Col>
      <h2>Today</h2>
      <p>{formattedDate}</p>
      <p>{count ? `You have ${count} task(s)` : "You don't have any task"}</p>
    </Col>
    <Col>
      <Row>
        <TaskSortingControls onSortChange={onSortChange} />
        <TaskFilterControls onFilterChange={onFilterChange} />
      </Row>
    </Col>
    <Col>
      <Button
        type="primary"
        className="new-task-button"
        onClick={() => onShowModal()}
      >
        New task
      </Button>
    </Col>
  </Row>
);

export default ContentHeader;

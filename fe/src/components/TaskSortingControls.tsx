import React from "react";
import { Select } from "antd";
import "./TaskSortingControls.css";

interface TaskSortingControlsProps {
  onSortChange: (sortOrder: "asc" | "desc") => void;
}

const TaskSortingControls: React.FC<TaskSortingControlsProps> = ({
  onSortChange,
}) => {
  const handleSortChange = (value: string) => {
    onSortChange(value as "asc" | "desc");
  };

  return (
    <div className="sorting-container">
      {/* <span>Sort By Due Date:</span> */}
      <Select defaultValue="asc" onChange={handleSortChange}>
        <Select.Option value="asc">Ascending</Select.Option>
        <Select.Option value="desc">Descending</Select.Option>
      </Select>
    </div>
  );
};

export default TaskSortingControls;

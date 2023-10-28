import React from "react";
import { Select } from "antd";

interface FilterOptions {
  priority?: string;
  status?: string;
  dueDate?: Date;
}
interface TaskFilterControlsProps {
  onFilterChange: (filter: FilterOptions) => void;
}

const TaskFilterControls: React.FC<TaskFilterControlsProps> = ({
  onFilterChange,
}) => {
  const handlePriorityChange = (priority: string) => {
    onFilterChange({ priority });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({ status });
  };

  return (
    <div>
      <Select
        placeholder="Filter by Priority"
        onChange={handlePriorityChange}
        allowClear
      >
        <Select.Option value="high">High</Select.Option>
        <Select.Option value="medium">Medium</Select.Option>
        <Select.Option value="low">Low</Select.Option>
      </Select>

      <Select
        placeholder="Filter by Status"
        onChange={handleStatusChange}
        allowClear
      >
        <Select.Option value="pending">Pending</Select.Option>
        <Select.Option value="completed">Completed</Select.Option>
      </Select>
    </div>
  );
};

export default TaskFilterControls;

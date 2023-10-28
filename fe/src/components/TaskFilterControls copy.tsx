import React from "react";
import { Select } from "antd";
// import moment from "moment";

interface TaskFilterControlsProps {
  onFilterChange: (filter: {
    priority?: string;
    status?: string;
    dueDate?: Date;
  }) => void;
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

  // const handleDueDateChange = (date: moment.Moment | null) => {
  //   if (date) {
  //     onFilterChange({ dueDate: date.toDate() });
  //   } else {
  //     onFilterChange({ dueDate: undefined });
  //   }
  // };

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

      {/* <DatePicker
        placeholder="Filter by Due Date"
        format="YYYY-MM-DD"
        onChange={handleDueDateChange}
      /> */}
    </div>
  );
};

export default TaskFilterControls;

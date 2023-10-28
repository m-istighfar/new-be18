import React from "react";
import { Card, Button, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import formatDate from "../helper/formatDate";

import "./TaskCard.css";

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
}

interface TaskCardProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onComplete,
  onClick,
}) => {
  return (
    <Card className="task-card" onClick={onClick}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {formatDate(task.dueDate)}</p>
      <div className="task-card-actions">
        <Tooltip
          title={
            task.status === "completed" ? "This task is already completed" : ""
          }
        >
          <Button
            icon={<CheckCircleOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onComplete(task._id);
            }}
            className={
              task.status === "completed" ? "complete-icon" : "pending-icon"
            }
            disabled={task.status === "completed"}
          />
        </Tooltip>
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task._id);
            }}
            className="edit-icon"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task._id);
            }}
            className="delete-icon"
          />
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;

import React from "react";
import { Modal, Button } from "antd";
import { Task } from "../api";
import formatDate from "../helper/formatDate";

interface TaskDetailsModalProps {
  task: Task;
  visible: boolean;
  onClose: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  task,
  visible,
  onClose,
}) => {
  return (
    <Modal
      title="Task Details"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <h3>Title : {task.title}</h3>
      <p>Description: {task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {formatDate(task.dueDate)}</p>
    </Modal>
  );
};

export default TaskDetailsModal;

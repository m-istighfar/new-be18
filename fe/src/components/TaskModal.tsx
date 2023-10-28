/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import moment from "moment";
import validateDueDate from "../helper/validateDueTate";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
  form: any;
  editingTask: any;
}

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  onOk,
  form,
  editingTask,
}) => {
  return (
    <Modal
      title={editingTask ? "Edit Task" : "New Task"}
      open={open}
      onOk={onOk}
      onCancel={onClose}
      centered
      okButtonProps={{
        className: "modal-ok-button",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={editingTask ? {} : { dueDate: moment() }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: "Please select the priority!" }]}
          hasFeedback
        >
          <Select>
            <Select.Option value="high">High</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="low">Low</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select the status!" }]}
          hasFeedback
        >
          <Select>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[
            { required: true, message: "Please select the due date!" },
            {
              validator: validateDueDate,
            },
          ]}
          hasFeedback
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;

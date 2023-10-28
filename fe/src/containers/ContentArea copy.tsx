import React, { useEffect, useState } from "react";
import {
  Layout,
  Button,
  Card,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Tooltip,
} from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import moment from "moment";
import {
  Task,
  fetchTasks,
  createNewTask,
  updateTask,
  deleteTask,
  markTaskAsComplete,
} from "../api";
import formatDate from "../helper/formatDate";
import formattedDate from "../helper/formatDateTD";
import TaskDetailsModal from "../components/TaskDetailModal";
import TaskSortingControls from "../components/TaskSortingControls";
import TaskFilterControls from "../components/TaskFilterControls";
import validateDueDate from "../helper/validateDueTate";

interface ContentAreaProps {
  isBlurred: boolean;
  selectedMenuItem: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({
  isBlurred,
  selectedMenuItem,
}) => {
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailsModalVisible, setIsTaskDetailsModalVisible] =
    useState(false);

  const [count, setCount] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState({});

  const [form] = Form.useForm();

  const handleSortChange = (newSortOrder: "asc" | "desc") => {
    setSortOrder(newSortOrder);
  };

  const handleFilterChange = (newFilters: {
    priority?: string;
    status?: string;
    dueDate?: Date;
  }) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    setLoading(true);
    fetchTasks({ sortOrder, ...filters })
      .then((data) => {
        setTasks(data.tasks);
        setCount(data.count);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        let errorMessage = "An error occurred while fetching tasks.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        Modal.error({
          title: "Error",
          content: errorMessage,
        });
        setLoading(false);
      });
  }, [sortOrder, filters]);

  const showModal = (taskToEdit?: Task) => {
    if (taskToEdit) {
      form.setFieldsValue({
        ...taskToEdit,
        dueDate: moment(taskToEdit.dueDate),
      });
      setEditingTask(taskToEdit);
    } else {
      form.resetFields();
      setEditingTask(null);
    }
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (editingTask === null) {
      form.resetFields();
    }
  }, [editingTask, form]);

  const handleCreateOrUpdateTask = async () => {
    try {
      const values = await form.validateFields();
      if (editingTask) {
        const updatedTask = await updateTask(editingTask._id, values);
        setTasks((prevTasks) =>
          prevTasks?.map((task) =>
            task._id === editingTask._id ? updatedTask : task
          )
        );
        setEditingTask(null);
      } else {
        const newTask = await createNewTask(values);
        setTasks((prevTasks) => [...(prevTasks || []), newTask]);
        setCount((prevCount = 0) => prevCount + 1);
      }
      showSuccessModal(
        editingTask
          ? "Task updated successfully!"
          : "Task created successfully!"
      );
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to submit:", error);
      let errorMessage =
        "An error occurred while creating or updating the task.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Modal.error({
        title: "Error",
        content: errorMessage,
      });
    }
  };

  const handleEdit = (id: string) => {
    const taskToEdit = tasks?.find((task) => task._id === id);

    if (taskToEdit?.status === "completed") {
      Modal.warning({
        title: "Cannot Edit Completed Task",
        content: "You cannot edit a task that is already completed.",
      });
      return;
    }

    if (taskToEdit) {
      showModal(taskToEdit);
    }
  };

  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this task?",
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Cancelled");
      },
    });
  };

  const showSuccessModal = (message: string) => {
    Modal.success({
      content: message,
      onOk() {},
      okButtonProps: {
        className: "success-modal-ok-button",
      },
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks?.filter((task) => task._id !== id));
      setCount((prevCount) => prevCount && prevCount - 1);
      showSuccessModal("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      let errorMessage = "An error occurred while deleting the task.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Modal.error({
        title: "Error",
        content: errorMessage,
      });
    }
  };

  const showMarkCompleteConfirm = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to mark this task as complete?",
      content: "You can edit the task later to change its status.",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        handleComplete(id);
      },
      onCancel() {
        console.log("Cancelled");
      },
    });
  };

  const handleComplete = async (id: string) => {
    try {
      const updatedTask = await markTaskAsComplete(id);
      setTasks((prevTasks) =>
        prevTasks?.map((task) => (task._id === id ? updatedTask : task))
      );
      showSuccessModal("Task marked as complete successfully!");
    } catch (error) {
      console.error("Error marking task as complete:", error);
      let errorMessage =
        "An error occurred while marking the task as complete.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Modal.error({
        title: "Error",
        content: errorMessage,
      });
    }
  };

  return (
    <Layout.Content
      style={{ padding: "50px", position: "relative" }}
      className={isBlurred ? "blur-content" : ""}
    >
      {selectedMenuItem === "1" && (
        <>
          {" "}
          <Row
            justify="space-between"
            align="middle"
            className="content-header"
          >
            <Col>
              <h2>Today</h2>
              <p>{formattedDate}</p>
              <p>
                {count
                  ? `You have ${count} task(s)`
                  : "You don't have any task"}
              </p>
            </Col>
            <Col>
              <Row>
                <TaskSortingControls onSortChange={handleSortChange} />
                <TaskFilterControls onFilterChange={handleFilterChange} />
              </Row>
            </Col>
            <Col>
              <Button
                type="primary"
                className="new-task-button"
                onClick={() => showModal()}
              >
                New task
              </Button>
            </Col>
          </Row>
          <hr style={{ margin: "20px 0" }} />
          {loading ? (
            <p>Loading...</p>
          ) : tasks && tasks.length > 0 ? (
            <>
              <Row gutter={[16, 16]}>
                {tasks.map((task, index) => (
                  <Col key={index} xs={24} sm={24} md={8} lg={8}>
                    <Card
                      className="task-card"
                      onClick={() => {
                        setSelectedTask(task);
                        setIsTaskDetailsModalVisible(true);
                      }}
                    >
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <p>Priority: {task.priority}</p>
                      <p>Status: {task.status}</p>
                      <p>Due Date: {formatDate(task.dueDate)}</p>
                      <div className="task-card-actions">
                        <Tooltip
                          title={
                            task.status === "completed"
                              ? "This task is already completed"
                              : ""
                          }
                        >
                          <Button
                            icon={<CheckCircleOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              showMarkCompleteConfirm(task._id);
                            }}
                            className={
                              task.status === "completed"
                                ? "complete-icon"
                                : "pending-icon"
                            }
                            disabled={task.status === "completed"}
                          />
                        </Tooltip>

                        <div>
                          <Button
                            icon={<EditOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(task._id);
                            }}
                          />
                          <Button
                            icon={<DeleteOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              showDeleteConfirm(task._id);
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          ) : null}
          <Modal
            title={editingTask ? "Edit Task" : "New Task"}
            open={isModalVisible}
            onOk={handleCreateOrUpdateTask}
            onCancel={() => {
              setIsModalVisible(false);
              form.resetFields();
            }}
            centered
            okButtonProps={{
              className: "modal-ok-button",
            }}
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={
                editingTask ? {} : { dueDate: moment() } // Set default dueDate for new tasks
              }
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please input the title!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                label="Priority"
                name="priority"
                rules={[
                  { required: true, message: "Please select the priority!" },
                ]}
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
                rules={[
                  { required: true, message: "Please select the status!" },
                ]}
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
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Form>
          </Modal>
          {selectedTask && (
            <TaskDetailsModal
              task={selectedTask}
              visible={isTaskDetailsModalVisible}
              onClose={() => {
                setIsTaskDetailsModalVisible(false);
                setSelectedTask(null);
              }}
            />
          )}
        </>
      )}
      {selectedMenuItem === "2" && <h1>Display Complete Task</h1>}
      {selectedMenuItem === "3" && <h1>Content for menu item 1</h1>}
      {selectedMenuItem === "4" && <h1>Content for menu item 1</h1>}
    </Layout.Content>
  );
};

export default ContentArea;

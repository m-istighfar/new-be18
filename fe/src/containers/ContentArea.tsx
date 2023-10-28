import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Modal, Form } from "antd";

import moment from "moment";
import {
  Task,
  fetchTasks,
  createNewTask,
  updateTask,
  deleteTask,
  markTaskAsComplete,
} from "../api";

import TaskDetailsModal from "../components/TaskDetailModal";
import ContentHeader from "../components/ContentHeader";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

import "./ContentArea.css";

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

  useEffect(() => {
    setLoading(true);
    fetchTasks({ sortOrder, ...filters })
      .then((data) => {
        if (data && data.tasks) {
          let filteredTasks = data.tasks;

          if (selectedMenuItem === "3") {
            const today = moment().startOf("day");
            filteredTasks = data.tasks.filter((task) =>
              moment(task.dueDate).isSame(today, "day")
            );
          } else if (selectedMenuItem === "4") {
            const today = moment().startOf("isoWeek");
            const endOfWeek = moment(today).endOf("isoWeek");
            filteredTasks = data.tasks.filter((task) =>
              moment(task.dueDate).isBetween(today, endOfWeek, undefined, "[]")
            );
          }

          const completedTasksCount = data.tasks.filter(
            (task) => task.status === "completed"
          ).length;

          setCount(
            selectedMenuItem === "2"
              ? completedTasksCount
              : selectedMenuItem === "3" || selectedMenuItem === "4"
              ? filteredTasks.length
              : data.count
          );
          setTasks(filteredTasks);
        } else {
          console.error("Data or tasks are undefined");
          setTasks([]);
          setCount(0);
        }
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
        setTasks([]);
        setCount(0);
      });
  }, [sortOrder, filters, selectedMenuItem]);

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
          <ContentHeader
            count={count}
            onShowModal={showModal}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
          />
          <hr style={{ margin: "20px 0" }} />
          {loading ? (
            <p>Loading...</p>
          ) : tasks && tasks.length > 0 ? (
            <>
              <Row gutter={[16, 16]}>
                {tasks.map((task, index) => (
                  <Col key={index} xs={24} sm={24} md={8} lg={8}>
                    <TaskCard
                      task={task}
                      onEdit={handleEdit}
                      onDelete={showDeleteConfirm}
                      onComplete={showMarkCompleteConfirm}
                      onClick={() => {
                        setSelectedTask(task);
                        setIsTaskDetailsModalVisible(true);
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            "You don't have any task"
          )}

          <TaskModal
            open={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
              setEditingTask(null);
              form.resetFields();
            }}
            onOk={handleCreateOrUpdateTask}
            form={form}
            editingTask={editingTask}
          />

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
      {selectedMenuItem === "2" && (
        <>
          <ContentHeader
            count={count}
            onShowModal={showModal}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
          />
          <hr style={{ margin: "20px 0" }} />
          {loading ? (
            <p>Loading...</p>
          ) : tasks && tasks.length > 0 ? (
            <>
              <Row gutter={[16, 16]}>
                {tasks
                  .filter((task) => task.status === "completed")
                  .map((task, index) => (
                    <Col key={index} xs={24} sm={24} md={8} lg={8}>
                      <TaskCard
                        task={task}
                        onEdit={handleEdit}
                        onDelete={showDeleteConfirm}
                        onComplete={showMarkCompleteConfirm}
                        onClick={() => {
                          setSelectedTask(task);
                          setIsTaskDetailsModalVisible(true);
                        }}
                      />
                    </Col>
                  ))}
              </Row>
            </>
          ) : (
            <p>No completed tasks found.</p>
          )}

          <TaskModal
            open={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
              setEditingTask(null);
              form.resetFields();
            }}
            onOk={handleCreateOrUpdateTask}
            form={form}
            editingTask={editingTask}
          />

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
      {selectedMenuItem === "3" && (
        <>
          <ContentHeader
            count={count}
            onShowModal={showModal}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
          />
          <hr style={{ margin: "20px 0" }} />
          {loading ? (
            <p>Loading...</p>
          ) : tasks && tasks.length > 0 ? (
            <>
              <Row gutter={[16, 16]}>
                {tasks.map((task, index) => (
                  <Col key={index} xs={24} sm={24} md={8} lg={8}>
                    <TaskCard
                      task={task}
                      onEdit={handleEdit}
                      onDelete={showDeleteConfirm}
                      onComplete={showMarkCompleteConfirm}
                      onClick={() => {
                        setSelectedTask(task);
                        setIsTaskDetailsModalVisible(true);
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <p>No tasks for today.</p>
          )}

          <TaskModal
            open={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
              setEditingTask(null);
              form.resetFields();
            }}
            onOk={handleCreateOrUpdateTask}
            form={form}
            editingTask={editingTask}
          />

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
      {selectedMenuItem === "4" && (
        <>
          <ContentHeader
            count={count}
            onShowModal={showModal}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
          />
          <hr style={{ margin: "20px 0" }} />
          {loading ? (
            <p>Loading...</p>
          ) : tasks && tasks.length > 0 ? (
            <>
              <Row gutter={[16, 16]}>
                {tasks.map((task, index) => (
                  <Col key={index} xs={24} sm={24} md={8} lg={8}>
                    <TaskCard
                      task={task}
                      onEdit={handleEdit}
                      onDelete={showDeleteConfirm}
                      onComplete={showMarkCompleteConfirm}
                      onClick={() => {
                        setSelectedTask(task);
                        setIsTaskDetailsModalVisible(true);
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <p>No tasks for this week.</p>
          )}

          <TaskModal
            open={isModalVisible}
            onClose={() => {
              setIsModalVisible(false);
              setEditingTask(null);
              form.resetFields();
            }}
            onOk={handleCreateOrUpdateTask}
            form={form}
            editingTask={editingTask}
          />

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
    </Layout.Content>
  );
};

export default ContentArea;

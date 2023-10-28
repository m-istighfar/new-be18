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
  Tooltip,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  User,
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/userApi";

import "./AdminContent.css";

interface AdminContentProps {
  isBlurred: boolean;
  selectedMenuItem: string;
}

const AdminContent: React.FC<AdminContentProps> = ({
  isBlurred,
  selectedMenuItem,
}) => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        let errorMessage = "An error occurred while fetching users.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        Modal.error({
          title: "Error",
          content: errorMessage,
        });
        setLoading(false);
      });
  }, []);

  const showModal = (userToEdit?: User) => {
    console.log(userToEdit);
    if (userToEdit) {
      form.setFieldsValue({ ...userToEdit });
      setEditingUser(userToEdit);
    } else {
      setEditingUser(null);
    }
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (editingUser !== null) {
      console.log(editingUser);
    }
  }, [editingUser]);

  const handleCreateOrUpdateUser = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        if (!editingUser._id) {
          console.error("User ID is undefined");
          Modal.error({
            title: "Error",
            content: "Failed to update user. User ID is missing.",
          });
          return;
        }
        const updatedUser = await updateUser(editingUser._id, values);
        setUsers((prevUsers) =>
          prevUsers?.map((user) =>
            user._id === editingUser._id ? updatedUser : user
          )
        );
        setEditingUser(null);
      } else {
        const newUser = await createUser({
          ...values,
          password: values.password,
        });
        setUsers((prevUsers) => [...(prevUsers || []), newUser]);
      }
      Modal.success({
        content: editingUser
          ? "User updated successfully!"
          : "User created successfully!",
      });
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to create or update user:", error);
      let errorMessage =
        "An error occurred while creating or updating the user.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Modal.error({
        title: "Error",
        content: errorMessage,
      });
    }
  };

  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
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

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);

      setUsers((prevUsers) => prevUsers?.filter((user) => user._id !== id));
      Modal.success({
        content: "User deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      let errorMessage = "An error occurred while deleting the user.";
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
    const userToEdit = users?.find((user) => user._id === id);
    if (userToEdit) {
      showModal(userToEdit);
    }
  };

  return (
    <Layout.Content
      style={{ padding: "50px", position: "relative" }}
      className={isBlurred ? "blur-content" : ""}
    >
      {selectedMenuItem === "3" && (
        <>
          <Row
            justify="space-between"
            align="middle"
            className="content-header"
          >
            <Col>
              <h2>Users</h2>
              <p>{users ? `Total: ${users.length}` : "Loading users..."}</p>
            </Col>
            <Col>
              <Button
                type="primary"
                className="new-user-button"
                onClick={() => showModal()}
              >
                New User
              </Button>
            </Col>
          </Row>
          <hr style={{ margin: "20px 0" }} />
          {loading ? (
            <p>Loading...</p>
          ) : users && users.length > 0 ? (
            <Row gutter={[16, 16]}>
              {users.map((user, index) => (
                <Col key={index} xs={24} sm={24} md={8} lg={8}>
                  <Card className="user-card">
                    <h3>{user.username}</h3>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <p>Verified : {user.verified ? "Yes" : "No"}</p>
                    <p>Pending Task : {user.pendingTask}</p>
                    <p>Complete Task : {user.completedTask}</p>
                    <Tooltip
                      title={
                        user.role === "admin" ? "Cannot edit an admin" : ""
                      }
                    >
                      <span>
                        <Button
                          icon={<EditOutlined />}
                          onClick={() => user._id && handleEdit(user._id)}
                          className="user-card-button"
                          disabled={user.role === "admin"}
                        >
                          Edit
                        </Button>
                      </span>
                    </Tooltip>

                    <Tooltip
                      title={
                        user.role === "admin" ? "Cannot delete an admin" : ""
                      }
                    >
                      <span>
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() =>
                            user._id && showDeleteConfirm(user._id)
                          }
                          className="user-card-button"
                          disabled={user.role === "admin"}
                        >
                          Delete
                        </Button>
                      </span>
                    </Tooltip>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No users found</p>
          )}
          <Modal
            title={editingUser ? "Edit User" : "Create User"}
            open={isModalVisible}
            onOk={handleCreateOrUpdateUser}
            centered
            okButtonProps={{
              className: "modal-ok-button",
            }}
            onCancel={() => {
              setIsModalVisible(false);
              form.resetFields();
            }}
            okText={editingUser ? "Update" : "Create"}
            cancelText="Cancel"
          >
            <Form form={form} layout="vertical" name="form_in_modal">
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Please input the username!" },
                  {
                    min: 6,
                    message: "Username must be at least 6 characters!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input the email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="role"
                label="Role"
                rules={[
                  { required: true, message: "Please select the user role!" },
                ]}
                hasFeedback
              >
                <Select>
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="user">User</Select.Option>
                </Select>
              </Form.Item>
              {!editingUser && (
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input the password!",
                    },
                    {
                      min: 8,
                      message: "Password must be at least 8 characters!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>
              )}
            </Form>
          </Modal>
        </>
      )}
    </Layout.Content>
  );
};

export default AdminContent;

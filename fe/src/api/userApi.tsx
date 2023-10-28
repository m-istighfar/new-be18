const BASE_URL = "http://localhost:3000/admin";

// const BASE_URL = "https://expensive-boa-pajamas.cyclic.app/admin";

const checkResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || "Network response was notz ok " + response.statusText
    );
  }
  return response.json();
};

export interface User {
  _id?: string;
  username: string;
  email: string;
  role?: string;
  verified?: boolean;
  completedTask?: number;
  pendingTask?: number;
}

export const fetchUsers = async (): Promise<User[]> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  try {
    const response = await fetch(`${BASE_URL}/list-user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await checkResponse(response);
    return data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (
  user: Omit<User, "_id" | "verified" | "completedTask" | "pendingTask">
): Promise<User> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  try {
    const response = await fetch(`${BASE_URL}/create-user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await checkResponse(response);
    return data.data; // Adjusted to match backend response structure
  } catch (error) {
    console.error("Error creating new user:", error);
    throw error;
  }
};

export const updateUser = async (
  id: string,
  user: Pick<User, "username" | "email">
): Promise<User> => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  try {
    const response = await fetch(`${BASE_URL}/update-user/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await checkResponse(response);
    console.log(data);
    return data.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found in local storage.");
  }

  try {
    const response = await fetch(`${BASE_URL}/delete-user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    await checkResponse(response);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

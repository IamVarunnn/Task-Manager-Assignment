import axios from "axios";

const API_URL = "https://task-manager-l56u.onrender.com/api/tasks";

export const getTasks = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(
        API_URL,
        config
    );

    return response.data;
};

export const createTask = async (
    taskData,
    token
) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(
        API_URL,
        taskData,
        config
    );

    return response.data;
};

export const deleteTask = async (
    taskId,
    token
) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.delete(
        `${API_URL}/${taskId}`,
        config
    );

    return response.data;
};

export const toggleTaskStatus = async (
    taskId,
    token
) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.patch(
        `${API_URL}/${taskId}/status`,
        {},
        config
    );

    return response.data;
};

export const updateTask = async (
    taskId,
    taskData,
    token
) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.put(
        `${API_URL}/${taskId}`,
        taskData,
        config
    );

    return response.data;
};
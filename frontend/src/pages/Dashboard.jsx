import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, toggleTaskStatus, updateTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import logo from "/task-manager-logo.png"

function Dashboard() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");
    
    const [search, setSearch] = useState("");


    const handleLogout = () => {

        localStorage.removeItem(
            "userInfo"
        );

        navigate("/login");
    };

    

    const handleToggleStatus =
        async (taskId) => {

            try {

                const updatedTask =
                    await toggleTaskStatus(
                        taskId,
                        user.token
                    );

                setTasks(
                    tasks.map((task) =>
                        task._id === taskId
                            ? updatedTask
                            : task
                    )
                );

            } catch (error) {

                console.log(error);

            }
        };
    
        const handleEditTask =
            async (task) => {

                const newTitle =
                    prompt(
                        "Enter new title",
                        task.title
                    );

                if (!newTitle) return;

                const newDescription =
                    prompt(
                        "Enter new description",
                        task.description
                    );

                if (!newDescription) return;

                try {

                    const updatedTask =
                        await updateTask(
                            task._id,
                            {
                                title: newTitle,
                                description:
                                    newDescription,
                                status:
                                    task.status
                            },
                            user.token
                        );

                    setTasks(
                        tasks.map((t) =>
                            t._id === task._id
                                ? updatedTask
                                : t
                        )
                    );

                } catch (error) {

                    console.log(error);

                }
            };

    const handleDelete =
        async (taskId) => {

            try {

                await deleteTask(
                    taskId,
                    user.token
                );

                setTasks(
                    tasks.filter(
                        (task) =>
                            task._id !== taskId
                    )
                );

            } catch (error) {

                console.log(error);

            }
        };

    const handleAddTask =
        async (e) => {

            e.preventDefault();

            try {

                const newTask =
                    await createTask(
                        {
                            title,
                            description
                        },
                        user.token
                    );

                setTasks([
                    ...tasks,
                    newTask
                ]);

                setTitle("");
                setDescription("");

            } catch (error) {

                console.log(error);

            }
        };

    const user =
        JSON.parse(
            localStorage.getItem("userInfo")
        );

    useEffect(() => {

        if (!user) {
            navigate("/login");
            return;
        }

        const fetchTasks = async () => {

            try {

                const data = await getTasks(
                    user.token
                );

                setTasks(data);

            } catch (error) {

                console.log(error);

            }
        };

        fetchTasks();

    }, [navigate, user]);

    const filteredTasks =
    tasks.filter((task) =>
        task.title
            .toLowerCase()
            .includes(
                search.toLowerCase()
            )
    );


    return (
        <div className="dashboard" >
             


            <div className="dashboard-header">
                <img
                    src={logo}
                    alt="Task Manager"
                    width="50"
                />
                <div>
                    <h1>Task Manager</h1>
                    <p>Welcome {user?.name}</p>
                </div>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

            <hr />

            <div className="task-form-card">

                <form onSubmit={handleAddTask}>

                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <br /><br />

                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                    <br /><br />

                    <button type="submit">
                        Add Task
                    </button>

                </form>

            </div>

            <hr />

            <input
                type="text"
                placeholder="Search Tasks"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <br /><br />

            <h3>Your Tasks</h3>

            <div className="task-grid">
                
                {filteredTasks.length === 0 ? (

                <p>No Tasks Found</p>

            ) : (filteredTasks.map((task) => (

                    <div key={task._id} className="task-card">

                        <h4>{task.title}</h4>

                        <p>
                            {task.description}
                        </p>

                        <p>
                            Status:
                            <span
                                className={
                                    task.status === "completed"
                                        ? "status-completed"
                                        : "status-pending"
                                }
                            >
                            {task.status}
                            </span>

                            <br /><br />

                        <div className="task-actions" >
                        
                            <button
                                onClick={() =>
                                    handleDelete(task._id)
                                }
                            >
                                Delete
                            </button>

                            <button
                                onClick={() =>
                                    handleEditTask(task)
                                }
                                >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    handleToggleStatus(task._id)
                                }
                            >
                                Toggle Status
                            </button>
                        </div>

                        </p>

                        <hr />

                    </div>

                )))}
            </div>

        </div>
    );
}

export default Dashboard;
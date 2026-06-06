import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/auth.css";


function Register() {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (
                !formData.name ||
                !formData.email ||
                !formData.password
            ) {

                setError(
                    "All fields are required"
                );

                return;
            }

            setError("");

            await registerUser(formData);

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            setError("User already exists");

        }
    };

    return (

    <div className="auth-container">

        <div className="auth-card">

            <h1>Register</h1>
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">
                    Register
                </button>

            </form>

            <p>
                Already have an account?
                <Link to="/login">
                    Login
                </Link>
            </p>

        </div>

    </div>

);
}

export default Register;
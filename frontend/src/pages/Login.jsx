import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/auth.css";

function Login() {

    const [error, setError] =
    useState("");

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.email ||
            !formData.password
        ) {

            setError(
                "All fields are required"
            );

            return;
        }

        setError("");

        try {

            const data = await loginUser(formData);

            localStorage.setItem(
                "userInfo",
                JSON.stringify(data)
            );

            navigate("/dashboard");

        } catch (error) {
            setError(
                "Invalid Email or Password"
            );
            console.log(error);

        }
    };

   return (

    <div className="auth-container">

        <div className="auth-card">

            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>

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
                    Login
                </button>

            </form>

        </div>

    </div>
);
}

export default Login;
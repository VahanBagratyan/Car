import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./loginBox.module.css";

const LoginBox = () => {
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            const response = await axios.post("http://localhost:8081/admin/login", { password });
            
            if (response.data.success && response.data.token) {
                if (rememberMe) {
                    localStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("token", response.data.token);
                } else {
                    sessionStorage.setItem("token", response.data.token);
                }
                navigate("/admin/dashboard");
            } else {
                setError("Invalid password. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>Admin Login</h1>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            required
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.rememberMeContainer}>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                            className={styles.checkbox}
                        />
                        <label htmlFor="rememberMe" className={styles.label}>Remember Me</label>
                    </div>
                    <button 
                        type="submit" 
                        className={styles.button}>
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginBox;

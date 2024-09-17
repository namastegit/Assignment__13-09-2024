import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Registering with:", { username, password });

        // Check if username and password are not empty
        if (username.trim() && password.trim()) {
            try {
                setIsRegistering(true);
                const response = await axios.post("http://localhost:3000/api/auth/Register", { username, password });

                if (response.status === 200) {  // Check response status for success
                    setIsRegistering(false);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error registering user:", error);
                setIsRegistering(false);  // Stop loading state in case of error
            }
        } else {
            alert("Please enter both username and password.");  // Add alert if fields are empty
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='bg-slate-200 p-3 rounded-md'>
            <div className='m-2 p-2 flex justify-center border-2 rounded-md-100'>
                <h1 className=' font-sans font-semibold text-3xl'>Register</h1></div>
                <div className='m-2'>
                    <input 
                        className='p-2 rounded-md outline-none'
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className='m-2'>
                    <input 
                        className='p-2 rounded-md outline-none'
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className='m-2 p-2 flex justify-center border-2 border-black rounded-md bg-black text-yellow-100'>
                    <button onClick={handleRegister}>
                        {isRegistering ? "Registering..." : "Register"}
                    </button> 
                </div>
            </div>
        </div>
    );
}

export default Register;

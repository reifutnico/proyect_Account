import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ConfirmAccount = () => {
    const { token } = useParams(); // Obtén el token de la URL
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const confirmUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3150/api/confirm/${token}`);
                setMessage(response.data.message);
            } catch (error) {
                setMessage(error.response.data.error || 'An error occurred while confirming your account.');
            } finally {
                setLoading(false);
            }
        };

        confirmUser();
    }, [token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={styles.container}>
            <h2>Confirm Your Account</h2>
            <p>{message}</p>
            <a href="/">Go to Login</a>
        </div>
    );
};

// Estilos simples para la pantalla
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
    },
};

export default ConfirmAccount;

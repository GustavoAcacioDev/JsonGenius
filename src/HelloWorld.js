// src/HelloWorld.js
import React, { useEffect } from 'react';
import axios from 'axios';

const HelloWorld = () => {
    useEffect(() => {
        const fetchHelloWorld = async () => {
            try {
                const response = await axios.get('http://localhost:3000/hello-world');
                console.log(response.data.message); // Deve imprimir "hello-world" no console
            } catch (error) {
                console.error('Erro ao fazer a requisição:', error);
            }
        };

        fetchHelloWorld();
    }, []);

    return (
        <div>
            <h1>Veja o console para a resposta do endpoint!</h1>
        </div>
    );
};

export default HelloWorld;

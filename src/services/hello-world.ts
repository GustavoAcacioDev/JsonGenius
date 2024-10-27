import axios from "axios";

export const fetchHelloWorld = async () => {
    try {
        const response = await axios.get('http://localhost:3000/hello-world');
        console.log(response.data.message);
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
};
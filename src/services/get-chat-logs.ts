import axios from "axios";

export const getChat = async () => {
    try {
        const response = await axios.get('http://localhost:3000/consultar');
        console.log(response.data.message);
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
};
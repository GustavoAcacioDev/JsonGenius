import axios from "axios";

interface IChatGPTResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
    choices: [
      {
        message: {
          role: string;
          content: string;
        };
        finish_reason: string;
        index: number;
      }
    ];
}

export interface IChatList {
  isSuccess: boolean
  value: IChatListItem[]
}

export interface IChatListItem {
  id: string
  title: string
  created_at: string
}

/**
 * Função para enviar uma mensagem para o endpoint ChatGPT e obter uma resposta.
 * @param {string} message - Mensagem que será enviada para o ChatGPT.
 * @returns {Promise<string>} - Resposta gerada pelo ChatGPT.
 */

async function sendMessageToChatGPT(message: string): Promise<IChatGPTResponse> {
    try {
      const response = await axios.post('http://localhost:3000/chat', { message, chat_id: '2B25116B-BE8A-480A-8E71-B2E4BAF07F9B', user_id: '26ABD48E-2902-4C44-87FE-BA2A8760D505' });
  
      return response.data
    } catch (error) {
      console.error('Error in sendMessageToChatGPT:', error);
      throw new Error('Failed to fetch response from ChatGPT service');
    }
}

async function createChat() {
  try {
    const response = await axios.post('http://localhost:3000/novo-chat');

    return response
  } catch (error) {
    console.error('Error in createChat:', error);
    throw new Error('Failed to insert new chat into Database');  
  }
}

async function getChatList(userId: string): Promise<IChatList> {
  try {
    const response = await axios.get(`http://localhost:3000/chats?usuarioId=${userId}`);

    return response.data
  } catch (error) {
    console.error('Error in createChat:', error);
    throw new Error('Failed to get chat list');  
  }
}

export { sendMessageToChatGPT, createChat, getChatList }
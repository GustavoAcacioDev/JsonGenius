import { getToken } from "../lib/utils";
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

async function sendMessageToChatGPT(message: string, chatId: string, userId: string): Promise<IChatGPTResponse> {
    try {
      const response = await axios.post('http://localhost:3000/chat', { message, chat_id: chatId, user_id: userId });
  
      return response.data
    } catch (error) {
      console.error('Error in sendMessageToChatGPT:', error);
      throw new Error('Failed to fetch response from ChatGPT service');
    }
}

async function createChat() {
  try {
    const body = {
      userId: getToken()?.userId || ''
    }
    const response = await axios.post('http://localhost:3000/novo-chat', body);

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

async function getChatMessages(chatId: string) {
  try {
    const response = await axios.get(`http://localhost:3000/mensagens?chatId=${chatId}`);

    return response.data
  } catch (error) {
    console.error('Error in createChat:', error);
    throw new Error('Failed to get chat list');  
  }
}

async function deleteChatMessages(chatId: string) {
  try {
    const response = await axios.delete(`http://localhost:3000/chat/${chatId}/delete`);

    return response.data
  } catch (error) {
    console.error('Error in deleteChat:', error);
    throw new Error('Failed to delete chat list');  
  }
}

export { sendMessageToChatGPT, createChat, getChatList, getChatMessages, deleteChatMessages }
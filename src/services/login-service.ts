import axios from 'axios';

const loginService = async (email: string, password: string) => {
  try {
    // Send the login request
    const response = await axios.post('http://localhost:3000/login', { email, password });

    if (response.data.isSuccess) {
      const { token } = response.data.value;

      // Save the token in a cookie
      document.cookie = `authToken=${token}; max-age=3600; Secure`;

      return {
        success: true,
        message: 'Login realizado com sucesso.',
        userId: response.data.value.userId,
      };
    } else {
      // Handle errors from the server
      return {
        success: false,
        errors: response.data.errors,
      };
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);

    return {
      success: false,
      errors: ['Erro ao processar a solicitação. Verifique sua conexão e tente novamente.'],
    };
  }
};

const signupService = async (username: string, email: string, password: string) => {
  try {
    // Send the signup request
    const response = await axios.post('http://localhost:3000/signup', { username, email, password });

    if (response.data.message === 'Usuário cadastrado com sucesso.') {
      return {
        success: true,
        message: 'Usuário cadastrado com sucesso.',
      };
    } else {
      // Handle errors from the server response
      return {
        success: false,
        errors: response.data.errors || ['Erro desconhecido.'],
      };
    }
  } catch (error: any) {
    console.error('Erro ao realizar cadastro:', error);

    // Handle network or unexpected errors
    return {
      success: false,
      errors: ['Erro ao processar a solicitação. Verifique sua conexão e tente novamente.'],
    };
  }
};

export { loginService, signupService };

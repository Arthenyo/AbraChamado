import axios from "axios";
import qs from "qs";

class AuthService {
  async login(email, password) {
    const data = {
      username: email,
      password: password,
      grant_type: "password",
    };

    const clientId = "myclientid";
    const clientSecret = "myclientsecret";

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/oauth2/token",
        qs.stringify(data),
        { headers }
      );
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login", error);
      throw error;
    }
  }

  async register(name, email, password) {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8080/usuarios", data);
      return response.data;
    } catch (error) {
      console.error("Erro ao registrar usuário", error);
      throw error;
    }
  }

  async getLoggedUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.access_token) {
      throw new Error("Usuário não está autenticado");
    }

    const headers = {
      Authorization: `Bearer ${user.access_token}`,
    };

    try {
      const response = await axios.get("http://localhost:8080/usuario/me", {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao obter informações do usuário logado", error);
      throw error;
    }
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;

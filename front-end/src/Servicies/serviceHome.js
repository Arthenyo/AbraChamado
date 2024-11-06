import axios from "axios";

const baseURL = "http://localhost:8080";

const serviceHome = {
  getTotalChamados: async () => {
    try {
      const response = await axios.get(`${baseURL}/chamado/total`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar total de chamados", error);
      throw error;
    }
  },
  getTotalChamadosAbertos: async () => {
    try {
      const response = await axios.get(`${baseURL}/chamado/total-abertos`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar total de chamados abertos", error);
      throw error;
    }
  },
  getTotalChamadosFinalizados: async () => {
    try {
      const response = await axios.get(`${baseURL}/chamado/total-fechados`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar total de chamados finalizados", error);
      throw error;
    }
  },
  getTop5ChamadosAbertos: async () => {
    try {
      const response = await axios.get(`${baseURL}/chamado/top5-abertos`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar os top 5 chamados abertos", error);
      throw error;
    }
  },
  toggleFavoritarChamado: async (usuarioId, chamadoId) => {
    try {
      await axios.post(
        `${baseURL}/usuario/${usuarioId}/favoritar/${chamadoId}`
      );
    } catch (error) {
      console.error("Erro ao favoritar/desfavoritar chamado", error);
      throw error;
    }
  },
  getUltimasAnotacoes: async () => {
    try {
      const response = await axios.get(`${baseURL}/anotacoes/ultimas`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar as últimas anotações", error);
      throw error;
    }
  },
  getFavoritos: async (usuarioId) => {
    try {
      const response = await axios.get(
        `${baseURL}/usuario/${usuarioId}/favoritos`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar chamados favoritos", error);
      throw error;
    }
  },
};

export default serviceHome;

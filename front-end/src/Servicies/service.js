import axios from "axios";

const baseURL = "http://localhost:8080";

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.access_token) {
    throw new Error("Usuário não está autenticado");
  }

  return {
    Authorization: `Bearer ${user.access_token}`,
  };
};

const serviceHome = {
  async contarChamadosPorStatus(data) {
    try {
      const response = await axios.get(`${baseURL}/chamado/ContarChamadosStatus`, {
        params: { data },
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao contar chamados por status", error);
      throw error;
    }
  },

  async contarChamadosPorDia(data) {
    try {
      const response = await axios.get(`${baseURL}/chamado/contarChamados`, {
        params: { data },
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao contar chamados por dia", error);
      throw error;
    }
  },

  async obterUltimosTresChamados() {
    try {
      const response = await axios.get(`${baseURL}/chamado/ultimosTres`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao obter últimos três chamados", error);
      throw error;
    }
  },

  async salvarChamado(chamado) {
  try {
    const response = await axios.post(`${baseURL}/chamado`, chamado, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar chamado", error);
    throw error;
  }
},

async buscarChamadosPorTitulo(titulo) {
  try {
    const response = await axios.get(`${baseURL}/chamado/buscarPorTitulo`, {
      params: { titulo },
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar chamados por título", error);
    throw error;
  }
},

  async obterAuditoriasRecentes() {
    try {
      const response = await axios.get(`${baseURL}/auditoria/recentes`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao obter auditorias recentes", error);
      throw error;
    }
  },


  async obterTodosChamados(pagina, tamanho) {
    try {
      const response = await axios.get(`${baseURL}/chamado/todosChamados`, {
        params: {
          page: pagina,
          size: tamanho,
        },
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao obter todos os chamados", error);
      throw error;
    }
  },

  async buscarChamadoPorId(id) {
    try {
      const response = await axios.get(`${baseURL}/chamado/todosChamados/${id}`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao obter o chamado pelo ID", error);
      throw error;
    }
  },
  async atualizarChamado(id, chamado) {
    try {
      const response = await axios.put(`${baseURL}/chamado/${id}`, chamado, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar chamado", error);
      throw error;
    }
  },

  async assumirChamado(chamadoId, atendenteNome) {
    try {
      const response = await axios.put(
        `${baseURL}/chamado/${chamadoId}/assumir`,
        null,
        {
          params: { atendenteNome },
          headers: getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao assumir chamado', error);
      throw error;
    }
  },  
  

  async obterUsuariosPorTipo(tipoUsuario, pagina, tamanho) {
    try {
      const response = await axios.get(`${baseURL}/usuario/tipo/${tipoUsuario}`, {
        params: {
          page: pagina,
          size: tamanho,
        },
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao obter usuários por tipo", error);
      throw error;
    }
  },
  async obterTodosClientes() {
    try {
      const response = await axios.get(`${baseURL}/usuario/tipo/CLIENTE/todos`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao obter lista de clientes', error);
      throw error;
    }
  },  

  async criarCliente(cliente) {
    try {
      const response = await axios.post(`${baseURL}/usuario`, cliente, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar cliente", error);
      throw error;
    }
  },

  async atualizarCliente(id, cliente) {
    try {
      const response = await axios.put(`${baseURL}/usuario/${id}`, cliente, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar cliente", error);
      throw error;
    }
  },

  async buscarClientesPorNome(nome) {
    try {
      const response = await axios.get(`${baseURL}/usuario/buscarPorNome`, {
        params: { nome },
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar clientes por nome", error);
      throw error;
    }
  },

  async buscarAtendentesPorNome(nome) {
    try {
      const response = await axios.get(`${baseURL}/usuario/buscarAtendentesPorNome`, {
        params: { nome },
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar atendentes por nome", error);
      throw error;
    }
  },
  
  

  async criarAnotacao(anotacao) {
    try {
      const response = await axios.post(`${baseURL}/anotacoes`, anotacao, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar anotação", error);
      throw error;
    }
  },

  async atualizarAnotacao(id, anotacao) {
    try {
      const response = await axios.put(`${baseURL}/anotacoes/${id}`, anotacao, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar anotação", error);
      throw error;
    }
  },

  async deletarAnotacao(id) {
    try {
      await axios.delete(`${baseURL}/anotacoes/${id}`, {
        headers: getHeaders(),
      });
    } catch (error) {
      console.error("Erro ao deletar anotação", error);
      throw error;
    }
  },

  async obterAnotacoes() {
    try {
      const response = await axios.get(`${baseURL}/anotacoes/todas`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao obter anotações", error);
      throw error;
    }
  },

  async buscarAnotacoesPorTexto(texto) {
    try {
      const response = await axios.get(`${baseURL}/anotacoes/buscar`, {
        params: { texto },
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar anotações por texto", error);
      throw error;
    }
  },
  

  async salvarReuniao(reuniao) {
    try {
      const response = await axios.post(`${baseURL}/reuniao`, reuniao, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao salvar reunião", error);
      throw error;
    }
  },

  async atualizarReuniao(id, reuniao) {
    try {
      const response = await axios.put(`${baseURL}/reuniao/${id}`, reuniao, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar reunião", error);
      throw error;
    }
  },

  async deletarReuniao(id) {
    try {
      await axios.delete(`${baseURL}/reuniao/${id}`, {
        headers: getHeaders(),
      });
    } catch (error) {
      console.error("Erro ao deletar reunião", error);
      throw error;
    }
  },

  async obterReunioes() {
    try {
      const response = await axios.get(`${baseURL}/reuniao`, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao obter reuniões", error);
      throw error;
    }
  },

  async buscarReunioesPorTexto(texto) {
    try {
      const response = await axios.get(`${baseURL}/reuniao/buscar`, {
        params: { texto },
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar reuniões por texto", error);
      throw error;
    }
  }, 
  
  async gerarRelatorioChamadosAbertos(inicio, fim) {
    try {
      if (!inicio || !fim) {
        throw new Error('Parâmetros de data estão faltando.');
      }
      const response = await axios.get(`${baseURL}/relatorios/chamados-abertos`, {
        params: { inicio, fim },
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao gerar relatório de chamados abertos", error);
      throw error;
    }
  },
   
  // Adicionados métodos para gerar relatórios específicos

async gerarRelatorioChamadosResolvidos(inicio, fim) {
  try {
    if (!inicio || !fim) {
      throw new Error('Parâmetros de data estão faltando.');
    }
    const response = await axios.get(`${baseURL}/relatorios/chamados-resolvidos`, {
      params: { inicio, fim },
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao gerar relatório de chamados resolvidos", error);
    throw error;
  }
},

async gerarRelatorioDesempenhoTecnico(inicio, fim) {
  try {
    if (!inicio || !fim) {
      throw new Error('Parâmetros de data estão faltando.');
    }
    const response = await axios.get(`${baseURL}/relatorios/desempenho-tecnico`, {
      params: { inicio, fim },
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao gerar relatório de desempenho dos técnicos", error);
    throw error;
  }
},

async gerarRelatorioClientesAtivos(inicio, fim) {
  try {
    if (!inicio || !fim) {
      throw new Error('Parâmetros de data estão faltando.');
    }
    const response = await axios.get(`${baseURL}/relatorios/clientes-ativos`, {
      params: { inicio, fim },
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao gerar relatório de clientes ativos", error);
    throw error;
  }
},


// Exemplo de chamada para relatórios adicionais
async gerarRelatorioChamadosPorPrioridade(inicio, fim) {
  try {
    if (!inicio || !fim) {
      throw new Error('Parâmetros de data estão faltando.');
    }
    const response = await axios.get(`${baseURL}/relatorios/chamados-por-prioridade`, {
      params: { inicio, fim },
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao gerar relatório de chamados por prioridade", error);
    throw error;
  }
},

async gerarRelatorioChamadosPorSetor(inicio, fim) {
  try {
    if (!inicio || !fim) {
      throw new Error('Parâmetros de data estão faltando.');
    }
    const response = await axios.get(`${baseURL}/relatorios/chamados-por-setor`, {
      params: { inicio, fim },
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao gerar relatório de chamados por setor", error);
    throw error;
  }
},

  
};

export default serviceHome;

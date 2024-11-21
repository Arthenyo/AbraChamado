import { BrowserRouter, Route, Routes, Navigate  } from "react-router-dom";
import Home from "../pages/home/Home";
import Chamados from "../pages/chamados/Chamados";
import Clientes from "../pages/clientes/Clientes";
import Atendentes from "../pages/atendentes/Atendentes";
import Anotacoes from "../pages/anotacoes/Anotacoes";
import Reuniao from "../pages/reuniao/Reuniao";
import Relatorios from "../pages/relatorios/Relatorios";
import DetalhesChamado from "../pages/chamados/DetalhesChamado";
import FormularioCliente from "../pages/clientes/FormularioCliente";
import Login from "../pages/login/Login"; // Importando a página de Login
import AtendenteForm from "../pages/atendentes/AtendenteForm"; // Importando a página do formulário de Atendente
import AbrirChamado from '../pages/abrirChamado/AbrirChamado';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chamados" element={<Chamados />} />
        <Route path="/chamados/:id" element={<DetalhesChamado />} />
        <Route path="/abrir-chamado" element={<AbrirChamado />} />
        <Route path="/abrir-chamado/:id" element={<AbrirChamado />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/novo" element={<FormularioCliente />} />
        <Route path="/clientes/:id/editar" element={<FormularioCliente />} />
        <Route path="/atendentes" element={<Atendentes />} />
        <Route path="/atendentes/novo" element={<AtendenteForm />} />
        <Route path="/atendentes/:id/editar" element={<AtendenteForm />} />
        <Route path="/anotacoes" element={<Anotacoes />} />
        <Route path="/reuniao" element={<Reuniao />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </BrowserRouter>
  );
}

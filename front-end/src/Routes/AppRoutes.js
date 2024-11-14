import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Chamados from "../pages/chamados/Chamados";
import Clientes from "../pages/clientes/Clientes";
import Atendentes from "../pages/atendentes/Atendentes";
import Anotacoes from "../pages/anotacoes/Anotacoes";
import Reuniao from "../pages/reuniao/Reuniao";
import Relatorios from "../pages/relatorios/Relatorios";
import DetalhesChamado from "../pages/chamados/DetalhesChamado";
import FormularioCliente from "../pages/clientes/FormularioCliente";
import FormularioAtendente from "../pages/atendentes/AtendenteForm";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chamados" element={<Chamados />} />
        <Route path="/chamados/:id" element={<DetalhesChamado />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/novo" element={<FormularioCliente />} />
        <Route path="/clientes/:id/editar" element={<FormularioCliente />} />
        <Route path="/atendentes" element={<Atendentes />} />
        <Route path="/atendentes/novo" element={<FormularioAtendente />} />
        <Route path="/atendentes/:id/editar" element={<FormularioAtendente />} />
        <Route path="/anotacoes" element={<Anotacoes />} />
        <Route path="/reuniao" element={<Reuniao />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </BrowserRouter>
  );
}

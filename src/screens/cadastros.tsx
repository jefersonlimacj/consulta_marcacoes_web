import styled from "styled-components";
import { BaseTelas } from "../components/baseTelas";
import {
  Calendar1,
  UserRoundPlus,
} from "lucide-react";
import { BtnCadastrarUsuario } from "./modals/usuario";
import { BtnCadastrarLider } from "./modals/lider";
import { BtnCadastrarMedico } from "./modals/medico";
import { BtnCadastrarEspecialidade } from "./modals/especialidade";

function Cadastros() {
  return BaseTelas({
    conteudo: <CadastrosConteudo />,
  });
}

function CadastrosConteudo() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p>Área de Cadastros</p>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <BtnCadastrar>
          <Calendar1 size={40} />
          <p>Agendamento</p>
        </BtnCadastrar>
        <BtnCadastrar>
          <UserRoundPlus size={40} />
          <p>Paciente</p>
        </BtnCadastrar>
        <BtnCadastrarEspecialidade/>
        <BtnCadastrarMedico />
        <BtnCadastrarLider />
        <BtnCadastrarUsuario />
      </div>
    </div>
  );
}

export default Cadastros;

const BtnCadastrar = styled.div`
  aspect-ratio: 1;
  height: 150px;
  background-color: #f8f8f8;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 1px 1px 2px #00000010;
  border: 1px solid #00000020;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    height: 152px;
    background-color: #f2f9ff;
    box-shadow: 4px 4px 5px #00004430;
  }

  &:active {
    background-color: #99ddff90;
  }
`;

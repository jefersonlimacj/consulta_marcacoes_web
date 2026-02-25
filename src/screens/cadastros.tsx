import { BaseTelas } from "../components/baseTelas";
import { BtnCadastrarUsuario } from "./modals/usuario";
import { BtnCadastrarLider } from "./modals/lider";
import { BtnCadastrarMedico } from "./modals/medico";
import { BtnCadastrarEspecialidade } from "./modals/especialidade";
import { BtnCadastrarPaciente } from "./modals/paciente";
import { BtnNovaMarcacao } from "./modals/marcacao";
import { Loader2, RefreshCcw } from "lucide-react";
import styled from "styled-components";
import { usePacientes } from "../hook/usePaciente";
import { useLideres } from "../hook/useLider";
import { useMedicos } from "../hook/useMedico";
import { useState } from "react";

function Cadastros() {
  return BaseTelas({
    conteudo: <CadastrosConteudo />,
  });
}

function CadastrosConteudo() {
  const {
    pacientes,
    loading: cPacientes,
    refetch: atualizarPacientes,
  } = usePacientes();
  const { lideres, loading: cLideres, refetch: atualizarLiders } = useLideres();
  const {
    medicos,
    loading: cMedicos,
    refetch: atualizarMedicos,
  } = useMedicos();

  console.log(pacientes, lideres, medicos);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p>Área de Cadastros</p>
      <div
        style={{
          width: "100%",
          height: "28%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <BtnNovaMarcacao />
        <BtnCadastrarPaciente />
        <BtnCadastrarEspecialidade />
        <BtnCadastrarMedico />
        <BtnCadastrarLider />
        <BtnCadastrarUsuario />
      </div>
      <div
        style={{
          width: "100%",
          height: "72%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <ListaCadastrados
          l={pacientes}
          c={cPacientes}
          a={atualizarPacientes}
          tipo={"Pacientes"}
        />
        <ListaCadastrados
          l={lideres}
          c={cLideres}
          a={atualizarLiders}
          tipo={"Líderes"}
        />
        <ListaCadastrados
          l={medicos}
          c={cMedicos}
          a={atualizarMedicos}
          tipo={"Médicos"}
        />
      </div>
    </div>
  );
}

function ListaCadastrados({
  l,
  c,
  a,
  tipo,
}: {
  l: any;
  c: any;
  a: any;
  tipo: any;
}) {
  const [busca, setBusca] = useState("");

  function normalizarTexto(texto: string) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const lista = l?.filter((r: any) => {
    const nome = normalizarTexto(busca);

    const bNome = normalizarTexto(r.nome);

    const porNome = bNome.includes(nome);

    return porNome;
  });

  return (
    <div
      style={{
        width: "32%",
        height: "100%",
        backgroundColor: "#f8f8f8",
        boxShadow: "1px 1px 2px #22222220",
        borderRadius: 10,
        border: "1px solid #00000020",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "15%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextoEntrada
          largura="85%"
          onChange={(e) => {
            setBusca(e.target.value);
          }}
          placeholder={tipo}
          type="text"
          value={busca}
        />
        <BtnRefresh
          onClick={() => {
            a();
          }}
        >
          <RefreshCcw />
        </BtnRefresh>
      </div>
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "85%",
          display: "flex",
          flexDirection: "column",
          alignItems: c ? "center" : "flex-start",
          overflow: "auto",
          padding: 5,
        }}
      >
        {c ? (
          <Loader2 className="animate-spin" />
        ) : (
          lista.map((r: any) => {
            return <p>{r.nome}</p>;
          })
        )}
      </div>
    </div>
  );
}

function TextoEntrada({
  placeholder,
  onChange,
  value,
  type,
  largura,
}: {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  largura: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: largura,
        height: 40,
        backgroundColor: "#DFDFDF ",
        padding: 10,
        borderRadius: 22,
      }}
    >
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        style={{
          backgroundColor: "transparent",
          color: "black",
          border: "none",
          outline: "none",
          width: "100%",
        }}
      />
    </div>
  );
}

const BtnRefresh = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50px;
  background-color: #d4d4d4;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: #b4b4b4;
    box-shadow: 2px 2px 2px #55555520;
  }

  &:active {
    scale: 1.02;
  }
`;

export default Cadastros;

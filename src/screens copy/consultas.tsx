import styled from "styled-components";
import { BaseTelas } from "../components/baseTelas";
import { useEditMarcacao, useMarcacoes } from "../hook/useMarcacoes";
import { ArrowBigRightDash } from "lucide-react";
import { useState } from "react";

function Consultas() {
  return BaseTelas({
    conteudo: <ConsultasConteudo />,
  });
}

function ConsultasConteudo() {
  const { marcacoes, refetch } = useMarcacoes();

  const [id, setId] = useState<string>("");
  const [loadingId, setLoadingId] = useState<string>("");

  // const listaMarcacoes = marcacoes.filter((e) => e.status === "REALIZADO");

  const { editar, error } = useEditMarcacao();

  const editarMarcacao = async (idLinha: string) => {
    setLoadingId(idLinha);
    const novoStatus = "MARCADO";

    const res = await editar(idLinha, {
      status: novoStatus,
    });

    if (res?.id) {
      console.log(id, "editado");
      setId("");
      await refetch();
    } else {
      alert(error);
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <p style={{ textAlign: "center", marginBottom: 20 }}>
        Lista de Marcações Pendentes
      </p>
      {marcacoes.map((marcacao: any) => {
        return (
          <LinhaMarcacao
            loadingId={loadingId}
            marcacao={marcacao}
            editarMarcacao={editarMarcacao}
          />
        );
      })}
    </div>
  );
}

export default Consultas;

const LinhaMarcacaoStyled = styled.div`
  margin-bottom: 10px;
  background-color: #e4e4e4;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  border-left: 5px solif #00ff00;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: all ease-in-out 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #d4d4d4;
  }
`;

function LinhaMarcacao({ marcacao, editarMarcacao, loadingId }: any) {
  return (
    <>
      <LinhaMarcacaoStyled key={marcacao.id}>
        <p>{marcacao.paciente.nome}</p>
        <DividerV/>
        <p>{formatarNSus(marcacao.paciente.nSus)}</p>
       <DividerV/>
        <p>{formatarData(marcacao.paciente.dataNascimento)}</p>
       <DividerV/>
        <p>{formatarCPF(marcacao.paciente.cpf)}</p>
       <DividerV/>
        <p>{marcacao.especialidade.nome}</p>
       <DividerV/>
        <p>{marcacao.tipoExame}</p>
       <DividerV/>
        <p>{formatarTelefone(marcacao.paciente.telefone)}</p>
        <button onClick={() => editarMarcacao(marcacao.id)}>
          {loadingId === marcacao.id ? "aguarde" : "Marcado"}
        </button>
        <ArrowBigRightDash />
      </LinhaMarcacaoStyled>
    </>
  );
}

function DividerV(){
  return <div style={{ height: 20, width: 1, backgroundColor: "#AAA" }} />
}

function formatarNSus(valor: string) {
  if (!valor) return "";
  return valor
    .replace(/\D/g, "") // garante só números
    .replace(/^(\d{3})(\d{4})(\d{4})(\d{4}).*/, "$1 $2 $3 $4");
}

function formatarTelefone(valor: string) {
  if (!valor) return "";
  return valor
    .replace(/\D/g, "") // só números
    .replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, "$1 $2 $3-$4");
}

function formatarCPF(valor: string) {
  if (!valor) return "";
  return valor
    .replace(/\D/g, "") // mantém só números
    .replace(/(\d{3})(\d)/, "$1.$2") // 000.
    .replace(/(\d{3})(\d)/, "$1.$2") // 000.000.
    .replace(/(\d{3})(\d{2})$/, "$1-$2"); // 000.000.000-00
}

function formatarData(dataISO: string) {
  if (!dataISO) return "";
  const data = new Date(dataISO);
  const dia = String(data.getUTCDate()).padStart(2, "0");
  const mes = String(data.getUTCMonth() + 1).padStart(2, "0");
  const ano = data.getUTCFullYear();
  return `${dia}/${mes}/${ano}`;
}

import { AlarmClock, LoaderCircle } from "lucide-react";
import styled from "styled-components";

interface LinhaMarcacaoProps {
  $borderLeft: string;
}

const LinhaMarcacaoStyled = styled.div<LinhaMarcacaoProps>`
  margin-bottom: 5px;
  background-color: #d9d9d9;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  border-left: 3px solid ${({ $borderLeft }) => $borderLeft};
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: all ease-in-out 0.2s;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #d9d9d9;
    border: 1px solid ${({ $borderLeft }) => $borderLeft}50;
    border-left: 5px solid ${({ $borderLeft }) => $borderLeft};
  }
`;

export function LinhaMarcacao({ marcacao, editarMarcacao, loadingId }: any) {
  return (
    <>
      <LinhaMarcacaoStyled
        $borderLeft={
          marcacao.status === "AGUARDANDO"
            ? "#0099ff"
            : marcacao.status === "MARCADO"
            ? "#008000"
            : ""
        }
      >
        {marcacao?.retorno ? (
          <div
            style={{
              height: 20,
              width: 50,
              backgroundColor: "yellowgreen",
              borderTop: "1px solid #303f0f",
              borderBottom: "1px solid #303f0f",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              transform: `rotate(-45deg)`,
              top: 0,
              left: -15,
            }}
          >
            <p style={{ fontWeight: 700, color: "#303f0f", fontSize: 11 }}>
              RET
            </p>
          </div>
        ) : null}
        <div
          style={{
            width: "15%",
            height: 30,
            borderRight: "1px solid #999",
            padding: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{marcacao.paciente.nome}</p>
        </div>
        <div
          style={{
            width: "15%",
            height: 30,
            borderRight: "1px solid #999",
            padding: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{formatarNSus(marcacao.paciente.nSus)}</p>
        </div>

        <div
          style={{
            width: "10%",
            height: 30,
            borderRight: "1px solid #999",
            padding: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{formatarCPF(marcacao.paciente.cpf)}</p>
        </div>

        <div
          style={{
            width: "10%",
            height: 30,
            borderRight: "1px solid #999",
            padding: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{formatarData(marcacao.paciente.dataNascimento)}</p>
        </div>

        <div
          style={{
            width: "15%",
            height: 30,
            borderRight: "1px solid #999",
            padding: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{marcacao.especialidade.nome}</p>
        </div>

        <div
          style={{
            width: "15%",
            height: 30,
            borderRight: "1px solid #999",
            padding: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{marcacao.tipoExame}</p>
        </div>

        <div
          style={{
            width: "10%",
            height: 30,
            borderRight: "1px solid #999",
            padding: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>{formatarTelefone(marcacao.paciente.telefone)}</p>
        </div>
        <div
          style={{
            width: "5%",
            height: 30,
            padding: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "2px 2px 3px #00000010",
            }}
            onClick={() => editarMarcacao(marcacao.id)}
          >
            {loadingId === marcacao.id ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <AlarmClock size={18} />
            )}
          </button>
        </div>
      </LinhaMarcacaoStyled>
    </>
  );
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

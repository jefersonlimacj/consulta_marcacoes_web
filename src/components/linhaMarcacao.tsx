import { CircleCheck, CircleX, LoaderCircle } from "lucide-react";
import styled from "styled-components";

interface LinhaMarcacaoProps {
  $borderLeft: string;
}

const LinhaMarcacaoStyled = styled.div<LinhaMarcacaoProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #d9d9d9;
  margin-bottom: 5px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid #ccc;
  border-left: 3px solid ${({ $borderLeft }) => $borderLeft};
  transition: all ease-in-out 0.2s;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #d1d1d9;
  }
`;

export function LinhaMarcacao({
  marcacao,
  editarMarcacao,
  cancelarMarcacao,
  loadingId,
  setOpen,
  setMarcacaoSelecionada,
}: any) {
  return (
    <>
      <LinhaMarcacaoStyled
        onClick={() => {
          setOpen(true);
          setMarcacaoSelecionada(marcacao);
        }}
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
            width: "20%",
            height: 30,
            borderRight: "1px solid #999",
            padding: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              width: "100%",
              textAlign: "left",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {marcacao.paciente.nome}
          </p>
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
          <p
            style={{
              width: "100%",
              textAlign: "center",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {formatarNSus(marcacao.paciente.nSus)}
          </p>
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
          <p
            style={{
              width: "100%",
              textAlign: "center",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {marcacao.especialidade.nome}
          </p>
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
          <p
            style={{
              width: "100%",
              textAlign: "center",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {marcacao.tipoExame}
          </p>
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
            width: "8%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <BtnActions
            editar={() => editarMarcacao(marcacao.id)}
            remover={() => cancelarMarcacao(marcacao.id)}
            idMarcacao={marcacao.id}
            loadingId={loadingId}
          />
        </div>
      </LinhaMarcacaoStyled>
    </>
  );
}

const BtnEsqConfirm = styled.div`
  width: 50%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  transition: all ease-in-out 0.2s;
  border-radius: 10px 0 0 10px;

  &:hover {
    background-color: #0dac4b44;
  }

  &:active {
    background-color: #0dac4b90;
  }
`;

const BtnDirRemove = styled.div`
  width: 50%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  transition: all ease-in-out 0.2s;
  border-radius: 0 10px 10px 0;
  border-left: 1px solid #55555550;

  &:hover {
    background-color: #f84e3c44;
  }
  &:active {
    background-color: #f84e3c90;
  }
`;

function BtnActions({
  editar,
  remover,
  idMarcacao,
  loadingId,
}: {
  editar: () => void;
  remover: () => void;
  idMarcacao: string;
  loadingId: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#F4F4F4",
        borderRadius: 10,
        marginRight: 5,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <BtnEsqConfirm onClick={editar}>
        {loadingId === idMarcacao ? (
          <LoaderCircle size={18} className="animate-spin" color="#0dac4b" />
        ) : (
          <CircleCheck size={18} color="#0dac4b" />
        )}
      </BtnEsqConfirm>

      <BtnDirRemove onClick={remover}>
        {loadingId === idMarcacao ? (
          <LoaderCircle size={18} className="animate-spin" color="#f84e3c" />
        ) : (
          <CircleX size={18} color="#f84e3c" />
        )}
      </BtnDirRemove>
    </div>
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

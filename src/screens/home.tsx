import { useState } from "react";
import { BaseTelas } from "../components/baseTelas";
import { useEditMarcacao, useMarcacoes } from "../hook/useMarcacoes";
// import { useUsers } from "../hook/useAdmin";
import { LinhaMarcacao } from "../components/linhaMarcacao";
import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import styled from "styled-components";

function Home() {
  return (
    <>
      <BaseTelas conteudo={<HomeConteudo />} />
    </>
  );
}

export default Home;

function HomeConteudo() {
  const { marcacoes, refetch } = useMarcacoes();
  // const { usuarios } = useUsers();

  const [loadingId, setLoadingId] = useState<string>("");
  const { editar, error } = useEditMarcacao();
  const [cxModal, setCxModal] = useState<boolean>(false);
  const [marcacaoSelecionada, setMarcacaoSelecionada] = useState<any>({});

  const [fPaciente, setfPaciente] = useState<string>("");
  const [fEspecialidade, setfEspecialidade] = useState<string>("");

  const listaMarcacoes = marcacoes.filter((e) => e.status === "AGUARDANDO");

  const editarMarcacao = async (idLinha: string) => {
    setLoadingId(idLinha);
    const novoStatus = "MARCADO";

    const res = await editar(idLinha, {
      status: novoStatus,
    });

    if (res?.id) {
      setLoadingId("0");
      await refetch();
    } else {
      alert(error);
    }
  };
  const cancelarMarcacao = async (idLinha: string) => {
    setLoadingId(idLinha);
    const novoStatus = "CANCELADO";

    const res = await editar(idLinha, {
      status: novoStatus,
    });

    if (res?.id) {
      setLoadingId("0");
      await refetch();
    } else {
      alert(error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        fontSize: 14,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
      }}
    >
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ textAlign: "center", fontSize: 22, fontWeight: 500 }}>
          Lista de Marcações Pendentes
        </p>
      </div>

      <div
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextoEntrada
          placeholder="Pesquise pelo nome do Paciente"
          largura="40%"
          onChange={(e) => setfPaciente(e.target.value)}
          type="text"
          value={fPaciente}
        />
        <TextoEntrada
          placeholder="Pesquise pela Especialidade"
          largura="40%"
          onChange={(e) => setfEspecialidade(e.target.value)}
          type="text"
          value={fEspecialidade}
        />
        <div
          style={{
            width: "10%",
            padding: 5,
            backgroundColor: "#0090ff90",
            borderRadius: 14,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => refetch()}
        >
          Recarregar
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "42px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#0099BB",
          marginBottom: 10,
          borderRadius: 5,
          borderLeft: "3px solid #0099BB",
        }}
      >
        <div
          style={{
            width: "20%",
            color: "#f0f0f0",
            borderRight: "1px solid #DDD",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Paciente</p>
        </div>
        <div
          style={{
            width: "15%",
            color: "#f0f0f0",
            borderRight: "1px solid #DDD",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Nº SUS
        </div>
        <div
          style={{
            width: "10%",
            color: "#f0f0f0",
            borderRight: "1px solid #DDD",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          CPF
        </div>
        <div
          style={{
            width: "10%",
            color: "#f0f0f0",
            borderRight: "1px solid #DDD",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Data Nasc.
        </div>
        <div
          style={{
            width: "10%",
            color: "#f0f0f0",
            borderRight: "1px solid #DDD",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Especialidade
        </div>
        <div
          style={{
            width: "15%",
            color: "#f0f0f0",
            borderRight: "1px solid #DDD",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Tipo
        </div>
        <div
          style={{
            width: "10%",
            color: "#f0f0f0",
            borderRight: "1px solid #DDD",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Telefone
        </div>
        <div
          style={{
            width: "8%",
            color: "#f0f0f0",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Ações
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "auto",
          overflowY: "auto",
          scrollbarWidth: "none",
          paddingBottom: 10,
        }}
      >
        {(
          listaMarcacoes?.filter((p) => {
            const porNome = p.paciente.nome
              .toLowerCase()
              .includes(fPaciente.toLocaleLowerCase());
            const porEspecialidade = p.especialidade.nome
              .toLocaleLowerCase()
              .includes(fEspecialidade.toLocaleLowerCase());
            return porNome && porEspecialidade;
          }) || []
        ).map((marcacao) => {
          return (
            <LinhaMarcacao
              key={marcacao.id}
              loadingId={loadingId}
              marcacao={marcacao}
              editarMarcacao={editarMarcacao}
              cancelarMarcacao={cancelarMarcacao}
              setMarcacaoSelecionada={setMarcacaoSelecionada}
              setOpen={() => setCxModal(true)}
            />
          );
        })}
      </div>
      <ModalMarcacao
        open={cxModal}
        setOpen={setCxModal}
        marcacao={marcacaoSelecionada}
      />
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

function ModalMarcacao({
  open,
  setOpen,
  marcacao,
}: {
  open: boolean;
  setOpen: any;
  marcacao: any;
}) {
  const [loadingId, setLoadingId] = useState<string>("");

  const { editar, error } = useEditMarcacao();

  const editarMarcacao = async (idLinha: string) => {
    setLoadingId(idLinha);
    const novoStatus = "MARCADO";

    const res = await editar(idLinha, {
      status: novoStatus,
    });

    if (res?.id) {
      setLoadingId("0");
    } else {
      alert(error);
    }
  };

  const cancelarMarcacao = async (idLinha: string) => {
    setLoadingId(idLinha);
    const novoStatus = "CANCELADO";

    const res = await editar(idLinha, {
      status: novoStatus,
    });

    if (res?.id) {
      setLoadingId("0");
    } else {
      alert(error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        opacity: open ? 1 : 0,
        position: "absolute",
        backgroundColor: "#F4F4F490",
        backdropFilter: "blur(2px)",
        pointerEvents: open ? "auto" : "none",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        transition: "all ease-in-out 0.3s",
      }}
      onClick={() => {
        setOpen(false);
      }}
    >
      <div
        style={{
          width: "50%",
          scale: open ? 1 : 0.5,
          backgroundColor: "#F4F4F4",
          boxShadow: "5px 5px 10px #55555520",
          borderRadius: 22,
          border: "1px solid #DDD",
          transition: "all ease-in-out 0.3s",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 10,
          gap: 15,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: 10,
            backgroundColor: "#E4E4E4",
            width: "100%",
            borderRadius: 16,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p style={{ fontSize: 12 }}>Paciente</p>
            <p style={{ fontSize: 18, fontWeight: 600 }}>
              {marcacao?.paciente?.nome || "Aguarde..."}
            </p>
            <p style={{ fontSize: 12 }}>
              Liderança:{" "}
              <a style={{ fontSize: 16, fontWeight: 500 }}>
                {marcacao?.lider?.nome}
              </a>
            </p>
          </div>
          <div
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p style={{ fontSize: 12 }}>
              Nº CPF:{" "}
              <strong style={{ fontSize: 16 }}>
                {marcacao?.paciente?.cpf}
              </strong>
            </p>
            <p style={{ fontSize: 12 }}>
              Nº SUS:{" "}
              <strong style={{ fontSize: 16 }}>
                {marcacao?.paciente?.nSus}
              </strong>
            </p>
            <p style={{ fontSize: 12 }}>
              Data Nasc:{" "}
              <strong style={{ fontSize: 16 }}>
                {formatarData(marcacao?.paciente?.dataNascimento)}
              </strong>
            </p>
          </div>
        </div>
        <div
          style={{
            padding: 10,
            backgroundColor: "#E4E4E4",
            width: "100%",
            borderRadius: 16,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
          }}
        >
          <p>Contatos</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              fontWeight: 600,
            }}
          >
            <p>Paciente:</p>
            <p>{marcacao?.paciente?.telefone || "-"}</p>
            <p>/</p>
            <p>{marcacao?.paciente?.telefoneS || "-"}</p>
          </div>
          <p>|</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              fontWeight: 600,
            }}
          >
            <p>Liderança:</p>
            <p>{marcacao?.lider?.telefone || "-"}</p>
          </div>
        </div>
        <div
          style={{
            padding: 10,
            backgroundColor: "#E4E4E4",
            width: "100%",
            borderRadius: 16,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p style={{ fontSize: 12 }}>Especialidade</p>
            <p style={{ fontSize: 18, fontWeight: 600 }}>
              {marcacao?.especialidade?.nome || "Aguarde..."}
            </p>
          </div>
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#FF990050",
              borderRadius: 12,
              padding: 10,
            }}
          >
            <p style={{ fontSize: 12 }}>
              Tipo de Exame:{" "}
              <a style={{ fontSize: 16, color: "#555555", fontWeight: 500 }}>
                {marcacao?.tipoExame}
              </a>
            </p>
          </div>
        </div>
        {marcacao?.retorno && (
          <div
            style={{
              padding: 10,
              backgroundColor: "#55FF0050",
              width: "100%",
              borderRadius: 16,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p style={{ fontSize: 12 }}>Retorno</p>
              <p style={{ fontSize: 12, fontWeight: 600 }}>
                Data da consulta:{" "}
                <a style={{ fontSize: 14, fontWeight: 700 }}>
                  {formatarData(marcacao?.dataMarcada) || "Aguarde..."}
                </a>
              </p>
            </div>
            <div
              style={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#88FF0050",
                borderRadius: 12,
                padding: 10,
              }}
            >
              <p style={{ fontSize: 12 }}>
                Médico:{" "}
                <a style={{ fontSize: 16, color: "#555555", fontWeight: 500 }}>
                  {marcacao?.medico?.nome} | {marcacao?.medico?.crm}
                </a>
              </p>
            </div>
          </div>
        )}
        <div
          style={{
            width: "100%",
            height: 100,
            backgroundColor: "#FFF",
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            padding: 10,
          }}
        >
          <p>Observação:</p>
          <p>{marcacao?.observacoes}</p>
        </div>
        <div
          style={{
            width: "100%",
            borderRadius: 16,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 15,
          }}
        >
          <BtnAcao onClick={()=>(editarMarcacao(marcacao?.id))}>
            {loadingId ? <Loader2 className="animate-spin"/> : <CircleCheck color="#0dac4b" />}
            <p>Marcado</p>
          </BtnAcao>
          <BtnAcao onClick={() => cancelarMarcacao(marcacao?.id)}>
            <CircleX color="#f84e3c" />
            <p>Cancelar</p>
          </BtnAcao>
        </div>
      </div>
    </div>
  );
}

const BtnAcao = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #22222220;
  transition: all ease-in-out 0.1s;

  &:hover {
    scale: 1.02;
    box-shadow: 3px 3px 3px #22222220;
  }
`;

function formatarData(dataISO: string) {
  if (!dataISO) return "";
  const data = new Date(dataISO);
  const dia = String(data.getUTCDate()).padStart(2, "0");
  const mes = String(data.getUTCMonth() + 1).padStart(2, "0");
  const ano = data.getUTCFullYear();
  return `${dia}/${mes}/${ano}`;
}

import { useState } from "react";
import { BaseTelas } from "../components/baseTelas";
import { useEditMarcacao, useMarcacoes } from "../hook/useMarcacoes";
// import { useUsers } from "../hook/useAdmin";
import { LinhaMarcacao } from "../components/linhaMarcacao";

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
  const [cxModal, setCxModal] = useState<boolean>(false);
  const [marcacaoSelecionada, setMarcacaoSelecionada] = useState<any>({});

  const [fPaciente, setfPaciente] = useState<string>("");
  const [fEspecialidade, setfEspecialidade] = useState<string>("");

  const listaMarcacoes = marcacoes.filter((e) => e.status === "AGUARDANDO");

  const { editar, error } = useEditMarcacao();

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
          width: "30%",
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
        <p>{marcacao?.paciente?.nome || "Aguarde..."}</p>
        <p>{marcacao?.especialidade?.nome || "Aguarde..."}</p>
      </div>
    </div>
  );
}

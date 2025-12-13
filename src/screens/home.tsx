import { useState } from "react";
import { BaseTelas } from "../components/baseTelas";
import { useEditMarcacao, useMarcacoes } from "../hook/useMarcacoes";
import { useUsers } from "../hook/useAdmin";
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
  const { usuarios } = useUsers();

  const [loadingId, setLoadingId] = useState<string>("");

  const [fPaciente, setfPaciente] = useState<string>("");
  const [fEspecialidade, setfEspecialidade] = useState<string>("");

  const listaMarcacoes = marcacoes.filter((e) => e.status === "AGUARDANDO");

  const { editar, error } = useEditMarcacao();

  console.log(marcacoes);
  console.log(usuarios);

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

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        fontSize: 14,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          height: "5%",
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
          height: "10%",
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
        <button onClick={() => refetch()}>Recarregar</button>
      </div>
      <div
        style={{
          height: "5%",
          width: "100%",
          backgroundColor: "#0099BB",
          display: "flex",
          flexDirection: "row",
          marginBottom: 10,
          borderRadius: 5,
        }}
      >
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
          <p>Paciente</p>
        </div>
        <div
          style={{
            width: "15%",
            color: "#f0f0f0",
            borderRight: "1px solid #DDD",
            padding: 5,
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
            padding: 5,
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
            padding: 5,
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
            width: "15%",
            color: "#f0f0f0",
            borderRight: "1px solid #DDD",
            padding: 5,
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
            padding: 5,
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
            padding: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Telefone
        </div>
        {/* <div style={{ width: "10%" }}>{""}</div> */}
      </div>
      <div
        style={{
          width: "100%",
          height: "80%",
          overflowY: "auto",
          scrollbarWidth: "none",
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
            />
          );
        })}
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

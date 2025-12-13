import { useState } from "react";
import { BaseTelas } from "../components/baseTelas";
import { useEditMarcacao, useMarcacoes } from "../hook/useMarcacoes";
import { LoaderCircle } from "lucide-react";
import styled from "styled-components";
import { useUsers } from "../hook/useAdmin";

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

  const [loadingId, setLoadingId] = useState<string>("");

  const [fPaciente, setfPaciente] = useState<string>("");
  const [fEspecialidade, setfEspecialidade] = useState<string>("");

  const listaMarcacoes = marcacoes.filter((e) => e.status === "REALIZADO");

  const { editar, error } = useEditMarcacao();

  const { usuarios } = useUsers();

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
        fontSize: 14,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p style={{ textAlign: "center", marginBottom: 20 }}>
        Lista de Marcações Pendentes
      </p>
      <div
        style={{
          width: "98%",
          height: 70,
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
        <button>Atualizar</button>
      </div>
      {/* <button onClick={() => refetch()}>Recarregar</button> */}
      <div
        style={{
          height: 30,
          width: "98%",
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
  );
}

const LinhaMarcacaoStyled = styled.div`
  margin-bottom: 5px;
  background-color: #e4e4e4;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  border-left: 3px solid #0099FF;
  width: 98%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: all ease-in-out 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #d9d9d9;
    border: 1px solid #0050ff50;
    border-left: 5px solid #0099ff;
  }
`;

function LinhaMarcacao({ marcacao, editarMarcacao, loadingId }: any) {
  return (
    <>
      <LinhaMarcacaoStyled>
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
            width: "10%",
            height: 30,
            padding: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              width: 100,
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
              "Marcado"
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

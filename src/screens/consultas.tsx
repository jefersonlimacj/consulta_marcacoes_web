import { BaseTelas } from "../components/baseTelas";
import { useEditMarcacao, useMarcacoes } from "../hook/useMarcacoes";
import { useState } from "react";
import { LinhaMarcacao } from "../components/linhaMarcacao";

function Consultas() {
  return BaseTelas({
    conteudo: <ConsultasConteudo />,
  });
}

function ConsultasConteudo() {
  const { marcacoes, refetch } = useMarcacoes();

  const [id, setId] = useState<string>("");
  const [loadingId, setLoadingId] = useState<string>("");

  const listaMarcacoes = marcacoes.filter(
    (e) => e.status === "MARCADO" || e.status === "CANCELADO",
  );

  const marcados = marcacoes.filter((e) => e.status === "MARCADO");
  const pendentes = marcacoes.filter((e) => e.status === "AGUARDANDO");
  const cancelados = marcacoes.filter((e) => e.status === "CANCELADO");

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
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <ModuloResumo
          titulo="Total Marcações"
          qnt={marcacoes.length}
          cor="#2563EB"
        />
        <ModuloResumo titulo="Marcados" qnt={marcados.length} cor="#16A34A" />
        <ModuloResumo titulo="Pendentes" qnt={pendentes.length} cor="#D97706" />
        <ModuloResumo
          titulo="Cancelados"
          qnt={cancelados.length}
          cor="#DC2626"
        />
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        {listaMarcacoes.map((marcacao: any) => {
          return (
            <LinhaMarcacao
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

function ModuloResumo({
  titulo,
  qnt,
  cor,
}: {
  titulo: string;
  qnt: number;
  cor: string;
}) {
  return (
    <div
      style={{
        width: "25%",
        height: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderRadius: 22,
        border: `1px solid ${cor}`,
        backgroundColor: cor + 70,
      }}
    >
      <p style={{ fontWeight: 600 }}>{titulo}</p>
      <p style={{fontWeight: 900, fontSize:40, color: "#00000099"}}>{qnt}</p>
    </div>
  );
}

export default Consultas;

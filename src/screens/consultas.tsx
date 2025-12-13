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

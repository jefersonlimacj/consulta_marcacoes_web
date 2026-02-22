import { Loader2, LogOut } from "lucide-react";
import { BarChart, ResponsiveContainer } from "recharts";
import { useState, type JSX } from "react";
import styled from "styled-components";
import { BtnNovaParticipacao } from "./modals/participacao";
import { BtnCadastrarPacienteMenor } from "./modals/pacienteBtnMenor";
import { usePacientes } from "../hook/usePaciente";
import { useParticipacoes } from "../hook/useParticipacao";
import { LinhaParticipacao } from "../components/linhaParticipacao";
import { ModalParticipacaoEdit } from "./modals/participacaoEdit";
import { useNavigate } from "react-router-dom";
import { Bar, Pie, PieChart, XAxis, YAxis } from "recharts";
import { useUser } from "../hook/useAdmin";

function Painel() {
  const { participacoes } = useParticipacoes();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "auto",
        scrollbarWidth: "none",
        gap: 10,
        padding: 10,
      }}
    >
      <TopoResumo p={participacoes} />
      <LinhaGraficos p={participacoes} />
      <DetalhesEspecialidades p={participacoes} />
    </div>
  );
}

function TopoResumo({ p }: { p: any }) {
  const aguardando = p.filter((s: any) => s.statusFeira === "AGUARDANDO");
  const confirmado = p.filter((s: any) => s.statusFeira === "CONFIRMADA");
  const naoAtende = p.filter((s: any) => s.statusFeira === "PENDENTE");

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        padding: 10,
        gap: 10,
      }}
    >
      <h3 style={{ fontWeight: 600 }}>
        Dashboard Feira de Saúde 2026 | Pré-Atendimento
      </h3>
      <div style={{ width: "100%", height: 1, backgroundColor: "#00000050" }} />
      <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <div
          style={{
            width: "25%",
            height: 120,
            backgroundColor: "#6abbfa",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontWeight: 500, color: "#284760" }}>
            Total de Solicitações
          </p>
          <p style={{ fontWeight: 700, fontSize: 48, color: "#284760" }}>
            {p.length}
          </p>
        </div>
        <div
          style={{
            width: "25%",
            height: 120,
            border: `3px solid #446e9350`,
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontWeight: 500 }}>Aguardando</p>
          <p style={{ fontWeight: 700, fontSize: 48 }}>{aguardando.length}</p>
        </div>

        <div
          style={{
            width: "25%",
            height: 120,
            backgroundColor: "#8efa55",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontWeight: 500, color: "#366020" }}>Confirmados</p>
          <p style={{ fontWeight: 700, fontSize: 48, color: "#366020" }}>
            {confirmado.length}
          </p>
        </div>
        <div
          style={{
            width: "25%",
            height: 120,
            backgroundColor: "#fadb61",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontWeight: 500, color: "#605425" }}>Não Atenderam</p>
          <p style={{ fontWeight: 700, fontSize: 48, color: "#605425" }}>
            {naoAtende.length}
          </p>
        </div>
      </div>
    </div>
  );
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  fill,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={fill}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

function LinhaGraficos({ p }: { p: any }) {
  const aguardando = p.filter((s: any) => s.statusFeira === "AGUARDANDO");
  const confirmado = p.filter((s: any) => s.statusFeira === "CONFIRMADA");
  const naoAtende = p.filter((s: any) => s.statusFeira === "PENDENTE");
  const cancelado = p.filter((s: any) => s.statusFeira === "CANCELADA");

  const dataStatus = [
    { name: "Confirmados", value: confirmado.length, fill: "#8efa55" }, // Verde
    { name: "Não Atenderam", value: naoAtende.length, fill: "#fadb61" }, // Vermelho
    { name: "Cancelados", value: cancelado.length, fill: "#f87171" }, // Vermelho
    { name: "Pendentes", value: aguardando.length, fill: "#DEDEDE" }, // Amarelo
  ];

  const cardiologista = p.filter((s: any) => s.cardiologista === true);
  const ginecologista = p.filter((s: any) => s.ginecologista === true);
  const ortopedista = p.filter((s: any) => s.ortopedista === true);
  const urologista = p.filter((s: any) => s.urologista === true);
  const oftalmologista = p.filter((s: any) => s.oftalmologista === true);
  const odonto = p.filter((s: any) => s.odonto === true);
  const usg = p.filter((s: any) => s.usg === true);
  const mamografia = p.filter((s: any) => s.mamografia === true);
  const eletrocardiograma = p.filter((s: any) => s.eletrocardiograma === true);

  const dataEspecialidades = [
    { name: "Cardiologista", value: cardiologista.length, fill: "#8efa55" }, // Amarelo
    { name: "Ginecologista", value: ginecologista.length, fill: "#8efa55" }, // Amarelo
    { name: "Ortopedista", value: ortopedista.length, fill: "#8efa55" }, // Amarelo
    { name: "Urologista", value: urologista.length, fill: "#8efa55" }, // Amarelo
    { name: "Oftalmologista", value: oftalmologista.length, fill: "#8efa55" }, // Amarelo
    { name: "Odontologista", value: odonto.length, fill: "#8efa55" }, // Vermelho
    { name: "USG", value: usg.length, fill: "#8efa55" }, // Verde
    { name: "Mamografia", value: mamografia.length, fill: "#8efa55" }, // Vermelho
    { name: "ECG", value: eletrocardiograma.length, fill: "#8efa55" }, // Vermelho
  ].sort((a, b) => b.value - a.value);

  const customTicks = Array.from({ length: 21 }, (_, i) => i * 5);

  return (
    <div
      style={{ width: "100%", display: "flex", flexDirection: "row", gap: 10 }}
    >
      <div
        style={{
          width: "30%",
          height: 350,
          backgroundColor: "#fff",
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
        }}
      >
        <p style={{ fontWeight: "bold", color: "#333" }}>
          Status de Confirmação
        </p>

        <PieChart
          style={{
            width: "100%",
            aspectRatio: 1,
            maxWidth: 250,
          }}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <Pie
            dataKey="value"
            data={dataStatus}
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="70%"
            labelLine={false}
            label={renderCustomizedLabel}
          />
        </PieChart>
        {/* Legenda */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 15,
                  borderRadius: 4,
                  height: 15,
                  backgroundColor: "#DEDEDE",
                }}
              />
              <p style={{ fontSize: 14 }}>Pendentes</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 15,
                  borderRadius: 4,
                  height: 15,
                  backgroundColor: "#fadb61",
                }}
              />
              <p style={{ fontSize: 14 }}>Não Atenderam</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 15,
                  borderRadius: 4,
                  height: 15,
                  backgroundColor: "#8efa55",
                }}
              />
              <p style={{ fontSize: 14 }}>Confirmados</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 15,
                  borderRadius: 4,
                  height: 15,
                  backgroundColor: "#f87171",
                }}
              />
              <p style={{ fontSize: 14 }}>Cancelados</p>
            </div>
          </div>
        </div>
        {/* Legenda FIM */}
      </div>
      <div
        style={{
          width: "70%",
          height: 350,
          backgroundColor: "#fff",
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          padding: 10,
          gap: 10,
        }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={1}
          minHeight={1}
        >
          <BarChart
            layout="vertical"
            data={dataEspecialidades}
            margin={{ top: 1, right: 1, bottom: 1, left: 1 }}
          >
            <XAxis type="number" ticks={customTicks} />

            <YAxis dataKey="name" type="category" width={120} />

            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function DetalhesEspecialidades({ p }: { p: any }) {
  const cardiologista = p.filter((s: any) => s.cardiologista === true);
  const ginecologista = p.filter((s: any) => s.ginecologista === true);
  const ortopedista = p.filter((s: any) => s.ortopedista === true);
  const urologista = p.filter((s: any) => s.urologista === true);
  const oftalmologista = p.filter((s: any) => s.oftalmologista === true);
  const odonto = p.filter((s: any) => s.odonto === true);
  const usg = p.filter((s: any) => s.usg === true);
  const mamografia = p.filter((s: any) => s.mamografia === true);
  const eletrocardiograma = p.filter((s: any) => s.eletrocardiograma === true);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        padding: 10,
        gap: 10,
      }}
    >
      {/* Cabeçalho */}
      <h3 style={{ fontWeight: 600 }}>Controle por Especialidade</h3>
      <div style={{ width: "100%", height: 1, backgroundColor: "#00000050" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          backgroundColor: "#55DDff",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            width: "20%",
            textAlign: "center",
          }}
        >
          Especialidade
        </p>
        <p
          style={{
            width: "13.3%",
            textAlign: "center",
          }}
        >
          Total Solicitado
        </p>
        <p
          style={{
            width: "13.3%",
            textAlign: "center",
          }}
        >
          Pendentes
        </p>
        <p
          style={{
            width: "13.3%",
            textAlign: "center",
          }}
        >
          Cancelados
        </p>
        <p
          style={{
            width: "13.3%",
            textAlign: "center",
          }}
        >
          Confirmados
        </p>
        <p
          style={{
            width: "16.6%",
            textAlign: "center",
          }}
        >
          Capacidade Máx.
        </p>
        <p
          style={{
            width: "10%",
            textAlign: "center",
          }}
        >
          Atendidos
        </p>
      </div>
      {/* Cabeçalho Fim */}
      {/* Linhas Por Especialidade */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <LinhaEspecialidade
          e={"Cardiologista"}
          tS={cardiologista.length}
          p={
            cardiologista.filter((s: any) => s.statusFeira === "PENDENTE")
              .length +
            cardiologista.filter((s: any) => s.statusFeira === "AGUARDANDO")
              .length
          }
          C={
            cardiologista.filter((s: any) => s.statusFeira === "CONFIRMADA")
              .length
          }
          c={
            cardiologista.filter((s: any) => s.statusFeira === "CANCELADA")
              .length
          }
          Max={30}
          tA={0}
        />
        <LinhaEspecialidade
          e={"Ginecologista"}
          tS={ginecologista.length}
          p={
            ginecologista.filter((s: any) => s.statusFeira === "PENDENTE")
              .length +
            ginecologista.filter((s: any) => s.statusFeira === "AGUARDANDO")
              .length
          }
          C={
            ginecologista.filter((s: any) => s.statusFeira === "CONFIRMADA")
              .length
          }
          c={
            ginecologista.filter((s: any) => s.statusFeira === "CANCELADA")
              .length
          }
          Max={30}
          tA={0}
        />
        <LinhaEspecialidade
          e={"Ortopedista"}
          tS={ortopedista.length}
          p={
            ortopedista.filter((s: any) => s.statusFeira === "PENDENTE")
              .length +
            ortopedista.filter((s: any) => s.statusFeira === "AGUARDANDO")
              .length
          }
          C={
            ortopedista.filter((s: any) => s.statusFeira === "CONFIRMADA")
              .length
          }
          c={
            ortopedista.filter((s: any) => s.statusFeira === "CANCELADA").length
          }
          Max={30}
          tA={0}
        />
        <LinhaEspecialidade
          e={"Urologista"}
          tS={urologista.length}
          p={
            urologista.filter((s: any) => s.statusFeira === "PENDENTE").length +
            urologista.filter((s: any) => s.statusFeira === "AGUARDANDO").length
          }
          C={
            urologista.filter((s: any) => s.statusFeira === "CONFIRMADA").length
          }
          c={
            urologista.filter((s: any) => s.statusFeira === "CANCELADA").length
          }
          Max={30}
          tA={0}
        />
        <LinhaEspecialidade
          e={"Oftalmologista"}
          tS={oftalmologista.length}
          p={
            oftalmologista.filter((s: any) => s.statusFeira === "PENDENTE")
              .length +
            oftalmologista.filter((s: any) => s.statusFeira === "AGUARDANDO")
              .length
          }
          C={
            oftalmologista.filter((s: any) => s.statusFeira === "CONFIRMADA")
              .length
          }
          c={
            oftalmologista.filter((s: any) => s.statusFeira === "CANCELADA")
              .length
          }
          Max={30}
          tA={0}
        />
        <LinhaEspecialidade
          e={"Odontologista"}
          tS={odonto.length}
          p={
            odonto.filter((s: any) => s.statusFeira === "PENDENTE").length +
            odonto.filter((s: any) => s.statusFeira === "AGUARDANDO").length
          }
          C={odonto.filter((s: any) => s.statusFeira === "CONFIRMADA").length}
          c={odonto.filter((s: any) => s.statusFeira === "CANCELADA").length}
          Max={30}
          tA={0}
        />
        <LinhaEspecialidade
          e={"USG"}
          tS={usg.length}
          p={
            usg.filter((s: any) => s.statusFeira === "PENDENTE").length +
            usg.filter((s: any) => s.statusFeira === "AGUARDANDO").length
          }
          C={usg.filter((s: any) => s.statusFeira === "CONFIRMADA").length}
          c={usg.filter((s: any) => s.statusFeira === "CANCELADA").length}
          Max={30}
          tA={0}
        />
        <LinhaEspecialidade
          e={"Mamografia"}
          tS={mamografia.length}
          p={
            mamografia.filter((s: any) => s.statusFeira === "PENDENTE").length +
            mamografia.filter((s: any) => s.statusFeira === "AGUARDANDO").length
          }
          C={
            mamografia.filter((s: any) => s.statusFeira === "CONFIRMADA").length
          }
          c={
            mamografia.filter((s: any) => s.statusFeira === "CANCELADA").length
          }
          Max={30}
          tA={0}
        />
        <LinhaEspecialidade
          e={"ECG"}
          tS={eletrocardiograma.length}
          p={
            eletrocardiograma.filter((s: any) => s.statusFeira === "PENDENTE")
              .length +
            eletrocardiograma.filter((s: any) => s.statusFeira === "AGUARDANDO")
              .length
          }
          C={
            eletrocardiograma.filter((s: any) => s.statusFeira === "CONFIRMADA")
              .length
          }
          c={
            eletrocardiograma.filter((s: any) => s.statusFeira === "CANCELADA")
              .length
          }
          Max={30}
          tA={0}
        />
      </div>
      {/* Linhas Por Especialidade FIM */}
    </div>
  );
}

function LinhaEspecialidade({
  e,
  tS,
  p,
  C,
  c,
  Max,
  tA,
}: {
  e: any;
  tS: any;
  p: any;
  C: any;
  c: any;
  Max: any;
  tA: any;
}) {
  const porcentagem = (tS / Max) * 100;

  const obterCorDinamica = (porcentagem: any) => {
    if (porcentagem < 50) return "hsl(120, 80%, 45%)";

    const hue = 120 - (porcentagem - 50) * (120 / 50);

    return `hsl(${hue}, 80%, 45%)`;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: 3,
        borderBottom: `1px solid #DDD`,
        justifyContent: "space-between",
      }}
    >
      <p
        style={{
          width: "20%",
          textAlign: "center",
          backgroundColor: "#EFEFEF60",
        }}
      >
        {e}
      </p>
      <p
        style={{
          width: "13.3%",
          textAlign: "center",
        }}
      >
        {tS}
      </p>
      <p
        style={{
          width: "13.3%",
          textAlign: "center",
          backgroundColor: "#EFEFEF60",
        }}
      >
        {p}
      </p>
      <p
        style={{
          width: "13.3%",
          textAlign: "center",
        }}
      >
        {c}
      </p>
      <p
        style={{
          width: "13.3%",
          textAlign: "center",
          backgroundColor: "#EFEFEF60",
        }}
      >
        {C}
      </p>
      <div
        style={{
          width: "16.6%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: 15,
            overflow: "hidden",
            width: "60%",
            backgroundColor: "#EEE",
            borderRadius: 5,
          }}
        >
          <div
            style={{
              height: 20,
              width: `${porcentagem}%`,
              backgroundColor: obterCorDinamica(porcentagem),
            }}
          />
        </div>
        <p
          style={{
            textAlign: "center",
          }}
        >
          {Max}
        </p>
      </div>
      <p
        style={{
          width: "10%",
          textAlign: "center",
          backgroundColor: "#EFEFEF60",
        }}
      >
        {tA}
      </p>
    </div>
  );
}

function Participacoes() {
  const { participacoes, loading } = useParticipacoes();

  const [buscarNomes, setBuscarNomes] = useState("");

  const [open, setOpen] = useState(false);

  const [participacao, setParticipacao] = useState(null);

  const Cabecalho = (
    <div
      style={{
        width: "100%",
        padding: 8,
        backgroundColor: "#FFFFFF90",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 12,
        marginTop: 15,
        backdropFilter: "blur(5px)",
        boxShadow: "0px 5px 5px #00000040",
        zIndex: 1,
      }}
    >
      <div style={{ width: "20%", borderRight: "1px solid #999" }}>
        <p>Paciente</p>
      </div>
      <div
        style={{
          width: "10%",
          borderRight: "1px solid #999",
          paddingLeft: 5,
        }}
      >
        <p>Contato</p>
      </div>
      <div
        style={{
          width: "10%",
          borderRight: "1px solid #999",
          paddingLeft: 5,
        }}
      >
        <p>Líder</p>
      </div>
      <div
        style={{
          width: "55%",
          borderRight: "1px solid #999",
          paddingLeft: 3,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Cardiologista
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Ginecologista
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Ortopedista
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Urologista
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Oftalmologista
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Odontologista
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          USG
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Mamografia
        </div>
        <div
          style={{
            width: "10%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          ECG
        </div>
      </div>
      <div style={{ width: "5%", paddingLeft: 5 }}>
        <p>Status</p>
      </div>
    </div>
  );

  function normalizarTexto(texto: string) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const id = localStorage.getItem("id");
  const { usuario } = useUser(String(id));

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 10,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <input
          type="text"
          placeholder="Pesquise por paciente..."
          style={{
            padding: "6px 20px",
            backgroundColor: "#FFFFFF",
            borderRadius: 14,
            outline: "none",
            borderRight: "1px solid #00000030",
          }}
          onChange={(e) => setBuscarNomes(e.target.value)}
          value={buscarNomes}
        />
        {usuario?.regra === "admin" ? <BtnNovaParticipacao /> : null}
        {usuario?.regra === "admin" ? <BtnCadastrarPacienteMenor /> : null}
      </div>
      {Cabecalho}
      <div
        style={{
          width: "100%",
          height: "85vh",
          overflow: "auto",
          scrollbarWidth: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingBottom: 30,
          paddingTop: 10,
          borderRadius: 12,
        }}
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          (participacoes ? [...participacoes] : [])
            .filter((p: any) => {
              const nomePaciente = normalizarTexto(p?.paciente?.nome ?? "");
              const buscaNome = normalizarTexto(buscarNomes);
              const nomeMatch = nomePaciente.includes(buscaNome);
              return nomeMatch;
            })
            .sort((a, b) =>
              (a?.paciente?.nome ?? "").localeCompare(
                b?.paciente?.nome ?? "",
                "pt-BR",
              ),
            )
            .map((p: any) => (
              <LinhaParticipacao
                key={p.id}
                p={p}
                onClick={() => {
                  setParticipacao(p);
                  setOpen(true);
                }}
              />
            ))
        )}
      </div>
      <ModalParticipacaoEdit p={participacao} open={open} setOpen={setOpen} />
    </div>
  );
}

function Pacientes() {
  const { pacientes } = usePacientes();
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      {pacientes && pacientes.length > 0 ? (
        pacientes.map((p: any) => <p key={p.id}>{p.nome}</p>)
      ) : (
        <p>Nenhum paciente cadastrado</p>
      )}
    </div>
  );
}

interface BtnMenuProps {
  $cor: string;
}

const BtnMenuStyle = styled.li<BtnMenuProps>`
  background-color: #F4F4F4;
  padding: 5px 10px;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: ${(props) => props.$cor || "#0090ff90"};
  }

  &:active {
    background-color: ${(props) => props.$cor + 50 || "#0090ff90"};
`;

interface FeiradeSaudeMenuProps {
  setConteudo: (component: JSX.Element) => void;
}

function FeiradeSaudeMenu({ setConteudo }: FeiradeSaudeMenuProps) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: 200,
        height: "100%",
        backgroundColor: "#FFFFFF10",
        borderRadius: 18,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        backdropFilter: "blur(5px)",
        borderLeft: "1px solid #FFFFFF30",
        borderTop: "1.5px solid #FFFFFF60",
        borderRight: "1.5px solid #FFFFFF99",
        borderBottom: "1.5px solid #FFFFFF70",
        overflow: "hidden",
        boxShadow: "2px 2px 5px #00000020",
      }}
    >
      <img
        src="https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/Marca-Frente.png"
        alt=""
        width={"90%"}
      />
      <div
        style={{
          width: "100%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          zIndex: 1,
        }}
      >
        <BtnMenuStyle onClick={() => setConteudo(<Painel />)} $cor={"#15ff78"}>
          <p>Painel</p>
        </BtnMenuStyle>
        <BtnMenuStyle
          onClick={() => setConteudo(<Participacoes />)}
          $cor={"#15ff78"}
        >
          <p>Participações</p>
        </BtnMenuStyle>
        <BtnMenuStyle
          onClick={() => setConteudo(<Pacientes />)}
          $cor={"#15ff78"}
        >
          <p>Pacientes</p>
        </BtnMenuStyle>
      </div>
      <BtnMenuStyle
        $cor={"#15ff78"}
        style={{ zIndex: 1 }}
        onClick={() => {
          navigate("/home");
        }}
      >
        <p>Sair</p>
        <LogOut size={16} color="#0030FF" />
      </BtnMenuStyle>
      <img
        src="https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/Marca-Costas.png"
        alt=""
        width={"90%"}
      />
      <div
        style={{
          position: "absolute",
          backgroundColor: "#FFFFFF25",
          width: 500,
          height: 500,
          rotate: "45deg",
          top: 450,
          left: -250,
        }}
      />
      <div
        style={{
          position: "absolute",
          backgroundColor: "#FFFFFF15",
          width: 500,
          height: 500,
          rotate: "135deg",
          top: -150,
          left: -250,
        }}
      />
    </div>
  );
}

interface FeiradeSaudeConteudoProps {
  conteudo: JSX.Element;
}

function FeiradeSaudeConteudo({ conteudo }: FeiradeSaudeConteudoProps) {
  return (
    <div
      style={{
        width: `calc(100% - 200px)`,
        height: "100%",
        backgroundColor: "#FFFFFF70",
        borderRadius: 18,
        backdropFilter: "blur(10px)",
        borderLeft: "1px solid #FFFFFF30",
        borderTop: "1px solid #FFFFFF30",
        borderRight: "1px solid #FFFFFF99",
        borderBottom: "1px solid #FFFFFF70",
        boxShadow: "2px 2px 5px #00000020",
        // padding: 5,
        overflow: "hidden",
      }}
    >
      {conteudo}
    </div>
  );
}

function FeiradeSaude() {
  const [conteudo, setConteudo] = useState(<Painel />);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        gap: 10,
        backgroundColor: "#00CCFF",
        backgroundImage: `radial-gradient(circle at 10% 20%, #0050FF50, transparent 25%), radial-gradient(circle at 80% 0%, #0090BB50, transparent 25%), radial-gradient(circle at 20% 80%, #0050DD90, transparent 25%), radial-gradient(circle at 35% 65%, #FFFFFF90, transparent 35%), radial-gradient(circle at 90% 100%, #0090FF50, transparent 25%)`,
      }}
    >
      <div
        style={{
          backgroundImage: "url(src/assets/Marca-Frente.png)",
          backgroundPosition: "center",
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "cover",
          //   backgroundBlendMode: "screen",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: 0.3,
        }}
      />
      <FeiradeSaudeMenu setConteudo={setConteudo} />
      <FeiradeSaudeConteudo conteudo={conteudo} />
    </div>
  );
}

export default FeiradeSaude;

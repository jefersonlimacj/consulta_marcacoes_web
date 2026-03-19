import {
  BadgeCheck,
  CalendarCheck,
  ClipboardClock,
  PhoneOff,
  SquareCheckBig,
  SquareDashed,
  UserRoundX,
} from "lucide-react";

type LinhaParticipacaoProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  p: any;
};

export function LinhaParticipacao({ onClick, p }: LinhaParticipacaoProps) {
  return (
    <div
      onClick={onClick}
      style={{
        width: "100%",
        padding: 8,
        backgroundColor: "#FFFFFF50",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 12,
        margin: 5,
        backdropFilter: "blur(5px)",
        cursor: "pointer",
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: "20%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <p
          style={{
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {p?.paciente?.nome}
        </p>
      </div>
      <div style={{ width: "10%", paddingLeft: 10 }}>
        <p style={{ fontSize: 13, fontWeight: 500 }}>
          {p?.paciente?.telefone
            ? formatarTelefone(p?.paciente?.telefone)
            : "Sem telefone"}
        </p>
      </div>
      <div
        style={{
          width: "65%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ width: "10%" }}>
          {inforEspecialidade(p?.cardiologista)}
        </div>
        <div style={{ width: "10%" }}>
          {inforEspecialidade(p?.ginecologista)}
        </div>
        <div style={{ width: "10%" }}>{inforEspecialidade(p?.ortopedista)}</div>
        <div style={{ width: "10%" }}>{inforEspecialidade(p?.urologista)}</div>
        <div style={{ width: "10%" }}>
          {inforEspecialidade(p?.oftalmologista)}
        </div>
        <div style={{ width: "10%" }}>{inforEspecialidade(p?.odonto)}</div>
        <div style={{ width: "10%" }}>{inforEspecialidade(p?.usg)}</div>
        <div style={{ width: "10%" }}>{inforEspecialidade(p?.mamografia)}</div>
        <div style={{ width: "10%" }}>
          {inforEspecialidade(p?.eletrocardiograma)}
        </div>
        <div style={{ width: "10%" }}>{inforEspecialidade(p?.clinico)}</div>
        <div style={{ width: "10%" }}>{inforEspecialidade(p?.preventivo)}</div>
        <div style={{ width: "10%" }}>{inforEspecialidade(p?.raiox)}</div>
      </div>
      <div
        style={{
          width: "5%",
          borderLeft: "1px solid #00000020",
          paddingLeft: 10,
        }}
      >
        {inforStatus(p?.statusFeira)}
      </div>
    </div>
  );
}

function inforStatus(s: string) {
  return (
    <div
      style={{
        width: "90%",
        height: "100%",
        backgroundColor:
          s === "AGUARDANDO"
            ? "#FFFFFF"
            : s === "PENDENTE"
              ? "#FADB61"
              : s === "CONFIRMADA"
                ? "#8EFA55"
                : s === "CANCELADA"
                  ? "#FA4829"
                  : s === "CONCLUIDO"
                    ? "#5663FA"
                    : "#00000020",

        padding: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
      }}
      title={s}
    >
      {s === "AGUARDANDO" ? (
        <ClipboardClock size={20} />
      ) : s === "PENDENTE" ? (
        <PhoneOff size={20} />
      ) : s === "CONFIRMADA" ? (
        <CalendarCheck size={20} />
      ) : s === "CANCELADA" ? (
        <UserRoundX size={20} color="#FFEE90" strokeWidth={2} />
      ) : s === "CONCLUIDO" ? (
        <BadgeCheck size={20} color="#91FAD1" strokeWidth={3} />
      ) : null}
    </div>
  );
}

function inforEspecialidade(m: boolean) {
  return (
    <div
      style={{
        width: "90%",
        height: "100%",
        backgroundColor: m ? "#15ff89" : "#00000015",
        padding: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
      }}
    >
      {m ? (
        <SquareCheckBig size={20} />
      ) : (
        <SquareDashed size={20} color="#21354750" />
      )}
    </div>
  );
}

function formatarTelefone(valor: string) {
  if (!valor) return "";
  return valor
    .replace(/\D/g, "") // só números
    .replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, "$1 $2$3-$4");
}

import {
  BadgeCheck,
  CalendarCheck,
  ClipboardClock,
  Loader2,
  PhoneOff,
  Square,
  SquareCheckBig,
  UserRoundX,
} from "lucide-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useEditParticipacao,
  useParticipacoes,
} from "../../hook/useParticipacao";
import { useUser } from "../../hook/useAdmin";

type ModalParticipacaoEditProps = {
  p: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ModalParticipacaoEdit({
  p,
  open,
  setOpen,
}: ModalParticipacaoEditProps) {
  const id = localStorage.getItem("id");
  const { usuario } = useUser(String(id));

  const [cardiologista, setCardiologista] = useState<boolean>(false);
  const [ginecologista, setGinecologista] = useState<boolean>(false);
  const [urologista, setUrologista] = useState<boolean>(false);
  const [ortopedista, setOrtopedista] = useState<boolean>(false);
  const [oftalmologista, setOftalmologista] = useState<boolean>(false);
  const [odontologia, setOdontologia] = useState<boolean>(false);
  const [ultrassom, setUltrassom] = useState<boolean>(false);
  const [eletrocardiograma, setEletrocardiograma] = useState<boolean>(false);
  const [mamografia, setMamografia] = useState<boolean>(false);
  const [espera, setEspera] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    if (!p) return;

    setCardiologista(p?.cardiologista);
    setGinecologista(p?.ginecologista);
    setUrologista(p?.urologista);
    setOrtopedista(p?.ortopedista);
    setOftalmologista(p?.oftalmologista);
    setOdontologia(p?.odonto);
    setUltrassom(p?.usg);
    setEletrocardiograma(p?.eletrocardiograma);
    setMamografia(p?.mamografia);
  }, [open, p?.id]);

  const dadosParaEnviar = {
    cardiologista: cardiologista,
    odonto: odontologia,
    mamografia: mamografia,
    ginecologista: ginecologista,
    eletrocardiograma: eletrocardiograma,
    oftalmologista: oftalmologista,
    ortopedista: ortopedista,
    urologista: urologista,
    usg: ultrassom,
  };

  const { editParticipacao } = useEditParticipacao();
  const { refetch: refetchParticipacoes } = useParticipacoes();

  async function enviarParticipacao() {
    setEspera(true);

    await editParticipacao(p?.id, dadosParaEnviar);

    refetchParticipacoes();
    setEspera(false);
    setOpen(false);
  }

  async function confirmarPresenca() {
    setEspera(true);
    await editParticipacao(p?.id, { statusFeira: "CONFIRMADA" });
    refetchParticipacoes();
    setEspera(false);
    setOpen(false);
  }

  async function desmarcarPresenca() {
    setEspera(true);
    await editParticipacao(p?.id, { statusFeira: "CANCELADA" });
    refetchParticipacoes();
    setEspera(false);
    setOpen(false);
  }

  async function naoAtendeu() {
    setEspera(true);
    await editParticipacao(p?.id, { statusFeira: "PENDENTE" });
    refetchParticipacoes();
    setEspera(false);
    setOpen(false);
  }

  return (
    <>
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
          zIndex: 100,
        }}
        onClick={() => {
          setOpen(false);
        }}
      >
        <div
          style={{
            width: "90%",
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
          <p>
            Registro de participação do paciente{" "}
            <strong>{p?.paciente?.nome || "Aguarde..."}</strong> | Registrado
            em:{" "}
            <a style={{ fontSize: 16, fontWeight: 500 }}>
              {formatarData(
                new Date(Number(p?.criadoEm || 1770389152329)).toISOString(),
              )}
            </a>
          </p>
          <div
            style={{
              width: "100%",
              backgroundColor: "#E9E9E9",
              borderRadius: 14,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              padding: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: "90%",
                  backgroundColor: "#DDD",
                  borderRadius: 14,
                  padding: 10,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ fontSize: 12 }}>
                  Paciente:{" "}
                  <a style={{ fontSize: 18, fontWeight: 600 }}>
                    {p?.paciente?.nome || "Aguarde..."}
                  </a>
                </p>
                <p style={{ fontSize: 12 }}>
                  Contato:{" "}
                  <a style={{ fontSize: 16, fontWeight: 500 }}>
                    {p?.paciente?.telefone}
                  </a>
                </p>
                <p style={{ fontSize: 12 }}>
                  Contato 2:{" "}
                  <a style={{ fontSize: 16, fontWeight: 500 }}>
                    {p?.paciente?.telefoneS || "Sem telefone"}
                  </a>
                </p>
                <p style={{ fontSize: 12 }}>
                  Liderança:{" "}
                  <a style={{ fontSize: 16, fontWeight: 500 }}>
                    {p?.lider?.nome}
                  </a>
                </p>
              </div>
              <div
                style={{
                  width: "10%",
                  height: 60,
                  backgroundColor:
                    p?.statusFeira === "AGUARDANDO"
                      ? "#FFFFFF"
                      : p?.statusFeira === "PENDENTE"
                        ? "#FADB61"
                        : p?.statusFeira === "CONFIRMADA"
                          ? "#8EFA55"
                          : p?.statusFeira === "CANCELADA"
                            ? "#FA4829"
                            : p?.statusFeira === "CONCLUIDO"
                              ? "#5663FA"
                              : "#00000020",
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "row",
                  padding: "0px 10px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {p?.statusFeira === "AGUARDANDO" ? (
                  <ClipboardClock size={35} />
                ) : p?.statusFeira === "PENDENTE" ? (
                  <PhoneOff size={35} />
                ) : p?.statusFeira === "CONFIRMADA" ? (
                  <CalendarCheck size={35} />
                ) : p?.statusFeira === "CANCELADA" ? (
                  <UserRoundX size={35} color="#FFEE90" strokeWidth={2} />
                ) : p?.statusFeira === "CONCLUIDO" ? (
                  <BadgeCheck size={35} color="#91FAD1" strokeWidth={3} />
                ) : null}
              </div>
            </div>
            <div
              style={{
                width: "100%",
                backgroundColor: "#DDD",
                borderRadius: 14,
                padding: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <p style={{ fontSize: 12 }}>
                Nº SUS:{" "}
                <a style={{ fontSize: 18, fontWeight: 600 }}>
                  {p?.paciente?.nSus || "Aguarde..."}
                </a>
              </p>
              <p style={{ fontSize: 12 }}>
                CPF:{" "}
                <a style={{ fontSize: 18, fontWeight: 600 }}>
                  {formatarCPF(p?.paciente?.cpf) || "Aguarde..."}
                </a>
              </p>
              <p style={{ fontSize: 12 }}>
                Data de Nascimento:{" "}
                <a style={{ fontSize: 18, fontWeight: 600 }}>
                  {new Date(p?.paciente?.dataNascimento).toLocaleDateString(
                    "pt-BR",
                    {
                      timeZone: "UTC",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    },
                  ) || "Aguarde..."}
                </a>
              </p>
            </div>
            <p style={{ textAlign: "center" }}>
              Selecione a baixo os procedimentos do paicente.
            </p>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <BtnEspecialidades
                onClick={
                  usuario?.regra === "admin"
                    ? () => setCardiologista(!cardiologista)
                    : undefined
                }
                $cor={cardiologista ? "#15ff89" : "#DDD"}
                $cor2={cardiologista ? "#14f776" : "#ccc"}
              >
                <p>Cardiolgista</p>
                {cardiologista ? (
                  <SquareCheckBig size={20} />
                ) : (
                  <Square size={20} />
                )}
              </BtnEspecialidades>
              <BtnEspecialidades
                onClick={
                  usuario?.regra === "admin"
                    ? () => setGinecologista(!ginecologista)
                    : undefined
                }
                $cor={ginecologista ? "#15ff89" : "#DDD"}
                $cor2={ginecologista ? "#14f776" : "#ccc"}
              >
                <p>Ginecologista</p>
                {ginecologista ? (
                  <SquareCheckBig size={20} />
                ) : (
                  <Square size={20} />
                )}
              </BtnEspecialidades>
              <BtnEspecialidades
                onClick={
                  usuario?.regra === "admin"
                    ? () => setOrtopedista(!ortopedista)
                    : undefined
                }
                $cor={ortopedista ? "#15ff89" : "#DDD"}
                $cor2={ortopedista ? "#14f776" : "#ccc"}
              >
                <p>Ortopedista</p>
                {ortopedista ? (
                  <SquareCheckBig size={20} />
                ) : (
                  <Square size={20} />
                )}
              </BtnEspecialidades>
              <BtnEspecialidades
                onClick={
                  usuario?.regra === "admin"
                    ? () => setUrologista(!urologista)
                    : undefined
                }
                $cor={urologista ? "#15ff89" : "#DDD"}
                $cor2={urologista ? "#14f776" : "#ccc"}
              >
                <p>Urologista</p>
                {urologista ? (
                  <SquareCheckBig size={20} />
                ) : (
                  <Square size={20} />
                )}
              </BtnEspecialidades>
              <BtnEspecialidades
                onClick={
                  usuario?.regra === "admin"
                    ? () => setOftalmologista(!oftalmologista)
                    : undefined
                }
                $cor={oftalmologista ? "#15ff89" : "#DDD"}
                $cor2={oftalmologista ? "#14f776" : "#ccc"}
              >
                <p>Oftalmologista</p>
                {oftalmologista ? (
                  <SquareCheckBig size={20} />
                ) : (
                  <Square size={20} />
                )}
              </BtnEspecialidades>
              <BtnEspecialidades
                onClick={
                  usuario?.regra === "admin"
                    ? () => setOdontologia(!odontologia)
                    : undefined
                }
                $cor={odontologia ? "#15ff89" : "#DDD"}
                $cor2={odontologia ? "#14f776" : "#ccc"}
              >
                <p>Odontologia</p>
                {odontologia ? (
                  <SquareCheckBig size={20} />
                ) : (
                  <Square size={20} />
                )}
              </BtnEspecialidades>
              <BtnEspecialidades
                onClick={
                  usuario?.regra === "admin"
                    ? () => setUltrassom(!ultrassom)
                    : undefined
                }
                $cor={ultrassom ? "#15ff89" : "#DDD"}
                $cor2={ultrassom ? "#14f776" : "#ccc"}
              >
                <p>Ultrassom</p>
                {ultrassom ? (
                  <SquareCheckBig size={20} />
                ) : (
                  <Square size={20} />
                )}
              </BtnEspecialidades>
              <BtnEspecialidades
                onClick={
                  usuario?.regra === "admin"
                    ? () => setMamografia(!mamografia)
                    : undefined
                }
                $cor={mamografia ? "#15ff89" : "#DDD"}
                $cor2={mamografia ? "#14f776" : "#ccc"}
              >
                <p>Mamografia</p>
                {mamografia ? (
                  <SquareCheckBig size={20} />
                ) : (
                  <Square size={20} />
                )}
              </BtnEspecialidades>
              <BtnEspecialidades
                onClick={
                  usuario?.regra === "admin"
                    ? () => setEletrocardiograma(!eletrocardiograma)
                    : undefined
                }
                $cor={eletrocardiograma ? "#15ff89" : "#DDD"}
                $cor2={eletrocardiograma ? "#14f776" : "#ccc"}
              >
                <p>Eletrocardiograma</p>
                {eletrocardiograma ? (
                  <SquareCheckBig size={20} />
                ) : (
                  <Square size={20} />
                )}
              </BtnEspecialidades>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "85%",
                gap: 10,
                justifyContent: "flex-start",
              }}
            >
              <button
                style={{
                  width: "15%",
                  padding: 5,
                  backgroundColor: "#8EFA55",
                  borderRadius: 14,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                disabled={espera}
                onClick={() => {
                  confirmarPresenca();
                }}
              >
                {espera ? <Loader2 className="animate-spin" /> : "Confirmado"}
              </button>
              <button
                style={{
                  width: "15%",
                  padding: 5,
                  backgroundColor: "#FADB61",
                  borderRadius: 14,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                disabled={espera}
                onClick={() => {
                  naoAtendeu();
                }}
              >
                {espera ? <Loader2 className="animate-spin" /> : "Não Atendeu"}
              </button>
              <button
                style={{
                  width: "15%",
                  padding: 5,
                  backgroundColor: "#FA4829",
                  borderRadius: 14,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                disabled={espera}
                onClick={() => {
                  desmarcarPresenca();
                }}
              >
                {espera ? <Loader2 className="animate-spin" /> : "Desmarcar"}
              </button>
            </div>
            {usuario?.regra === "admin" ? (
              <button
                style={{
                  width: "15%",
                  padding: 5,
                  backgroundColor: "#0090ff90",
                  borderRadius: 14,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                disabled={espera}
                onClick={() => {
                  enviarParticipacao();
                }}
              >
                {espera ? <Loader2 className="animate-spin" /> : "Atualizar"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

interface BtnEspecialidadesProps {
  $cor: string;
  $cor2?: string;
}

const BtnEspecialidades = styled.div<BtnEspecialidadesProps>`
  width: calc(33% - 5px);
  height: 40px;
  background-color: ${(props) => props.$cor || "#DDD"};
  padding: 5px 10px;
  border-radius: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: ${(props) => props.$cor2 || "#ccc"};
    box-shadow: 2px 2px 5px #55555520;
    scale: 1.02;
  }

  &:active {
    background-color: ${(props) => props.$cor2 + "90" || "#ccc90"};
  }
`;

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

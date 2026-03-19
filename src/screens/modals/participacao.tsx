import {
  ArrowBigRight,
  CirclePlus,
  CircleX,
  Loader2,
  Plus,
  RefreshCcw,
  Square,
  SquareCheckBig,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { usePacientes } from "../../hook/usePaciente";
import { useLideres } from "../../hook/useLider";
import {
  useCreateParticipacao,
  useParticipacoes,
} from "../../hook/useParticipacao";
import { BtnCadastrarPacienteMenor } from "./pacienteBtnMenor";

export function BtnNovaParticipacao() {
  const [open, setOpen] = useState<boolean>(false);

  const [liderId, setLiderId] = useState<string>("");
  const [pacienteId, setPacienteId] = useState<string>("");
  const [cardiologista, setCardiologista] = useState<boolean>(false);
  const [ginecologista, setGinecologista] = useState<boolean>(false);
  const [urologista, setUrologista] = useState<boolean>(false);
  const [ortopedista, setOrtopedista] = useState<boolean>(false);
  const [oftalmologista, setOftalmologista] = useState<boolean>(false);
  const [odontologia, setOdontologia] = useState<boolean>(false);
  const [ultrassom, setUltrassom] = useState<boolean>(false);
  const [eletrocardiograma, setEletrocardiograma] = useState<boolean>(false);
  const [mamografia, setMamografia] = useState<boolean>(false);
  const [clinico, setClinico] = useState<boolean>(false);
  const [preventivo, setPreventivo] = useState<boolean>(false);
  const [raiox, setRaiox] = useState<boolean>(false);

  const [espera, setEspera] = useState<boolean>(false);

  const {
    pacientes,
    refetch: atualizarPacientes,
    loading: carredandoPacientes,
  } = usePacientes();

  const { lideres } = useLideres();

  const dadosParaEnviar = {
    liderId: liderId,
    pacienteId: pacienteId,
    cardiologista: cardiologista,
    odonto: odontologia,
    mamografia: mamografia,
    ginecologista: ginecologista,
    eletrocardiograma: eletrocardiograma,
    oftalmologista: oftalmologista,
    ortopedista: ortopedista,
    urologista: urologista,
    usg: ultrassom,
    clinico: clinico,
    preventivo: preventivo,
    raiox: raiox,
    cardiologistaP: false,
    odontoP: false,
    mamografiaP: false,
    ginecologistaP: false,
    eletrocardiogramaP: false,
    oftalmologistaP: false,
    ortopedistaP: false,
    urologistaP: false,
    usgP: false,
    clinicoP: false,
    preventivoP: false,
    raioxP: false,
  };

  const { createParticipacao } = useCreateParticipacao();
  const { refetch: refetchParticipacoes } = useParticipacoes();

  async function enviarParticipacao() {
    if (!pacienteId || !liderId) {
      alert("Selecione o Paciente e a Liderança para continuar.");
      return;
    }

    setEspera(true);

    try {
      const res = await createParticipacao(dadosParaEnviar);

      refetchParticipacoes();
      setOpen(false);
      setCardiologista(false);
      setGinecologista(false);
      setUrologista(false);
      setOrtopedista(false);
      setOftalmologista(false);
      setOdontologia(false);
      setUltrassom(false);
      setEletrocardiograma(false);
      setMamografia(false);
      setClinico(false);
      setPreventivo(false);
      setRaiox(false);

      return res;
    } catch (e: any) {
      const msg =
        e?.message ||
        e?.errors?.[0]?.message ||
        e?.graphQLErrors?.[0]?.message ||
        "Erro ao criar participação.";

      if (
        msg.includes(
          "Já existe uma participação na Feira de Saúde para este paciente",
        )
      ) {
        alert(
          "Já existe uma participação na Feira de Saúde para este paciente.",
        );
        return;
      }

      console.log("Erro ao criar participação: " + msg);
      alert("Erro ao criar participação: " + msg);
    } finally {
      setEspera(false);
    }
  }

  const liderSelecionado = lideres?.find((l: any) => l.id === liderId);
  return (
    <>
      <BtnCadastrar
        onClick={() => {
          setOpen(true);
          setPacienteId("");
          setLiderId("");
        }}
      >
        <Plus size={20} />
        <p>Participação</p>
      </BtnCadastrar>
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
          setCardiologista(false);
          setGinecologista(false);
          setUrologista(false);
          setOrtopedista(false);
          setOftalmologista(false);
          setOdontologia(false);
          setUltrassom(false);
          setEletrocardiograma(false);
          setMamografia(false);
          setClinico(false);
          setPreventivo(false);
          setRaiox(false);
        }}
      >
        <div
          style={{
            width: "75%",
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
          <p>Cadastro de Novas Especialidades</p>
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
                gap: 5,
              }}
            >
              <div
                style={{
                  width: "70%",
                  height: 60,
                  backgroundColor: "#DDD",
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "row",
                  padding: "0px 10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: 60,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ fontSize: 12 }}>Paciente</p>
                  <p style={{ fontSize: 18, fontWeight: 600 }}>
                    {pacienteId
                      ? pacientes?.find((p: any) => p.id === pacienteId)
                          ?.nome || "Paciente não encontrado"
                      : "Selecione o Paciente..."}
                  </p>
                </div>
                <ModalPacientes
                  listaPacientes={pacientes}
                  paciente={pacienteId}
                  espera={carredandoPacientes}
                  setPaciente={setPacienteId}
                  atualizarPacientes={atualizarPacientes}
                />
              </div>
              <div
                style={{
                  width: "40%",
                  height: 60,
                  backgroundColor: "#DDD",
                  borderRadius: 14,
                  display: "flex",
                  flexDirection: "row",
                  padding: "0px 10px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: "#DDD",
                    borderRadius: 14,
                    display: "flex",
                    flexDirection: "column",
                    padding: "0px 10px",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ fontSize: 12 }}>Liderança</p>
                  <p style={{ fontSize: 18, fontWeight: 600 }}>
                    {liderSelecionado?.nome || "Selecione Liderança..."}
                  </p>
                </div>
                <ModalLideres
                  lider={liderId}
                  listaLideres={lideres}
                  setLider={setLiderId}
                />
              </div>
            </div>
            <p>Selecione a baixo os procedimentos do paicente.</p>
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
                onClick={() => setCardiologista(!cardiologista)}
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
                onClick={() => setGinecologista(!ginecologista)}
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
                onClick={() => setOrtopedista(!ortopedista)}
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
                onClick={() => setUrologista(!urologista)}
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
                onClick={() => setOftalmologista(!oftalmologista)}
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
                onClick={() => setOdontologia(!odontologia)}
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
                onClick={() => setUltrassom(!ultrassom)}
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
                onClick={() => setMamografia(!mamografia)}
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
                onClick={() => setEletrocardiograma(!eletrocardiograma)}
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
              <BtnEspecialidades
                onClick={() => setClinico(!clinico)}
                $cor={clinico ? "#15ff89" : "#DDD"}
                $cor2={clinico ? "#14f776" : "#ccc"}
              >
                <p>Clínico</p>
                {clinico ? <SquareCheckBig size={20} /> : <Square size={20} />}
              </BtnEspecialidades>
              <BtnEspecialidades
                onClick={() => setPreventivo(!preventivo)}
                $cor={preventivo ? "#15ff89" : "#DDD"}
                $cor2={preventivo ? "#14f776" : "#ccc"}
              >
                <p>Preventivo</p>
                {preventivo ? (
                  <SquareCheckBig size={20} />
                ) : (
                  <Square size={20} />
                )}
              </BtnEspecialidades>
              <BtnEspecialidades
                onClick={() => setRaiox(!raiox)}
                $cor={raiox ? "#15ff89" : "#DDD"}
                $cor2={raiox ? "#14f776" : "#ccc"}
              >
                <p>Raio - X</p>
                {raiox ? <SquareCheckBig size={20} /> : <Square size={20} />}
              </BtnEspecialidades>
            </div>
          </div>
          <button
            style={{
              width: "50%",
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
            {espera ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Registrar Participação"
            )}
          </button>
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

const BtnAdd = styled.div`
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

function ModalPacientes({
  paciente,
  setPaciente,
  listaPacientes,
  espera,
  atualizarPacientes,
}: {
  paciente: any;
  setPaciente: any;
  listaPacientes: any;
  espera: boolean;
  atualizarPacientes: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const [nomePaciente, setNomePaciente] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <>
      <BtnAdd
        onClick={() => {
          setOpen(!open);
          setNomePaciente("");
        }}
      >
        {open ? <CircleX color={"red"} /> : <CirclePlus />}
      </BtnAdd>
      <div
        style={{
          width: "70%",
          height: "70%",
          scale: open ? 1 : 0.5,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          backgroundColor: "#F4F4F4",
          boxShadow: "5px 5px 10px #55555520",
          borderRadius: 14,
          border: "1px solid #DDD",
          transition: "all ease-in-out 0.3s",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 10,
          gap: 15,
          position: "absolute",
          inset: open ? 10 : 50,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5,
          }}
        >
          <TextoEntrada
            largura="60%"
            type="text"
            placeholder="Pesquise o paciente"
            value={nomePaciente}
            onChange={(e) => setNomePaciente(e.target.value)}
            inputRef={inputRef}
          />
          <BtnCadastrarPacienteMenor />
          <BtnRefresh onClick={() => atualizarPacientes()}>
            <RefreshCcw className={espera ? "animate-spin" : ""} />
          </BtnRefresh>
          <CircleX
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(false)}
            color="red"
          />
        </div>

        <div
          style={{
            width: "100%",
            height: "90%",
            overflowY: "auto",
            scrollbarWidth: "none",
            borderRadius: 12,
            boxShadow: "inset 0 0 5px #00000025",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 10,
          }}
        >
          {listaPacientes
            ?.filter((p: any) => {
              const nomeBusca = p.nome
                .toLowerCase()
                .includes(nomePaciente.toLowerCase());
              return nomeBusca;
            })
            .map((pac: any) => {
              return (
                <div
                  style={{
                    width: "100%",
                    height: 40,
                    border: "1px solid #55555550",
                    backgroundColor:
                      pac.id === paciente ? "#99d9ff50" : "transparent",
                    borderRadius: 10,
                    padding: 4,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                  onClick={() => {
                    setPaciente(pac.id);
                    setOpen(false);
                  }}
                  key={pac.id}
                >
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      width: "40%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {pac?.nome}
                  </p>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      width: "18%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {formatarData(pac?.dataNascimento)}
                  </p>
                  <p
                    style={{
                      whiteSpace: "nowrap",
                      width: "25%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {formatarCPF(pac?.cpf)}
                  </p>
                  <div
                    style={{
                      width: 30,
                      aspectRatio: 1,
                      backgroundColor: "#99d9ff",
                      borderRadius: 10,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowBigRight size={18} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

function ModalLideres({
  lider,
  setLider,
  listaLideres,
}: {
  lider: any;
  setLider: any;
  listaLideres: any;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const [nomeLider, setNomeLider] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <>
      <BtnAdd
        onClick={() => {
          setOpen(!open);
          setNomeLider("");
        }}
      >
        {open ? <CircleX color={"red"} /> : <CirclePlus />}
      </BtnAdd>
      <div
        style={{
          width: "70%",
          height: "70%",
          scale: open ? 1 : 0.5,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          backgroundColor: "#F4F4F4",
          boxShadow: "5px 5px 10px #55555520",
          borderRadius: 14,
          border: "1px solid #DDD",
          transition: "all ease-in-out 0.3s",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 10,
          gap: 15,
          position: "absolute",
          inset: open ? 10 : 50,
        }}
      >
        <TextoEntrada
          largura="100%"
          type="text"
          placeholder="Pesquise o Lider"
          value={nomeLider}
          onChange={(e) => setNomeLider(e.target.value)}
          inputRef={inputRef}
        />
        <div
          style={{
            width: "100%",
            height: "90%",
            overflowY: "auto",
            scrollbarWidth: "none",
            borderRadius: 12,
            boxShadow: "inset 0 0 5px #00000025",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 10,
          }}
        >
          {listaLideres
            ?.filter((l: any) => {
              const nomeBusca = l.nome
                .toLowerCase()
                .includes(nomeLider.toLowerCase());
              return nomeBusca;
            })
            .map((lid: any) => {
              return (
                <div
                  style={{
                    width: "100%",
                    height: 40,
                    border: "1px solid #55555550",
                    backgroundColor:
                      lid.id === lider ? "#99d9ff50" : "transparent",
                    borderRadius: 10,
                    padding: 4,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  key={lid.id}
                  onClick={() => {
                    setLider(lid.id);
                    setOpen(false);
                  }}
                >
                  <p>{lid?.nome}</p>
                  <p>{lid?.telefone}</p>
                  <div
                    style={{
                      width: 30,
                      aspectRatio: 1,
                      backgroundColor: "#99d9ff",
                      borderRadius: 10,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowBigRight size={18} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
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
  inputRef,
}: {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  largura: string;
  inputRef?: any;
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
        ref={inputRef}
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

const BtnRefresh = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50px;
  background-color: #d4d4d4;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: #b4b4b4;
    box-shadow: 2px 2px 2px #55555520;
  }

  &:active {
    scale: 1.02;
  }
`;

const BtnCadastrar = styled.div`
  padding: 5px 15px;
  background-color: #ffffff;
  border-radius: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-left: 15px;
  box-shadow: 1px 1px 2px #00000010;
  border: 1px solid #00000020;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    scale: 1.03;
    border-radius: 18px;
    background-color: #15bb78;
    box-shadow: 2px 2px 5px #90909010;
    color: #ffffff;
  }

  &:active {
    background-color: #99ddff90;
  }
`;

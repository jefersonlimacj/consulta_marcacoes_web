import {
  ArrowBigRight,
  Calendar1,
  CirclePlus,
  CircleX,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import { useCreateMarcacao } from "../../hook/useMarcacoes";
import { usePacientes } from "../../hook/usePaciente";
import { useEspecialidades } from "../../hook/useEspecialidade";
import { useLideres } from "../../hook/useLider";
import { useMedicos } from "../../hook/useMedico";

export function BtnNovaMarcacao() {
  const [open, setOpen] = useState<boolean>(false);
  const [dataAtendimento, setDataAtendimento] = useState<string>("");
  const [dataMarcada, setDataMarcada] = useState<string>("");
  const [especialidadeId, setEspecialidadeId] = useState<string>("");
  const [liderId, setLiderId] = useState<string>("");
  const [medicoId, setMedicoId] = useState<string>("");
  const [pacienteId, setPacienteId] = useState<string>("");
  const [tipoExame, setTipoExame] = useState<string>("");
  const [observacoes, setObservacoes] = useState<string>("");
  const [retorno, setRetorno] = useState<boolean>(false);

  const { pacientes, refetch: atualizarPacientes } = usePacientes();
  console.log(pacientes);
  const { especialidades } = useEspecialidades();
  const { lideres } = useLideres();
  const { medicos } = useMedicos();

  const pacienteSelecionado = pacientes?.find((p: any) => p.id === pacienteId);
  const especialidadeSelecionada = especialidades?.find(
    (e: any) => e.id === especialidadeId
  );
  const liderSelecionado = lideres?.find((l: any) => l.id === liderId);
  const medicoSelecionado = medicos?.find((m: any) => m.id === medicoId);

  const { criar, error } = useCreateMarcacao();
  const [espera, setEspera] = useState<boolean>(false);

  const criarMarcacaoFunc = async () => {
    setEspera(true);

    if (!pacienteId || !especialidadeId || !dataAtendimento) {
      alert("Preenchar todos os Campos");
      setEspera(false);
    }

    const dadosMarcacao = {
      dataAtendimento: new Date(dataAtendimento + "T12:00:00").toISOString(),
      dataMarcada: dataMarcada
        ? new Date(dataMarcada + "T12:00:00").toISOString()
        : "2000-01-01T14:00:00.000Z",
      especialidadeId,
      liderId: liderId || "",
      medicoId: medicoId || "",
      pacienteId,
      tipoExame: tipoExame || "",
      observacoes: observacoes || "",
      status: "AGUARDANDO",
      retorno,
    };

    console.log(dadosMarcacao);

    const res = await criar(dadosMarcacao);

    if (res) {
      setOpen(false);
      setEspera(false);
      setPacienteId("");
      setEspecialidadeId("");
      setDataAtendimento("");
      setLiderId("");
      setTipoExame("");
      setDataMarcada("");
      setMedicoId("");
      setObservacoes("");
    } else {
      console.log(error);
      setOpen(false);
      setEspera(false);
      setPacienteId("");
      setEspecialidadeId("");
      setDataAtendimento("");
      setLiderId("");
      setTipoExame("");
      setDataMarcada("");
      setMedicoId("");
      setObservacoes("");
    }
  };
  return (
    <>
      <BtnCadastrar
        onClick={() => {
          setOpen(true);
          setPacienteId("");
          setEspecialidadeId("");
          setDataAtendimento("");
          setLiderId("");
          setTipoExame("");
          setDataMarcada("");
          setMedicoId("");
          setObservacoes("");
        }}
      >
        <Calendar1 size={40} />
        <p>Agendamento</p>
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
        }}
        onClick={() => setOpen(false)}
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
                width: "100%",
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
                  {pacienteSelecionado?.nome || "Selecione o Paciente..."}
                </p>
              </div>
              <ModalPacientes
                listaPacientes={pacientes}
                paciente={pacienteId}
                setPaciente={setPacienteId}
                refetch={atualizarPacientes}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                width: "100%",
              }}
            >
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
                    width: "40%",
                    height: 60,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ fontSize: 12 }}>Especialidade</p>
                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {especialidadeSelecionada?.nome || "..."}
                  </p>
                </div>
                <ModalEspecialidades
                  especialidade={especialidadeId}
                  listaEspecialidades={especialidades}
                  setEspecialidade={setEspecialidadeId}
                />
              </div>
              <div
                style={{
                  width: "30%",
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
                <p style={{ fontSize: 12 }}>Data Atendimento</p>
                <TextoEntrada
                  largura="100%"
                  placeholder=""
                  onChange={(e) => setDataAtendimento(e.target.value)}
                  type="date"
                  value={dataAtendimento}
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
                    width: "30%",
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
                    {liderSelecionado?.nome || "..."}
                  </p>
                </div>
                <ModalLideres
                  lider={liderId}
                  listaLideres={lideres}
                  setLider={setLiderId}
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: 70,
                backgroundColor: "#DDD",
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                padding: "0px 10px",
                alignItems: "flex-start",
              }}
            >
              <p style={{ fontSize: 12 }}>Tipo Exame</p>
              <TextoEntrada
                largura="100%"
                onChange={(e) => setTipoExame(e.target.value)}
                placeholder="Digite Aqui"
                type="text"
                value={tipoExame}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "30%",
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
                <p style={{ fontSize: 12 }}> Essa consulta é um Retorno?</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    width: "100%",
                  }}
                >
                  <p style={{ fontSize: 18, fontWeight: 600 }}>Clique Aqui</p>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setRetorno(e.target.checked);
                      setMedicoId(""), setDataMarcada("");
                    }}
                  />
                </div>
              </div>
              {retorno && (
                <div
                  style={{
                    width: "25%",
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
                  <p style={{ fontSize: 12 }}>Data da Consulta</p>
                  <TextoEntrada
                    largura="100%"
                    placeholder=""
                    onChange={(e) => setDataMarcada(e.target.value)}
                    type="date"
                    value={dataMarcada}
                  />
                </div>
              )}
              {retorno && (
                <div
                  style={{
                    width: "45%",
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
                      width: "50%",
                      height: 60,
                      display: "flex",
                      flexDirection: "column",
                      padding: "0px 10px",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ fontSize: 12 }}>Médico</p>
                    <p
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        width:"100%",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hiddens",
                      }}
                    >
                      {medicoSelecionado?.nome || "..."}
                    </p>
                  </div>
                  <ModalMedicos
                    medico={medicoId}
                    setMedico={setMedicoId}
                    listaMedicos={medicos}
                  />
                </div>
              )}
            </div>
            <textarea
              placeholder="Observações:"
              onChange={(e) => setObservacoes(e.target.value)}
              style={{
                backgroundColor: "#fff",
                borderRadius: 14,
                height: 150,
                padding: 10,
                outline: "none",
              }}
            />
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
            onClick={() => criarMarcacaoFunc()}
          >
            {espera ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Registrar Marcação"
            )}
          </button>
        </div>
      </div>
    </>
  );
}

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
  refetch,
}: {
  paciente: any;
  setPaciente: any;
  listaPacientes: any;
  refetch: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const [nomePaciente, setNomePaciente] = useState<string>("");

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
          }}
        >
          <TextoEntrada
            largura="90%"
            type="text"
            placeholder="Pesquise o paciente"
            value={nomePaciente}
            onChange={(e) => setNomePaciente(e.target.value)}
          />
          <BtnRefresh onClick={refetch}>
            <RefreshCcw />
          </BtnRefresh>
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

function ModalEspecialidades({
  especialidade,
  setEspecialidade,
  listaEspecialidades,
}: {
  especialidade: any;
  setEspecialidade: any;
  listaEspecialidades: any;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const [nomeEspecialidade, setNomeEspecialidade] = useState<string>("");

  return (
    <>
      <BtnAdd
        onClick={() => {
          setOpen(!open);
          setNomeEspecialidade("");
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
          placeholder="Pesquise o paciente"
          value={nomeEspecialidade}
          onChange={(e) => setNomeEspecialidade(e.target.value)}
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
          {listaEspecialidades
            ?.filter((p: any) => {
              const nomeBusca = p.nome
                .toLowerCase()
                .includes(nomeEspecialidade.toLowerCase());
              return nomeBusca;
            })
            .map((espec: any) => {
              return (
                <div
                  style={{
                    width: "100%",
                    height: 40,
                    border: "1px solid #55555550",
                    backgroundColor:
                      espec.id === especialidade ? "#99d9ff50" : "transparent",
                    borderRadius: 10,
                    padding: 4,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  key={espec.id}
                  onClick={() => {
                    setEspecialidade(espec.id);
                    setOpen(false);
                  }}
                >
                  <p>{espec?.nome}</p>
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

function ModalMedicos({
  medico,
  setMedico,
  listaMedicos,
}: {
  medico: any;
  setMedico: any;
  listaMedicos: any;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const [nomeMedico, setNomeMedico] = useState<string>("");

  return (
    <>
      <BtnAdd
        onClick={() => {
          setOpen(!open);
          setNomeMedico("");
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
          value={nomeMedico}
          onChange={(e) => setNomeMedico(e.target.value)}
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
          {listaMedicos
            ?.filter((m: any) => {
              const nomeBusca = m.nome
                .toLowerCase()
                .includes(nomeMedico.toLowerCase());
              return nomeBusca;
            })
            .map((med: any) => {
              return (
                <div
                  style={{
                    width: "100%",
                    height: 40,
                    border: "1px solid #55555550",
                    backgroundColor:
                      med.id === medico ? "#99d9ff50" : "transparent",
                    borderRadius: 10,
                    padding: 4,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setMedico(med.id);
                    setOpen(false);
                  }}
                  key={med.id}
                >
                  <p>{med?.nome}</p>
                  <p>{med?.crm}</p>
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
  width: 300px;
  height: 150px;
  background-color: #f8f8f8;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 1px 1px 2px #00000010;
  border: 1px solid #00000020;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    scale: 1.03;
    border-radius: 22px;
    background-color: #bbddf9;
    box-shadow: 2px 2px 5px #00504410;
  }

  &:active {
    background-color: #99ddff90;
  }
`;

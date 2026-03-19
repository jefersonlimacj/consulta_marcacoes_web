import { CircleX, Loader2, UserRoundPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCreatePaciente } from "../../hook/usePaciente";

export function BtnCadastrarPacienteMenor() {
  const [open, setOpen] = useState<boolean>(false);
  const [nome, setNome] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [nSus, setNSus] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [telefoneS, setTelefoneS] = useState<string>("");

  const [espera, setEspera] = useState<boolean>(false);

  const { criar, error } = useCreatePaciente();

  const criarPacienteFunc = async () => {
    setEspera(true);
    if (!nome || !dataNascimento || !nSus || !cpf || !telefone) {
      alert("Preencha Todos os Campos");
    }

    const res = await criar({
      nome,
      dataNascimento: new Date(dataNascimento).toISOString(),
      nSus,
      cpf,
      telefone,
      telefoneS,
    });

    if (res?.id) {
      setOpen(false);
      setEspera(false);
      setNome("");
      setDataNascimento("");
      setNSus("");
      setCpf("");
      setTelefone("");
      setTelefoneS("");
    } else {
      alert(error);
      setOpen(false);
      setEspera(false);
      setNome("");
      setDataNascimento("");
      setNSus("");
      setCpf("");
      setTelefone("");
      setTelefoneS("");
    }
  };

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
      <BtnCadastrar onClick={() => setOpen(true)}>
        <UserRoundPlus size={20} />
        <p>Paciente</p>
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
        onClick={() => setOpen(false)}
      >
        <div
          style={{
            width: "70%",
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
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>Cadastro de Novos Pacientes</p>
            <CircleX
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(false)}
              color="red"
            />
          </div>

          <TextoEntrada
            placeholder="Insira aqui o nome"
            type="text"
            largura="100%"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            inputRef={inputRef}
          />
          <TextoEntrada
            placeholder="Insira aqui nº do SUS"
            type="text"
            largura="100%"
            value={nSus}
            onChange={(e) => setNSus(e.target.value)}
          />
          <TextoEntrada
            placeholder="Insira aqui o nº do CPF"
            type="text"
            largura="100%"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <TextoEntrada
            placeholder="Insira aqui o Contato 1"
            type="text"
            largura="100%"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
          <TextoEntrada
            placeholder="Insira aqui o Contato 2"
            type="text"
            largura="100%"
            value={telefoneS}
            onChange={(e) => setTelefoneS(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>Data de Nascimento</p>
            <TextoEntrada
              placeholder="Insira aqui o Contato 2"
              type="date"
              largura="60%"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
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
            onClick={() => criarPacienteFunc()}
          >
            {espera ? <Loader2 className="animate-spin" /> : "Salvar"}
          </button>
        </div>
      </div>
    </>
  );
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
        type={type}
        ref={inputRef}
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

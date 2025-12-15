import { GraduationCap, Loader2 } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import { useCriarMedico } from "../../hook/useMedico";

export function BtnCadastrarMedico() {
  const [open, setOpen] = useState<boolean>(false);
  const [nome, setNome] = useState<string>("");
  const [crm, setCrm] = useState<string>("");

  const [espera, setEspera] = useState<boolean>(false);

  const { criar, error } = useCriarMedico();

  const criarMedicoFunc = async () => {
    setEspera(true);
    if (!nome || !crm) {
      alert("Preencha todos os campos!");
    }

    const res = await criar({
      nome,
      crm,
    });

    if (res?.id) {
      setOpen(false);
      setEspera(false);
      setNome("");
      setCrm("");
    } else {
      alert(error);
      setEspera(false);
    }
  };

  return (
    <>
      <BtnCadastrar onClick={() => setOpen(true)}>
        <GraduationCap size={40} />
        <p>Médico</p>
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
            width: "30%",
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
          <p>Cadastro de Novos Médicos</p>
          <TextoEntrada
            placeholder="Insira aqui o nome"
            type="text"
            largura="100%"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextoEntrada
            placeholder="Insira aqui a CRM"
            type="text"
            largura="100%"
            value={crm}
            onChange={(e) => setCrm(e.target.value)}
          />
          <button  style={{
              width: "50%",
              padding: 5,
              backgroundColor: "#0090ff90",
              borderRadius: 14,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }} disabled={espera} onClick={() => criarMedicoFunc()}>
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

const BtnCadastrar = styled.div`
  aspect-ratio: 1;
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

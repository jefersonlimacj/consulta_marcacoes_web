import { ActivityIcon } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

export function BtnCadastrarEspecialidade() {
  const [open, setOpen] = useState<boolean>(false);
  const [nome, setNome] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  return (
    <>
      <BtnCadastrar onClick={() => setOpen(true)}>
        <ActivityIcon size={40} />
        <p>Especialidade</p>
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
          <p>Cadastro de Novos usuários</p>
          <TextoEntrada
            placeholder="Insira aqui o nome"
            type="text"
            largura="100%"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextoEntrada
            placeholder="Insira aqui a senha"
            type="text"
            largura="100%"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button>Salvar</button>
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
    height: 152px;
    background-color: #f2f9ff;
    box-shadow: 4px 4px 5px #00004430;
  }

  &:active {
    background-color: #99ddff90;
  }
`;

import { Ambulance, ArrowBigRightDash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { LayoutDashboard } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { SquareChartGantt } from "lucide-react";
import { useUser } from "../hook/useAdmin";

export function Menu() {
  const id = localStorage.getItem("id");
  const { usuario } = useUser(String(id));

  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "15%",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #BBB",
        padding: 15,
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            width: "100%",
            fontSize: 10,
            textAlign: "center",
            padding: 10,
            borderBottom: "1px solid #f0f0f0",
            marginBottom: 20,
          }}
        >
          <h1>Marcações</h1>
        </div>
        <ul>
          <BtnMenuStyle onClick={() => navigate("/home")} $cor={"#0050FF"}>
            <LayoutDashboard />
            <p>Dashboard</p>
          </BtnMenuStyle>
          {usuario?.regra === "admin" ? (
            <BtnMenuStyle
              onClick={() => navigate("/cadastros")}
              $cor={"#0090FF"}
            >
              <CirclePlus />
              <p>Cadastro</p>
            </BtnMenuStyle>
          ) : null}
          {usuario?.regra === "admin" ? (
            <BtnMenuStyle
              onClick={() => navigate("/consultas")}
              $cor={"#00B0FF"}
            >
              <SquareChartGantt />
              <p>Consulta</p>
            </BtnMenuStyle>
          ) : null}
          <BtnMenuStyle
            onClick={() => navigate("/feiradesaude2026")}
            $cor={"#00D1FF"}
          >
            <Ambulance />
            <p>Feira de Saúde</p>
          </BtnMenuStyle>
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor: "#DDD",
          padding: 10,
          borderRadius: 10,
          cursor: "pointer",
        }}
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        <p>{usuario?.username}</p>
        <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <p>Sair</p>
          <ArrowBigRightDash />
        </div>
      </div>
    </div>
  );
}

interface BtnMenuProps {
  $cor: string;
}

const BtnMenuStyle = styled.li<BtnMenuProps>`
  background-color: #e0e0e0;
  padding: 5px 10px;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  aling-items: center;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: ${(props) => props.$cor || "#0090ff90"};
  }
`;

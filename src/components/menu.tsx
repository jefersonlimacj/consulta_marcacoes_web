import { ArrowBigRightDash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { LayoutDashboard } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { SquareChartGantt } from "lucide-react";

export function Menu() {
  const user = localStorage.getItem("user");
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
          <BtnMenuStyle onClick={() => navigate("/home")}>
            <LayoutDashboard />
            <p>Dashboard</p>
          </BtnMenuStyle>
          <BtnMenuStyle onClick={() => navigate("/cadastros")}>
            <CirclePlus />
            <p>Cadastro</p>
          </BtnMenuStyle>
          <BtnMenuStyle onClick={() => navigate("/consultas")}>
            <SquareChartGantt />
            <p>Consulta</p>
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
        <p>{user}</p>
        <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <p>Sair</p>
          <ArrowBigRightDash />
        </div>
      </div>
    </div>
  );
}

const BtnMenuStyle = styled.li`
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
    background-color: #d0d0d0;
  }
`;

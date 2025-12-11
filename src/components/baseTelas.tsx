import { Menu } from "./menu";

export function BaseTelas({ conteudo }: { conteudo: any }) {
  const user = localStorage.getItem("user");

  if (!user) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
          top: 0,
          left: 0,
          zIndex: 30,
          backgroundColor: "#f0f0f050",
          backdropFilter: "blur(2px)",
          backgroundImage: `radial-gradient(circle at 10% 20%, #0050FF50, transparent 25%), radial-gradient(circle at 80% 0%, #00908050, transparent 25%), radial-gradient(circle at 20% 80%, #0050DD90, transparent 25%), radial-gradient(circle at 90% 100%, #0090FF50, transparent 25%)`,
        }}
      >
        <p>Você não está Logado</p>
      </div>
    );
  }
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Menu />
      <Conteudo conteudo={conteudo} />
    </div>
  );
}

function Conteudo({ conteudo }: { conteudo: any }) {
  return (
    <div
      style={{
        width: "85%",
        padding: 10,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {conteudo}
    </div>
  );
}

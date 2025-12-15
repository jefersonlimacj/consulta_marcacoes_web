import { useState } from "react";
import { useLogin } from "../hook/useLogin";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const { login, loading, error } = useLogin();

  const [msgErro, setMsgErro] = useState("");

  const fazerLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim() || !senha.trim()) {
      setMsgErro("Preencha usuário e senha!");
      return;
    }

    const retorno = await login(nome, senha);

    if (retorno?.id) {
      console.log("Usuário logado com ID:", retorno.id);
      localStorage.setItem("id", retorno?.id);
      localStorage.setItem("user", retorno?.username);
      navigate("/home");
    } else {
      setMsgErro(`${error?.message}`);
      return error?.message;
    }
  };

  return (
    <>
      {loading && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            zIndex: 30,
            pointerEvents: "none",
            backgroundColor: "#f0f0f050",
            backdropFilter: "blur(2px)",
            backgroundImage: `radial-gradient(circle at 10% 20%, #0050FF50, transparent 25%), radial-gradient(circle at 80% 0%, #00908050, transparent 25%), radial-gradient(circle at 20% 80%, #0050DD90, transparent 25%), radial-gradient(circle at 90% 100%, #0090FF50, transparent 25%)`,
          }}
        >
          <Loader2 className="animate-spin" size={50} color="#0050FF" />
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
        className="bg-gray-100 dark:bg-gray-900"
      >
        <div
          style={{
            // backgroundColor: "#FF001090",
            width: "100%",
            height: "100%",
            position: "absolute",
            opacity: 0.3,
            pointerEvents: "none",
            backgroundImage: `radial-gradient(circle at 10% 20%, #0050FF50, transparent 25%), radial-gradient(circle at 80% 0%, #00908050, transparent 25%), radial-gradient(circle at 20% 80%, #0050DD90, transparent 25%), radial-gradient(circle at 90% 100%, #0090FF50, transparent 25%)`,
          }}
        />
        <div className="mx-auto flex flex-col max-w-3xl items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10 gap-5">
          <p>Login </p>
          <EntradaNome nome={nome} setNome={setNome} />
          <EntradaSenha senha={senha} setSenha={setSenha} />
          <div
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
            onClick={(e) => fazerLogin(e)}
          >
            Entrar
          </div>

          <p className="text-sm text-red-600">{msgErro}</p>
        </div>
      </div>
    </>
  );
}

export default Login;

function EntradaNome({ nome, setNome }: { nome?: string; setNome?: any }) {
  return (
    <div
      style={{
        width: 300,
        backgroundColor: "#f8f8f8",
        padding: 10,
        borderRadius: 8,
        border: "1px solid #e5e5e5",
      }}
    >
      <input
        type="text"
        className="text-black dark:text-black"
        style={{ width: "100%", outline: "none" }}
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
    </div>
  );
}
function EntradaSenha({ senha, setSenha }: { senha?: string; setSenha?: any }) {
  return (
    <div
      style={{
        width: 300,
        backgroundColor: "#f8f8f8",
        padding: 10,
        borderRadius: 8,
        border: "1px solid #e5e5e5",
      }}
    >
      <input
        type="password"
        className="text-black dark:text-black"
        style={{ width: "100%", outline: "none" }}
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
    </div>
  );
}

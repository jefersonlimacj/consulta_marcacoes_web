import { Loader2, LogOut } from "lucide-react";
import { useState, type JSX } from "react";
import styled from "styled-components";
import { BtnNovaParticipacao } from "./modals/participacao";
import { BtnCadastrarPacienteMenor } from "./modals/pacienteBtnMenor";
import { usePacientes } from "../hook/usePaciente";
import { useParticipacoes } from "../hook/useParticipacao";
import { LinhaParticipacao } from "../components/linhaParticipacao";
import { ModalParticipacaoEdit } from "./modals/participacaoEdit";
import { useNavigate } from "react-router-dom";

function Painel() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF20",
        padding: 5,
      }}
    >
      <p>Painel</p>
    </div>
  );
}

function Participacoes() {
  const { participacoes, loading } = useParticipacoes();

  const [buscarNomes, setBuscarNomes] = useState("");

  const [open, setOpen] = useState(false);

  const [participacao, setParticipacao] = useState(null);

  const Cabecalho = (
    <div
      style={{
        width: "100%",
        padding: 8,
        backgroundColor: "#FFFFFF90",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 12,
        marginTop: 15,
        backdropFilter: "blur(5px)",
        boxShadow: "0px 5px 5px #00000040",
        zIndex: 1,
      }}
    >
      <div style={{ width: "20%", borderRight: "1px solid #999" }}>
        <p>Paciente</p>
      </div>
      <div
        style={{
          width: "10%",
          borderRight: "1px solid #999",
          paddingLeft: 5,
        }}
      >
        <p>Contato</p>
      </div>
      <div
        style={{
          width: "10%",
          borderRight: "1px solid #999",
          paddingLeft: 5,
        }}
      >
        <p>Líder</p>
      </div>
      <div
        style={{
          width: "55%",
          borderRight: "1px solid #999",
          paddingLeft: 3,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Cardiologista
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Ginecologista
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Ortopedista
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Urologista
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Oftalmologista
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Odontologista
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          USG
        </div>
        <div
          style={{
            width: "10%",
            borderRight: "1px solid #999",
            paddingLeft: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Mamografia
        </div>
        <div
          style={{
            width: "10%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          ECG
        </div>
      </div>
      <div style={{ width: "5%", paddingLeft: 5 }}>
        <p>Status</p>
      </div>
    </div>
  );

  function normalizarTexto(texto: string) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 10,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <input
          type="text"
          placeholder="Pesquise por paciente..."
          style={{
            padding: "6px 20px",
            backgroundColor: "#FFFFFF",
            borderRadius: 14,
            outline: "none",
            borderRight: "1px solid #00000030",
          }}
          onChange={(e) => setBuscarNomes(e.target.value)}
          value={buscarNomes}
        />

        <BtnNovaParticipacao />
        <BtnCadastrarPacienteMenor />
      </div>
      {Cabecalho}
      <div
        style={{
          width: "100%",
          height: "85vh",
          overflow: "auto",
          scrollbarWidth: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingBottom: 30,
          paddingTop: 10,
          borderRadius: 12,
        }}
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          (participacoes ? [...participacoes] : [])
            .filter((p: any) => {
              const nomePaciente = normalizarTexto(p?.paciente?.nome ?? "");
              const buscaNome = normalizarTexto(buscarNomes);
              const nomeMatch = nomePaciente.includes(buscaNome);
              return nomeMatch;
            })
            .sort((a, b) =>
              (a?.paciente?.nome ?? "").localeCompare(
                b?.paciente?.nome ?? "",
                "pt-BR",
              ),
            )
            .map((p: any) => (
              <LinhaParticipacao
                key={p.id}
                p={p}
                onClick={() => {
                  setParticipacao(p);
                  setOpen(true);
                }}
              />
            ))
        )}
      </div>
      <ModalParticipacaoEdit p={participacao} open={open} setOpen={setOpen} />
    </div>
  );
}

function Pacientes() {
  const { pacientes } = usePacientes();
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      {pacientes && pacientes.length > 0 ? (
        pacientes.map((p) => <p key={p.id}>{p.nome}</p>)
      ) : (
        <p>Nenhum paciente cadastrado</p>
      )}
    </div>
  );
}

interface BtnMenuProps {
  $cor: string;
}

const BtnMenuStyle = styled.li<BtnMenuProps>`
  background-color: #F4F4F4;
  padding: 5px 10px;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: ${(props) => props.$cor || "#0090ff90"};
  }

  &:active {
    background-color: ${(props) => props.$cor + 50 || "#0090ff90"};
`;

interface FeiradeSaudeMenuProps {
  setConteudo: (component: JSX.Element) => void;
}

function FeiradeSaudeMenu({ setConteudo }: FeiradeSaudeMenuProps) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: 200,
        height: "100%",
        backgroundColor: "#FFFFFF10",
        borderRadius: 18,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        backdropFilter: "blur(5px)",
        borderLeft: "1px solid #FFFFFF30",
        borderTop: "1.5px solid #FFFFFF60",
        borderRight: "1.5px solid #FFFFFF99",
        borderBottom: "1.5px solid #FFFFFF70",
        overflow: "hidden",
        boxShadow: "2px 2px 5px #00000020",
      }}
    >
      <img
        src="https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/Marca-Frente.png"
        alt=""
        width={"90%"}
      />
      <div
        style={{
          width: "100%",
          height: "80%",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          zIndex: 1,
        }}
      >
        <BtnMenuStyle onClick={() => setConteudo(<Painel />)} $cor={"#15ff78"}>
          <p>Painel</p>
        </BtnMenuStyle>
        <BtnMenuStyle
          onClick={() => setConteudo(<Participacoes />)}
          $cor={"#15ff78"}
        >
          <p>Participações</p>
        </BtnMenuStyle>
        <BtnMenuStyle
          onClick={() => setConteudo(<Pacientes />)}
          $cor={"#15ff78"}
        >
          <p>Pacientes</p>
        </BtnMenuStyle>
      </div>
      <BtnMenuStyle
        $cor={"#15ff78"}
        style={{ zIndex: 1 }}
        onClick={() => {
          navigate("/home");
        }}
      >
        <p>Sair</p>
        <LogOut size={16} color="#0030FF" />
      </BtnMenuStyle>
      <img
        src="https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/Marca-Costas.png"
        alt=""
        width={"90%"}
      />
      <div
        style={{
          position: "absolute",
          backgroundColor: "#FFFFFF25",
          width: 500,
          height: 500,
          rotate: "45deg",
          top: 450,
          left: -250,
        }}
      />
      <div
        style={{
          position: "absolute",
          backgroundColor: "#FFFFFF15",
          width: 500,
          height: 500,
          rotate: "135deg",
          top: -150,
          left: -250,
        }}
      />
    </div>
  );
}

interface FeiradeSaudeConteudoProps {
  conteudo: JSX.Element;
}

function FeiradeSaudeConteudo({ conteudo }: FeiradeSaudeConteudoProps) {
  return (
    <div
      style={{
        width: `calc(100% - 200px)`,
        height: "100%",
        backgroundColor: "#FFFFFF70",
        borderRadius: 18,
        backdropFilter: "blur(10px)",
        borderLeft: "1px solid #FFFFFF30",
        borderTop: "1px solid #FFFFFF30",
        borderRight: "1px solid #FFFFFF99",
        borderBottom: "1px solid #FFFFFF70",
        boxShadow: "2px 2px 5px #00000020",
        padding: 5,
        overflow: "hidden",
      }}
    >
      {conteudo}
    </div>
  );
}

function FeiradeSaude() {
  const [conteudo, setConteudo] = useState(<Painel />);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        gap: 10,
        backgroundColor: "#00CCFF",
        backgroundImage: `radial-gradient(circle at 10% 20%, #0050FF50, transparent 25%), radial-gradient(circle at 80% 0%, #0090BB50, transparent 25%), radial-gradient(circle at 20% 80%, #0050DD90, transparent 25%), radial-gradient(circle at 35% 65%, #FFFFFF90, transparent 35%), radial-gradient(circle at 90% 100%, #0090FF50, transparent 25%)`,
      }}
    >
      <div
        style={{
          backgroundImage: "url(src/assets/Marca-Frente.png)",
          backgroundPosition: "center",
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "cover",
          //   backgroundBlendMode: "screen",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: 0.3,
        }}
      />
      <FeiradeSaudeMenu setConteudo={setConteudo} />
      <FeiradeSaudeConteudo conteudo={conteudo} />
    </div>
  );
}
export default FeiradeSaude;

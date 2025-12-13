import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

const GET_MARCACOES = gql`
  query Marcacoes {
    marcacoes {
      id
      paciente {
        id
        nome
        nSus
        dataNascimento
        cpf
        telefone
        telefoneS
      }
      especialidade {
        nome
        id
      }
      dataAtendimento
      dataMarcada
      lider {
        nome
        telefone
      }
      medico {
        nome
        id
        crm
      }
      status
      tipoExame
      observacoes
      retorno
    }
  }
`;

interface Paciente {
  id: string;
  nome: string;
  nSus: string | null;
  dataNascimento: string | null;
  cpf: string | null;
  telefone: string | null;
  telefoneS: string | null;
}

interface Especialidade {
  id: string;
  nome: string;
}

interface Lider {
  nome: string;
  telefone: string | null;
}

interface Medico {
  id: string;
  nome: string;
  crm: string | null;
}

interface Marcacao {
  id: string;
  paciente: Paciente;
  especialidade: Especialidade;
  dataAtendimento: string;
  dataMarcada: string;
  lider: Lider;
  medico: Medico | null;
  status: string;
  tipoExame: string;
  observacoes: string | null;
}

interface MarcacoesData {
  marcacoes: Marcacao[];
}

export function useMarcacoes() {
  const { data, loading, error, refetch } = useQuery<MarcacoesData>(
    GET_MARCACOES,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    marcacoes: data?.marcacoes || [],
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const CREATE_MARCACAO = gql`
  mutation CriarMarcacao($input: MarcacaoInput) {
    criarMarcacao(input: $input) {
      id
    }
  }
`;

interface MarcacaoInput {
  dataAtendimento: string;
  dataMarcada: string;
  especialidadeId: string;
  liderId: string;
  medicoId: string;
  observacoes: string;
  pacienteId: string;
  status: string;
  tipoExame: string;
  retorno: boolean;
}

interface MarcacaoInputRes {
  id: string;
}

export function useCreateMarcacao() {
  const [criarMarcacao, { data, loading, error }] = useMutation<
    MarcacaoInputRes,
    { input: MarcacaoInput }
  >(CREATE_MARCACAO);

  const criar = async (input: MarcacaoInput) => {
    const res = await criarMarcacao({
      variables: {
        input,
      },
    });

    if (res?.data?.id) {
      return res?.data?.id;
    } else {
      console.error(error);
    }
  };

  return {
    criar,
    data: data?.id,
    loading,
    error,
  };
}

const GET_ATUALIZAR_MARCACAO = gql`
  mutation AtualizarMarcacao($id: ID!, $input: MarcacaoInputUpdate!) {
    atualizarMarcacao(id: $id, input: $input) {
      id
      status
      tipoExame
      dataMarcada
      observacoes
    }
  }
`;

interface AtualizarMarcacaoInput {
  pacienteId?: number;
  especialidadeId?: number;
  tipoExame?: string;
  dataAtendimento?: string;
  liderId?: number;
  dataMarcada?: string;
  medicoId?: number | null;
  status?: string;
  observacoes?: string | null;
}

interface AtualizarMarcacaoResponse {
  atualizarMarcacao: {
    id: string;
    status: string;
  };
}

export function useEditMarcacao() {
  const [atualizarMarcacao, { data, loading, error }] = useMutation<
    AtualizarMarcacaoResponse,
    { id: string; input: AtualizarMarcacaoInput }
  >(GET_ATUALIZAR_MARCACAO);

  const editar = async (id: string, input: AtualizarMarcacaoInput) => {
    try {
      const res = await atualizarMarcacao({
        variables: {
          id,
          input,
        },
      });
      if (res.data?.atualizarMarcacao) {
        // console.log(
        //   "Marcação atualizada com sucesso!",
        //   res.data.atualizarMarcacao
        // );
        return res.data.atualizarMarcacao;
      }
    } catch (err) {
      console.error("Erro ao atualizar marcação:", err);
      throw err;
    }
  };
  return {
    editar,
    data: data?.atualizarMarcacao,
    loading,
    error,
  };
}

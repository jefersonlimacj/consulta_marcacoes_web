import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

const GET_PARTICIPACOES = gql`
  query Participacoes {
    participacoes {
      id
      paciente {
        id
        nome
        cpf
        dataNascimento
        nSus
        telefone
        telefoneS
      }
      lider {
        id
        nome
        telefone
      }
      statusFeira
      presenca
      criadoEm
      cardiologista
      cardiologistaP
      ginecologista
      ginecologistaP
      ortopedista
      ortopedistaP
      urologista
      urologistaP
      oftalmologista
      oftalmologistaP
      odonto
      odontoP
      usg
      usgP
      mamografia
      mamografiaP
      eletrocardiograma
      eletrocardiogramaP
      clinico
      clinicoP
      preventivo
      preventivoP
      raiox
      raioxP
    }
  }
`;

interface ParticipacoesList {
  participacoes: Array<{
    id: string;
    paciente: {
      cpf: string;
      dataNascimento: string;
      id: string;
      nome: string;
      nSus: string;
      telefone: string;
      telefoneS: string;
    };
    lider: {
      id: string;
      nome: string;
      telefone: string;
    };
    statusFeira: string;
    presenca: boolean;
    criadoEm: string;
    cardiologista?: boolean;
    cardiologistaP?: boolean;
    ginecologista?: boolean;
    ginecologistaP?: boolean;
    ortopedista?: boolean;
    ortopedistaP?: boolean;
    urologista?: boolean;
    urologistaP?: boolean;
    oftalmologista?: boolean;
    oftalmologistaP?: boolean;
    odonto?: boolean;
    odontoP?: boolean;
    usg?: boolean;
    usgP?: boolean;
    mamografia?: boolean;
    mamografiaP?: boolean;
    eletrocardiograma?: boolean;
    eletrocardiogramaP?: boolean;
    clinico?: boolean;
    clinicoP?: boolean;
    preventivo?: boolean;
    preventivoP?: boolean;
    raiox?: boolean;
    raioxP?: boolean;
  }>;
}

export function useParticipacoes() {
  const { data, loading, error, refetch } =
    useQuery<ParticipacoesList>(GET_PARTICIPACOES);
  return {
    participacoes: data?.participacoes || [],
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const GET_PARTICIPACAO_ID = gql`
  query Participacao($participacaoId: ID!) {
    participacao(id: $participacaoId) {
      id
      paciente {
        id
        nome
      }
      lider {
        id
        nome
      }
      statusFeira
      presenca
      criadoEm
      cardiologista
      ginecologista
      ortopedista
      urologista
      oftalmologista
      odonto
      usg
      mamografia
      eletrocardiograma
      clinico
      cardiologistaP
      clinicoP
      eletrocardiogramaP
      ginecologistaP
      liderId
      mamografiaP
      odontoP
      oftalmologistaP
      ortopedistaP
      preventivo
      preventivoP
      urologistaP
      usgP
      raiox
      raioxP
    }
  }
`;

interface ParticipacaoProps {
  participacao: {
    id: string;
    paciente: {
      id: string;
      nome: string;
      cpf: string;
      dataNascimento: string;
      telefone: string;
      telefoneS: string;
      nSus: string;
    };
    lider: {
      nome: string;
      telefone: string;
      id: string;
    };
    statusFeira: string;
    presenca: boolean;
    criadoEm: string;
    cardiologista?: boolean;
    cardiologistaP?: boolean;
    ginecologista?: boolean;
    ginecologistaP?: boolean;
    ortopedista?: boolean;
    ortopedistaP?: boolean;
    urologista?: boolean;
    urologistaP?: boolean;
    oftalmologista?: boolean;
    oftalmologistaP?: boolean;
    odonto?: boolean;
    odontoP?: boolean;
    usg?: boolean;
    usgP?: boolean;
    mamografia?: boolean;
    mamografiaP?: boolean;
    eletrocardiograma?: boolean;
    eletrocardiogramaP?: boolean;
    clinico?: boolean;
    clinicoP?: boolean;
    preventivo?: boolean;
    preventivoP?: boolean;
    raiox?: boolean;
    raioxP?: boolean;
  };
}

export function useParticipacaoId(participacaoId: string) {
  const { data, loading, error, refetch } = useQuery<ParticipacaoProps>(
    GET_PARTICIPACAO_ID,
    {
      variables: { participacaoId },
    },
  );
  return {
    participacao: data?.participacao,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const CREATE_PARTICIPACAO = gql`
  mutation CriarParticipacao($input: ParticipacaoInput) {
    criarParticipacao(input: $input) {
      id
    }
  }
`;

export function useCreateParticipacao() {
  const [createParticipacaoMutation, { data, loading, error }] = useMutation<{
    criarParticipacao: { id: string };
  }>(CREATE_PARTICIPACAO);

  const createParticipacao = async (input: any) => {
    const response = await createParticipacaoMutation({ variables: { input } });
    return response.data?.criarParticipacao;
  };

  return {
    createParticipacao,
    data,
    loading,
    error,
  };
}

const EDIT_PARTICIPACAO = gql`
  mutation AtualizarParticipacao(
    $input: ParticipacaoInputUpdate!
    $atualizarParticipacaoId: ID!
  ) {
    atualizarParticipacao(input: $input, id: $atualizarParticipacaoId) {
      id
    }
  }
`;

export function useEditParticipacao() {
  const [editParticipacaoMutation, { data, loading, error }] = useMutation<{
    atualizarParticipacao: { id: string };
  }>(EDIT_PARTICIPACAO);
  const editParticipacao = async (id: string, input: any) => {
    const response = await editParticipacaoMutation({
      variables: { input, atualizarParticipacaoId: id },
    });
    return response.data?.atualizarParticipacao;
  };
  return {
    editParticipacao,
    data,
    loading,
    error,
  };
}

const DELETE_PARTICIPACAO = gql`
  mutation DeletarParticipacao($deletarParticipacaoId: ID!) {
    deletarParticipacao(id: $deletarParticipacaoId)
  }
`;

export function useDeleteParticipacao() {
  const [deleteParticipacaoMutation, { data, loading, error }] = useMutation<{
    deletarParticipacao: boolean;
  }>(DELETE_PARTICIPACAO);
  const deleteParticipacao = async (id: string) => {
    const response = await deleteParticipacaoMutation({
      variables: { deletarParticipacaoId: id },
    });
    return response.data?.deletarParticipacao;
  };
  return {
    deleteParticipacao,
    data,
    loading,
    error,
  };
}

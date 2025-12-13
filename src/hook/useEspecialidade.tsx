import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

const GET_ESPECIALIDADES = gql`
  query Especialidades {
    especialidades {
      id
      nome
    }
  }
`;

interface Especialidade {
  id: string;
  nome: string;
}

interface EspecialidadeData {
  especialidades: Especialidade[];
}

export function useEspecialidades() {
  const { data, loading, error } =
    useQuery<EspecialidadeData>(GET_ESPECIALIDADES);

  return {
    especialidades: data?.especialidades,
    loading,
    error,
  };
}

const CREATE_ESPECIALIDADE = gql`
  mutation CriarEspecialidade($input: EspecialidadeInput!) {
    criarEspecialidade(input: $input) {
      id
      nome
    }
  }
`;

interface EspecialidadeInput {
  nome: string;
}

interface EspecialidadeInputRes {
  criarEspecialidade: { id: string; nome: string };
}

export function useCreateEspecialidade() {
  const [criarEspecialidade, { data, loading, error }] = useMutation<
    EspecialidadeInputRes,
    { input: EspecialidadeInput }
  >(CREATE_ESPECIALIDADE);

  const criar = async (input: EspecialidadeInput) => {
    const res = await criarEspecialidade({
      variables: {
        input,
      },
    });
    if (res?.data?.criarEspecialidade.id) {
      return res.data.criarEspecialidade;
    } else {
      console.log(error);
    }
  };

  return {
    criar,
    data: data?.criarEspecialidade,
    loading,
    error,
  };
}

import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

const GET_LIDERES = gql`
  query Lideres {
    lideres {
      id
      nome
      telefone
    }
  }
`;

interface LiderRes {
  id: string;
  nome: string;
  telefone: string;
}

interface LideresData {
  lideres: LiderRes[];
}

export function useLideres() {
  const { data, loading, error } = useQuery<LideresData>(GET_LIDERES);

  return {
    lideres: data?.lideres,
    loading,
    error,
  };
}

const CREATE_LIDER = gql`
  mutation CriarLider($input: LiderInput!) {
    criarLider(input: $input) {
      id
      nome
      telefone
    }
  }
`;
interface LiderInput {
  nome: string;
  telefone: string;
}

interface LiderInputRes {
  criarLider: { id: string; nome: string; telefone: string };
}

export function useCreateLider() {
  const [criarLider, { data, loading, error }] = useMutation<
    LiderInputRes,
    { input: LiderInput }
  >(CREATE_LIDER);

  const criar = async (input: LiderInput) => {
    const res = await criarLider({
      variables: {
        input,
      },
    });
    if (res?.data?.criarLider?.id) {
      return res.data.criarLider;
    } else {
      console.log(error);
    }
  };

  return {
    criar,
    data: data?.criarLider,
    loading,
    error
  };
}

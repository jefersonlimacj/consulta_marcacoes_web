import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

const GET_MEDICOS = gql`
  query Medicos {
    medicos {
      id
      nome
      crm
    }
  }
`;

interface Medico {
  id: string;
  nome: string;
  crm: string;
}

interface MedicosData {
  medicos: Medico[];
}

export function useMedico() {
  const { data, loading, error, refetch } = useQuery<MedicosData>(GET_MEDICOS);

  return {
    listaMedicos: data?.medicos,
    loading,
    error,
    refetch,
  };
}

const CREATE_MEDICO = gql`
  mutation CriarMedico($input: MedicoInput!) {
    criarMedico(input: $input) {
      id
    }
  }
`;

interface MedicoInput {
  nome: string;
  crm: string;
}

interface MedicoRes {
  criarMedico: { id: string; nome: string; crm: string };
}

export function useCriarMedico() {
  const [criarMedico, { data, loading, error }] = useMutation<
    MedicoRes,
    { input: MedicoInput }
  >(CREATE_MEDICO);

  const criar = async (input: MedicoInput) => {
    const res = await criarMedico({
      variables: {
        input,
      },
    });
    if (res?.data?.criarMedico.id) {
      return res.data.criarMedico;
    } else {
      console.log(error);
    }
  };
  return {
    criar,
    data: data?.criarMedico,
    loading,
    error,
  };
}

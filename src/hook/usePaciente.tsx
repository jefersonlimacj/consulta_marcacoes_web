import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

const GET_PACIENTES = gql`
  query Pacientes {
    pacientes {
      id
      dataNascimento
      cpf
      nSus
      nome
      telefone
      telefoneS
    }
  }
`;

interface Paciente {
  id: string;
  dataNascimento: string;
  cpf: string;
  nSus: string;
  nome: string;
  telefone: string;
  telefoneS: string;
}

interface PacienteData {
  pacientes: Paciente[];
}

export function usePacientes() {
  const { data, loading, error, refetch } = useQuery<PacienteData>(GET_PACIENTES);

  return {
    pacientes: data?.pacientes,
    loading,
    error,
    refetch: refetch || Promise.resolve()
  };
}

const CREATE_PACIENTE = gql`
  mutation CriarPaciente($input: PacienteInput!) {
    criarPaciente(input: $input) {
      id
      nome
    }
  }
`;

interface PacienteInput {
  nome: string;
  dataNascimento: string;
  nSus: string;
  cpf: string;
  telefone: string;
  telefoneS: string;
}

interface PacienteInputRes {
  criarPaciente: { id: string; nome: string };
}

export function useCreatePaciente() {
  const [criarPaciente, { data, loading, error }] = useMutation<
    PacienteInputRes,
    { input: PacienteInput }
  >(CREATE_PACIENTE);

  const criar = async (input: PacienteInput) => {
    const res = await criarPaciente({
      variables: {
        input,
      },
    });
    if (res?.data?.criarPaciente.id) {
      return res.data.criarPaciente;
    } else {
      console.log(error);
    }
  };
  return {
    criar,
    data: data?.criarPaciente,
    loading,
    error,
  };
}

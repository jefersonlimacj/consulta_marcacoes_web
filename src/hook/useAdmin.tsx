import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

const GET_USERS = gql`
  query Usuarios {
    usuarios {
      id
      username
      password
    }
  }
`;

interface User {
  id: string;
  username: string;
}

interface ListUsersResponse {
  usuarios: User[];
}

export function useUsers() {
  const { data, loading, error, refetch } = useQuery<ListUsersResponse>(
    GET_USERS,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    usuarios: data?.usuarios,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const CREATE_USER = gql`
  mutation CriarUsuario($input: UsuarioInput!) {
    criarUsuario(input: $input) {
      password
      username
      id
    }
  }
`;

interface UsuarioInput {
  username: string;
  password: string;
}

interface UsuarioRes {
  criarUsuario: { id: string; username: string; password: string };
}

export function useCreateUser() {
  const [criarUsuario, { data, loading, error }] = useMutation<
    UsuarioRes,
    { input: UsuarioInput }
  >(CREATE_USER);

  const criar = async (input: UsuarioInput) => {
    const res = await criarUsuario({
      variables: {
        input,
      },
    });
    if (res.data?.criarUsuario?.id) {
      return res.data.criarUsuario;
    }
  };
  return {
    criar,
    data: data?.criarUsuario,
    loading,
    error,
  };
}

// const UPDATE_USER = gql``;

// const DELETE_USER = gql``;

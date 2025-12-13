// src/hooks/useLogin.ts
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const LOGIN_MUTATION = gql`
  mutation Login($input: UsuarioInput!) {
    login(input: $input) {
      id
      username
    }
  }
`;

type LoginResponse = {
  login: {
    id: string;
    username: string;
  };
};

type LoginVariables = {
  input: {
    username: string;
    password: string;
  };
};

export function useLogin() {
  const [loginMutation, { data, loading, error }] = useMutation<
    LoginResponse,
    LoginVariables
  >(LOGIN_MUTATION);

  const login = async (username: string, password: string) => {
    try {
      const result = await loginMutation({
        variables: {
          input: { username, password },
        },
      });

      if (result.data?.login) {
        return result.data.login;
      }
    } catch (err) {
      console.error("Erro no login:", err);
    }
  };

  return {
    login,
    user: data?.login,
    loading,
    error,
  };
}

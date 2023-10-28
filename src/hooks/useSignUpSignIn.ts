import { useMutation } from "react-query";
import { login, register } from "../api";

export const useSignIn = () => useMutation(login);

export const useSignUp = () => useMutation(register);

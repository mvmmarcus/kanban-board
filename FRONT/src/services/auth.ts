import { AxiosPromise } from "axios";
import callApiBase, { MethodEnum } from "./base";

type LoginForm = {
  login: string;
  senha: string;
};

const authApi = {
  login: (data: LoginForm): AxiosPromise<string> =>
    callApiBase({
      endpoint: "/login",
      method: MethodEnum.POST,
      data,
    }),
};

export default authApi;

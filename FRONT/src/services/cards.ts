import { AxiosPromise } from "axios";
import callApiBase, { MethodEnum } from "./base";

export enum Lista {
  TODO = "To do",
  DOING = "Doing",
  DONE = "Done",
}

export type CardResponse = {
  titulo: string;
  conteudo: string;
  lista: Lista;
  id: string;
};

export type CreateCardProps = {
  titulo?: string;
  conteudo?: string;
  lista?: Lista;
};

const cardsApi = {
  getCards: (): AxiosPromise<CardResponse[]> =>
    callApiBase({
      endpoint: `/cards`,
      method: MethodEnum.GET,
    }),
  createCard: (data: CreateCardProps): AxiosPromise<CardResponse> =>
    callApiBase({
      endpoint: `/cards`,
      method: MethodEnum.POST,
      data,
    }),
  updateCard: (data: CardResponse): AxiosPromise<CardResponse> =>
    callApiBase({
      endpoint: `/cards/${data.id}`,
      method: MethodEnum.PUT,
      data,
    }),
  deleteCard: (cardId: string): AxiosPromise<CardResponse[]> =>
    callApiBase({
      endpoint: `/cards/${cardId}`,
      method: MethodEnum.DELETE,
    }),
};

export default cardsApi;

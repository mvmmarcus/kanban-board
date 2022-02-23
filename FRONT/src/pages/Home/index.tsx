import React, { useCallback, useEffect, useState } from "react";

import cardsApi, { Lista, CreateCardProps } from "services/cards";
import Board from "components/Board";
import Header from "components/Header";
import BoardColumn, { ColumnTypes } from "components/BoardColumn";
import { CardProps } from "components/Card";

import { Wrapper } from "./styles";

type FormatStatus = { [key: string]: ColumnTypes };

export const Home = () => {
  const [cards, setCards] = useState<CardProps[]>([]);

  const formatCardStatus = (status: Lista) => {
    const formattedStatus: FormatStatus = {
      "To do": "toDo",
      Doing: "doing",
      Done: "done",
    };

    return formattedStatus[status];
  };

  const formatCard = useCallback(
    (card: CreateCardProps & Pick<CardProps, "id">) => {
      const formattedCard = {
        id: card.id as string,
        title: card.titulo as string,
        content: card.conteudo as string,
        status: formatCardStatus(card.lista as Lista),
      };

      return formattedCard;
    },
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await cardsApi.getCards();

        const formattedCards = data.map((card) => {
          return formatCard(card);
        });

        setCards(formattedCards);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [formatCard]);

  const handleAddCard = useCallback(
    async (card: CreateCardProps & Pick<CardProps, "id">) => {
      const form = {
        titulo: card.titulo,
        conteudo: card.conteudo,
        lista: Lista.TODO,
      };

      try {
        const { data } = await cardsApi.createCard(form);

        const formattedCard = formatCard(data);

        setCards((prev) => [...prev, formattedCard]);
      } catch (error) {
        console.log(error);
      }
    },
    [formatCard]
  );

  const handleDeleteCard = useCallback(
    async (cardId: string) => {
      try {
        const { data } = await cardsApi.deleteCard(cardId);

        const formattedCards = data.map((card) => {
          return formatCard(card);
        });

        setCards(formattedCards);
      } catch (error) {
        console.log(error);
      }
    },
    [formatCard]
  );

  const handleEditCard = useCallback(
    async (
      card: CreateCardProps & Pick<CardProps, "id">,
      isMoving?: boolean
    ) => {
      const form = {
        id: card.id as string,
        titulo: card.titulo as string,
        conteudo: card.conteudo as string,
        lista: card.lista as Lista,
      };

      try {
        const { data } = await cardsApi.updateCard(form);

        const formattedCard = formatCard(card);

        if (isMoving) {
          const updatedCards = cards.filter((card) => card.id !== data.id);
          setCards([...updatedCards, formattedCard]);

          return;
        }

        const updatedCards = cards.map((card) => {
          if (card.id === formattedCard.id) {
            return formattedCard;
          }
          return card;
        });

        setCards(updatedCards as CardProps[]);
      } catch (error) {
        console.log(error);
      }
    },
    [cards, formatCard]
  );

  const filterCardByStatus = (cards: CardProps[], status: ColumnTypes) => {
    return cards.filter((card) => card?.status === status);
  };

  return (
    <Wrapper>
      <Header />
      <Board>
        <BoardColumn
          title="To Do"
          type="toDo"
          cards={filterCardByStatus(cards, "toDo")}
          onAddCard={handleAddCard}
          onDeleteCard={handleDeleteCard}
          onEditCard={handleEditCard}
          showAddButton
        />
        <BoardColumn
          title="Doing"
          type="doing"
          onDeleteCard={handleDeleteCard}
          onEditCard={handleEditCard}
          cards={filterCardByStatus(cards, "doing")}
        />
        <BoardColumn
          title="Done"
          type="done"
          onDeleteCard={handleDeleteCard}
          onEditCard={handleEditCard}
          cards={filterCardByStatus(cards, "done")}
        />
      </Board>
    </Wrapper>
  );
};

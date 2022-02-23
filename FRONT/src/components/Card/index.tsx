import React, { useState } from "react";

import {
  MdArrowBack,
  MdArrowForward,
  MdCancel,
  MdCheckCircle,
  MdDelete,
  MdEdit,
} from "react-icons/md";

import TextField from "components/TextField";
import { CreateCardProps, Lista } from "services";
import { ColumnTypes } from "components/BoardColumn";

import { Content, Footer, Header, TextArea, Title, Wrapper } from "./styles";

type FormatStatus = { [key: string]: Lista };

type CallActionProps = {
  action: "add" | "edit" | "delete" | "moving";
  card: CreateCardProps & Pick<CardProps, "id">;
};

export type CardProps = {
  id?: string;
  title: string;
  content: string;
  status: ColumnTypes;
  isEditing?: boolean;
  isNewCard?: boolean;
  onDelete?: (cardId: string) => Promise<void>;
  onEdit?: (
    card: CreateCardProps & Pick<CardProps, "id">,
    isMoving?: boolean
  ) => Promise<void>;
  onAdd?: (card: CreateCardProps & Pick<CardProps, "id">) => Promise<void>;
};

const Card = ({
  id,
  title,
  content,
  status = "toDo",
  isEditing = false,
  isNewCard = false,
  onDelete,
  onEdit,
  onAdd,
}: CardProps) => {
  const [isEditingCard, setisEditingCard] = useState<boolean>(isEditing);
  const [titleValue, setTitleValue] = useState<string>(title);
  const [cardContent, setCardContent] = useState<string>(content);

  const toggleEdit = () => setisEditingCard((prev) => !prev);

  const formatCardStatus = (status: ColumnTypes) => {
    const formattedStatus: FormatStatus = {
      toDo: Lista.TODO,
      doing: Lista.DOING,
      done: Lista.DONE,
    };

    return formattedStatus[status];
  };

  const handleCallAction = async ({ action, card }: CallActionProps) => {
    if (action === "delete" && onDelete) {
      await onDelete(card.id as string);
      return;
    }

    if (action === "edit" && onEdit) {
      await onEdit(card);
      setisEditingCard(false);
      return;
    }

    if (action === "moving" && onEdit) {
      await onEdit(card, true);
      return;
    }

    if (onAdd) {
      await onAdd(card);
    }
  };

  const getNextStatus = (
    currentStatus: ColumnTypes,
    direction: "back" | "forward"
  ) => {
    type NextStatus = {
      [key: string]: {
        back: ColumnTypes | null;
        forward: ColumnTypes | null;
      };
    };

    const nextStatus: NextStatus = {
      toDo: {
        back: null,
        forward: "doing",
      },
      doing: {
        back: "toDo",
        forward: "done",
      },
      done: {
        back: "doing",
        forward: null,
      },
    };

    return nextStatus[currentStatus][direction];
  };

  return (
    <Wrapper status={status}>
      {isEditingCard ? (
        <>
          <Header>
            <TextField
              placeholder="Card title"
              initialValue={title}
              value={titleValue}
              onInputChange={setTitleValue}
            />
          </Header>
          <TextArea
            placeholder="Card content"
            value={cardContent}
            onChange={(event) => setCardContent(event.target.value)}
          />

          <Footer isNewCard={isNewCard}>
            {!isNewCard && <MdCancel onClick={toggleEdit} />}
            <MdCheckCircle
              onClick={() =>
                handleCallAction({
                  action: isNewCard ? "add" : "edit",
                  card: {
                    id,
                    titulo: titleValue,
                    conteudo: cardContent,
                    lista: formatCardStatus(status),
                  },
                })
              }
            />
          </Footer>
        </>
      ) : (
        <>
          <Header>
            <Title>{title}</Title>
            <MdEdit onClick={toggleEdit} />
          </Header>
          <Content>{content}</Content>
          <Footer>
            {status !== "toDo" && (
              <MdArrowBack
                onClick={() =>
                  handleCallAction({
                    action: "moving",
                    card: {
                      id,
                      titulo: titleValue,
                      conteudo: cardContent,
                      lista: formatCardStatus(
                        getNextStatus(status, "back") as ColumnTypes
                      ),
                    },
                  })
                }
              />
            )}
            <MdDelete
              onClick={() =>
                handleCallAction({
                  action: "delete",
                  card: { id },
                })
              }
            />
            {status !== "done" && (
              <MdArrowForward
                onClick={() =>
                  handleCallAction({
                    action: "moving",
                    card: {
                      id,
                      titulo: titleValue,
                      conteudo: cardContent,
                      lista: formatCardStatus(
                        getNextStatus(status, "forward") as ColumnTypes
                      ),
                    },
                  })
                }
              />
            )}
          </Footer>
        </>
      )}
    </Wrapper>
  );
};

export default Card;

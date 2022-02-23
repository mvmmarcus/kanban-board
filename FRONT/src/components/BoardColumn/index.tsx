import React, { useState } from "react";

import { MdAdd } from "react-icons/md";

import Modal from "components/Modal";
import Button from "components/Button";
import Heading, { LineColors } from "components/Heading";
import Card, { CardProps } from "components/Card";
import { CreateCardProps } from "services";

import theme from "styles/theme";
import {
  CardList,
  EmptyMessage,
  Header,
  OrientationMessage,
  Wrapper,
} from "./styles";

export type ColumnTypes = "toDo" | "doing" | "done";

export type BoardColumnProps = {
  cards: CardProps[];
  title: string;
  type: ColumnTypes;
  showAddButton?: boolean;
  onAddCard?: (card: CreateCardProps & Pick<CardProps, "id">) => Promise<void>;
  onEditCard?: (
    card: CreateCardProps & Pick<CardProps, "id">,
    isMoving?: boolean
  ) => Promise<void>;
  onDeleteCard?: (cardId: string) => Promise<void>;
};

const BoardColumn = ({
  title,
  cards,
  type,
  showAddButton = false,
  onAddCard,
  onDeleteCard,
  onEditCard,
}: BoardColumnProps) => {
  const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false);

  const toggleModal = () => setShowAddCardModal((prev) => !prev);

  const columnColorsByStatus: { [key: string]: LineColors } = {
    toDo: "gray",
    doing: "primary",
    done: "secondary",
  };

  const handleAddCard = async (
    card: CreateCardProps & Pick<CardProps, "id">
  ) => {
    if (onAddCard) {
      await onAddCard(card);
      toggleModal();
    }
  };

  return (
    <Wrapper type={type}>
      <Header>
        <Heading lineLeft lineColor={columnColorsByStatus[type]}>
          {title}
        </Heading>
        {showAddButton && (
          <Button
            onClick={toggleModal}
            icon={<MdAdd size={24} color={theme.colors.white} />}
          />
        )}
      </Header>

      {cards.length ? (
        <CardList>
          {cards.map((card) => (
            <Card
              id={card.id}
              title={card.title}
              content={card.content}
              key={card.id}
              status={card.status}
              onDelete={onDeleteCard}
              onEdit={onEditCard}
            />
          ))}
        </CardList>
      ) : (
        <>
          <EmptyMessage>No cards was found</EmptyMessage>
          <OrientationMessage>
            Click the add button in the To do column to add a new card.
          </OrientationMessage>
        </>
      )}

      <Modal
        title="Add new card"
        isOpen={showAddCardModal}
        onClose={toggleModal}
      >
        <Card
          title=""
          content=""
          status="toDo"
          isNewCard
          isEditing
          onAdd={handleAddCard}
        />
      </Modal>
    </Wrapper>
  );
};

export default BoardColumn;

import React, { useEffect } from "react";

import { MdClose } from "react-icons/md";

import { Wrapper, Title, Overlay, Header } from "./styles";

export type ModalProps = {
  title: string;
  isOpen?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
};

const Modal = ({ isOpen = false, title, children, onClose }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    !!onClose && onClose();
  };

  return (
    <Overlay id="overlay" aria-hidden={!isOpen}>
      <Wrapper>
        <Header>
          <Title>{title}</Title>
          <MdClose onClick={handleClose} />
        </Header>

        {children}
      </Wrapper>
    </Overlay>
  );
};

export default Modal;

import type { ReactNode } from "react";
import React, { useEffect } from "react";

import styled from "styled-components";

// Styled Components для стилизации
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Полупрозрачный фон
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // Чтобы окно было поверх других элементов
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px; // Фиксированная ширина
  max-width: 90%; // Адаптивность для маленьких экранов
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #000;
  }
`;

// Компонент Modal
export const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  // Обработчик клика на оверлей
  const handleOverlayClick = (event: React.MouseEvent<HTMLElement>) => {
    // Проверяем, что клик был именно по оверлею, а не по содержимому модального окна
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null; // Если окно закрыто, ничего не рендерим

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children} {/* Содержимое модального окна */}
      </ModalContent>
    </ModalOverlay>
  );
};

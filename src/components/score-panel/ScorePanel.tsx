import React, { useRef, useEffect } from "react";

import { useSelector } from "react-redux";

import { getStats } from "@app/components/score-panel/helpers";
import {
  selectActivePlayer,
  selectPlayer,
  selectTeamModeStatus,
  selectAllTeams,
} from "@app/redux/selectors";
import type { State } from "@app/redux/types";

export const ScorePanel = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activePlayer = useSelector(selectActivePlayer);
  const currentPlayer = useSelector((state: State) =>
    selectPlayer(state, activePlayer?.id || ""),
  );

  const mode = useSelector(selectTeamModeStatus);
  const teams = useSelector(selectAllTeams);

  // Функция для настройки разрешения canvas
  const setupCanvasResolution = (
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
  ) => {
    const scale = window.devicePixelRatio || 1;

    // Устанавливаем внутренние размеры (буфер рисования)
    canvas.width = width * scale;
    canvas.height = height * scale;

    // Устанавливаем внешние размеры (CSS)
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Масштабируем контекст рисования
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Unable to get 2D context from canvas");
    ctx.scale(scale, scale);

    return ctx;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Настройка разрешения
    const ctx = setupCanvasResolution(canvas, width, height);

    // Очищаем canvas
    ctx.clearRect(0, 0, width, height);

    // Настройки текста
    ctx.fillStyle = "#000000"; // Чёрный цвет фона
    ctx.fillRect(0, 0, width, height); // Заливаем весь canvas чёрным

    // Настройки текста
    ctx.font = "20px Arial";
    ctx.fillStyle = "#FFFFFF"; // Белый цвет текста
    ctx.textBaseline = "top";

    // Данные для статистики
    const statsData = getStats(currentPlayer, mode, teams);

    // Отступы
    const padding = 10;

    // Позиция для рисования текста
    let xPosition = padding;

    // Рисуем каждую строку текста в ряд
    Object.values(statsData).forEach((text) => {
      // Измеряем ширину текущей строки
      const textWidth = ctx.measureText(text).width;

      // Рисуем текст
      ctx.fillText(text, xPosition, padding);

      // Обновляем позицию для следующей строки
      xPosition += textWidth + padding; // Добавляем отступ между строками
    });
  }, [currentPlayer, height, mode, teams, width]);

  if (!activePlayer && !mode) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: "1px solid black",
      }}
    />
  );
};

// {"teams":"{\"activeTeam\":\"teamGuest\",\"teamHome\":{\"side\":\"rightSide\",\"players\":[],\"name\":\"\",\"twoPointsAll\":0,\"twoPointsMade\":0,\"threePointsAll\":0,\"threePointsMade\":0,\"freeThrowMade\":0,\"freeThrowAll\":0,\"allShots\":-1,\"allShotsMade\":0,\"points\":0},\"teamGuest\":{\"side\":\"leftSide\",\"players\":[{\"id\":\"Грашкин-8-guest\",\"surname\":\"Грашкин\",\"playerNumber\":\"8\",\"markers\":[{\"x\":1085.1913477537437,\"y\":359.88062015503874,\"xRight\":116.80865224625632,\"yRight\":285.11937984496126,\"type\":\"circle\",\"cost\":\"twoPointsZone\",\"markerSide\":\"rightSide\"},{\"x\":1091.181364392679,\"y\":362.8713178294574,\"xRight\":110.81863560732108,\"yRight\":282.1286821705426,\"type\":\"circle\",\"cost\":\"twoPointsZone\",\"markerSide\":\"rightSide\"},{\"x\":1135.108153078203,\"y\":614.0899224806201,\"xRight\":66.89184692179697,\"yRight\":30.91007751937991,\"type\":\"cross\",\"cost\":\"threePointsZone\",\"markerSide\":\"rightSide\"},{\"x\":1121.1314475873544,\"

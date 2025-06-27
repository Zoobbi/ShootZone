import {
  COURT_HEIGHT,
  COURT_WIDTH,
  LINE_HEIGHT,
  THREE_POINTS_LINE_HALF_CIRCLE_RADIUS_WITHOUT_LINE,
  THREE_POINTS_LINE_WIDTH,
} from "@app/components/basketball-court/markupConstants";
import type { Marker } from "@app/redux/types";

import { HIDDEN_ZONES } from "./constants";
import {
  getBackboardAndHoop,
  getCenterCircle,
  getCenterLine,
  getCourt,
  getThreePointsLine,
  getThreeSecondZone,
} from "./markupParts";
import type { DrawDataFullCourt } from "./types";

export const drawCourt = (
  { ctx, width, height }: DrawDataFullCourt,
  markers: Array<Marker>,
  activePlayerSide: string,
  courtText: string,
) => {
  if (!ctx) {
    throw new Error("Unable to get 2D context from canvas");
  }

  // Очищаем canvas
  ctx.clearRect(0, 0, width, height);

  const markupData = {
    ctx,
    width,
    height,
  };
  const lineWidth = Math.round((LINE_HEIGHT / COURT_WIDTH) * width);

  // Закрашиваем всю площадку зелёным цветом
  ctx.fillStyle = "rgba(0, 255, 0, 0.3)"; // Зелёный цвет с прозрачностью
  ctx.fillRect(0, 0, width, height);

  // Рисуем основную площадку
  getCourt(markupData, lineWidth);
  getCenterLine(markupData, lineWidth);
  getCenterCircle(markupData, lineWidth);

  // Рисуем левую трёхсекундную зону и сохраняем её координаты
  const leftThreeSecondZone = getThreeSecondZone(markupData, lineWidth);
  HIDDEN_ZONES.leftThreeSecondZone.x = leftThreeSecondZone.x;
  HIDDEN_ZONES.leftThreeSecondZone.y = leftThreeSecondZone.y;
  HIDDEN_ZONES.leftThreeSecondZone.width = leftThreeSecondZone.width;
  HIDDEN_ZONES.leftThreeSecondZone.height = leftThreeSecondZone.height;

  const { hoopCenterX: leftHoopCenterX, hoopCenterY: leftHoopCenterY } =
    getBackboardAndHoop(markupData, lineWidth);
  getThreePointsLine(markupData, lineWidth, leftHoopCenterX, leftHoopCenterY);

  getThreeSecondZone(markupData, lineWidth, true);
  const { hoopCenterX: rightHoopCenterX, hoopCenterY: rightHoopCenterY } =
    getBackboardAndHoop(markupData, lineWidth, true);
  getThreePointsLine(
    markupData,
    lineWidth,
    rightHoopCenterX,
    rightHoopCenterY,
    true,
  );

  // Сохраняем координаты новой 2 очковой прямоугольной зоны
  HIDDEN_ZONES.leftRectangleTwoPoint.x = 0; // Левый край площадки
  HIDDEN_ZONES.leftRectangleTwoPoint.y = Math.round(
    (0.9 / COURT_HEIGHT) * height,
  ); // Смещение вниз на 0.9 метра
  HIDDEN_ZONES.leftRectangleTwoPoint.width = Math.round(
    (THREE_POINTS_LINE_WIDTH / COURT_WIDTH) * width,
  ); // Ширина зоны
  HIDDEN_ZONES.leftRectangleTwoPoint.height =
    height -
    HIDDEN_ZONES.leftRectangleTwoPoint.y -
    Math.round((0.9 / COURT_HEIGHT) * height); // Высота зоны

  // Рисуем 2 очка полукруг
  HIDDEN_ZONES.leftSemicircleTwoPoint.centerX = leftHoopCenterX;
  HIDDEN_ZONES.leftSemicircleTwoPoint.centerY = height / 2;
  HIDDEN_ZONES.leftSemicircleTwoPoint.radius = Math.round(
    (THREE_POINTS_LINE_HALF_CIRCLE_RADIUS_WITHOUT_LINE / COURT_WIDTH) * width,
  );

  ctx.beginPath();
  ctx.arc(
    HIDDEN_ZONES.leftSemicircleTwoPoint.centerX,
    HIDDEN_ZONES.leftSemicircleTwoPoint.centerY,
    HIDDEN_ZONES.leftSemicircleTwoPoint.radius,
    -Math.PI / 2, // Начало дуги (справа, вверх)
    Math.PI / 2, // Конец дуги (справа, вниз)
    false, // По часовой стрелке
  );
  ctx.closePath();

  // Перерисовываем все сохранённые маркеры
  markers.forEach(({ x, y, xRight, yRight, type, markerSide }) => {
    const xCoordinate = activePlayerSide === markerSide ? x : xRight;
    const yCoordinate = activePlayerSide === markerSide ? y : yRight;

    if (type === "circle") {
      // Рисуем полый кружок (бублик)
      ctx.strokeStyle = "green"; // Цвет контура
      ctx.lineWidth = 4; // Толщина линии
      ctx.beginPath();
      ctx.arc(xCoordinate, yCoordinate, 12, 0, Math.PI * 2); // Радиус уменьшен до 14
      ctx.stroke();
      ctx.closePath();
    } else if (type === "cross") {
      // Рисуем красный крестик того же размера
      ctx.strokeStyle = "red";
      ctx.lineWidth = 4; // Толщина линии
      ctx.beginPath();
      const size = 18; // Размер крестика соответствует радиусу кружка
      ctx.moveTo(xCoordinate - size / 2, yCoordinate - size / 2);
      ctx.lineTo(xCoordinate + size / 2, yCoordinate + size / 2);
      ctx.moveTo(xCoordinate + size / 2, yCoordinate - size / 2);
      ctx.lineTo(xCoordinate - size / 2, yCoordinate + size / 2);
      ctx.stroke();
      ctx.closePath();
    }
  });

  ctx.font = "32px Times New Roman";
  ctx.fillStyle = "white";
  ctx.fillText(courtText, width / 2 + 25, height - 25);
};

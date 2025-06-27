import { COLOR_BLACK, COLOR_ORANGE, COLOR_WHITE } from "@app/rootStyles/colors";

import {
  ATTACK_FOUL_HALF_CIRCLE_RADIUS,
  BACKBOARD_WIDTH,
  CENTRAL_CIRCLE_RADIUS,
  COURT_HEIGHT,
  COURT_WIDTH,
  FREE_THROW_HALF_CIRCLE_RADIUS,
  HOOP_DIAMETER,
  THREE_POINTS_LINE_HALF_CIRCLE_RADIUS,
  THREE_POINTS_LINE_WIDTH,
  THREE_SECOND_ZONE_HEIGHT,
  THREE_SECOND_ZONE_WIDTH,
  WIDTH_BETWEEN_OUT_AND_THREE_POINTS_LINE,
} from "./markupConstants";
import type { DrawDataPart } from "./types";

export const getCourt = (
  { ctx, width, height }: DrawDataPart,
  lineWidth: number,
) => {
  ctx.fillStyle = COLOR_BLACK;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = COLOR_WHITE;
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(0, 0, width, height);
};

export const getCenterLine = (
  { ctx, width, height }: DrawDataPart,
  lineWidth: number,
) => {
  const centerX = width / 2;
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);
  ctx.strokeStyle = COLOR_ORANGE;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();
};

export const getCenterCircle = (
  { ctx, width, height }: DrawDataPart,
  lineWidth: number,
) => {
  const centerX = width / 2;
  const circleRadius = Math.round(
    (CENTRAL_CIRCLE_RADIUS / COURT_WIDTH) * width,
  );
  ctx.beginPath();
  ctx.arc(centerX, height / 2, circleRadius, 0, Math.PI * 2);
  ctx.strokeStyle = COLOR_ORANGE;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();
};

export const getThreeSecondZone = (
  { ctx, width, height }: DrawDataPart,
  lineWidth: number,
  isRightZone = false,
) => {
  const threeSecondZoneWidth = Math.round(
    (THREE_SECOND_ZONE_WIDTH / COURT_WIDTH) * width,
  );
  const threeSecondZoneHeight = Math.round(
    (THREE_SECOND_ZONE_HEIGHT / COURT_HEIGHT) * height,
  );
  const threeSecondZoneX = isRightZone ? width - threeSecondZoneWidth : 0;
  const threeSecondZoneY = height / 2 - threeSecondZoneHeight / 2;

  ctx.beginPath();
  ctx.rect(
    threeSecondZoneX,
    threeSecondZoneY,
    threeSecondZoneWidth,
    threeSecondZoneHeight,
  );
  ctx.strokeStyle = COLOR_ORANGE;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();

  const freeThrowRadius = Math.round(
    (FREE_THROW_HALF_CIRCLE_RADIUS / COURT_WIDTH) * width,
  );

  const freeThrowCenterX = isRightZone
    ? threeSecondZoneX
    : threeSecondZoneX + threeSecondZoneWidth;
  const freeThrowCenterY = height / 2;

  ctx.beginPath();
  ctx.arc(
    freeThrowCenterX,
    freeThrowCenterY,
    freeThrowRadius,
    Math.PI / 2,
    (3 * Math.PI) / 2,
    !isRightZone,
  );
  ctx.strokeStyle = COLOR_ORANGE;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();

  return {
    x: threeSecondZoneX,
    y: threeSecondZoneY,
    width: threeSecondZoneWidth,
    height: threeSecondZoneHeight,
  };
};

export const getBackboardAndHoop = (
  { ctx, width, height }: DrawDataPart,
  lineWidth: number,
  isRightZone = false,
) => {
  const backboardWidth = Math.round((BACKBOARD_WIDTH / COURT_WIDTH) * width);
  const backboardX = isRightZone
    ? width - Math.round((1.2 / COURT_WIDTH) * width)
    : Math.round((1.2 / COURT_WIDTH) * width);
  const backboardYStart = height / 2 - backboardWidth / 2;
  const backboardYEnd = backboardYStart + backboardWidth;

  ctx.beginPath();
  ctx.moveTo(backboardX, backboardYStart);
  ctx.lineTo(backboardX, backboardYEnd);
  ctx.strokeStyle = COLOR_WHITE;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();

  const hoopRadius = Math.round((HOOP_DIAMETER / COURT_WIDTH) * width);
  const lineLength = 10 - hoopRadius;
  const lineStartX = backboardX;
  const lineStartY = height / 2;
  const lineEndX = isRightZone
    ? lineStartX + lineLength
    : lineStartX - lineLength;
  const lineEndY = lineStartY;

  ctx.beginPath();
  ctx.moveTo(lineStartX, lineStartY);
  ctx.lineTo(lineEndX, lineEndY);
  ctx.strokeStyle = COLOR_WHITE;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();

  const hoopCenterX = isRightZone
    ? lineEndX - hoopRadius
    : lineEndX + hoopRadius;
  const hoopCenterY = lineEndY;

  ctx.beginPath();
  ctx.arc(hoopCenterX, hoopCenterY, hoopRadius, 0, Math.PI * 2);
  ctx.strokeStyle = COLOR_WHITE;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();

  const semicircleRadius = Math.round(
    (ATTACK_FOUL_HALF_CIRCLE_RADIUS / COURT_WIDTH) * width,
  );
  ctx.beginPath();
  ctx.arc(
    hoopCenterX,
    hoopCenterY,
    semicircleRadius,
    Math.PI / 2,
    (3 * Math.PI) / 2,
    !isRightZone,
  );
  ctx.strokeStyle = COLOR_ORANGE;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();

  return {
    hoopCenterX,
    hoopCenterY,
  };
};

export const getThreePointsLine = (
  { ctx, width, height }: DrawDataPart,
  lineWidth: number,
  hoopCenterX: number,
  hoopCenterY: number,
  isRightZone = false,
) => {
  const threePointLineLength = Math.round(
    (THREE_POINTS_LINE_WIDTH / COURT_WIDTH) * width,
  );
  const threePointLineOffset = Math.round(
    (WIDTH_BETWEEN_OUT_AND_THREE_POINTS_LINE / COURT_HEIGHT) * height,
  );

  const topLineStartX = isRightZone ? width - threePointLineLength : 0;
  const topLineStartY = threePointLineOffset;
  const topLineEndX = isRightZone
    ? width
    : topLineStartX + threePointLineLength;
  const topLineEndY = topLineStartY;

  ctx.beginPath();
  ctx.moveTo(topLineStartX, topLineStartY);
  ctx.lineTo(topLineEndX, topLineEndY);
  ctx.strokeStyle = COLOR_ORANGE;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();

  const bottomLineStartX = isRightZone ? width - threePointLineLength : 0;
  const bottomLineStartY = height - threePointLineOffset;
  const bottomLineEndX = bottomLineStartX + threePointLineLength;
  const bottomLineEndY = bottomLineStartY;

  ctx.beginPath();
  ctx.moveTo(bottomLineStartX, bottomLineStartY);
  ctx.lineTo(bottomLineEndX, bottomLineEndY);
  ctx.strokeStyle = COLOR_ORANGE;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();

  const threePointArcRadius = Math.round(
    (THREE_POINTS_LINE_HALF_CIRCLE_RADIUS / COURT_WIDTH) * width,
  );

  let startAngle: number;
  let endAngle: number;

  if (isRightZone) {
    const rightTopIntersectionY = threePointLineOffset;

    startAngle =
      Math.PI +
      Math.asin((hoopCenterY - rightTopIntersectionY) / threePointArcRadius); // Начальный угол
    endAngle =
      Math.PI -
      Math.asin((hoopCenterY - rightTopIntersectionY) / threePointArcRadius);
  } else {
    startAngle = Math.acos((topLineEndX - hoopCenterX) / threePointArcRadius);
    endAngle = Math.PI * 2 - startAngle;
  }

  ctx.beginPath();
  ctx.arc(
    hoopCenterX,
    hoopCenterY,
    threePointArcRadius,
    startAngle,
    endAngle,
    true,
  );
  ctx.strokeStyle = COLOR_ORANGE;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();
};

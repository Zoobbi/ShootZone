import { HIDDEN_ZONES } from "@app/components/basketball-court/constants";
import {
  addMarkerToPlayer,
  TEAM_HOME,
} from "@app/redux/teams-slice/teamsSlice";
import type { Marker, TeamMarkers } from "@app/redux/types";

import { COURT_HEIGHT, COURT_WIDTH } from "./markupConstants";
import type { MarkShoot } from "./types";

export const calculateHeightProportion = (width: number) =>
  Math.round((width * COURT_HEIGHT) / COURT_WIDTH);

export const getClickType = (event: MouseEvent) =>
  event.button === 0 ? "circle" : "cross";

export const markShoot = ({
  event,
  activePlayer,
  x,
  y,
  xRight,
  yRight,
  dispatch,
  cost,
  markerSide,
}: MarkShoot) => {
  const type = getClickType(event);

  dispatch(
    addMarkerToPlayer({
      playerId: activePlayer?.id,
      marker: {
        x,
        y,
        xRight,
        yRight,
        type,
        cost,
        markerSide,
      },
    }),
  );
};

export const checkMarkerForThreeSecondZoneLeft = (x: number, y: number) => {
  return (
    x >= HIDDEN_ZONES.leftThreeSecondZone.x &&
    x <=
      HIDDEN_ZONES.leftThreeSecondZone.x +
        HIDDEN_ZONES.leftThreeSecondZone.width &&
    y >= HIDDEN_ZONES.leftThreeSecondZone.y &&
    y <=
      HIDDEN_ZONES.leftThreeSecondZone.y +
        HIDDEN_ZONES.leftThreeSecondZone.height
  );
};

export const checkMarkerForThreeSecondZoneRight = (
  x: number,
  y: number,
  width: number,
) => {
  return (
    x >=
      width -
        (HIDDEN_ZONES.leftThreeSecondZone.x +
          HIDDEN_ZONES.leftThreeSecondZone.width) &&
    x <= width - HIDDEN_ZONES.leftThreeSecondZone.x &&
    y >= HIDDEN_ZONES.leftThreeSecondZone.y &&
    y <=
      HIDDEN_ZONES.leftThreeSecondZone.y +
        HIDDEN_ZONES.leftThreeSecondZone.height
  );
};

export const checkMarkerTwoPointsZoneLeft = (x: number, y: number) => {
  const leftRectangle =
    x >= HIDDEN_ZONES.leftRectangleTwoPoint.x &&
    x <=
      HIDDEN_ZONES.leftRectangleTwoPoint.x +
        HIDDEN_ZONES.leftRectangleTwoPoint.width &&
    y >= HIDDEN_ZONES.leftRectangleTwoPoint.y &&
    y <=
      HIDDEN_ZONES.leftRectangleTwoPoint.y +
        HIDDEN_ZONES.leftRectangleTwoPoint.height;

  const leftSemiCircle =
    Math.sqrt(
      (x - HIDDEN_ZONES.leftSemicircleTwoPoint.centerX) ** 2 +
        (y - HIDDEN_ZONES.leftSemicircleTwoPoint.centerY) ** 2,
    ) <= HIDDEN_ZONES.leftSemicircleTwoPoint.radius &&
    x >= HIDDEN_ZONES.leftSemicircleTwoPoint.centerX;

  return leftRectangle || leftSemiCircle;
};

export const checkMarkerTwoPointsZoneRight = (
  x: number,
  y: number,
  width: number,
) => {
  const rightRectangle =
    x >=
      width -
        (HIDDEN_ZONES.leftRectangleTwoPoint.x +
          HIDDEN_ZONES.leftRectangleTwoPoint.width) &&
    x <= width - HIDDEN_ZONES.leftRectangleTwoPoint.x &&
    y >= HIDDEN_ZONES.leftRectangleTwoPoint.y &&
    y <=
      HIDDEN_ZONES.leftRectangleTwoPoint.y +
        HIDDEN_ZONES.leftRectangleTwoPoint.height;

  const rightSemiCircle =
    Math.sqrt(
      (x - (width - HIDDEN_ZONES.leftSemicircleTwoPoint.centerX)) ** 2 +
        (y - HIDDEN_ZONES.leftSemicircleTwoPoint.centerY) ** 2,
    ) <= HIDDEN_ZONES.leftSemicircleTwoPoint.radius &&
    x <= width - HIDDEN_ZONES.leftSemicircleTwoPoint.centerX;

  return rightRectangle || rightSemiCircle;
};

export const getMarkers = (
  playerMarkers: Array<Marker>,
  teamsMarkers: TeamMarkers,
  activeTeam: string,
  mode: boolean,
) => {
  if (mode) {
    return activeTeam === TEAM_HOME
      ? teamsMarkers.homeTeamMarkers
      : teamsMarkers.guestTeamMarkers;
  }

  return playerMarkers;
};

import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { KEYBOARD_ELEMENTS } from "@app/common/constants";
import {
  selectActivePlayer,
  selectActivePlayerSide,
  selectActiveTeam,
  selectActiveTeamSide,
  selectPlayerMarkers,
  selectTeamModeStatus,
  selectTeamsMarkers,
} from "@app/redux/selectors/selectors";
import {
  LEFT_SIDE,
  removeLastMarkerFromPlayer,
} from "@app/redux/teams-slice/teamsSlice";
import type { State } from "@app/redux/types";

import { HIDDEN_ZONES, THREE_POINTS_ZONE } from "./constants";
import { drawCourt } from "./drawCourtFn";
import {
  calculateHeightProportion,
  checkMarkerForThreeSecondZoneLeft,
  checkMarkerForThreeSecondZoneRight,
  checkMarkerTwoPointsZoneLeft,
  checkMarkerTwoPointsZoneRight,
  getMarkers,
  markShoot,
} from "./helpers";

export const useDrawCourt = () => {
  const [isNewMarker, setIsNewMarker] = useState(false);

  const activePlayer = useSelector(selectActivePlayer);
  const courtText = activePlayer
    ? `${activePlayer.surname} ${activePlayer.playerNumber}`
    : "";
  const playerMarkers =
    useSelector((state: State) =>
      selectPlayerMarkers(state, activePlayer?.id || ""),
    ) ?? [];

  const teamsMarkers = useSelector(selectTeamsMarkers);
  const mode = useSelector(selectTeamModeStatus);
  const activeTeam = useSelector(selectActiveTeam);
  const activeTeamSide = useSelector(selectActiveTeamSide);

  const markers = getMarkers(playerMarkers, teamsMarkers, activeTeam, mode);

  const activePlayerSide =
    useSelector((state: State) =>
      selectActivePlayerSide(state, activePlayer?.id || ""),
    ) ?? "";

  const isLeftSidePlayer = activePlayerSide === LEFT_SIDE;

  const dispatch = useDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Массив для хранения координат и типов маркеров
  // const markers = useRef<Array<Marker>>([]);
  // Флаг для защиты от частых кликов
  const isClickBlocked = useRef(false);

  useEffect(() => {
    const canvas = canvasRef?.current;

    const ctx = canvas?.getContext("2d");

    const handleResize = () => {
      const newWidth = 1200;
      const newHeight = calculateHeightProportion(newWidth);

      if (!canvas) {
        return;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      drawCourt(
        {
          ctx,
          width: newWidth,
          height: newHeight,
        },
        markers,
        activePlayerSide || activeTeamSide,
        courtText,
      );
    };

    handleResize();

    // Обработчик нажатия кнопки мыши
    const handleMouseDown = (event: MouseEvent) => {
      if (!ctx || !canvas || isClickBlocked.current || !activePlayer) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;

      // Проверяем, находится ли точка внутри левой трёхсекундной зоны
      if (
        isLeftSidePlayer
          ? checkMarkerForThreeSecondZoneLeft(x, y)
          : checkMarkerForThreeSecondZoneRight(x, y, canvas.width)
      ) {
        console.log(
          `Clicked on zone: ${HIDDEN_ZONES.leftThreeSecondZone.name}`,
        );

        markShoot({
          event,
          activePlayer,
          x,
          y,
          dispatch,
          xRight: rect.width - x,
          yRight: rect.height - y,
          cost: HIDDEN_ZONES.leftThreeSecondZone.pointsZone,
          markerSide: activePlayerSide,
        });

        setIsNewMarker(true);

        isClickBlocked.current = true;
        setTimeout(() => {
          isClickBlocked.current = false;
        }, 1000); // Разблокировка через 1 секунду
      }
      // Проверяем, находится ли точка внутри жёлтой зоны
      else if (
        isLeftSidePlayer
          ? checkMarkerTwoPointsZoneLeft(x, y)
          : checkMarkerTwoPointsZoneRight(x, y, canvas.width)
      ) {
        console.log(`Clicked on zone: two points zone`);

        markShoot({
          event,
          activePlayer,
          x,
          y,
          xRight: rect.width - x,
          yRight: rect.height - y,
          dispatch,
          cost: HIDDEN_ZONES.leftRectangleTwoPoint.pointsZone,
          markerSide: activePlayerSide,
        });

        setIsNewMarker(true);

        // Блокируем клики на 1 секунду
        isClickBlocked.current = true;
        setTimeout(() => {
          isClickBlocked.current = false;
        }, 1000); // Разблокировка через 1 секунду
      } else {
        console.log("Clicked 3pt zone");
        markShoot({
          event,
          activePlayer,
          x,
          y,
          xRight: rect.width - x,
          yRight: rect.height - y,
          dispatch,
          cost: THREE_POINTS_ZONE,
          markerSide: activePlayerSide,
        });

        setIsNewMarker(true);

        // Блокируем клики на 1 секунду
        isClickBlocked.current = true;
        setTimeout(() => {
          isClickBlocked.current = false;
        }, 1000); // Разблокировка через 1 секунду
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey && event.key === KEYBOARD_ELEMENTS.Z) ||
        (event.ctrlKey && event.key === KEYBOARD_ELEMENTS.Z_CYRILLIC)
      ) {
        // Удаляем последний маркер из массива
        if (markers.length > 0 && activePlayer) {
          console.log(`удалён маркер`);
          dispatch(removeLastMarkerFromPlayer(activePlayer));
        }
      }
    };

    // Отмена контекстного меню при клике на canvas
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    canvas?.addEventListener("mousedown", handleMouseDown);
    canvas?.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      canvas?.removeEventListener("mousedown", handleMouseDown);
      canvas?.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activePlayer,
    activePlayerSide,
    activeTeamSide,
    courtText,
    dispatch,
    isLeftSidePlayer,
    markers,
  ]);

  useEffect(() => {
    const canvas = canvasRef?.current;

    if (!canvas || !isNewMarker) return;

    const ctx = canvas?.getContext("2d");

    drawCourt(
      {
        ctx,
        width: canvas.width,
        height: canvas.height,
      },
      markers,
      activePlayerSide || activeTeamSide,
      courtText,
    );

    setIsNewMarker(false);
  }, [activePlayerSide, activeTeamSide, courtText, isNewMarker, markers]);

  return {
    canvasRef,
  };
};

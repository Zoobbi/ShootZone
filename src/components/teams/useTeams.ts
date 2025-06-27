import { type ChangeEvent, useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setTeamMode } from "@app/redux/mode-slice/modeSlice";
import { setActivePlayer } from "@app/redux/players-slice/playersSlice";
import {
  selectActivePlayer,
  selectGuestTeamPlayers,
  selectHomeTeamPlayers,
  selectPlayer,
} from "@app/redux/selectors";
import {
  addGuestTeamName,
  addGuestTeamPlayer,
  addHomeTeamName,
  addHomeTeamPlayer,
  addMakeFreeThrowToPlayer,
  addMakeFreeThrowToTeam,
  addMissFreeThrowToPlayer,
  addMissFreeThrowToTeam,
  changeTeamsSide,
  clearGuestTeam,
  clearGuestTeamPlayers,
  clearHomeTeam,
  clearHomeTeamPlayers,
  removeMakeFreeThrowToPlayer,
  removeMakeFreeThrowToTeam,
  removeMissFreeThrowToPlayer,
  removeMissFreeThrowToTeam,
  setActiveGuestTeam,
  setActiveHomeTeam,
} from "@app/redux/teams-slice/teamsSlice";
import type { Player, State } from "@app/redux/types";

export const useTeams = () => {
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [surname, setSurname] = useState("");
  const [teamName, setTeamName] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");
  const [isHomePlayer, setIsHomePlayer] = useState<boolean>(false);
  const [isHomeTeam, setIsHomeTeam] = useState<boolean>(false);

  const homePlayers = useSelector(selectHomeTeamPlayers);
  const guestPlayers = useSelector(selectGuestTeamPlayers);
  const activePlayer = useSelector(selectActivePlayer);
  const currentPlayer = useSelector((state: State) =>
    selectPlayer(state, activePlayer?.id || ""),
  );

  const dispatch = useDispatch();

  const openModalHome = useCallback(() => {
    setIsPlayerModalOpen(true);
    setIsHomePlayer(true);
  }, []);

  const openModalGuest = useCallback(() => {
    dispatch(setActivePlayer(null));
    setIsPlayerModalOpen(true);
    setIsHomePlayer(false);
  }, [dispatch]);

  const openModalTeamHome = useCallback(() => {
    dispatch(setActivePlayer(null));
    setIsTeamModalOpen(true);
    setIsHomeTeam(true);
  }, [dispatch]);

  const openModalTeamGuest = useCallback(() => {
    setIsTeamModalOpen(true);
    setIsHomeTeam(false);
  }, []);

  const closePlayerModal = useCallback(() => {
    setIsPlayerModalOpen(false);
  }, []);

  const closeTeamModal = useCallback(() => {
    setIsTeamModalOpen(false);
  }, []);

  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSurname(event.target.value);
    },
    [],
  );

  const handleTeamNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTeamName(event.target.value);
    },
    [],
  );

  const handleNumberChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPlayerNumber(event.target.value);
    },
    [],
  );

  const handleAddHomeTeamPlayer = useCallback(() => {
    console.log("ADD HOME", surname, playerNumber);

    dispatch(
      addHomeTeamPlayer({
        id: `${surname}-${playerNumber}-home`,
        surname,
        playerNumber,
        markers: [],
        twoPointsAll: 0,
        twoPointsMade: 0,
        threePointsAll: 0,
        threePointsMade: 0,
        allShotsMade: 0,
        allShots: 0,
        freeThrowMade: 0,
        freeThrowAll: 0,
        points: 0,
        isHomePlayer: true,
      }),
    );

    setSurname("");
    setPlayerNumber("");
    setIsPlayerModalOpen(false);
  }, [dispatch, playerNumber, surname]);

  const handleAddGuestTeamPlayer = useCallback(() => {
    console.log("ADD GUEST");

    dispatch(
      addGuestTeamPlayer({
        id: `${surname}-${playerNumber}-guest`,
        surname,
        playerNumber,
        markers: [],
        twoPointsAll: 0,
        twoPointsMade: 0,
        threePointsAll: 0,
        threePointsMade: 0,
        allShotsMade: 0,
        allShots: 0,
        freeThrowMade: 0,
        freeThrowAll: 0,
        points: 0,
        isHomePlayer: false,
      }),
    );

    setSurname("");
    setPlayerNumber("");
    setIsPlayerModalOpen(false);
  }, [dispatch, playerNumber, surname]);

  const handleClearAllHomeTeamPlayers = useCallback(() => {
    dispatch(clearHomeTeamPlayers());
    dispatch(setActivePlayer(null));
  }, [dispatch]);

  const handleClearAllGuestTeamPlayers = useCallback(() => {
    dispatch(clearGuestTeamPlayers());
    dispatch(setActivePlayer(null));
  }, [dispatch]);

  const handleChangeTeamsSide = useCallback(() => {
    dispatch(changeTeamsSide());
    dispatch(setActivePlayer(null));
  }, [dispatch]);

  const handleClearHomeTeam = useCallback(() => {
    dispatch(clearHomeTeam());
    dispatch(setActivePlayer(null));
  }, [dispatch]);

  const handleClearGuestTeam = useCallback(() => {
    dispatch(clearGuestTeam());
    dispatch(setActivePlayer(null));
  }, [dispatch]);
  const checkNumberError = (number: string, players: Array<Player>) => {
    if (players.some((player) => player.playerNumber === number)) {
      return "такой номер уже есть";
    }

    return undefined;
  };

  const exportCanvas = (name: string) => {
    const canvas = document.querySelectorAll("canvas");

    if (!canvas.length) return;

    const statCanvas = canvas[0];
    const courtCanvas = canvas[1];

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = courtCanvas.width; // Ширина одинаковая
    tempCanvas.height = courtCanvas.height + statCanvas.height + 5; // Сумма высот

    if (!tempCtx) {
      console.error("Unable to get 2D context for temporary canvas.");
    }

    // Рисуем содержимое basketball canvas
    tempCtx?.drawImage(
      courtCanvas,
      0,
      0,
      courtCanvas.width,
      courtCanvas.height,
    );

    // Рисуем содержимое score canvas
    tempCtx?.drawImage(
      statCanvas,
      0,
      courtCanvas.height + 5, // Размещаем ниже basketball canvas
      statCanvas.width,
      statCanvas.height,
    );

    const link = document.createElement("a");
    link.href = tempCanvas.toDataURL("image/png");
    link.download = `${name}.png`;
    link.click();

    return;
  };

  const handlePlayerMadeFreeThrow = useCallback(() => {
    dispatch(addMakeFreeThrowToPlayer(currentPlayer));
    dispatch(addMakeFreeThrowToTeam(currentPlayer));
  }, [currentPlayer, dispatch]);

  const handlePlayerMissFreeThrow = useCallback(() => {
    dispatch(addMissFreeThrowToPlayer(currentPlayer));
    dispatch(addMissFreeThrowToTeam(currentPlayer));
  }, [currentPlayer, dispatch]);

  const handleRemovePlayerMadeFreeThrow = useCallback(() => {
    if (
      currentPlayer &&
      currentPlayer.freeThrowAll > 0 &&
      currentPlayer.freeThrowMade > 0
    ) {
      dispatch(removeMakeFreeThrowToPlayer(currentPlayer));
      dispatch(removeMakeFreeThrowToTeam(currentPlayer));
    }
  }, [currentPlayer, dispatch]);

  const handleRemovePlayerMissFreeThrow = useCallback(() => {
    if (
      currentPlayer &&
      currentPlayer.freeThrowAll > 0 &&
      currentPlayer.freeThrowMade <= currentPlayer.freeThrowAll
    ) {
      dispatch(removeMissFreeThrowToPlayer(currentPlayer));
      dispatch(removeMissFreeThrowToTeam(currentPlayer));
    }
  }, [currentPlayer, dispatch]);

  const handleSetHomeTeam = useCallback(() => {
    dispatch(setActiveHomeTeam());
    dispatch(setTeamMode());
    dispatch(setActivePlayer(null));
  }, [dispatch]);

  const handleSetGuestTeam = useCallback(() => {
    dispatch(setActiveGuestTeam());
    dispatch(setTeamMode());
    dispatch(setActivePlayer(null));
  }, [dispatch]);

  const handleSetHomeTeamName = useCallback(() => {
    dispatch(addHomeTeamName(teamName));

    setIsTeamModalOpen(false);
    setTeamName("");
  }, [dispatch, teamName]);

  const handleSetGuestTeamName = useCallback(() => {
    dispatch(addGuestTeamName(teamName));

    setIsTeamModalOpen(false);
    setTeamName("");
  }, [dispatch, teamName]);

  const handleDevLog = () => {
    const data = localStorage.getItem("persist:root");

    console.log(data);
  };

  return {
    isPlayerModalOpen,
    isTeamModalOpen,
    surname,
    teamName,
    playerNumber,
    isHomePlayer,
    isHomeTeam,
    openModalHome,
    openModalGuest,
    closePlayerModal,
    closeTeamModal,
    handleNameChange,
    handleNumberChange,
    handleAddHomeTeamPlayer,
    handleAddGuestTeamPlayer,
    homePlayers,
    guestPlayers,
    handleClearAllHomeTeamPlayers,
    handleClearAllGuestTeamPlayers,
    handlePlayerMissFreeThrow,
    handleChangeTeamsSide,
    handleClearHomeTeam,
    handleClearGuestTeam,
    handleSetHomeTeam,
    handleSetGuestTeam,
    handleSetHomeTeamName,
    handleSetGuestTeamName,
    handleTeamNameChange,
    openModalTeamHome,
    openModalTeamGuest,
    exportCanvas,
    handleRemovePlayerMadeFreeThrow,
    handleRemovePlayerMissFreeThrow,
    handleDevLog,
    handlePlayerMadeFreeThrow,
    homeNumberError: checkNumberError(playerNumber, homePlayers),
    guestNumberError: checkNumberError(playerNumber, guestPlayers),
  };
};

import { TEAM_GUEST, TEAM_HOME } from "@app/redux/teams-slice/teamsSlice";
import type { Player, TeamsState } from "@app/redux/types";

export const getStats = (
  currentPlayer: Player | undefined,
  mode: boolean,
  teams: TeamsState,
) => {
  if (mode) {
    const isHomeActiveTeam = teams.activeTeam === TEAM_HOME;
    const isGuestActiveTeam = teams.activeTeam === TEAM_GUEST;
    const activeTeam =
      (isHomeActiveTeam && teams.teamHome) ||
      (isGuestActiveTeam && teams.teamGuest) ||
      undefined;

    return {
      surname: activeTeam?.name || "Unknown",
      twoPoints: `2 очк: ${activeTeam?.twoPointsMade || 0}/${activeTeam?.twoPointsAll || 0}`,
      threePoints: `3 очк: ${activeTeam?.threePointsMade || 0}/${activeTeam?.threePointsAll || 0}`,
      freeThrow: `шт: ${activeTeam?.freeThrowMade || 0}/${activeTeam?.freeThrowAll || 0}`,
      allPoints: `Всего: ${activeTeam?.allShotsMade || 0}/${activeTeam?.allShots || 0}`,
      points: `очк: ${activeTeam?.points}`,
    };
  }

  return {
    surname: currentPlayer?.surname || "Unknown",
    twoPoints: `2 очк: ${currentPlayer?.twoPointsMade || 0}/${currentPlayer?.twoPointsAll || 0}`,
    threePoints: `3 очк: ${currentPlayer?.threePointsMade || 0}/${currentPlayer?.threePointsAll || 0}`,
    freeThrow: `шт: ${currentPlayer?.freeThrowMade || 0}/${currentPlayer?.freeThrowAll || 0}`,
    allPoints: `Всего: ${currentPlayer?.allShotsMade || 0}/${currentPlayer?.allShots || 0}`,
    points: `очк: ${currentPlayer?.points}`,
  };
};

export type Marker = {
  x: number;
  y: number;
  xRight: number;
  yRight: number;
  type: "circle" | "cross";
  markerSide: string;
  cost: string;
};

export interface CommonPlayer {
  id?: string;
  surname: string;
  playerNumber: number | string;
}

export interface Player extends CommonPlayer {
  markers: Array<Marker>;
  isHomePlayer: boolean;
  twoPointsAll: number;
  twoPointsMade: number;
  threePointsAll: number;
  threePointsMade: number;
  freeThrowMade: number;
  freeThrowAll: number;
  allShots: number;
  allShotsMade: number;
  points: number;
}

export interface TeamProps {
  side: string;
  name: string;
  players: Array<Player>;
  twoPointsAll: number;
  twoPointsMade: number;
  threePointsAll: number;
  threePointsMade: number;
  freeThrowMade: number;
  freeThrowAll: number;
  allShots: number;
  allShotsMade: number;
  points: number;
}

export interface TeamsState {
  teamHome: TeamProps;
  teamGuest: TeamProps;
  activeTeam: string;
}

export interface PlayerSliceState {
  activePlayer: Player | null;
}
export interface Mode {
  isTeamMode: boolean;
}

export interface State {
  teams: TeamsState;
  players: PlayerSliceState;
  mode: Mode;
}

export interface TeamMarkers {
  homeTeamMarkers: Array<Marker>;
  guestTeamMarkers: Array<Marker>;
}

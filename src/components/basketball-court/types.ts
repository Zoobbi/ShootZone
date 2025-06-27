import type { Dispatch } from "redux";

import type { Player } from "@app/redux/types";

type Ctx = CanvasRenderingContext2D | null | undefined;

export interface CommonDrawData {
  width: number;
  height: number;
}

export interface DrawDataFullCourt extends CommonDrawData {
  ctx: Ctx;
}

export interface DrawDataPart extends CommonDrawData {
  ctx: CanvasRenderingContext2D;
}

export interface MarkShoot {
  event: MouseEvent;
  activePlayer: Player;
  x: number;
  y: number;
  xRight: number;
  yRight: number;
  dispatch: Dispatch;
  cost: string;
  markerSide: string;
}

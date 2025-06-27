import React from "react";

import type { Player as PlayerProps } from "@app/redux/types";

import { Player } from "../player";

export const PlayersList = ({
  teamPlayers,
}: {
  teamPlayers: Array<PlayerProps>;
}) => {
  return (
    <>
      {teamPlayers.map((player) => (
        <Player
          key={player.id}
          id={player.id}
          playerNumber={player.playerNumber}
          surname={player.surname}
        />
      ))}
    </>
  );
};

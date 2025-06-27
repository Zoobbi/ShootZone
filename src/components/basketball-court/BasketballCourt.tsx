import React from "react";

import { ScorePanel } from "@app/components";

import { useDrawCourt } from "./useDrawCourt";

export const BasketballCourt = () => {
  const { canvasRef } = useDrawCourt();

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid black",
        }}
      />
      <ScorePanel width={1200} height={50} />
    </div>
  );
};

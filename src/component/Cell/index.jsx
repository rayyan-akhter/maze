import React from "react";
import { DIMENSIONS } from "../../utils/constants";
import { getEdge, isValidMove } from "../../utils/functions";
import { StartNode } from "../StartNode";
import { TargetNode } from "../TargetNode";
import "./style.css";

export const Cell = (props) => {
  const {
    i,
    j,
    startNodeCords,
    setStartNodeCords,
    walls,
    targetNode,
    RocketClass,
    setRocketClass,
    gameState,
    onMove,
    onWin,
  } = props;

  const isEdge = getEdge(i, j, DIMENSIONS.ROWS, DIMENSIONS.COLS);
  const startNode = i === startNodeCords.i && j === startNodeCords.j;
  const isTarget = i === targetNode.i && j === targetNode.j;
  const isWall = walls.includes(`${i}-${j}`) || isEdge; // Edge cells are always walls

  const handleCellClick = () => {
    if (gameState !== 'playing' || isEdge) return; // Don't allow clicking on edges

    // Calculate direction based on click position relative to start node
    const deltaI = i - startNodeCords.i;
    const deltaJ = j - startNodeCords.j;
    
    // Only allow movement to adjacent cells
    if (Math.abs(deltaI) + Math.abs(deltaJ) !== 1) return;
    
    let newI = startNodeCords.i;
    let newJ = startNodeCords.j;
    let newRocketClass = "rotate";

    if (deltaI === 1) {
      newI = startNodeCords.i + 1;
      newRocketClass = "rotate-right";
    } else if (deltaI === -1) {
      newI = startNodeCords.i - 1;
      newRocketClass = "rotate-left";
    } else if (deltaJ === 1) {
      newJ = startNodeCords.j + 1;
      newRocketClass = "rotate-down";
    } else if (deltaJ === -1) {
      newJ = startNodeCords.j - 1;
      newRocketClass = "rotate-up";
    }

    // Validate move
    if (!isValidMove(newI, newJ, walls)) return;

    // Check if target reached
    if (newI === targetNode.i && newJ === targetNode.j) {
      setStartNodeCords({ i: newI, j: newJ });
      setRocketClass(newRocketClass);
      onMove();
      onWin();
      return;
    }

    // Make the move
    setStartNodeCords({ i: newI, j: newJ });
    setRocketClass(newRocketClass);
    onMove();
  };

  return (
    <div 
      onClick={handleCellClick} 
      className={`cell ${isWall ? "wall" : ""} ${isEdge ? "edge" : ""}`}
    >
      {startNode && <StartNode RocketClass={RocketClass} />}
      {isTarget && <TargetNode />}
    </div>
  );
};

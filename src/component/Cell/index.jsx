import React, { useEffect, useRef } from "react";
import { DIMENSIONS } from "../../utils/constants";
import { getEdge } from "../../utils/functions";
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
    setWalls,
    targetNode,
    RocketClass
  } = props;

  const randomNumber = useRef(Math.random() * 1000);

  const isEdge = getEdge(i, j, DIMENSIONS.ROWS, DIMENSIONS.COLS);
  const startNode = i === startNodeCords.i && j === startNodeCords.j;
  const isTarget = i === targetNode.i && j === targetNode.j;

  const isWall = randomNumber.current < 400 && !startNode && !isEdge;

  useEffect(() => {
    if (isWall) {
      const cord = i + "-" + j;
      setWalls((prev) => [...prev, cord]);
    }
  }, [i, isWall, j, setWalls]);

  const handleCellClick = () => {
    if (startNodeCords.i === i && j > startNodeCords.j) {
      const nextCoord = startNodeCords.i + "-" + (startNodeCords.j + 1);
      const isNextCellWall = walls.includes(nextCoord);
      if (isNextCellWall) return;
      const isNextCellTarget =
        startNodeCords.i === targetNode.i &&
        startNodeCords.j + 1 === targetNode.j;
      if (isNextCellTarget) {
        return alert("you found");
      }
      setStartNodeCords((prev) => ({ ...prev, j: prev.j + 1 }));
    }
    if (startNodeCords.i === i && j < startNodeCords.j) {
      const nextCoord = startNodeCords.i + "-" + (startNodeCords.j - 1);
      const isNextCellWall = walls.includes(nextCoord);
      if (isNextCellWall) return;
      const isNextCellTarget =
        startNodeCords.i === targetNode.i &&
        startNodeCords.j - 1 === targetNode.j;
      if (isNextCellTarget) {
        return alert("you found");
      }
      setStartNodeCords((prev) => ({ ...prev, j: prev.j - 1 }));
    }
    if (i > startNodeCords.i && j === startNodeCords.j) {
      const nextCoord = startNodeCords.i + 1 + "-" + startNodeCords.j;
      const isNextCellWall = walls.includes(nextCoord);
      if (isNextCellWall) return;
      const isNextCellTarget =
        startNodeCords.i + 1 === targetNode.i &&
        startNodeCords.j === targetNode.j;
      if (isNextCellTarget) {
        return alert("you found");
      }
      setStartNodeCords((prev) => ({ ...prev, i: prev.i + 1 }));
    }
    if (i < startNodeCords.i && j === startNodeCords.j) {
      const nextCoord = startNodeCords.i - 1 + "-" + startNodeCords.j;
      const isNextCellWall = walls.includes(nextCoord);
      if (isNextCellWall) return;
      const isNextCellTarget =
        startNodeCords.i - 1 === targetNode.i &&
        startNodeCords.j === targetNode.j;
      if (isNextCellTarget) {
        return alert("you found");
      }
      setStartNodeCords((prev) => ({ ...prev, i: prev.i - 1 }));
    }
  };

  return (
    <div onClick={handleCellClick} className={`cell ${isWall && "wall"}`}>
      {startNode && <StartNode RocketClass={RocketClass} />}
      {isTarget && <TargetNode />}
    </div>
  );
};

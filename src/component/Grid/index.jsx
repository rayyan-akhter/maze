import React, { useState } from "react";
import { DIMENSIONS } from "../../utils/constants";
import { getArray } from "../../utils/functions";
import { Cell } from "../Cell";
import "./style.css";

export function StartNode() {
  return <div className="start-node" />;
}

export function TargetNode() {
  return <div className="target-node" />;
}

export const Grid = () => {
  const [startNodeCords, setStartNodeCords] = useState({
    i: 0,
    j: 0,
  });
  const [targetNode, setTargetNode] = useState({
    i: DIMENSIONS.ROWS - 1,
    j: DIMENSIONS.COLS - 1,
  });
  const [walls, setWall] = useState([]);

  return (
    <div className="gridConatiner">
      {getArray(DIMENSIONS.ROWS).map((row, i) => (
        <div className="row" key={i}>
          {getArray(DIMENSIONS.COLS).map((_, j) => (
            <Cell
              key={i + "-" + j}
              startNodeCords={startNodeCords}
              setStartNodeCords={setStartNodeCords}
              i={i}
              j={j}
              walls={walls}
              setWalls={setWall}
              targetNode={targetNode}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

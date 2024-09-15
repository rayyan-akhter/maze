import React, { useEffect, useState } from "react";
import { DIMENSIONS } from "../../utils/constants";
import { getArray, GetRandomCoordinates } from "../../utils/functions";
import { Cell } from "../Cell";
import "./style.css";

export const Grid = () => {
  const [startNodeCords, setStartNodeCords] = useState(GetRandomCoordinates());
  const [targetNode, setTargetNode] = useState(GetRandomCoordinates());
  const [walls, setWall] = useState([]);
  const [rocketClass, setRocketClass] = useState("rotate");

  const validCoordinates = () => {
    let coords = GetRandomCoordinates();
    while (walls.includes(`${coords.i}-${coords.j}`)) {
      coords = GetRandomCoordinates();
    }
    return coords;
  };

  useEffect(() => {
    const initializeNodes = () => {
      let startNode = validCoordinates();
      let targetNode = validCoordinates();

      while (
        walls.includes(`${startNode.i}-${startNode.j}`) ||
        walls.includes(`${targetNode.i}-${targetNode.j}`) ||
        (startNode.i === targetNode.i && startNode.j === targetNode.j)
      ) {
        startNode = validCoordinates();
        targetNode = validCoordinates();
      }

      setStartNodeCords(startNode);
      setTargetNode(targetNode);
    };

    initializeNodes();
  }, [validCoordinates,walls]);
  useEffect(() => {
    const moveStartNode = (direction) => {
      const { i, j } = startNodeCords;
      let newI = i;
      let newJ = j;
      let newRocketClass = "rotate";

      switch (direction) {
        case "ArrowDown":
          newJ = j + 1;
          newRocketClass = "rotate-down";
          break;
        case "ArrowUp":
          newJ = j - 1;
          newRocketClass = "rotate-up";
          break;
        case "ArrowRight":
          newI = i + 1;
          newRocketClass = "rotate-right";
          break;
        case "ArrowLeft":
          newI = i - 1;
          newRocketClass = "rotate-left";
          break;
        default:
          return;
      }

      if (
        newI < 0 ||
        newI >= DIMENSIONS.ROWS ||
        newJ < 0 ||
        newJ >= DIMENSIONS.COLS
      )
        return;

      const nextCoord = newI + "-" + newJ;
      if (walls.includes(nextCoord)) return;

      if (newI === targetNode.i && newJ === targetNode.j) {
        alert("You found the target!");
        window.location.reload();
      }

      setStartNodeCords({ i: newI, j: newJ });
      setRocketClass(newRocketClass);
    };

    const handleKeyDown = (event) => {
      moveStartNode(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [startNodeCords, targetNode, walls]);

  return (
    <div className="gridConatiner">
      {getArray(DIMENSIONS.ROWS).map((_row, i) => (
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
              RocketClass={rocketClass}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

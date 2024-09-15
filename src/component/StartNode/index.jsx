import React from "react";
import rocket from "../../Assets/rocket.png";
export function StartNode({ rocketClass }) {
  return (
    <div className="start-node">
      <img src={rocket} alt="rocket" className={`rocketIcon ${rocketClass}`} />
    </div>
  );
}

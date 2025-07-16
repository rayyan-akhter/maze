import React from "react";
import { formatTime } from "../../utils/functions";
import "./style.css";

export const GameStats = ({ score, timeElapsed, moves, difficulty }) => {
  return (
    <div className="game-stats">
      <div className="stat-item">
        <span className="stat-label">Score:</span>
        <span className="stat-value">{score}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Time:</span>
        <span className="stat-value">{formatTime(timeElapsed)}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Moves:</span>
        <span className="stat-value">{moves}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Level:</span>
        <span className="stat-value difficulty-badge">{difficulty}</span>
      </div>
    </div>
  );
}; 
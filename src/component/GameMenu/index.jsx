import React from "react";
import { DIFFICULTY_LEVELS } from "../../utils/constants";
import "./style.css";

export const GameMenu = ({ onStartGame, onDifficultyChange, selectedDifficulty }) => {
  return (
    <div className="game-menu">
      <div className="menu-container">
        <h1 className="game-title">🚀 Maze Runner</h1>
        <p className="game-subtitle">Navigate your rocket to the target!</p>
        
        <div className="difficulty-section">
          <h3>Select Difficulty:</h3>
          <div className="difficulty-buttons">
            {Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => (
              <button
                key={key}
                className={`difficulty-btn ${selectedDifficulty === key ? 'active' : ''}`}
                onClick={() => onDifficultyChange(key)}
              >
                {level.name}
              </button>
            ))}
          </div>
        </div>

        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>Use <strong>Arrow Keys</strong> or <strong>Click</strong> to move</li>
            <li>Avoid walls and stay within boundaries</li>
            <li>Reach the yellow target to win</li>
            <li>Complete faster with fewer moves for higher scores!</li>
          </ul>
        </div>

        <button className="start-btn" onClick={onStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
}; 
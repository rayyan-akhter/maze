import React from "react";
import { formatTime } from "../../utils/functions";
import "./style.css";

export const GameOver = ({ 
  gameWon, 
  score, 
  timeElapsed, 
  moves, 
  difficulty, 
  onPlayAgain, 
  onBackToMenu,
  bestScore 
}) => {
  return (
    <div className="game-over-overlay">
      <div className="game-over-modal">
        <div className={`result-icon ${gameWon ? 'win' : 'lose'}`}>
          {gameWon ? '🎉' : '😔'}
        </div>
        
        <h2 className="result-title">
          {gameWon ? 'Congratulations!' : 'Game Over'}
        </h2>
        
        <div className="final-stats">
          <div className="stat-row">
            <span>Final Score:</span>
            <span className="highlight">{score}</span>
          </div>
          <div className="stat-row">
            <span>Time:</span>
            <span>{formatTime(timeElapsed)}</span>
          </div>
          <div className="stat-row">
            <span>Moves:</span>
            <span>{moves}</span>
          </div>
          <div className="stat-row">
            <span>Difficulty:</span>
            <span className="difficulty-badge">{difficulty}</span>
          </div>
          {bestScore && (
            <div className="stat-row best-score">
              <span>Best Score:</span>
              <span className="highlight">🏆 {bestScore}</span>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button className="btn play-again-btn" onClick={onPlayAgain}>
            Play Again
          </button>
          <button className="btn menu-btn" onClick={onBackToMenu}>
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}; 
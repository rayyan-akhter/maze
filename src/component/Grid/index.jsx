import React, { useCallback, useEffect, useState } from "react";
import { DIMENSIONS, DIFFICULTY_LEVELS, GAME_STATES } from "../../utils/constants";
import { 
  GetRandomCoordinates, 
  calculateScore, 
  generateSolvableMaze, 
  isValidMove 
} from "../../utils/functions";
import { Cell } from "../Cell";
import { GameMenu } from "../GameMenu";
import { GameStats } from "../GameStats";
import { GameOver } from "../GameOver";
import "./style.css";

export const Grid = () => {
  // Game state
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [selectedDifficulty, setSelectedDifficulty] = useState('MEDIUM');
  
  // Game data
  const [startNodeCords, setStartNodeCords] = useState(GetRandomCoordinates());
  const [targetNode, setTargetNode] = useState(GetRandomCoordinates());
  const [walls, setWalls] = useState([]);
  const [rocketClass, setRocketClass] = useState("rotate");
  
  // Game statistics
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  
  // Timer
  const [timerInterval, setTimerInterval] = useState(null);

  // Initialize game
  const initializeGame = useCallback(() => {
    const difficulty = DIFFICULTY_LEVELS[selectedDifficulty];
    
    // Generate solvable maze with guaranteed path
    const { walls: newWalls, startNode, targetNode } = generateSolvableMaze(difficulty);
    
    setWalls(newWalls);
    setStartNodeCords(startNode);
    setTargetNode(targetNode);
    setScore(0);
    setTimeElapsed(0);
    setMoves(0);
    setRocketClass("rotate");
  }, [selectedDifficulty]);

  // Start timer
  const startTimer = useCallback(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    setTimerInterval(interval);
  }, []);

  // Stop timer
  const stopTimer = useCallback(() => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [timerInterval]);

  // Handle game start
  const handleStartGame = useCallback(() => {
    setGameState(GAME_STATES.PLAYING);
    initializeGame();
    startTimer();
  }, [initializeGame, startTimer]);

  // Handle difficulty change
  const handleDifficultyChange = useCallback((difficulty) => {
    setSelectedDifficulty(difficulty);
  }, []);

  // Handle game win
  const handleGameWin = useCallback(() => {
    stopTimer();
    const finalScore = calculateScore(moves, timeElapsed, selectedDifficulty);
    setScore(finalScore);
    
    // Update best score
    const currentBest = localStorage.getItem('mazeBestScore') || 0;
    if (finalScore > currentBest) {
      localStorage.setItem('mazeBestScore', finalScore);
      setBestScore(finalScore);
    } else {
      setBestScore(currentBest);
    }
    
    setGameState(GAME_STATES.WON);
  }, [moves, timeElapsed, selectedDifficulty, stopTimer]);

  // Handle play again
  const handlePlayAgain = useCallback(() => {
    setGameState(GAME_STATES.PLAYING);
    initializeGame();
    startTimer();
  }, [initializeGame, startTimer]);

  // Handle back to menu
  const handleBackToMenu = useCallback(() => {
    stopTimer();
    setGameState(GAME_STATES.MENU);
  }, [stopTimer]);

  // Load best score on mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('mazeBestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  // Movement logic
  const moveStartNode = useCallback((direction) => {
    if (gameState !== GAME_STATES.PLAYING) return;

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

    if (!isValidMove(newI, newJ, walls)) return;

    // Check if target reached
    if (newI === targetNode.i && newJ === targetNode.j) {
      setStartNodeCords({ i: newI, j: newJ });
      setRocketClass(newRocketClass);
      setMoves(prev => prev + 1);
      handleGameWin();
      return;
    }

    setStartNodeCords({ i: newI, j: newJ });
    setRocketClass(newRocketClass);
    setMoves(prev => prev + 1);
  }, [startNodeCords, targetNode, walls, gameState, handleGameWin]);

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameState === GAME_STATES.PLAYING) {
        moveStartNode(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveStartNode, gameState]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [timerInterval]);

  // Render based on game state
  if (gameState === GAME_STATES.MENU) {
    return (
      <GameMenu 
        onStartGame={handleStartGame}
        onDifficultyChange={handleDifficultyChange}
        selectedDifficulty={selectedDifficulty}
      />
    );
  }

  if (gameState === GAME_STATES.WON) {
    return (
      <>
        <div className="gridContainer">
          {Array.from({ length: DIMENSIONS.ROWS }).map((_, i) => (
            <div className="row" key={i}>
              {Array.from({ length: DIMENSIONS.COLS }).map((_, j) => (
                <Cell
                  key={`${i}-${j}`}
                  startNodeCords={startNodeCords}
                  setStartNodeCords={setStartNodeCords}
                  i={i}
                  j={j}
                  walls={walls}
                  setWalls={setWalls}
                  targetNode={targetNode}
                  RocketClass={rocketClass}
                  setRocketClass={setRocketClass}
                  gameState={gameState}
                  onMove={() => setMoves(prev => prev + 1)}
                  onWin={handleGameWin}
                />
              ))}
            </div>
          ))}
        </div>
        <GameOver
          gameWon={true}
          score={score}
          timeElapsed={timeElapsed}
          moves={moves}
          difficulty={DIFFICULTY_LEVELS[selectedDifficulty].name}
          onPlayAgain={handlePlayAgain}
          onBackToMenu={handleBackToMenu}
          bestScore={bestScore}
        />
      </>
    );
  }

  return (
    <>
      <GameStats
        score={score}
        timeElapsed={timeElapsed}
        moves={moves}
        difficulty={DIFFICULTY_LEVELS[selectedDifficulty].name}
      />
      <div className="gridContainer">
        {Array.from({ length: DIMENSIONS.ROWS }).map((_, i) => (
          <div className="row" key={i}>
            {Array.from({ length: DIMENSIONS.COLS }).map((_, j) => (
              <Cell
                key={`${i}-${j}`}
                startNodeCords={startNodeCords}
                setStartNodeCords={setStartNodeCords}
                i={i}
                j={j}
                walls={walls}
                setWalls={setWalls}
                targetNode={targetNode}
                RocketClass={rocketClass}
                setRocketClass={setRocketClass}
                gameState={gameState}
                onMove={() => setMoves(prev => prev + 1)}
                onWin={handleGameWin}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

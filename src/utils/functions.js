import { DIMENSIONS } from "./constants";

export function getArray(size) {
  return new Array(size).fill("");
}

export function getEdge(i, j, iLenght, jlength) {
  return i === 0 || j === 0 || i === iLenght - 1 || j === jlength - 1;
}

export function isStartNode(i, j) {
  return i === 0 && j === 0;
}

export function isEndNode(i, j, iLenght, jLength) {
  return i === iLenght - 1 && j === jLength - 1;
}

export function GetRandomCoordinates() {
  // Generate coordinates that are NOT on the edges
  const randomRow = Math.floor(Math.random() * (DIMENSIONS.ROWS - 2)) + 1;
  const randomCol = Math.floor(Math.random() * (DIMENSIONS.COLS - 2)) + 1;
  return {
    i: randomRow,
    j: randomCol,
  };
}

export function calculateScore(moves, timeElapsed, difficulty) {
  const baseScore = 100;
  const timeBonus = Math.max(0, 300 - timeElapsed) * 10;
  const movePenalty = moves * 2;
  const difficultyMultiplier = difficulty === 'HARD' ? 2 : difficulty === 'MEDIUM' ? 1.5 : 1;
  
  return Math.max(0, Math.floor((baseScore + timeBonus - movePenalty) * difficultyMultiplier));
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Breadth-First Search to check if path exists
export function hasValidPath(start, target, walls) {
  const visited = new Set();
  const queue = [start];
  visited.add(`${start.i}-${start.j}`);

  const directions = [
    { di: -1, dj: 0 }, // up
    { di: 1, dj: 0 },  // down
    { di: 0, dj: -1 }, // left
    { di: 0, dj: 1 }   // right
  ];

  while (queue.length > 0) {
    const current = queue.shift();
    
    if (current.i === target.i && current.j === target.j) {
      return true;
    }

    for (const dir of directions) {
      const newI = current.i + dir.di;
      const newJ = current.j + dir.dj;
      const key = `${newI}-${newJ}`;

      if (
        newI >= 0 && newI < DIMENSIONS.ROWS &&
        newJ >= 0 && newJ < DIMENSIONS.COLS &&
        !visited.has(key) &&
        !walls.includes(key)
      ) {
        visited.add(key);
        queue.push({ i: newI, j: newJ });
      }
    }
  }

  return false;
}

// Generate a solvable maze
export function generateSolvableMaze(difficulty) {
  const maxAttempts = 50;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    const walls = [];
    const wallProbability = difficulty.wallProbability;
    
    // Generate random walls ONLY for non-edge cells
    for (let i = 0; i < DIMENSIONS.ROWS; i++) {
      for (let j = 0; j < DIMENSIONS.COLS; j++) {
        // Always add edge cells as walls
        if (getEdge(i, j, DIMENSIONS.ROWS, DIMENSIONS.COLS)) {
          walls.push(`${i}-${j}`);
        } else {
          // Only generate random walls for non-edge cells
          if (Math.random() < wallProbability) {
            walls.push(`${i}-${j}`);
          }
        }
      }
    }

    // Generate start and target positions (guaranteed to be non-edge)
    let startNode, targetNode;
    let validPositions = false;
    let positionAttempts = 0;
    
    while (!validPositions && positionAttempts < 20) {
      startNode = GetRandomCoordinates();
      targetNode = GetRandomCoordinates();
      
      // Make sure start and target are not walls and are different
      if (
        !walls.includes(`${startNode.i}-${startNode.j}`) &&
        !walls.includes(`${targetNode.i}-${targetNode.j}`) &&
        (startNode.i !== targetNode.i || startNode.j !== targetNode.j)
      ) {
        // Check if there's a valid path
        if (hasValidPath(startNode, targetNode, walls)) {
          validPositions = true;
        }
      }
      positionAttempts++;
    }
    
    if (validPositions) {
      return { walls, startNode, targetNode };
    }
    
    attempts++;
  }
  
  // Fallback: create a simple maze with guaranteed path
  return generateSimpleMaze();
}

// Fallback maze generation with guaranteed path
export function generateSimpleMaze() {
  const walls = [];
  
  // Always add edge cells as walls
  for (let i = 0; i < DIMENSIONS.ROWS; i++) {
    for (let j = 0; j < DIMENSIONS.COLS; j++) {
      if (getEdge(i, j, DIMENSIONS.ROWS, DIMENSIONS.COLS)) {
        walls.push(`${i}-${j}`);
      }
    }
  }
  
  // Add some random walls for non-edge cells but ensure edges are clear
  for (let i = 1; i < DIMENSIONS.ROWS - 1; i++) {
    for (let j = 1; j < DIMENSIONS.COLS - 1; j++) {
      if (Math.random() < 0.3) { // Lower probability for guaranteed path
        walls.push(`${i}-${j}`);
      }
    }
  }
  
  // Ensure start and target positions (non-edge)
  const startNode = { i: 1, j: 1 };
  const targetNode = { i: DIMENSIONS.ROWS - 2, j: DIMENSIONS.COLS - 2 };
  
  // Remove walls from start and target positions
  const startKey = `${startNode.i}-${startNode.j}`;
  const targetKey = `${targetNode.i}-${targetNode.j}`;
  
  const filteredWalls = walls.filter(wall => wall !== startKey && wall !== targetKey);
  
  return { walls: filteredWalls, startNode, targetNode };
}

export function generateMaze(difficulty) {
  const { walls } = generateSolvableMaze(difficulty);
  return walls;
}

export function isValidMove(newI, newJ, walls) {
  return (
    newI >= 0 &&
    newI < DIMENSIONS.ROWS &&
    newJ >= 0 &&
    newJ < DIMENSIONS.COLS &&
    !walls.includes(`${newI}-${newJ}`)
  );
}
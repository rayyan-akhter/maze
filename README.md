# 🚀 Maze Runner - Enhanced Edition

A modern, feature-rich maze navigation game built with React. Navigate your rocket through randomly generated mazes to reach the target!

## ✨ Features

### 🎮 Gameplay
- **Multiple Difficulty Levels**: Easy, Medium, and Hard with different wall densities
- **Dual Controls**: Use arrow keys or click adjacent cells to move
- **Real-time Scoring**: Score based on time, moves, and difficulty
- **Best Score Tracking**: Persistent high scores saved locally
- **Smooth Animations**: Rocket rotation and movement animations

### 🎨 Visual Enhancements
- **Modern UI Design**: Beautiful gradient backgrounds and smooth transitions
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Visual Feedback**: Hover effects, animations, and clear game states
- **Professional Styling**: Clean, modern interface with attention to detail

### 📊 Game Statistics
- **Live Timer**: Track your completion time
- **Move Counter**: Monitor your efficiency
- **Score Display**: Real-time score calculation
- **Difficulty Indicator**: Clear level display

### 🏆 Game States
- **Main Menu**: Choose difficulty and view instructions
- **Gameplay**: Active maze navigation
- **Victory Screen**: Celebrate wins with detailed statistics
- **Score Persistence**: Best scores saved between sessions

## 🎯 How to Play

1. **Select Difficulty**: Choose from Easy, Medium, or Hard
2. **Navigate**: Use arrow keys or click adjacent cells
3. **Avoid Walls**: Don't hit the dark wall tiles
4. **Reach Target**: Find the glowing yellow target
5. **Optimize**: Complete faster with fewer moves for higher scores!

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd maze

# Install dependencies
npm install

# Start the development server
npm start
```

### Available Scripts
- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🛠️ Technical Details

### Architecture
- **React 18** with functional components and hooks
- **CSS3** with modern features (Grid, Flexbox, Animations)
- **Local Storage** for score persistence
- **Responsive Design** with mobile-first approach

### Key Components
- `Grid` - Main game logic and state management
- `Cell` - Individual maze cells with interaction
- `GameMenu` - Main menu interface
- `GameStats` - Live statistics display
- `GameOver` - Victory screen with results

### Game Logic
- **Maze Generation**: Procedural wall placement based on difficulty
- **Pathfinding**: Valid move detection and collision handling
- **Scoring System**: Time-based scoring with move penalties
- **State Management**: React hooks for game state

## 🎨 Customization

### Difficulty Levels
Modify `src/utils/constants.js` to adjust:
- Wall probability percentages
- Time bonuses
- Score multipliers

### Visual Styling
Customize the appearance by editing:
- `src/component/*/style.css` - Component-specific styles
- `src/App.css` - Global styles
- Asset files in `src/Assets/` - Images and textures

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Built with Create React App
- Icons and assets created for this project
- Inspired by classic maze games

---

**Enjoy playing Maze Runner! 🚀**

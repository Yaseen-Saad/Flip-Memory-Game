# Flip Memory Card Game

## Overview

This is a memory card matching game where the player is given a grid of face-down cards. The objective is to match pairs of cards by flipping them over, one at a time. The game can be played with different difficulty levels, which determine the number of cards on the board. The game is timed, and players must match all pairs before the timer runs out. 

## Features

- **Multiple difficulty levels**: Easy, Medium, and Hard, determined by the number of cards.
- **Timer**: A countdown timer that challenges players to match all pairs before it runs out.
- **Game Stats**: Tracks the number of games won, lost, and abandoned.
- **Pause & Resume**: Players can pause the game and resume it later.
- **Card Flipping Animation**: Cards flip when clicked, showing either a question mark or a number.

## Requirements

To run the project locally, you need:
- A modern web browser (Chrome, Firefox, Safari, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

## Installation

Simply download or clone this repository and open `index.html` in your preferred browser.

## Usage

### Starting a Game

- On the main screen, you'll be presented with the game start button and difficulty options.
- Choose the difficulty level by clicking on one of the buttons: **Easy**, **Medium**, or **Hard**.
- Click the **Start Game** button to begin the game.

### Game Rules

1. The game consists of face-down cards that are shuffled and placed on the board.
2. Click on a card to flip it over. You will see a number or placeholder image.
3. Try to match the flipped card with another card of the same value. If the cards match, they will stay face-up.
4. If the cards do not match, they will flip back over after a short delay.
5. The game ends when all pairs are matched or when the timer runs out.

### Pausing the Game

- Press the **Pause** button to pause the game. You can resume the game by clicking the **Resume** button.
- You can also press the **P** key to pause the game during gameplay.

### Game Stats

- After each game, a stats overlay will show how many games you have won, lost, or abandoned.
- Stats are updated after each game.

## Code Explanation

### HTML Structure (`index.html`)

- **Start Screen**: Contains a game start button and difficulty level buttons.
- **Game Screen**: Displays the card grid, timer bar, and the pause/resume options.
- **Overlays**: For game stats and pause functionality.

### Styles (`style.css`)

- The CSS file defines the visual layout, including the card grid, card flipping animations, and responsive design for different screen sizes.
- The game screen, timer bar, and overlay components are styled to create an immersive gaming experience.

### JavaScript Logic (`script.js`)

- **Game State Management**: The game logic controls the state of the cards (flipped, matched, etc.), the timer, and the game outcome (win/lose).
- **Card Generation**: The cards are generated based on the selected difficulty level, shuffled, and displayed in a grid.
- **Card Matching**: The game checks if two flipped cards match and updates their state accordingly.
- **Timer Management**: A countdown timer that tracks the time left in the game.
- **Pause/Resume**: Players can pause and resume the game using buttons or keyboard shortcuts.

## Customization

1. **Change Card Images**: Replace the background image URL in the `.front` class of the CSS file to use custom images for the front side of the cards.
2. **Adjust Difficulty Levels**: Modify the number of cards for each difficulty level in the `script.js` file under the `numCards` variable.
3. **Add New Features**: You can extend the game by adding new features like sound effects, a leaderboard, or a timer extension after each successful match.

**Enjoy playing the Memory Card Game!**

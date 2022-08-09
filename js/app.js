var app = {
  // Position du joueur par défaut
  player: {
    x: 0,
    y: 0,
    direction: 'right',
  },
  // Position de la case à atteindre
  targetCell: {
    x: 5,
    y: 3,
  },
  board: document.getElementById('board'),
  gameOver: false,
  counter: 0,
  init() {
    app.drawBoard();
    app.listenKeyboardEvents();
  },
  // Permet de dessiner la zone de jeu
  drawBoard() {
    // const board = document.getElementById('board');
    // On créé les lignes
    for (let y = 0; y < 4; y++) {
      const row = document.createElement('div');
      row.className = 'row';
      // On créé les cellules
      for (let x = 0; x < 6; x++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        // Si on dessine la case d'arrivée
        if (x === app.targetCell.x && y === app.targetCell.y) {
          cell.classList.add('targetCell'); // On ajoute la classe CSS à celles déjà présentes dans l'élément
        } else if (x === app.player.x && y === app.player.y) { // Si on dessine la case du joueur
          const player = document.createElement('div');
          player.className = `player ${app.player.direction}`;
          cell.appendChild(player);
        }
        row.appendChild(cell);
      }
      app.board.appendChild(row);
    }
    app.isGameOver();
  },
  clearBoard() {
    app.board.textContent = '';
  },
  redrawBoard() {
    app.counter++;
    app.clearBoard();
    app.drawBoard();
  },
  // Permet de faire tourner notre joueur vers la gauche
  turnLeft() {
    // Si la partie est termine, on ne fait rien
    if (app.gameOver) {
      return ;
    }
    switch (app.player.direction) { // On prend une valeur en entrée
      case 'top': // Si sa valeur est 'top"
        app.player.direction = 'left'; break; // Le break permet de sortir du switch et de ne pas exécuter les cas suivants
      case 'left':
        app.player.direction = 'bottom'; break;
      case 'bottom':
        app.player.direction = 'right'; break;
      case 'right':
        app.player.direction = 'top'; break;
      default:
        console.log('Impossible de faire tourner le joueur');
        return; // Pas besoin d'exécuter la méthode redrawBoard() donc on sort de la fonction
    }

    app.redrawBoard(); // On fait un refresh de la zone de jeu
  },
  // Permet de faire tourner notre joueur vers la droite
  turnRight() {
    // Si la partie est termine, on ne fait rien
    if (app.gameOver) {
      return ;
    }
    switch (app.player.direction) { // On prend une valeur en entrée
      case 'top': // Si sa valeur est 'top"
        app.player.direction = 'right'; break; // Le break permet de sortir du switch et de ne pas exécuter les cas suivants
      case 'right':
        app.player.direction = 'bottom'; break;
      case 'bottom':
        app.player.direction = 'left'; break;
      case 'left':
        app.player.direction = 'top'; break;
      default:
        console.log('Impossible de faire tourner le joueur');
        return; // Pas besoin d'exécuter la méthode redrawBoard() donc on sort de la fonction
    }

    app.redrawBoard(); // On fait un refresh de la zone de jeu
  },
  moveForward() {
    // Si la partie est termine, on ne fait rien
    if (app.gameOver) {
      return;
    }
    switch (app.player.direction) {
      case 'top':
        if (app.player.y <= 0) { // Si mon joueur est sur la ligne la plus haute, il ne peut pas monter
          console.log("Impossible d'avancer");
          return; // Empêche l'appel après le switch de la méthode redrawBoard()
        }
        app.player.y--;
        break;
      case 'left':
        if (app.player.x <= 0) {
          console.log("Impossible d'avancer");
          return; // Empêche l'appel après le switch de la méthode redrawBoard()
        }
        app.player.x--;
        break;
      case 'bottom':
        if (app.player.y >= 3) {
          console.log("Impossible d'avancer");
          return; // Empêche l'appel après le switch de la méthode redrawBoard()
        }
        app.player.y++;
        break;
      case 'right':
        if (app.player.x >= 5) {
          console.log("Impossible d'avancer");
          return; // Empêche l'appel après le switch de la méthode redrawBoard()
        }
        app.player.x++;
        break;
      default:
        console.log("Impossible d'avancer");
        return;
    }

    app.redrawBoard();
  },
  // Permet de gérer les touches du clavier
  listenKeyboardEvents() {
    document.addEventListener('keyup', function (event) {
      switch (event.key) {
        case 'ArrowUp':
          app.moveForward(); break;
        case 'ArrowLeft':
          app.turnLeft(); break;
        case 'ArrowRight':
          app.turnRight();
      }
    });
  },
  // On teste si la partie est terminée (player sur la case targetCell)
  isGameOver() {
    if (app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
      alert(`Bravo, vous avez gagné en ${app.counter} coups !`);
      app.gameOver = true; // Permet d'empêcher mon joueur de continuer sa partie
    }
  }
};

document.addEventListener('DOMContentLoaded', app.init);

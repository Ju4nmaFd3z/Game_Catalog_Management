import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Game } from './models/game';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private gameService = inject(GameService);

  // Listado que se muestra en pantalla
  games: Game[] = [];

  // Modelo del formulario
  game: Game = this.emptyGame();

  ngOnInit(): void {
    this.loadGames();
  }

  // Videojuego vacío con los valores iniciales
  emptyGame(): Game {
    return { title: '', genre: '', platform: '', price: 0, stock: 0 };
  }

  loadGames(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
    });
  }

  // Sin id se crea con POST y con id se actualiza con PUT
  saveGame(gameForm: NgForm): void {
    // El botón no se bloquea, así que se filtra aquí si el formulario es inválido
    if (gameForm.invalid) {
      return;
    }

    if (this.game.id) {
      this.gameService.updateGame(this.game).subscribe(() => this.afterSave(gameForm));
    } else {
      this.gameService.createGame(this.game).subscribe(() => this.afterSave(gameForm));
    }
  }

  // Actualiza el listado y deja el formulario como nuevo
  afterSave(gameForm: NgForm): void {
    this.loadGames();
    this.game = this.emptyGame();
    gameForm.resetForm(this.game);
  }

  // Copia el videojuego al formulario para poder editarlo
  editGame(game: Game): void {
    this.game = { ...game };
  }

  // Abandona la edición y limpia el formulario
  cancelEdit(gameForm: NgForm): void {
    this.game = this.emptyGame();
    gameForm.resetForm(this.game);
  }
}

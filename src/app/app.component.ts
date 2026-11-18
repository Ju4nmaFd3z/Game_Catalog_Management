import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { Game } from './models/game';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private gameService = inject(GameService);

  // Listado que se muestra en pantalla
  games: Game[] = [];

  // Id del videojuego que se está editando (sin id se crea uno nuevo)
  editingId: number | undefined;

  // Mensaje que se muestra tras guardar
  message = '';
  saveFailed = false;

  // Modelo del formulario: ahora se declara aquí y no en la plantilla
  gameFormGroup = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(40)]
    }),
    genre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    platform: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0.01), Validators.max(100)]
    }),
    stock: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(999), Validators.pattern(/^\d+$/)]
    })
  });

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
    });
  }

  // Sin id se crea con POST y con id se actualiza con PUT
  saveGame(form: FormGroupDirective): void {
    this.message = '';
    this.gameFormGroup.markAllAsTouched();

    // El botón no se bloquea, así que no se contacta con JSON Server si hay errores
    if (this.gameFormGroup.invalid) {
      return;
    }

    const game: Game = this.gameFormGroup.getRawValue();

    if (this.editingId) {
      this.gameService.updateGame({ ...game, id: this.editingId }).subscribe({
        next: () => this.afterSave(form),
        error: () => this.afterError()
      });
    } else {
      this.gameService.createGame(game).subscribe({
        next: () => this.afterSave(form),
        error: () => this.afterError()
      });
    }
  }

  // Actualiza el listado y deja el formulario como nuevo
  afterSave(form: FormGroupDirective): void {
    this.loadGames();
    this.editingId = undefined;
    form.resetForm();
    this.saveFailed = false;
    this.message = 'Videojuego guardado correctamente.';
  }

  // Si falla la petición se conservan los valores del formulario
  afterError(): void {
    this.saveFailed = true;
    this.message = 'No se ha podido guardar el videojuego.';
  }

  // Copia el videojuego al formulario para poder editarlo
  editGame(game: Game, form: FormGroupDirective): void {
    this.editingId = game.id;
    this.message = '';
    form.resetForm(game);
  }

  // Limpia el formulario y sale del modo edición
  clearForm(form: FormGroupDirective): void {
    this.editingId = undefined;
    this.message = '';
    form.resetForm();
  }
}
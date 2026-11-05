export interface Game {
  // El id es opcional porque un videojuego nuevo todavía no lo tiene
  id?: number;
  title: string;
  genre: string;
  platform: string;
  price: number;
  stock: number;
}

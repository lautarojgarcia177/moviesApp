import { Component, OnInit, Input } from '@angular/core';
import {PeliculaImagenPipe} from 'src/app/pipes/pelicula-imagen.pipe';
import { Result } from 'src/app/models/recentMovies.model';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {

  @Input() peliculas: Result[];

  constructor() {
    
   }

  ngOnInit(): void {
    this.peliculas.forEach(p => {
      if (p.backdrop_path.endsWith('null')) {
        p.imagen = p.poster_path;
      } else {
        p.imagen = p.backdrop_path;
      }
    });
  }

}

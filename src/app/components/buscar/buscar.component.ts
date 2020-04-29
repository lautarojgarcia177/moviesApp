import { Component, OnInit } from '@angular/core';
import { MoviedbService } from 'src/app/services/moviedb.service';
import {pipe} from 'rxjs';
import {map, pluck, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import { MoviesQueryResResult } from 'src/app/models/moviesqueryres.model';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent implements OnInit {

  buscar: string = "";

  peliculas;

  altImg = 'https://i.ytimg.com/vi/We82bJgF0Kc/hqdefault.jpg';

  constructor(private peliculasService: MoviedbService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( parametros => {
      if(parametros['texto']) {
        this.buscar = parametros['texto'];
        this.buscarPelicula();
      }
    });
  }

  buscarPelicula() {
    if (this.buscar.length === 0) {
      return;
    }

    this.peliculasService.buscarPelicula(this.buscar)
                            .subscribe(r => this.peliculas = r);
  }

  onImgError(event) {
    event.target.src = this.altImg;
  }

  getPeliculaImg(pelicula: MoviesQueryResResult) {
    if (pelicula.backdrop_path.endsWith('null')) {
      return pelicula.poster_path;
    } else {
      return pelicula.backdrop_path;
    }
  }

}

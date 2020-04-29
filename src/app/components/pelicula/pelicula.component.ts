import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MoviedbService } from 'src/app/services/moviedb.service';
import { Movie } from 'src/app/models/movie.model';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss']
})
export class PeliculaComponent implements OnInit {

  pelicula: Movie;
  regresarA: string = "";
  buqueda: string = "";

  altImg = 'https://i.ytimg.com/vi/We82bJgF0Kc/hqdefault.jpg';

  constructor(private route: ActivatedRoute, private pelisService: MoviedbService) { }

  ngOnInit(): void {
    this.route.params.subscribe( parametros => {
      if(parametros['query']) {
        this.buqueda = parametros['query'];
      }
      this.regresarA = parametros['pag'];
      this.pelisService.getPelicula(parametros['id']).subscribe( r => {
          this.pelicula = r;
          this.validarImagen();
        });
    });
  }

  validarImagen() {
    if (this.pelicula.backdrop_path.endsWith('null')) {
      this.pelicula.imagen = this.pelicula.poster_path;
    } else {
      this.pelicula.imagen = this.pelicula.backdrop_path;
    }
  }

  onImgError(event) {
    event.target.src = this.altImg;
  }
}
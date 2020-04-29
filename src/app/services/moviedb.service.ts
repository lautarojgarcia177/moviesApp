import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map, publishReplay, refCount, pluck } from 'rxjs/operators';
import { throwError, pipe, Observable, zip, combineLatest } from 'rxjs';
import { Configs } from 'src/app/models/configs.model';
import { RecentMovies } from 'src/app/models/recentMovies.model';
import { MoviesQueryRes } from '../models/moviesqueryres.model';
import { MoviesQueryResResult } from '../models/moviesqueryres.model';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviedbService {

  private apiKey = '64def62dd99609d330644fe236df6a79';
  private apiurl = 'https://api.themoviedb.org';
  private apiReadAccessRoken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NGRlZjYyZGQ5OTYwOWQzMzA2NDRmZTIzNmRmNmE3OSIsInN1YiI6IjVlYTYwMWI0NzEzZWQ0MDAyNDU0OTAwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DaUw76QsqK36XTjvS5VpXuETfuqaG-P5lovCU7su0oQ';
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': this.apiReadAccessRoken,
      'Contnt-Type': 'application/json;charset=utf-8'
    })
  };

  private $recentMovies = this.http.jsonp<RecentMovies>(
    `https://api.themoviedb.org/3/discover/movie?api_key=${ this.apiKey }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
    'callback'
    );

  public $cartelera: Observable<RecentMovies> = combineLatest(this.getConfig(), this.$recentMovies).pipe(
                        map(([res1, res2]) => this.formatMovieImages(res1, res2)),
                        catchError(this.handleError)
                      );

  private configs: Configs;
  private $configs: Observable<any>;

  constructor(private http: HttpClient) { }

  private formatMovieImages(conf: Configs, recmov: RecentMovies): RecentMovies {
    recmov.results.forEach(r => {
      r.backdrop_path = conf.images.base_url + conf.images.poster_sizes[5] + r.backdrop_path;
      r.poster_path = conf.images.base_url + conf.images.poster_sizes[5] + r.poster_path;
    });
    return recmov;
  }

  private getConfig(): Observable<Configs> {
    if (!this.configs) {
      this.$configs = this.http.jsonp<Configs>(
        `https://api.themoviedb.org/3/configuration?api_key=${ this.apiKey }`,
        'callback'
      ).pipe(
        map(res => this.configs = res),
        publishReplay(1),
        refCount()
      );
    }
    return this.$configs;
  }

  public buscarPelicula(texto:string): Observable<MoviesQueryResResult[]> {
    let url = `${this.apiurl}/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${texto}&page=1&include_adult=false`;

    let peliculasBusqueda$ = this.http.jsonp<any>(url, 'callback')
                                .pipe(
                                  pluck('results')
                                );

    return combineLatest([this.getConfig(), peliculasBusqueda$])
                                  .pipe(
                                    map(([res1, res2]) => this.formatMovieSearchImages(res1, res2)),
                                    catchError(this.handleError)
                                  );
  }

  private formatMovieSearchImages(conf: Configs, recmov: MoviesQueryResResult[]): MoviesQueryResResult[] {
    recmov.forEach(r => {
      r.backdrop_path = conf.images.base_url + conf.images.poster_sizes[5] + r.backdrop_path;
      r.poster_path = conf.images.base_url + conf.images.poster_sizes[5] + r.poster_path;
    });
    return recmov;
  }

  public getPelicula(id: string): Observable<Movie> {
    let url = `${this.apiurl}/3/movie/${id}?api_key=${this.apiKey}&language=en-US`;

    let pelicula$ = this.http.jsonp<any>(url, 'callback')
                                .pipe(
                                  catchError(this.handleError)
                                );

    return combineLatest([this.getConfig(), pelicula$])
            .pipe(
              map(([res1, res2]) => this.formatMovieDetailImages(res1, res2)),
              catchError(this.handleError)
            );
  }

  private formatMovieDetailImages(conf: Configs, recmov: Movie): Movie {
      recmov.backdrop_path = conf.images.base_url + conf.images.poster_sizes[5] + recmov.backdrop_path;
      recmov.poster_path = conf.images.base_url + conf.images.poster_sizes[5] + recmov.poster_path;
      return recmov;
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}

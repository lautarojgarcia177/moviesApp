import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MoviedbService } from 'src/app/services/moviedb.service';
import {pipe, Observable} from 'rxjs';
import {tap, take, map, filter, pluck} from 'rxjs/operators';
import { RecentMovies, Result } from 'src/app/models/recentMovies.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  $estrenos = this.moviesService.$cartelera
                .pipe(
                  pluck('results')
                );

  constructor(private moviesService: MoviedbService) { }

  ngOnInit(): void {
    
  }

}

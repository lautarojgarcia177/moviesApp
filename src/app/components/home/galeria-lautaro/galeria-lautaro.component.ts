import { Component, OnInit, Input } from '@angular/core';
import { Result } from 'src/app/models/recentMovies.model';

@Component({
  selector: 'app-galeria-lautaro',
  templateUrl: './galeria-lautaro.component.html',
  styleUrls: ['./galeria-lautaro.component.scss']
})
export class GaleriaLautaroComponent implements OnInit {

  @Input() estrenos: Result[];
  
  altImg = 'https://i.ytimg.com/vi/We82bJgF0Kc/hqdefault.jpg';

  constructor() {

   }

  ngOnInit(): void {
    this.estrenos.forEach(p => {
      if (p.backdrop_path.endsWith('null')) {
        p.imagen = p.poster_path;
      } else {
        p.imagen = p.backdrop_path;
      }
    });
  }

  onImgError(event) {
    event.target.src = this.altImg;
  }
}

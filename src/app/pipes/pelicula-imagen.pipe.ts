import { Pipe, PipeTransform } from '@angular/core';
import { Result } from '../models/recentMovies.model';

@Pipe({
  name: 'peliculaImagen'
})
export class PeliculaImagenPipe implements PipeTransform {

  altImg = 'https://i.ytimg.com/vi/We82bJgF0Kc/hqdefault.jpg';

  transform(peliculaimg: string): any {
    
    if (peliculaimg.endsWith('null')) {
      return this.altImg;
    } else {
      return peliculaimg;
    }
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { BuscarComponent } from './components/buscar/buscar.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'search', component: BuscarComponent},
  { path: 'search/:texto', component: BuscarComponent},
  { path: 'movie/:id/:pag/:query', component: PeliculaComponent},
  { path: 'movie/:id/:pag', component: PeliculaComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {switchMap, tap, map, catchError} from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as usuarioActions from '../actions';
import { of } from 'rxjs';
import {UsuariosService} from '../../services/usuarios.service';

@Injectable()
export class UsuarioEffects {
    constructor(private actions$: Actions, public usuarioService: UsuariosService) {}

    @Effect()
    cargarUsuario$: Observable<Action> = this.actions$
        .pipe(
            ofType(usuarioActions.CARGAR_USUARIO),
            switchMap( action => {

                  const id = action['id'];
                 return this.usuarioService.getUserById(id)
                     .pipe(
                      map(user => new usuarioActions.CargarUsuarioSuccess(user)),
                      catchError(error => of(new usuarioActions.CargarUsuarioFail(error)))
                     );
            })
        );




}
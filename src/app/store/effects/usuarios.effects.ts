import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {switchMap, tap, map, catchError} from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as usuariosActions from '../actions';
import { of } from 'rxjs';
import {UsuariosService} from '../../services/usuarios.service';

@Injectable()
export class UsuariosEffects {
    constructor(private actions$: Actions, public usuarioService: UsuariosService) {}

    @Effect()
    cargarUsuarios$: Observable<Action> = this.actions$
        .pipe(
            ofType(usuariosActions.CARGAR_USUARIOS),
            switchMap(() => {
                 return this.usuarioService.getUsers()
                     .pipe(
                      map(users => new usuariosActions.CargarUsuariosSuccess(users)),
                      catchError(error => of(new usuariosActions.CargarUsuariosFail(error)))
                     );
            })
        );




}

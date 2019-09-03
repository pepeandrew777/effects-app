import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import {Usuario} from '../../models/usuario.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[];

  constructor(public usuarioService: UsuariosService)
{ }

  ngOnInit() {
    this.usuarioService.getUsers()
        .subscribe(users => {
          console.log(users);
          this.usuarios = users;
        });
  }

}

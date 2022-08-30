import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../services/token/token.service';

@Component({
  templateUrl: '404.component.html'
})
export class P404Component {

  public mensagemErro: string = 'Oops! Não conseguimos encontrar essa página.';
  public caminhoImagemDark: string = 'assets/img/404-dark.gif';
  public caminhoImagemLight: string = 'assets/img/404.gif';

  constructor() { }

  ngOnInit() {

  }


}

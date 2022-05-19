import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DarkModeImagemHelper } from '../../../helpers/DarkModeImagemHelper';
import { atribuirTemaCorretoAoRecarregarPagina } from '../../../helpers/ModoDarkLightHelper';
import { TokenService } from '../../../services/token/token.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { LocalStorageChave } from '../../../models/enums/local-storage-chave.enum';

@Component({
  selector: 'app-http-code-mensagem',
  templateUrl: './http-code-mensagem.component.html',
  styleUrls: ['./http-code-mensagem.component.scss']
})
export class HttpCodeMensagemComponent implements OnInit {

  @Input() caminhoImagemDark: string;
  @Input() caminhoImagemLight: string;
  @Input() mensagemErro: string;

  constructor(private token: TokenService,
              private router: Router,
              private toaster: ToastrService) { }

  ngOnInit() {
    atribuirTemaCorretoAoRecarregarPagina();
    this.atribuirImagemDeAcordoComOModo();
  }

  private atribuirImagemDeAcordoComOModo(): void {
    debugger;
    let darkMode = new DarkModeImagemHelper(this.caminhoImagemDark, this.caminhoImagemLight, "imagem-erro-http")
    darkMode.alternarImagemDeAcordoComOModo();
  }


  public validarSeTokenExpirado(): void {
    if (this.token.usuarioEstaAutenticado()) {
      this.router.navigate(['/dashboard'])
    } else {
      this.toaster.info('Seu acesso foi expirado e por isso será necessário fazer o login novamente.', 'Acesso Expirado');
      this.router.navigate(['login'])
    }
  }
}

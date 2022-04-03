import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-403',
  templateUrl: './403.component.html',
  styleUrls: ['./403.component.scss']
})
export class P403Component implements OnInit {

  constructor(private token: TokenService,
              private router: Router,
              private toaster: ToastrService) { }

  ngOnInit() {
  }

  public validarSeTokenExpirado(): void{
    if(this.token.usuarioEstaAutenticado()){
      this.router.navigate(['/dashboard'])
    }else{
      this.toaster.info('Seu acesso foi expirado e por isso será necessário fazer o login novamente.', 'Acesso Expirado');
      this.router.navigate(['login'])
    }
  }

}

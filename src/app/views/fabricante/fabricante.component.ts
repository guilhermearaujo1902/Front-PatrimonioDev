import { FabricanteService } from './../../services/fabricante/fabricante.service';
import { Fabricante } from './../../models/Fabricante';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.scss']
})
export class FabricanteComponent implements OnInit {

  form!: FormGroup;
  fabricante = {} as Fabricante;
  codigoFabricante: number;
  estadoSalvar: string = 'cadastrarFabricante';

  get f(): any {
    return this.form.controls;
  }
  constructor(
              private fb: FormBuilder,
              private fabricanteService: FabricanteService,
              private toaster: ToastrService,
              private spinner: NgxSpinnerService,
              private activateRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.validacao();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoFabricante: [],
      nomeFabricante: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarAlteracao(): void {
    this.spinner.show();

    this.fabricante = (this.estadoSalvar === 'cadastrarFabricante') ? {...this.form.value} : {codigoFabricante: this.fabricante.codigoFabricante, ...this.form.value};
    console.log(this.fabricante)
    this.fabricanteService[this.estadoSalvar](this.fabricante).subscribe(
      () => this.toaster.success('Fabricante cadastrado com sucesso', 'Sucesso!'),
      (error: any) => {
        this.spinner.hide();
        this.toaster.error(`Houve um erro durante o cadastro do fabricante. Mensagem: ${error.message}`, 'Erro!');
      },
      () =>
      {
        this.spinner.hide()
        setTimeout(() => {
          this.router.navigate(['dashboard/listarFabricante'])
        }, 1700)
      }
    );
  }

}

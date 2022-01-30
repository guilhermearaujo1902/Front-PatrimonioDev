import { FabricanteService } from './../../services/fabricante/fabricante.service';
import { Fabricante } from './../../models/Fabricante';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrls: ['./fabricante.component.scss']
})
export class FabricanteComponent implements OnInit {

  form!: FormGroupTypeSafe<Fabricante>;
  fabricante = {} as Fabricante;
  codigoFabricante: number;
  estadoSalvar: string = 'cadastrarFabricante';

  get f(): any {
    return this.form.controls;
  }

  constructor(
              private fb: FormBuilderTypeSafe,
              private fabricanteService: FabricanteService,
              private toaster: ToastrService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarFabricante();
  }

  private validacao(): void {
    this.form = this.fb.group<Fabricante>({
      codigoFabricante: new FormControl(null),
      nomeFabricante: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    debugger;
    this.fabricante = (this.estadoSalvar === 'cadastrarFabricante') ? {...this.form.value} : {codigoFabricante: this.fabricante.codigoFabricante, ...this.form.value};
    this.fabricanteService[this.estadoSalvar](this.fabricante).subscribe(
      () => this.toaster.success('Fabricante cadastrado com sucesso', 'Sucesso!'),
      (error: any) => {
        this.spinner.hide();
        this.toaster.error(`Houve um erro durante o cadastro do fabricante. Mensagem: ${error.message}`, 'Erro!');
      },
      () => {
        this.spinner.hide()
        setTimeout(() => {
          this.router.navigate(['dashboard/listarFabricante'])
        }, 1700)
      }
    );
  }

  public carregarFabricante() : void{
    this.codigoFabricante = +this.activateRouter.snapshot.paramMap.get('codigoFabricante');
     if(this.codigoFabricante !== null && this.codigoFabricante !== 0){
      this.estadoSalvar = 'atualizarFabricante';
       this.spinner.show();

       this.fabricanteService.obterApenasUmFabricante(this.codigoFabricante).subscribe(
         {
           next: (fabricante: Fabricante) => {
             this.fabricante = {...fabricante};
             this.form.patchValue(this.fabricante);
           },
           error: (error: any) => {
             this.toaster.error('Erro ao tentar carregar o fabricante', 'Erro!');
             console.error(error);
           }
         }
       ).add(() => this.spinner.hide());
     }
    }

}

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SetorService } from '../../services/setor/setor.service';
import { Setor } from '../../models/Setor';

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.scss']
})
export class SetorComponent implements OnInit {

  form!: FormGroup;
  setor = {} as Setor;
  codigoSetor: number;
  estadoSalvar: string = 'post';


  get f(): any {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilder,
    private setorService: SetorService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private activateRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.validacao();
    this.carregarSetor();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoSetor: [],
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public validarMetodo(): void {
    if(this.codigoSetor > 0){

    }

  }

  public salvarAlteracao(): void {
    this.setor = {...this.form.value};
    this.spinner.show();

    this.setor = (this.estadoSalvar === 'post') ? {...this.form.value} : {codigoSetor: this.setor.codigoSetor, ...this.form.value};

    this.setorService[this.estadoSalvar](this.setor).subscribe(
      () => this.toaster.success('Setor cadastrado com sucesso', 'Sucesso!'),
      (error: any) => {
        this.spinner.hide();
        this.toaster.error(`Houve um erro durante o cadastro do setor. Mensagem: ${error.message}`, 'Erro!');
      },
      () =>
      {
        this.spinner.hide()
        setTimeout(() => {
          this.router.navigate(['dashboard/listarSetor'])
        }, 1700)
      }
    );
  }

  public carregarSetor() : void{
    this.codigoSetor = +this.activateRouter.snapshot.paramMap.get('codigoSetor');

     if(this.codigoSetor !== null && this.codigoSetor !== 0){
      this.estadoSalvar = 'atualizarSetor';
       this.spinner.show();

       this.setorService.obterApenasUmSetor(this.codigoSetor).subscribe(
         {
           next: (setor: Setor) => {
             this.setor = {...setor};
             this.form.patchValue(this.setor);
           },
           error: (error: any) => {
             this.toaster.error('Erro ao tentar carregar o evento', 'Erro!');
             console.error(error);
           }
         }
       ).add(() => this.spinner.hide());
     }
   }
}

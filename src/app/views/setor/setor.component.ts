import { SetorDto } from '../../models/dtos/SetorDto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SetorService } from '../../services/setor/setor.service';

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.scss']
})
export class SetorComponent implements OnInit {

  form!: FormGroup;
  setor = {} as SetorDto;

  get f(): any {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilder,
    private setorService: SetorService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.validacao();
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

  public salvarAlteracao(): void {
    this.setor = {...this.form.value};
    this.spinner.show();

    this.setorService.post(this.setor).subscribe(
      () => this.toastr.success('Setor cadastrado com sucesso', 'Sucesso!'),
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(`Houve um erro durante o cadastro do setor. Mensagem: ${error.message}`, 'Erro!');
      },
      () =>  this.spinner.hide()
    );
  }

}

import { FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';
import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../models/Funcionario';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.scss']
})
export class FuncionarioComponent implements OnInit {

  form!: FormGroupTypeSafe<Funcionario>


  get f(): any{
    return this.form.controls;
  }

  constructor() { }

  ngOnInit(): void {
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.scss']
})
export class MovimentacaoComponent implements OnInit {

  form!: FormGroup;

  get f(): any  {
    return this.form.controls;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

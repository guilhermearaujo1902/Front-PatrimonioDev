import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { Categoria } from '../../models/Categoria';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.scss']
})
export class EquipamentoComponent implements OnInit {

  form?: FormGroup
  categoria = [] as Categoria[];

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.validacao();
    this.obterCategorias();
  }

  private validacao(): void {
    this.form = this.fb.group({
      codigoFabricante: [],
      descricaoEquipamento: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    });
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  private obterCategorias(): void {
     this.categoriaService.obterCategoria().subscribe({
      next: (categoria: Categoria[]) => {
        console.log(JSON.stringify(categoria))
        this.categoria = categoria;
      },
      error: () => {},
      complete: () => {}

    });

  }
}

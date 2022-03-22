import { SituacaoEquipamento } from './../models/enums/situacao-equipamento.enum';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumDisplay'
})
export class EnumDisplayPipe implements PipeTransform {

  transform<T>(value: number): unknown {
    debugger;
    return SituacaoEquipamento[value];
  }

}

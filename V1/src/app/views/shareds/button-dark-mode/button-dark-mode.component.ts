import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { LocalStorageChave } from '../../../models/enums/local-storage-chave.enum';
import { mudarTema } from '../../../helpers/ModoDarkLightHelper'

@Component({
  selector: 'app-button-dark-mode',
  templateUrl: './button-dark-mode.component.html',
  styleUrls: ['./button-dark-mode.component.scss']
})
export class ButtonDarkModeComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.verificarEstadoAtualBotaoDarkMode();
    this.escutarAcaoBotaoDarkMode();
  }

  private verificarEstadoAtualBotaoDarkMode(): void {
    let botaoDarkMode = document.querySelector('.toggle-button');

    if (this.localStorageService.obterChave(LocalStorageChave.DarkMode) == 'dark') {
      botaoDarkMode.setAttribute('checked', 'checked');
      mudarTema({target:{checked:true}});
      return;
    }

    botaoDarkMode.removeAttribute('checked');
    mudarTema({target:{checked:false}});

  }

  private escutarAcaoBotaoDarkMode(): void {
    var toggleSwitch = document.querySelector('.toggle-button');
    toggleSwitch.addEventListener('change', mudarTema, false);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-tempo.component.html',
  styleUrls: ['./modal-tempo.component.scss']
})
export class ModalTempoComponent implements OnInit {

  @Input('mensagem') mensagem: Observable<string>;

  constructor() { }

  ngOnInit(): void {

  }

}

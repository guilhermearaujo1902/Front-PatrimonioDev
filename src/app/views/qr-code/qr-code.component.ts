import { Component, OnInit } from '@angular/core';
import * as Instascan from 'instacam';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.realizarChamada();
  }

  private realizarChamada(): void {

    var scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    scanner.addListener('scan', function (content, image) {
      console.log(content);
    });

    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      }
    });

  }

}

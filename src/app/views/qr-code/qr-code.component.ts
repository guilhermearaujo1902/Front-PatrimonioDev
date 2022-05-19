import { AfterViewInit, Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';

declare var configurarTooltips: () => void;

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements AfterViewInit {

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;


  ngAfterViewInit(): void {

    configurarTooltips();

    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;
    });

    this.scanner.camerasNotFound.subscribe(() => this.hasDevices = false);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  }

  displayCameras(cameras: MediaDeviceInfo[]) {
    this.availableDevices = cameras;
  }

  handleQrCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selectedValue: string) {
    this.currentDevice = this.scanner.getDeviceById(selectedValue);
    this. currentDevice = this.availableDevices.find(x => x.deviceId === selectedValue);
  }

  stateToEmoji(state: boolean): string {

    const states = {
      undefined: '❔',
      null: '⭕',
      true: '✔',
      false: '❌'
    };

    return states['' + state];
  }

  public abrirUrl(){
    window.open(this.qrResultString, "_self" );
  }
}

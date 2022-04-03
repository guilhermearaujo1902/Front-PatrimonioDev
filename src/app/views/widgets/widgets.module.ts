import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { WidgetsComponent } from './widgets.component';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';



@NgModule({
  imports: [
    WidgetsRoutingModule,
    BsDropdownModule,
    ChartsModule,
    NgxSpinnerModule
  ],
  declarations: [ WidgetsComponent ]
})
export class WidgetsModule { }

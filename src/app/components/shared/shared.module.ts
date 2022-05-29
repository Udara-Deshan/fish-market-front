import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ProgressSpinnerComponent} from "./progress-spinner/progress-spinner.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [ ProgressSpinnerComponent,
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  exports: [ProgressSpinnerComponent],
  providers: []
})
export class SharedModule {
}

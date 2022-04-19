import { NgModule } from '@angular/core';
import { PreventScrollDirective } from './prevent-scroll.directive';

@NgModule({
  declarations: [
    PreventScrollDirective
  ],
  exports: [
    PreventScrollDirective
  ]
})
export class PreventScrollModule { }

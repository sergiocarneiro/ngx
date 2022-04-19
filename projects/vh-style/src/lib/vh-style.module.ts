import { NgModule } from '@angular/core';
import { VhStyleDirective } from './vh-style.directive';

@NgModule({
  declarations: [
    VhStyleDirective
  ],
  exports: [
    VhStyleDirective
  ]
})
export class VhStyleModule {}

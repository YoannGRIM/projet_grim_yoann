import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from './card.service';
import { CardFormComponent } from './card-form/card-form.component';
import { CardListComponent } from './card-list/card-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { CardNumberFormatterPipe } from './card-number-formatter.pipe';
import { CardCcvFormatterPipe } from './card-ccv-formatter.pipe';

@NgModule({
  declarations: [
    CardFormComponent,
    CardListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    CardNumberFormatterPipe,
    CardCcvFormatterPipe,
  ],
  providers: [
    CardService,
  ],
  exports: [
    CardFormComponent,
    CardListComponent,
  ]
})
export class CardModule { }

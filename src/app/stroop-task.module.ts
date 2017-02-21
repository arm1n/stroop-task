import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StroopTaskComponent } from './stroop-task.component';

import { ColorComponent } from './color/color.component';
import { WordComponent } from './word/word.component';
import { CountDownComponent } from './count-down/count-down.component';

import { RandomService } from './service/random.service';

@NgModule({
  declarations: [
    WordComponent,
    ColorComponent,
    CountDownComponent,
    StroopTaskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    RandomService
  ],
  bootstrap: [
    StroopTaskComponent
  ]
})
export class StroopTaskModule { }

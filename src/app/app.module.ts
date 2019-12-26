import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DialogComponent } from './dialog/dialog.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AlertComponent } from './alert/alert.component';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    AlertComponent
  ],
  entryComponents: [DialogComponent, AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatCheckboxModule,
    MatTableModule,
    MatStepperModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

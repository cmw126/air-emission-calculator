import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppRoutingModule } from './app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

describe('AppComponent', () => {

  let fixture = TestBed.createComponent(AppComponent);
  let app = fixture.debugElement.componentInstance;
  let masterService: AppComponent;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[
        { provide: FormBuilder, useValue: formBuilder }
      ]
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = 
    //error
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    //pass in the form dynamically
    app.portForm = formBuilder.group({
      origin: null,
      destination: null
    })
    fixture.detectChanges();

    expect(app).toBeTruthy();
  });

  it(`should have as title 'carbondex'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('carbondex');
  });


  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('carbondex app is running!');
  // });

  /*it(`should have drop down value`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
  });*/



});

import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Position} from '../../shared/interfaces';
import {RegistrationService} from '../../shared/services/registration.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileValidator} from './file-input.validator';
import {MaterialInstance, MaterialService} from '../../shared/classes/material.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy, AfterViewInit {

  public positions: Position[];
  public oSub: Subscription;
  public form: FormGroup;
  public token: string;
  @ViewChild('modal') modalRef: ElementRef;
  public modal: MaterialInstance;
  public isNew = true;
  public error: string;
  public success: string;
  @Output() public addNewUser: EventEmitter<void> = new EventEmitter<void>();

  constructor(private registrationService: RegistrationService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^.{2,60}$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]{0,1}380([0-9]{9})$/)]],
      position_id: ['', [Validators.required]],
      photo: ['', [FileValidator.validate], this.imageValidator],
      input_text: ['']
    });
    this.oSub = this.registrationService.getPosition().subscribe(positions => {
      this.positions = positions;
    });
    this.oSub = this.registrationService.getToken().subscribe(token => {
      this.token = token;
      localStorage.setItem('auth-token', token);
    });
  }

  ngOnDestroy() {
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  public onFileUpload(event): void {
    const file = <File>event.target.files[0];
    this.form.get('photo').setValue(file);
  }

  public onSubmit(): void {
    this.form.disable();
    this.oSub = this.registrationService.register(this.form.value)
      .subscribe(
        resp => {
          this.addNewUser.emit();
          this.isNew = true;
          this.modal.open();
          this.success = Object.values(resp)[2];
          this.form.enable();
        },
        error => {
          this.error = error.error.message;
          this.isNew = false;
          this.modal.open();
          this.form.enable();
        },
        () => {
          this.form.reset();
        }
      );
  }

  public closeModal(): void {
    this.modal.close();
  }

  private async imageValidator(control: FormControl): Promise<any> {
    const name = await control.value.name;
    const ext = name.substring(name.lastIndexOf('.') + 1);
    const size = await control.value.size;
    return (
      (ext.toLowerCase() === 'jpeg' || ext.toLowerCase() === 'jpg' ? null : {extension: true}) ||
      (size > 5242880 ? {maxSize: true} : null) ||
      (size < 70 * 70 ? {dimension: true} : null)
    );
  }

}

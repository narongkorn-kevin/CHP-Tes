import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormVendor {
  private isValidEmail = /\S+@\S+\.\S+/;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  errorMessage = null;

  constructor(private fb: FormBuilder) { }

  baseForm = this.fb.group({
    id: [
      '',
    ],

    name: [
      '',
      [Validators.required],
    ],
    contact: [
      '',
      [Validators.required],
    ],
    email: [
      '',
      [Validators.required, , Validators.pattern(this.emailPattern)],
    ],
    phone: [
      '',
      [Validators.required],
    ],
    adress: [
      '',
      [Validators.required],
    ],
    status: '',

    role: '',
  });

  get name(): any { return this.baseForm.get('name'); }
  get contact(): any { return this.baseForm.get('contact'); }
  get email(): any { return this.baseForm.get('email'); }
  get phone(): any { return this.baseForm.get('phone'); }
  get adress(): any { return this.baseForm.get('adress'); }
 


  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) &&
      !this.baseForm.get(field).valid
    );
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.baseForm.get(field);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages = {
        required: 'You must enter a value.',
        pattern: 'Not a valid email.',
        minlength: `This field must be longer than ${minlenght} characters`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}

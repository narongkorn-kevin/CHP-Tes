import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormEditProfile {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private fb: FormBuilder) { }

  baseForm = this.fb.group({
    id: [
      '',
    ],
    user_id: [
      '',

    ],
    name: [
      '',
      Validators.required
    ],
    email: [
      '',

    ],
    image: [

      '',

    ],
    signature: [
      '',
    ],
    // password: [
    //   '',
    // ],
    // confirm_password: [

    //   '',
    // ],
    // branch_id: [
    //   '',

    // ],
    // department_id: [
    //   '',

    // ],

    // position_id: [
    //   '',

    // ],

    // role: ['', [Validators.required]],

  }


  );
  get name(): any { return this.baseForm.get('name'); }
  get password(): any { return this.baseForm.get('password'); }
  get confirm_password(): any { return this.baseForm.get('confirm_password'); }
  get email(): any { return this.baseForm.get('email'); }


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

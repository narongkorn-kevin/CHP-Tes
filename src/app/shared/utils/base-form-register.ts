import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormRegister {
  private isValidEmail = /\S+@\S+\.\S+/;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  errorMessage = null;

  constructor(private fb: FormBuilder) { }

  baseForm = this.fb.group({
    id: [
      '',
    ],
    user_id: [
      '',
      Validators.required
    ],
    name: [
      '',
      Validators.required
    ],
    email: [
      '',
      [Validators.required , Validators.pattern(this.emailPattern)]
    ],
    image: [

      '',

    ],
    signature: [
      '',
    ],
    password: [
      '',
      [Validators.required , Validators.minLength(6)]
    ],
    confirm_password: [

      '',
      [Validators.required]
    ],
    branch_id: [
      '',
      Validators.required
    ],
    permission_id: [
      '',

    ],
    department_id: [
      '',
      Validators.required
    ],

    position_id: [
      '',
      Validators.required
    ],

    // role: ['', [Validators.required]],

  }


  );
  get user_id(): any { return this.baseForm.get('user_id'); }
  get name(): any { return this.baseForm.get('name'); }
  get branch_id(): any { return this.baseForm.get('branch_id'); }
  get department_id(): any { return this.baseForm.get('department_id'); }
  get position_id(): any { return this.baseForm.get('position_id'); }
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

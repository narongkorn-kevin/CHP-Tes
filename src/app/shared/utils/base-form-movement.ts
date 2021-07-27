
import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormMovement {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private fb: FormBuilder) { }

  baseForm = this.fb.group({
    id: [
      '',
    ],

    name: [
      '',

    ],
    doc_id: [
      '',

    ],

    report_id: [
      '',

    ],
    date: [
      '',

    ],
    status: [
      '',

    ],
    status_by: [
      '',

    ],
    status_at: [
      '',

    ],

    pdf_path: [
      '',

    ],


    role: [
      '',
    ]
  }


  );



  get password() { return this.baseForm.get('password') }
  get confirm_password() { return this.baseForm.get('confirm_password') }
  get email() { return this.baseForm.get('email') }


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

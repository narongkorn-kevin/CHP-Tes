import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormUnitConvertion {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private fb: FormBuilder) { }

  baseForm = this.fb.group({
    id: [
      '',
    ],

    name: [
      '',
      Validators.required
    ],

    item_type_id: [
      '',
      Validators.required
    ],

    unit_id: [
      '',
      Validators.required
    ],

    description: [
      '',
      Validators.required
    ],

    value: [
      '',
      Validators.required
    ],
    status: [
      '',
    ],
    role: ['', ],
  });

  get name(): any { return this.baseForm.get('name'); }
  get item_type_id(): any { return this.baseForm.get('item_type_id'); }
  get unit_id(): any { return this.baseForm.get('unit_id'); }
  get value(): any { return this.baseForm.get('value'); }
  get description(): any { return this.baseForm.get('description'); }

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

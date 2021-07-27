import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormStockControl {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private fb: FormBuilder) { }

  baseForm = this.fb.group({
    id: [
      '',
    ],
    item_type_id: [
      '', Validators.required
          ],
    approver_id: [
      '', Validators.required
    ],
    manager_id: [
      '', Validators.required
    ],
    // permission_id: [
    //   '',
    // name_en: [
    //   '',
    // ],
    role: ['', ],
  });


  get item_type_id(): any { return this.baseForm.get('item_type_id'); }
  get approver_id(): any { return this.baseForm.get('approver_id'); }
  get manager_id(): any { return this.baseForm.get('manager_id'); }

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

import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormOfficer {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private fb: FormBuilder) { }

  baseFormSearch = this.fb.group({
    id: [
      '',
    ],
    fname: [
      '',
    ],
    lname: [
      '',
    ],
    position: [
      '',
    ],
    status: [
      '',
    ],
    role: ['',],
  });

  baseForm = this.fb.group({
    id: ['',],
    id_card: ['',],
    password: ['',],
    prefix_th: ['',],
    prefix_en: ['',],
    fname_th: ['',],
    lname_th: ['',],
    fname_en: ['',],
    lname_en: ['',],
    position: ['',],
    email: ['',],
    village: ['',],
    village_no: ['',],
    alley: ['',],
    road: ['',],
    sub_district:['',],
    district: ['',],
    province: ['',],
    postal_code: ['',],
    phone: ['',],
    mobile_phone: ['',],
  })


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

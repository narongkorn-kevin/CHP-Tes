
import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormSaleOrderItem {
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
    item_id: [
      '',

    ],

    price: [
      '',

    ],
    price_per_set: [
      '',

    ],

    item_type_id: [
      '',

    ],

    size: [
      '',

    ],
    size_id: [
      '',

    ],
    select_file: [
      '',

    ],
    image: [
      '',

    ],
    min: [
      '',

    ],
    max: [
      '',

    ],
    unit_store_id: [
      '',

    ],
    unit_buy_id: [
      '',

    ],
    unit_sell_id: [
      '',

    ],
    location_id: [
      '',

    ],
    material_type_id: [
      '',

    ],
    material_grade_id: [
      '',

    ],
    material_color_id: [
      '',

    ],
    material_manufactu_id: [
      '',

    ],
    spare_type_id: [
      '',

    ],

    role: [
      '',
    ]
  }


  );




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

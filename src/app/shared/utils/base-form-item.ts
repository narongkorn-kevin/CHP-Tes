import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormItem {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;
  itemType:string;
  baseForm:FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.baseFormFG;
   }


  baseFormFG = this.fb.group({
    id: [
      '',
    ],

    name: [
      '',
      Validators.required

    ],
    item_id: [
      '',
      Validators.required

    ],
    price: [
      '',
      Validators.required

    ],
    // price_per_set: [
    //   '',

    // ],
    // qty_per_box: [
    //   '',

    // ],
    item_type_id: [
      '',
      Validators.required

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
    image_preview: [
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
      Validators.required
    ],
    unit_buy_id: [
      '',
      Validators.required
    ],
    unit_sell_id: [
      '',
      Validators.required
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
    status: [
      '',

    ],

    role: [
      '',
    ]
  }


  );

  baseFormRM = this.fb.group({
    id: [
      '',
    ],
    status: [
      '',

    ],

    name: [
      ''

    ],
    item_id: [
      ''

    ],
    price: [
      ''
    ],
    // price_per_set: [
    //   '',

    // ],
    // qty_per_box: [
    //   '',

    // ],
    item_type_id: [
      '',
      Validators.required

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
    image_preview: [
      '',

    ],
    min: [
      '',


    ],
    max: [
      '',
    ],
    unit_store_id: [
      ''
    ],
    unit_buy_id: [
      ''
    ],
    unit_sell_id: [
      ''
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

  filter = this.fb.group({
    item_id:[''],
    item_type_id:[''],
  });

  get item_id(): any { return this.baseForm.get('item_id'); }
  get name(): any { return this.baseForm.get('name'); }
  get price(): any { return this.baseForm.get('price'); }
  get item_type_id(): any { return this.baseForm.get('item_type_id'); }
  get unit_store_id(): any { return this.baseForm.get('unit_store_id'); }
  get unit_buy_id(): any { return this.baseForm.get('unit_buy_id'); }
  get unit_sell_id(): any { return this.baseForm.get('unit_sell_id'); }
  // get location_id(): any { return this.baseForm.get('location_id'); }



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

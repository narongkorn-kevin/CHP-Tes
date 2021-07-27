import { map, takeUntil } from 'rxjs/operators';
import { CompanyService } from './../services/company.service';

import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ɵbypassSanitizationTrustUrl,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormCompany } from '@shared/utils/base-form-company';
import { Observable, Subscription } from 'rxjs';
import { CompanyResponse } from '@app/shared/models/base.interface';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

declare const $: any;
declare const M: any;
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.NEW;
  showPasswordField = true;
  url_logo: any = [];
  url_map: any = [];
  hide = true;
  ProfileCompany: any = [];
  private subscription: Subscription = new Subscription();
  state: Observable<CompanyResponse>;


  constructor(
    private companySvc: CompanyService,
    private router: Router,
    public companyForm: BaseFormCompany,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        console.log(params);

      });

    this.GetProfile();
    this.companyForm.baseForm.get('role').setValidators(null);
    this.companyForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    console.log(this.companyForm.baseForm.value);
    const formData = new FormData();
    Object.entries(this.companyForm.baseForm.value).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });
    console.log(formData);
    if (this.companyForm.baseForm.invalid) {
      return;
    }
    // console.log(formValue);
    // return false
    if (this.actionTODO === Action.NEW) {
      console.log('formvalue',  formData);
      this.companySvc.new(formData).subscribe((res) => {
        this.router.navigate(['base/company/form']);
        this.GetProfile();
      });
    }
  }
  onChange(event: any): void {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(e: any)=>
    this.url_logo=e.target.result;
    const file = event.target.files[0];
    this.companyForm.baseForm.patchValue({
      logo: file
    });

  }

  GetProfile(): void {
    this.companySvc.getcompany().subscribe((resp) => {
      this.ProfileCompany = resp.data;
      console.log('testget', this.ProfileCompany);
      this.companyForm.baseForm.patchValue({
        name_th: this.ProfileCompany.name_th,
        name_en: this.ProfileCompany.name_en,
        tax_id: this.ProfileCompany.tax_id,
        email: this.ProfileCompany.email,
        phone: this.ProfileCompany.phone,
        fax: this.ProfileCompany.fax,
        contact: this.ProfileCompany.contact,
        address: this.ProfileCompany.address,
        website: this.ProfileCompany.website,
        map: this.ProfileCompany.map,
        // logo: this.ProfileCompany.logo,
      });
      this.url_logo = this.ProfileCompany.logo;
      this.url_map = this.ProfileCompany.map;
      $("#map-iframe").attr('src', this.url_map);
    });
  }

}

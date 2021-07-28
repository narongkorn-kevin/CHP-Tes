import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subscription } from 'rxjs';
import { BaseFormOfficer } from '@shared/utils/base-form-officer';
import { OfficeServiceService } from '../service/office-service.service';
import Swal from 'sweetalert2';

declare var $: any;
const user = JSON.parse(localStorage.getItem('user')) || null;


enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {

  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();

  public dtOptions: DataTables.Settings = {};

  private destroy$ = new Subject<any>();
  public dataRow: any[];


  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;

  officerData: FormGroup;
  officerFormData: FormGroup;
 
  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();

  public districtData: any = [];
  public subdistrictData: any = [];
  public provinceData: any = [];
  public ServiceGroupData: any = [];

  constructor(
    private router: Router,
    private officerServ: OfficeServiceService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient,
    public officerForm: BaseFormOfficer,
    private fb: FormBuilder
  ) {

    this.officerFormData = this.fb.group({
      //id: '',
      id_card: '',
      prefix_th: '',
      prefix_en: '',
      fname_th: '',
      lname_th: '',
      fname_en: '',
      lname_en: '',
      position: '',
      email: '',
      village: '',
      village_no: '',
      alley: '',
      road: '',
      sub_district: '',
      district: '',
      province: '',
      postal_code: '',
      phone: '',
      mobile_phone: '',
    });
  }

  ngOnInit(): void {
    this.getProvince();
  }
  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.addOfficer();
    // this.dateOfficer();
  }

  officer(): FormArray {
    return this.officerData.get('event') as FormArray
  }

  newOfficerData(): FormGroup {
    return this.fb.group({
      name: '',
      seq: '',
      user_per_year: '',
      remark: '',
    })
  }

  addOfficer(): void {
    this.officer().push(this.newOfficerData());
  }

  dateOfficer(): void {
    this.officer().push(this.newOfficerData());
  }

  onSaveOfficer(): void {
    Swal.fire({
      title: 'Warning!',
      text: "คุณต้องการบันทึกข้อมูล ใช่หรือไม่?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire(
        //   'Success!',
        //   'ดำเนินการเสร็จสิ้น!',
        //   'success'
        // )
        if (this.officerForm.baseForm.invalid) {
          return;
        }
        const formValue = this.officerForm.baseForm.value;
        //console.log(this.officerForm.baseForm.value);

        if (this.actionTODO === Action.NEW) {
          this.officerServ.New(formValue).subscribe((res) => {
            Swal.fire({
              title: 'Success!',
              text: "ดำเนินการเสร็จสิ้น!",
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#28a745',
              confirmButtonText: 'ตกลง',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['officer/list']);
              }
            })
          });
        }
       
      }
    });
  }

  getSubDistrict(id): void {
    let postData = {
      district_id : id
    }
    this.officerServ.getSubDistrict(postData).subscribe(resp => {
      this.subdistrictData = resp.data;
      console.log(this.subdistrictData);
    });
  }

  getDistrict(id): void {
    let postData = {
      province_id : id
    }
    this.officerServ.getDistrict(postData).subscribe(resp => {
      this.districtData = resp.data;
      //console.log(this.districtData);
    });
  }

  getProvince(): void {
    this.officerServ.getProvince().subscribe(resp => {
      this.provinceData = resp.data;
      //console.log(this.provinceData);
    });
  }

  changProvince(e): void {
    let namepro = e.target.value;
    let list = this.provinceData.filter(x => x.name_th === namepro)[0];
    console.log(list);
    this.getDistrict(list.id);
  }

  changDistrict(e): void {
    let name = e.target.value;
    let list = this.districtData.filter(x => x.name_th === name)[0];
    console.log(list);
    this.getSubDistrict(list.id);
  }

  
  changSubDistrict(e): void {
    let name = e.target.value;
    let list = this.subdistrictData.filter(x => x.name_th === name)[0];
    console.log(list);
    this.officerFormData.patchValue({ 
      postal_code : list.zip_code 
    });
  }


  onClearData(): void {

  }

}

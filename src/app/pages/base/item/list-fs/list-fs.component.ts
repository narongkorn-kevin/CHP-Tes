import { takeUntil } from 'rxjs/operators';
import { ItemService } from './../services/item.service';
import { HelperService } from './../../../../shared/helper.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ItemResponse } from '@app/shared/models/base.interface';
import { DataTableDirective } from 'angular-datatables';
import { HttpHeaders } from '@angular/common/http';
declare var $: any;
const user = JSON.parse(localStorage.getItem('user')) || null;


@Component({
  selector: 'app-list-fs',
  templateUrl: './list-fs.component.html',
  styleUrls: ['./list-fs.component.scss']
})
export class ListFsComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` })
  };
  public dtOptions: DataTables.Settings = {};

  private destroy$ = new Subject<any>();
  public dataRow: any[];
  public item_type_id: any;

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private itemSvc: ItemService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private HelperService: HelperService
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadTable();
  }


  //   this.employeeSvc.getAll().subscribe((employee) => {
  //     this.dataRow = employee.data;

  //     const script = this.renderer.createElement('script');
  //     script.src = 'assets/plugins/datatable/js/dataTables.buttons.min.js';
  //     script.onload = () => {
  //       console.log('script loaded');
  //       const table = $('#example').DataTable({
  //         // dom: 'lBfrtiBp',
  //         lengthChange: true,
  //         buttons: ['copy', 'excel', 'pdf', 'colvis'],
  //         responsive: true,
  //         language: {
  //           searchPlaceholder: 'Search...',
  //           sSearch: '',
  //           lengthMenu: '_MENU_ ',
  //         }
  //       });
  //       table.buttons().container()
  //         .appendTo('#example_wrapper .col-md-6:eq(0)');

  //     };
  //     this.renderer.appendChild(this.elementRef.nativeElement, script);
  //     // this.dataSource.data = company;
  //   });
  // }


  loadTable(): void {

    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        dataTablesParameters['item_type_id'] = 5
        that.itemSvc.getAll(dataTablesParameters).subscribe(resp => {
          // that.dataRow = resp.data.data;
          if (resp.data.data) {
            this.dataRow = this.HelperService.replaceArrayValue(resp.data.data, ''); // resp.data.data;
          }
          console.log(this.dataRow);
          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: []
          });
        });
      },
      columns: [
        { data: 'No' },
        { data: 'name' },
        { data: 'size' },
        // { data: 'min' },
        // { data: 'max' },
        { data: 'status' },
        { data: 'qty' },
        // { data: 'price' },
        // { data: 'qty' },
        // { data: 'location.name' },
        // { data: 'status' },
        { data: 'action', orderable: false }
      ]
    };

  }

  onEdit(data): void {
    // console.log('success');
    // // return false
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     item: {
    //       id: data.id ,
    //       item_id: data.item_id,
    //       item_type_id: data.item_type_id,
    //       size_id: null,
    //       select_file: null,
    //       image: null,
    //       image_preview: data.image,
    //       name: data.name,
    //       size: data.size,
    //       min: data.min,
    //       max: data.max,
    //       price: data.price,
    //       // price_per_set: data.price_per_set,
    //       unit_sell_id: data.unit_sell_id,
    //       unit_buy_id: data.unit_buy_id,
    //       unit_store_id: data.unit_store_id,
    //       material_type_id: data.material_type_id,
    //       material_grade_id: data.material_grade_id,
    //       material_color_id: data.material_color_id,
    //       material_manufactu_id: data.material_manufactu_id,
    //       spare_type_id: data.spare_type_id,
    //       location_id: data.location_id,
    //       // company_id: data.company_id,
    //       // name_th: data.name_th,
    //       // name_en: data.name_en,
    //       role: '',
    //     }
    //   }
    // };

    this.router.navigate(['base/item/edit-fs', data.id]);
  }

  onDelete(ItemId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.itemSvc
        .delete(ItemId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: ItemResponse) => {
          if (res.code == 201) {
            this.rerender();
          }
          // this.branchSvc.getAll().subscribe((branch) => {
          // this.dataRow = branch.data;
          // });
        });
    }
  }
  onItemLot(data): void {
    console.log(data);
    // // return false
    // const navigationExtras: NavigationExtras = {
    //   state: {

    //       item_id: data.id

    //   },
    // };

    this.router.navigate(['warehouse/item-lot/list/' + data.id]);
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}

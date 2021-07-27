import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {

  constructor(
    private router : Router
  ) { }


  goToTranList(data): void {
    const navigationExtras: NavigationExtras = {
      state: {
        item: {
          report_stock_id: data.id
        },
      },
    };
    let links = 'warehouse/item-tran/list';
    console.log('nav data', navigationExtras);
    this.router.navigate([links], navigationExtras).then(result => {  window.open(links, '_blank'); });
}



}

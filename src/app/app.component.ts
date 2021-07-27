import { takeUntil } from 'rxjs/operators';
import { UtilsService } from './shared/services/utils.service';
import { Router, NavigationStart } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '@auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  opened = false;
  IsLogin = false;
  private destroy$ = new Subject<any>();

  constructor(private authSvc: AuthService, private utilsSvc: UtilsService, private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        // alert(event.url);
        // tslint:disable-next-line:max-line-length
        // if (event.url === '/' || event.url === '/home' || event.url === '/base' || event.url === '/time' || event.url === '/report' || event.url === '/setting' || event.url === '/dashboard' || event.url === '/base/company/list' || event.url === '/base/company/form') {
        // this.IsLogin = true;
        // } else {
        //   // console.log("NU")
        //   this.IsLogin = false;
        // }
        if (event.url === '/login') {
          this.IsLogin = false;
        } else {
          this.IsLogin = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.authSvc.checkToken();
    this.utilsSvc.sidebarOpened$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => (this.opened = res));
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}

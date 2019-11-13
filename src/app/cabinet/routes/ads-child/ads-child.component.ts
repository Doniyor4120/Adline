import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ads} from '../../../models/Ads';
import {Subscription} from 'rxjs';
import {ApiService} from '../../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {PageChangedEvent} from 'ngx-bootstrap';
import {ModalComponent} from '../../components/modal/modal.component';

@Component({
  selector: 'app-ads-child',
  templateUrl: './ads-child.component.html',
})
export class AdsChildComponent implements OnInit, OnDestroy {
  @ViewChild('modalComponent', {static: false}) modalComponent: ModalComponent;
  bsInlineRangeValue: Date[] = [];

  adList: Ads[] = [];
  adListShowed: Ads[] = [];
  loading = false;
  error: string = null;
  requestSub: Subscription;
  // requestParams: string = null;

  id: number = null;

  total = {
    clicks: 0,
    impressions: 0
  };
  currentPeriod = 4;
  currentType = 'GOOGLE_ADWORDS';
  currentDates: {
    current: Date;
    second: Date;
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.id = route.snapshot.params.id;
  }

  ngOnInit() {
    const request = JSON.parse(sessionStorage.getItem('request'));
    this.currentType = request.currentType || 'GOOGLE_ADWORDS';
    this.currentPeriod = request.currentPeriod || 4;
    this.bsInlineRangeValue[0] = JSON.parse(request.request).startDate;
    this.bsInlineRangeValue[1] = JSON.parse(request.request).endDate;
    this.getTable(this.currentType);
  }

  ngOnDestroy(): void {
    if (this.requestSub) {
      this.requestSub.unsubscribe();
    }
  }

  private getTable(type: string = 'GOOGLE_ADWORDS') {
    let secondDate = null;
    let currentDate = new Date();

    switch (this.currentPeriod) {
      case 1:
        // const date = new Date();
        // const day = date.getDay();
        // const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        // secondDate = new Date(date.setDate(diff));
        secondDate = dateBack(7);
        break;
      case 2:
        // secondDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        secondDate = dateBack(30);
        break;
      case 3:
        secondDate = dateBack(30 * 3);
        break;
      case 4:
        secondDate = new Date(currentDate.getFullYear(), 0, 1);
        break;
      case 5:
        currentDate = new Date(this.bsInlineRangeValue[1]);
        secondDate = new Date(this.bsInlineRangeValue[0]);
        break;
      default:
        secondDate = new Date(currentDate.getFullYear(), 0, 1);
        this.currentPeriod = 4;
    }
    this.currentDates = {
      current: currentDate,
      second: secondDate
    };
    this.total = {
      clicks: 0,
      impressions: 0
    };

    this.loading = true;
    this.adList = [];
    this.adListShowed = [];

    // this.requestParams = JSON.stringify({
    //   type,
    //   startDate: secondDate.toISOString(),
    //   endDate: currentDate.toISOString(),
    //   adGroupId: this.id
    // });
    this.apiService.getAdList(type, secondDate.toISOString(), currentDate.toISOString(), this.id)
      .subscribe(next => {
        this.loading = false;
        console.log(next);

        next.items.forEach(each => {
          const obj: Ads = new Ads(each);
          this.adList.push(obj);
        });
        this.adListShowed = this.adList.slice(0, 15);
      }, error => console.error(error));

    // this.loading = true;
    // this.adList = [];
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.adListShowed = this.adList.slice(startItem, endItem);
  }

  setPeriod(number1: number) {
    if (this.currentPeriod === number1) {
      return;
    }
    this.currentPeriod = number1;
    this.getTable();
  }

  apply(event) {
    this.bsInlineRangeValue = event;
    this.currentPeriod = 5;
    this.getTable();
  }

  openModal() {
    this.modalComponent.openModal();
  }

  // download() {
  //   sessionStorage.setItem('download', this.requestParams);
  //   sessionStorage.setItem('downloadRoute', 'ads');
  //   window.open(window.origin + '/cabinet/download', '_blank');
  // }
}

function dateBack(days: number) {
  const date = new Date();
  return new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
}

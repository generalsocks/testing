import { Subscription, fromEvent, map, merge, of } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;

  constructor() { 

  }

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;

    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe((status) => {
        console.log('status', status);
        this.networkStatus = status;
        this.updateImageVisibility(status);
      });
  }

  updateImageVisibility(status: boolean) {
    const onlineImage = document.getElementById('onlineImage');
    const offlineImage = document.getElementById('offlineImage');
    if (status == true && onlineImage != null && offlineImage != null) {
      onlineImage.style.display = 'block';
      offlineImage.style.display = 'none';
    } else if (status == false && onlineImage != null && offlineImage != null) {
      onlineImage.style.display = 'none';
      offlineImage.style.display = 'block';
    }
  }
}

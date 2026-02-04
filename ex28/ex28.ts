import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ex28',
  imports: [],
  templateUrl: './ex28.html',
  styleUrl: './ex28.css',
})
export class Ex28 {
  time: any;
  bpi: any;
  url: string = 'https://api.coindesk.com/v1/bpi/currentprice.json';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();

    // refresh mỗi 60 giây
    setInterval(() => {
      this.loadData();
    }, 60000);
  }

  loadData() {
    this.http.get<any>(this.url).subscribe(data => {
      this.time = data.time;
      this.bpi = data.bpi;
    });
  }
}
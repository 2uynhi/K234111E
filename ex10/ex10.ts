import { Component, OnInit } from '@angular/core';
import { LunarYear } from './lunar-year';

@Component({
  selector: 'app-ex10',
  standalone: false,
  templateUrl: './ex10.html',
  styleUrl: './ex10.css',
})
export class Ex10 implements OnInit {
  days: number[] = [];
  months: number[] = [];
  years: number[] = [];

  selectedDay: number = 15;
  selectedMonth: number = 5;
  selectedYear: number = 1986;

  lunarResult: any = null;

  constructor() { }

  ngOnInit(): void {
      // Populate Days
      for (let i = 1; i <= 31; i++) {
          this.days.push(i);
      }
      // Populate Months
      for (let i = 1; i <= 12; i++) {
          this.months.push(i);
      }
      // Populate Years (e.g., 1900 to 2100)
      for (let i = 1900; i <= 2100; i++) {
          this.years.push(i);
      }
  }

  convert() {
      const lunar = new LunarYear(this.selectedDay, this.selectedMonth, this.selectedYear);
      this.lunarResult = lunar.findLunarYearDetail();
  }
}

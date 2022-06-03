export class DashboardDTO{
    day3Count:number;
    day7Count:number;
    dailyStock:number;
    dailyIncome:number;
    available:number;

  constructor(day3Count: number, day7Count: number, dailyStock: number, dailyIncome: number, available: number) {
    this.day3Count = day3Count;
    this.day7Count = day7Count;
    this.dailyStock = dailyStock;
    this.dailyIncome = dailyIncome;
    this.available = available;
  }
}

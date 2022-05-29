
export class MenuDTO{
  menuName:string;
  url:string;
  icon:string;
  list:MenuDTO [];

  constructor(menuName: string, url: string, icon: string, list: MenuDTO[]) {
    this.menuName = menuName;
    this.url = url;
    this.icon = icon;
    this.list = list;
  }
}

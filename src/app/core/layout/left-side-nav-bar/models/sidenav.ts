export class SidenavDTO{
  menuName:string;
  menuIcon:string;
  menuRoute:string;
  subMenu: SidenavDTO[] |undefined;


  constructor(menuName: string, menuIcon: string, menuRoute: string, subMenu: SidenavDTO[] | undefined) {
    this.menuName = menuName;
    this.menuIcon = menuIcon;
    this.menuRoute = menuRoute;
    this.subMenu = subMenu;
  }
}

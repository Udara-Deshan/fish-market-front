export const NavData=[
  {
    menuName: 'Dashboard',
    url: '/home/',
    icon: 'dashboard',
    list:[]
  },

  {
    menuName: 'Customer',
    url: '',
    icon: 'person',
    list: [
      {
        menuName: 'Add Customer',
        url: 'customer/add',
        icon: '',
        list: []
      },
      {
        menuName: 'View Customers',
        url: 'customer/all',
        icon: '',
        list: []
      }
    ]
  },
  {
    menuName: 'Cooling Rooms',
    url: '',
    icon: 'backup_table',
    list: [
      {
        menuName: 'Add Cooling Room',
        url: 'cooling-room/add',
        icon: '',
        list: []
      },
      {
        menuName: 'View Cooling Rooms',
        url: 'cooling-room/all',
        icon: '',
        list: []
      },
      {
        menuName: 'Add Cooling Room Type',
        url: 'cooling-room/type/add',
        icon: '',
        list: []
      },
      {
        menuName: 'View Cooling Room Types',
        url: 'cooling-room/type/all',
        icon: '',
        list: []
      }
    ]
  },
  {
    menuName: 'Stock',
    url: '',
    icon: 'inventory_2',
    list: [
      {
        menuName: 'Create Stock',
        url: 'stock/create',
        icon: '',
        list: []
      },
      {
        menuName: 'View Stocks',
        url: 'stock/all',
        icon: '',
        list: []
      }
    ]
  }
];

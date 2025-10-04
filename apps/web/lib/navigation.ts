export type NavigationItem = {
  name: string;
  href: string;
  icon: string;
};

export const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: 'ChartPieIcon' },
  { name: 'Drafts', href: '/drafts', icon: 'DocumentDuplicateIcon' },
  { name: 'Products', href: '/products', icon: 'CubeIcon' },
  { name: 'Orders', href: '/orders', icon: 'TruckIcon' },
  { name: 'Customers', href: '/customers', icon: 'UserGroupIcon' },
  { name: 'Customer Support', href: '/support', icon: 'LifebuoyIcon' }
];

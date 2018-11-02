import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'PERSONAL',
    group: true,
  },
  {
    title: 'About me',
    icon: 'nb-e-about',
    link: '/about',
    home: true,
  },
  {
    title: 'Resume',
    icon: 'nb-e-resume',
    link: '/resume'
  },
  {
    title: 'Contacts',
    icon: 'nb-e-contacts',
    link: '/contacts'
  },
  {
    title: 'INTERNET OF THINGS',
    group: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'nb-home',
    link: '/admin',
  }
];

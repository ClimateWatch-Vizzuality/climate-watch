import AboutContact from 'components/about/about-contact';
import AboutDescription from 'components/about/about-description';
import AboutPartners from 'components/about/about-partners';
import AboutPermissions from 'components/about/about-permissions';

export default [
  {
    path: '/about',
    component: AboutDescription,
    exact: true,
    anchor: true,
    label: 'About Climate Watch'
  },
  {
    path: '/about/partners',
    component: AboutPartners,
    exact: true,
    anchor: true,
    label: 'Climate Watch Partners'
  },
  {
    path: '/about/contact',
    component: AboutContact,
    exact: true,
    anchor: true,
    label: 'Contact Us & Feedback'
  },
  {
    path: '/about/permissions',
    component: AboutPermissions,
    exact: true,
    anchor: true,
    label: 'Permissions & Licensing'
  }
];

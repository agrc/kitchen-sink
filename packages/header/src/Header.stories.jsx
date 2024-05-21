import Header from './index';

export default {
  component: Header,
};

const links = [
  {
    title: 'Getting Started Guide',
    actionUrl: {
      url: 'https://gis.utah.gov',
    },
  },
  {
    title: 'Documentation',
    actionUrl: {
      url: '/docs',
    },
  },
  {
    title: 'Privacy Policy',
    actionUrl: {
      url: '/privacy',
    },
  },
];

export const DefaultHeader = {
  render: () => <Header links={links} />,
};

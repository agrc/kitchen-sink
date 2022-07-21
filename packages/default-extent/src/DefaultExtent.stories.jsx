import HomeButton from './';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  title: 'DefaultExtent',
  component: HomeButton,
  decorators: [
    (Story) => <div className="esri-ui-top-left esri-ui-corner">{Story()}</div>,
  ],
  argTypes: {
    goTo: { action: 'goTo' },
  },
};

export const Normal = (args) => (
  <HomeButton
    view={{ goTo: args.goTo, ui: { add: () => {} } }}
    extent={{}}
  ></HomeButton>
);

import { ExpandableContainer } from './';

export default {
  component: ExpandableContainer,
  parameters: {
    layout: 'centered',
  },
  args: {
    expanded: false,
  },
};

export const Example = (args) => (
  <ExpandableContainer {...args}>
    <div style={{ width: '200px', height: '200px', border: '1px solid black' }}>
      peek-a-boo
    </div>
  </ExpandableContainer>
);

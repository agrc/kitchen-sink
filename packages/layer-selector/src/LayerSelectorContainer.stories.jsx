import { ExpandableContainer } from './';
import './LayerSelector.css';

export default {
  title: 'LayerSelector/Container',
  component: ExpandableContainer,
};

export const closed = () => (
  <ExpandableContainer>
    <div style={{ width: '200px', height: '200px', border: '1px solid black' }}>
      peek-a-boo
    </div>
  </ExpandableContainer>
);

export const open = () => (
  <ExpandableContainer expanded={true}>
    <div style={{ width: '200px', height: '200px', border: '1px solid black' }}>
      peek-a-boo
    </div>
  </ExpandableContainer>
);

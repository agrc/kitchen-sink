import { ExpandableContainer } from './';
import './LayerSelector.css';

export default {
  component: ExpandableContainer,
};

export const Closed = () => (
  <ExpandableContainer>
    <div style={{ width: '200px', height: '200px', border: '1px solid black' }}>
      peek-a-boo
    </div>
  </ExpandableContainer>
);

export const Open = () => (
  <ExpandableContainer expanded={true}>
    <div style={{ width: '200px', height: '200px', border: '1px solid black' }}>
      peek-a-boo
    </div>
  </ExpandableContainer>
);

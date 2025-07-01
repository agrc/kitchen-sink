import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Example: Story = {
  render: () => (
    <Modal isOpen={true}>
      <Dialog>
        <p>
          This web map depicts known existing bicycle paths, lanes, and paths.
          An alternate map view conveys a comparative level of traffic stress
          (LTS) that users might experience when bicycling along major roadways.
        </p>
      </Dialog>
    </Modal>
  ),
};

export const SmallScreenOverflow: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <Modal isOpen={true}>
      <Dialog>
        <p>
          This web map depicts known existing bicycle paths, lanes, and paths.
          An alternate map view conveys a comparative level of traffic stress
          (LTS) that users might experience when bicycling along major roadways.
        </p>
        <p>
          This dataset is updated periodically but users are advised that the
          map may not reflect current conditions on the ground, and may contain
          errors or omissions. User can click on any location on the map to
          indicate where updated data is needed.
        </p>
        <p>Use of this information is at your own risk.</p>
        <p>
          This dataset is updated periodically but users are advised that the
          map may not reflect current conditions on the ground, and may contain
          errors or omissions. User can click on any location on the map to
          indicate where updated data is needed.
        </p>
        <p>Use of this information is at your own risk.</p>
      </Dialog>
    </Modal>
  ),
};

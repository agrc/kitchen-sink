import {
  composeRenderProps,
  ToggleButtonGroup as RACToggleButtonGroup,
  type ToggleButtonGroupProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const styles = tv({
  base: 'flex',
  variants: {
    orientation: {
      horizontal:
        'flex-row [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md [&>button]:rounded-none',
      vertical:
        'flex-col [&>button:first-child]:rounded-t-md [&>button:last-child]:rounded-b-md [&>button]:rounded-none',
    },
  },
});

export function ToggleButtonGroup(props: ToggleButtonGroupProps) {
  return (
    <RACToggleButtonGroup
      {...props}
      className={composeRenderProps(props.className, (className) =>
        styles({ orientation: props.orientation || 'horizontal', className }),
      )}
    />
  );
}

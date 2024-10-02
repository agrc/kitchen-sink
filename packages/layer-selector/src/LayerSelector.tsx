import {
  Collection,
  Dialog,
  DialogTrigger,
  Popover as RACPopover,
  Header,
} from 'react-aria-components';
import { LayersIcon } from 'lucide-react';
import type { PopoverProps } from 'react-aria-components';
import {
  Button,
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
} from '@ugrc/utah-design-system/src';
import MapView from '@arcgis/core/views/MapView';

type LayerFactory = {
  Factory: new () => __esri.Layer;
  url: string;
  id: string;
  opacity: number;
};
type SelectorOptions = {
  view: MapView;
  quadWord: string;
  baseLayers: Array<
    string | { token: string; selected: boolean } | LayerFactory
  >;
  overlays?: Array<string | LayerFactory>;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

const Popover = (props: PopoverProps) => {
  return (
    <RACPopover
      {...props}
      className={({ isEntering, isExiting }) =>
        `group min-w-48 max-w-sm overflow-y-auto rounded-lg bg-white px-3 py-2 ring-1 ring-black/10 drop-shadow-lg dark:bg-zinc-800 dark:ring-white/10 ${
          isEntering
            ? 'animate-in fade-in placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1 duration-500 ease-out'
            : ''
        } ${
          isExiting
            ? 'animate-out fade-out placement-top:slide-out-to-bottom-1 placement-bottom:slide-out-to-top-1 duration-150 ease-in'
            : ''
        } `
      }
    />
  );
};

export function LayerSelector({
  options,
  ...props
}: {
  options: SelectorOptions;
}) {
  return (
    <DialogTrigger {...props}>
      <div className="inline-flex max-w-fit border border-black bg-white dark:border-zinc-500 dark:bg-zinc-900">
        <Button
          aria-label="Map layers"
          className="px-1.5 outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          variant="icon"
        >
          <LayersIcon className="block size-8 p-1" />
        </Button>
      </div>
      <Popover>
        <Dialog className="outline-none">
          <Header className="font-bold dark:text-white">Base maps</Header>
          <RadioGroup className="flex-1">
            <Collection items={options.baseLayers}>
              {(item) => (
                <Radio className="pl-2" value={item.name}>
                  {item.name}
                </Radio>
              )}
            </Collection>
          </RadioGroup>
          <Header className="pt-3 font-bold dark:text-white">Overlays</Header>
          <CheckboxGroup className="flex-1">
            <Collection items={props.options.overlays}>
              {(item) => (
                <Checkbox className="pl-2" value="test">
                  {item.name}
                </Checkbox>
              )}
            </Collection>
          </CheckboxGroup>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}

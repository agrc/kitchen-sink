import { ArrowUp } from 'lucide-react';
import {
  Cell as AriaCell,
  Column as AriaColumn,
  Row as AriaRow,
  Table as AriaTable,
  TableHeader as AriaTableHeader,
  Button,
  CellProps,
  Collection,
  ColumnProps,
  ColumnResizer,
  Group,
  ResizableTableContainer,
  RowProps,
  TableHeaderProps,
  TableProps,
  composeRenderProps,
  useTableOptions,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { Checkbox } from './Checkbox';
import { composeTailwindRenderProps, focusRing } from './utils';

export function Table(props: TableProps) {
  return (
    <ResizableTableContainer className="relative max-h-96 max-w-screen-md scroll-pt-[2.281rem] overflow-auto rounded-lg border p-4 dark:border-zinc-200/40">
      <AriaTable {...props} />
    </ResizableTableContainer>
  );
}

const columnStyles = tv({
  extend: focusRing,
  base: 'flex h-5 flex-1 items-center gap-1 overflow-hidden px-2',
});

const resizerStyles = tv({
  extend: focusRing,
  base: 'box-content h-5 w-px translate-x-[8px] cursor-col-resize rounded bg-gray-400 bg-clip-content px-[8px] py-1 -outline-offset-2 resizing:w-[2px] resizing:bg-blue-600 resizing:pl-[7px] dark:bg-zinc-500 forced-colors:bg-[ButtonBorder] forced-colors:resizing:bg-[Highlight]',
});

export function Column(props: ColumnProps) {
  return (
    <AriaColumn
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'cursor-default text-start text-base font-bold text-zinc-700 dark:text-zinc-300 [&:focus-within]:z-20 [&:hover]:z-20',
      )}
    >
      {composeRenderProps(
        props.children,
        (children, { allowsSorting, sortDirection }) => (
          <div className="flex items-center">
            <Group role="presentation" tabIndex={-1} className={columnStyles}>
              <span className="truncate">{children}</span>
              {allowsSorting && (
                <span
                  className={`flex h-4 w-4 items-center justify-center transition ${
                    sortDirection === 'descending' ? 'rotate-180' : ''
                  }`}
                >
                  {sortDirection && (
                    <ArrowUp
                      aria-hidden
                      className="h-4 w-4 text-gray-500 dark:text-zinc-400 forced-colors:text-[ButtonText]"
                    />
                  )}
                </span>
              )}
            </Group>
            {!props.width && <ColumnResizer className={resizerStyles} />}
          </div>
        ),
      )}
    </AriaColumn>
  );
}

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
  let { selectionBehavior, selectionMode, allowsDragging } = useTableOptions();

  return (
    <AriaTableHeader
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'sticky top-0 z-10 rounded-t-lg border-b backdrop-blur-md supports-[-moz-appearance:none]:bg-gray-100 dark:border-b-zinc-300 dark:supports-[-moz-appearance:none]:bg-zinc-700 forced-colors:bg-[Canvas]',
      )}
    >
      {/* Add extra columns for drag and drop and selection. */}
      {allowsDragging && <Column />}
      {selectionBehavior === 'toggle' && (
        <AriaColumn
          width={36}
          minWidth={36}
          className="cursor-default p-2 text-start text-sm font-semibold"
        >
          {selectionMode === 'multiple' && <Checkbox slot="selection" />}
        </AriaColumn>
      )}
      <Collection items={props.columns}>{props.children}</Collection>
    </AriaTableHeader>
  );
}

const rowStyles = tv({
  extend: focusRing,
  base: 'group/row relative cursor-default select-none text-sm text-zinc-700 -outline-offset-2 hover:bg-slate-200 selected:bg-secondary-600 selected:text-white selected:hover:bg-secondary-500 disabled:text-gray-300 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:disabled:text-zinc-600',
});

export function Row<T extends object>({
  id,
  columns,
  children,
  ...otherProps
}: RowProps<T>) {
  let { selectionBehavior, allowsDragging } = useTableOptions();

  return (
    <AriaRow id={id} {...otherProps} className={rowStyles}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">≡</Button>
        </Cell>
      )}
      {selectionBehavior === 'toggle' && (
        <Cell>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </AriaRow>
  );
}

const cellStyles = tv({
  extend: focusRing,
  base: 'truncate border-b p-2 -outline-offset-2 [--selected-border:theme(colors.secondary.800)] group-last/row:border-b-0 group-selected/row:border-[--selected-border] dark:border-b-zinc-700 dark:[--selected-border:theme(colors.secondary.500)] [:has(+[data-selected])_&]:border-[--selected-border]',
});

export function Cell(props: CellProps) {
  return <AriaCell {...props} className={cellStyles} />;
}

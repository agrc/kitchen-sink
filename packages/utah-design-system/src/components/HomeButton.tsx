import '@arcgis/core/interfaces.d.ts';
import { useDefaultExtent, useViewUiPosition } from '@ugrc/utilities/hooks';
import { HomeIcon } from 'lucide-react';
import { Button } from './Button';

export const HomeButton = ({
  view,
  position,
  initialExtent,
  actions,
}: {
  view: __esri.MapView;
  position?: __esri.UIAddComponent['position'];
  initialExtent?: __esri.Extent;
  actions?: (() => void)[];
}) => {
  const goHome = useDefaultExtent(view, initialExtent);
  const uiPosition = useViewUiPosition(view, position ?? 'top-left');

  return (
    <div
      ref={uiPosition}
      className="group/icon flex size-[32px] items-center justify-center bg-white shadow-[0_1px_2px_#0000004d] dark:bg-zinc-800 dark:ring-white/10"
    >
      <Button
        variant="icon"
        className="group/button group/icon-hover:bg-[#f3f3f3] size-full stroke-[4] p-0 transition-colors duration-150 ease-in-out will-change-transform focus:min-h-0 focus:outline-offset-[-2px]"
        aria-label="Default extent"
        onPress={() => {
          goHome();
          actions?.forEach((action) => action());
        }}
      >
        <HomeIcon
          className="group-enabled/button:[#6e6e6e] group-disabled/button:[#cfcfcf] size-5 stroke-[1.5] transition-colors duration-150 ease-in-out will-change-transform group-enabled/button:group-hover/button:text-[#151515] group-disabled/button:opacity-50 dark:text-[#9e9e9e] dark:group-enabled/button:group-hover/button:text-white"
          aria-hidden
        />
        <span className="sr-only">Go Home</span>
      </Button>
    </div>
  );
};

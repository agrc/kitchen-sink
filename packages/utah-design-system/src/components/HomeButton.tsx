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
      className="group flex size-[32px] items-center justify-center bg-white shadow-[0_1px_2px_#0000004d]"
    >
      <Button
        variant="icon"
        className="size-full stroke-[4] p-0 transition-colors duration-150 ease-in-out will-change-transform group-hover:bg-[#f3f3f3] focus:min-h-0 focus:outline-offset-[-2px]"
        aria-label="Default extent"
        onPress={() => {
          goHome();
          actions?.forEach((action) => action());
        }}
      >
        <HomeIcon
          className="size-5 stroke-[1.5] text-[#6e6e6e] transition-colors duration-150 ease-in-out will-change-transform group-hover:text-[#151515]"
          aria-hidden
        />
        <span className="sr-only">Go Home</span>
      </Button>
    </div>
  );
};

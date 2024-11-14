import '@arcgis/core/interfaces.d.ts';
import { useDefaultExtent, useViewUiPosition } from '@ugrc/utilities/hooks';
import { HomeIcon } from 'lucide-react';
import { Button } from './Button';

export const HomeButton = ({
  view,
  position,
  initialExtent,
}: {
  view: __esri.MapView;
  position: __esri.UIAddComponent['position'];
  initialExtent?: __esri.Extent;
}) => {
  const goHome = useDefaultExtent(view, initialExtent);
  const uiPosition = useViewUiPosition(view, position ?? 'top-left');

  return (
    <div
      ref={uiPosition}
      className="group flex items-center justify-center size-[32px] bg-white shadow-[0_1px_2px_#0000004d]"
    >
      <Button
        variant="icon"
        className="focus:min-h-0 focus:outline-offset-[-2px] will-change-transform transition-colors duration-150 ease-in-out p-0 size-full stroke-[4] group-hover:bg-[#f3f3f3]"
        aria-label="Default extent"
        onPress={() => goHome()}
      >
        <HomeIcon
          className="will-change-transform transition-colors duration-150 ease-in-out size-5 text-[#6e6e6e] group-hover:text-[#151515] stroke-[1.5]"
          aria-hidden
        />
        <span className="sr-only">Go Home</span>
      </Button>
    </div>
  );
};

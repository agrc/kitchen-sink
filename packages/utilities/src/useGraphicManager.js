import { useCallback, useEffect, useRef, useState } from 'react';

export function useGraphicManager(mapView) {
  const [graphic, setGraphic] = useState();
  const previousGraphic = useRef();

  const removeGraphics = useCallback(
    (graphics) => {
      if (!graphics) {
        console.log('no graphics to remove');
        return;
      }

      if (Array.isArray(graphics)) {
        console.log('removeMany', graphics);
        graphics.forEach((x) => mapView.current.graphics.remove(x));
      } else {
        console.log('remove', graphics);
        mapView.current.graphics.remove(graphics);
      }
    },
    [mapView]
  );

  useEffect(() => {
    console.log('useGraphicManagerHook', graphic);

    removeGraphics(previousGraphic.current);

    previousGraphic.current = graphic;

    if (Array.isArray(graphic)) {
      return mapView.current?.when(() => {
        console.log('addMany', graphic);
        mapView.current.graphics.addMany(graphic);
      });
    }

    mapView.current?.when(() => {
      console.log('add', graphic);
      mapView.current.graphics.add(graphic);
    });
  }, [graphic, removeGraphics, mapView]);

  return { graphic, setGraphic };
}

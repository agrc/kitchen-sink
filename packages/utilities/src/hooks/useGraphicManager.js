import { useCallback, useEffect, useRef, useState } from 'react';

export default function useGraphicManager(mapView) {
  const [graphic, setGraphic] = useState();
  const previousGraphic = useRef();

  const removeGraphics = useCallback(
    (graphics) => {
      if (!graphics) {
        return;
      }

      if (Array.isArray(graphics)) {
        graphics.forEach((x) => mapView.graphics.remove(x));
      } else {
        mapView.graphics.remove(graphics);
      }
    },
    [mapView]
  );

  useEffect(() => {
    removeGraphics(previousGraphic.current);
    previousGraphic.current = graphic;

    if (Array.isArray(graphic)) {
      mapView?.when(() => {
        mapView.graphics.addMany(graphic);
      });

      return;
    }

    mapView?.when(() => {
      mapView.graphics.add(graphic);
    });
  }, [graphic, removeGraphics, mapView]);

  return { graphic, setGraphic };
}

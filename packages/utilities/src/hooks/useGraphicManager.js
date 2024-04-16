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
        graphics.forEach((x) => mapView.current.graphics.remove(x));
      } else {
        mapView.current.graphics.remove(graphics);
      }
    },
    [mapView],
  );

  useEffect(() => {
    removeGraphics(previousGraphic.current);
    previousGraphic.current = graphic;

    if (Array.isArray(graphic)) {
      mapView.current?.when(() => {
        mapView.current.graphics.addMany(graphic);
      });

      return;
    }

    mapView.current?.when(() => {
      mapView.current.graphics.add(graphic);
    });
  }, [graphic, removeGraphics, mapView]);

  return { graphic, setGraphic };
}

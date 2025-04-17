import { whenOnce } from '@arcgis/core/core/reactiveUtils';
import Graphic from '@arcgis/core/Graphic.js';
import MapView from '@arcgis/core/views/MapView.js';
import { useCallback, useEffect, useRef, useState } from 'react';

export type GraphicOptions = Graphic | Graphic[] | null;

export type useGraphicManagerResult = {
  graphic: GraphicOptions;
  setGraphic: (graphic: GraphicOptions) => void;
};

const useGraphicManager = (
  mapView: MapView | null,
): useGraphicManagerResult => {
  const [graphic, setGraphic] = useState<GraphicOptions>(null);
  const previousGraphic = useRef<GraphicOptions>(null);

  const removeGraphics = useCallback(
    (graphics: Graphic | Graphic[] | undefined) => {
      if (!graphics || !mapView) {
        return;
      }

      if (Array.isArray(graphics)) {
        graphics.forEach((x) => mapView.graphics.remove(x));
      } else {
        const count = mapView.graphics.length;
        mapView.graphics.remove(graphics);

        if (count === mapView.graphics.length) {
          console.warn(
            'Graphic not found in map view. Is the graphic auto-casted?',
          );
        }
      }
    },
    [mapView],
  );

  useEffect(() => {
    if (!mapView) {
      return;
    }

    if (previousGraphic.current) {
      removeGraphics(previousGraphic.current);
    }

    previousGraphic.current = graphic;

    if (Array.isArray(graphic)) {
      if (
        graphic &&
        graphic[0] &&
        graphic[0].declaredClass !== 'esri.Graphic'
      ) {
        console.warn(
          'graphic is not an esri.Graphic and will not be removed from the map. Remove any auto-casting of the graphic.',
        );
      }

      whenOnce(() => mapView.ready).then(() =>
        mapView.graphics.addMany(graphic),
      );
    } else {
      if (graphic && graphic.declaredClass !== 'esri.Graphic') {
        console.warn(
          'graphic is not an esri.Graphic and will not be removed from the map. Remove any auto-casting of the graphic.',
        );
      }

      whenOnce(() => mapView.ready).then(() => {
        if (graphic) {
          mapView.graphics.add(graphic);
        }
      });
    }
  }, [graphic, removeGraphics, mapView]);

  return { graphic, setGraphic };
};

export default useGraphicManager;

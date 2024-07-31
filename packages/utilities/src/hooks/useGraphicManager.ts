import Graphic from '@arcgis/core/Graphic';
import MapView from '@arcgis/core/views/MapView';
import { useCallback, useEffect, useRef, useState } from 'react';

export type useGraphicManagerResult = {
  graphic: Graphic | Graphic[] | undefined;
  setGraphic: (graphic: Graphic | Graphic[] | undefined) => void;
};

const useGraphicManager = (mapView: MapView): useGraphicManagerResult => {
  const [graphic, setGraphic] = useState<Graphic | Graphic[]>();
  const previousGraphic = useRef<Graphic | Graphic[]>();

  const removeGraphics = useCallback(
    (graphics: Graphic | Graphic[] | undefined) => {
      if (!graphics) {
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
    if (previousGraphic.current) {
      removeGraphics(previousGraphic.current);
    }

    previousGraphic.current = graphic;

    if (Array.isArray(graphic)) {
      if (graphic && graphic[0].declaredClass !== 'esri.Graphic') {
        console.warn(
          'graphic is not an esri.Graphic and will not be removed from the map. Remove any auto-casting of the graphic.',
        );
      }

      mapView?.when(() => {
        mapView.graphics.addMany(graphic);
      });
    } else {
      if (graphic && graphic.declaredClass !== 'esri.Graphic') {
        console.warn(
          'graphic is not an esri.Graphic and will not be removed from the map. Remove any auto-casting of the graphic.',
        );
      }

      mapView?.when(() => {
        if (graphic) {
          mapView.graphics.add(graphic);
        }
      });
    }
  }, [graphic, removeGraphics, mapView]);

  return { graphic, setGraphic };
};

export default useGraphicManager;

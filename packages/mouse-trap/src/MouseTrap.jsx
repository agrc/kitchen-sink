import SpatialReference from '@arcgis/core/geometry/SpatialReference.js';
import * as projectOperator from '@arcgis/core/geometry/operators/projectOperator.js';
import { throttle } from 'lodash-es';
import { useEffect, useState } from 'react';

const projectPoint = (
  viewPoint,
  options = { projectToWkid: 4326, decimals: 3 },
) => {
  const projected = projectOperator.execute(
    viewPoint,
    new SpatialReference({ wkid: options.projectToWkid }),
  );

  if (!projected) {
    console.log(
      'app/mouse-trap::Projected point is null. Possibly outside of spatial reference area.',
    );

    return;
  }

  return {
    x: projected.x.toFixed(options.decimals),
    y: projected.y.toFixed(options.decimals),
  };
};

const defaultOptions = { decimals: 3, wait: 90, projectToWkid: 4326 };

const MouseTrap = ({ render, mapView, options = defaultOptions }) => {
  const [location, setLocation] = useState({ x: null, y: null });

  useEffect(() => {
    if (!mapView) {
      console.error(
        'app/mouse-trap::A MapView is required for this component.',
      );

      return;
    }

    let handle = null;

    const registerPointerMove = async () => {
      if (!projectOperator.isLoaded()) {
        await projectOperator.load();
      }

      handle = mapView.on(
        'pointer-move',
        throttle(
          (evt) => setLocation(projectPoint(mapView.toMap(evt), options)),
          options.wait,
        ),
      );
    };

    registerPointerMove();

    return () => {
      if (handle) {
        handle.remove();
      }
    };
  }, [mapView, options]);

  return render(location);
};

export default MouseTrap;

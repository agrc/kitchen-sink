import { useEffect, useState } from 'react';
import debounce from 'lodash.throttle';
import { project, isSupported, load } from '@arcgis/core/geometry/projection';

const projectPoint = (viewPoint, options = { projectToWkid: 4326, decimals: 3 }) => {
  const projected = project(viewPoint, { wkid: options.projectToWkid });

  if (!projected) {
    console.log('app/mouse-trap::Projected point is null. Possibly outside of spatial reference area.');

    return;
  }

  return { x: projected.x.toFixed(options.decimals), y: projected.y.toFixed(options.decimals) };
};

const defaultOptions = { decimals: 3, wait: 90, projectToWkid: 4326 };

const MouseTrap = ({render, mapView, options = defaultOptions}) => {
  const [location, setLocation] = useState({ x: null, y: null });

  useEffect(() => {
    if (!mapView) {
      console.error('app/mouse-trap::A MapView is required for this component.');

      return;
    }

    if (!isSupported()) {
      console.error('app/mouse-trap::Geometry projection is not supported.');

      return;
    }
    let handle = null;

    load().then(() => {
      handle = mapView.on('pointer-move', throttle((evt) => setLocation(projectPoint(mapView.toMap(evt), options)),
        options.wait));
    });

    return () => {
      if (handle) {
        handle.remove();
      }
    };
  }, [mapView, options]);

  return render(location);
};

export default MouseTrap;

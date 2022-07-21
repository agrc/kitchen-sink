import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
function useGraphicManager(mapView) {
  const [graphic, setGraphic] = useState();
  const previousGraphic = useRef();
  const removeGraphics = useCallback((graphics) => {
    if (!graphics) {
      return;
    }
    if (Array.isArray(graphics)) {
      graphics.forEach((x) => mapView.current.graphics.remove(x));
    } else {
      mapView.current.graphics.remove(graphics);
    }
  }, [mapView]);
  useEffect(() => {
    var _a, _b;
    removeGraphics(previousGraphic.current);
    previousGraphic.current = graphic;
    if (Array.isArray(graphic)) {
      (_a = mapView.current) == null ? void 0 : _a.when(() => {
        mapView.current.graphics.addMany(graphic);
      });
      return;
    }
    (_b = mapView.current) == null ? void 0 : _b.when(() => {
      mapView.current.graphics.add(graphic);
    });
  }, [graphic, removeGraphics, mapView]);
  return { graphic, setGraphic };
}
function useInterval(func, delay) {
  const handle = useRef(null);
  useEffect(() => {
    handle.current = window.setInterval(func, delay);
    return () => {
      window.clearInterval(handle.current);
    };
  }, [func, delay]);
}
function useMapReady(view) {
  const [ready, setReady] = useState(false);
  const [callbackRegistered, setCallbackRegistered] = useState(false);
  if (view && !callbackRegistered) {
    view.when(() => setReady(true));
    setCallbackRegistered(true);
  }
  return ready;
}
function useOpenClosed(initial = false) {
  const [state, setState] = useState(initial);
  const handlers = useMemo(() => ({
    open: () => {
      setState(true);
    },
    close: () => {
      setState(false);
    },
    toggle: () => {
      setState((s) => s ? false : true);
    }
  }), []);
  return [state, handlers];
}
function useViewLoading(view) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const init = () => {
      view == null ? void 0 : view.watch("updating", (updating) => setIsLoading(updating));
    };
    if (view) {
      init();
    }
  }, [view]);
  return isLoading;
}
function useViewPointZooming(mapView) {
  const [viewPoint, setViewPoint] = useState(null);
  useEffect(() => {
    var _a;
    if (viewPoint) {
      (_a = mapView.current) == null ? void 0 : _a.when(() => mapView.current.goTo(viewPoint).catch());
    }
  }, [viewPoint, mapView]);
  return { viewPoint, setViewPoint };
}
function useViewUiPosition(view, position) {
  const me = useRef();
  useEffect(() => {
    view == null ? void 0 : view.ui.add(me.current, position);
  }, [position, view]);
  return me;
}
function useWebMap(div, id) {
  const webMap = useRef(null);
  const mapView = useRef(null);
  useEffect(() => {
    if (div.current) {
      webMap.current = new WebMap({
        portalItem: {
          id
        }
      });
      mapView.current = new MapView({
        container: div.current,
        map: webMap.current
      });
    }
    return () => {
      mapView.current.destroy();
      webMap.current.destroy();
    };
  }, [div, id]);
  return { webMap, mapView };
}
export { useGraphicManager, useInterval, useMapReady, useOpenClosed, useViewLoading, useViewPointZooming, useViewUiPosition, useWebMap };
//# sourceMappingURL=index.esm2.js.map

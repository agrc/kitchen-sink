import PropTypes from 'prop-types';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useViewUiPosition } from '@ugrc/utilities/hooks';

const goHome = (view, extent) => {
  return view.goTo(extent);
};

export default function DefaultExtent({ view, position, extent }) {
  const me = useViewUiPosition(view, position);

  return (
    <button
      ref={me}
      className="esri-home esri-widget--button esri-widget"
      aria-label="Default map view"
      title="Default map view"
      onClick={() => goHome(view, extent)}
    >
      <FontAwesomeIcon
        icon={faGlobeAmericas}
        className="esri-icon esri-icon-home"
      />
    </button>
  );
}

DefaultExtent.propTypes = {
  view: PropTypes.object.isRequired,
  position: PropTypes.oneOf([
    'bottom-leading',
    'bottom-left',
    'bottom-right',
    'bottom-trailing',
    'top-leading',
    'top-left',
    'top-right',
    'top-trailing',
    'manual',
  ]).isRequired,
  extent: PropTypes.object.isRequired,
};

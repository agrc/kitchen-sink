import { useState } from 'react';
import Sherlock, { LocatorSuggestProvider } from './';
import './Sherlock.css';

export default {
  component: Sherlock,
};

const Wrapper = () => {
  const url =
    'https://masquerade.ugrc.utah.gov/arcgis/rest/services/UtahLocator/GeocodeServer';
  const [matches, setMatches] = useState();

  return (
    <>
      <Sherlock
        provider={new LocatorSuggestProvider(url, 3857)}
        onSherlockMatch={(matches) => setMatches(matches)}
      />
      <pre>{JSON.stringify(matches, null, '  ')}</pre>
    </>
  );
};

export const LocatorSuggestion = (modules) => <Wrapper modules={modules} />;

import * as React from 'react';
import { Sherlock, LocatorSuggestProvider } from './index';
import { ModulesHelper } from '../../../test-helpers/storyHelpers';

export default {
  title: 'Sherlock',
  decorators: [ModulesHelper],
};

const Wrapper = ({ modules }) => {
  const url =
    'https://masquerade-kkktr623oa-uc.a.run.app/arcgis/rest/services/UtahLocator/GeocodeServer';
  const [matches, setMatches] = React.useState();

  return (
    <>
      <Sherlock
        provider={new LocatorSuggestProvider(url, 3857)}
        onSherlockMatch={(matches) => setMatches(matches)}
        modules={modules}
      />
      <pre>{JSON.stringify(matches, null, '  ')}</pre>
    </>
  );
};

export const LocatorSuggestion = (modules) => <Wrapper modules={modules} />;

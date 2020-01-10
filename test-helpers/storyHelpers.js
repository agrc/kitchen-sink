import React, { useState, useEffect } from 'react';
import getModules from './esriModules';


const Helper = ({ story }) => {
  const [modules, setModules] = useState();

  useEffect(() => {
    getModules().then((modules) => {
      setModules(modules);
    });
  }, []);

  return (<>{modules && story(modules)}</>);
};

export default (story) => <Helper story={story} />;

import React, { useState, useEffect } from 'react';
import getModules from './esriModules';


export default (story) => {
  const [modules, setModules] = useState();

  useEffect(() => {
    getModules().then((modules) => {
      setModules(modules);
    });
  }, []);

  return (<>{modules && story(modules)}</>);
};

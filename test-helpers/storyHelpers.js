import React, { useState, useEffect } from 'react';
import getModules from './esriModules';


const ModulesHelperComponent = ({ story }) => {
  const [modules, setModules] = useState();

  useEffect(() => {
    getModules().then((modules) => {
      setModules(modules);
    });
  }, []);

  return (<>{modules && story({ args: modules })}</>);
};

export const ModulesHelper = (story) => <ModulesHelperComponent story={story} />;

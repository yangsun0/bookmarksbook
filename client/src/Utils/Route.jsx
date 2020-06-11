import React from "react";
import { useRouteMatch } from "react-router-dom";

export function withRoute(WrappedComponent, path) {
  return (props) => {
    const match = useRouteMatch({ path: path, exact: true });
    if (!match) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

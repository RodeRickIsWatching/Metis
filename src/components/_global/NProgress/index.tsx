import * as React from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

export default function NProgress() {
  React.useEffect(() => {
    nprogress.start();
    return () => {
      nprogress.done();
    };
  }, []);

  return <React.Fragment />;
}

import { Fragment, PropsWithChildren } from 'react';
import MainNavigation from './MainNavigation';

// See React 18 types: https://stackoverflow.com/a/71800185/8430632
const Layout: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;

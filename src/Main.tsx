import SideNav from './components/sidenav/SideNav';
import BasicPage from './pages/BasicPage';
import { useContext } from 'react';
import { DataContext } from './Context';
import { getTabDetails } from './utility/data';
import { DataRes } from './types';
import { Route, Routes } from 'react-router-dom';

const Main = (): JSX.Element => {
  const data: DataRes = useContext(DataContext);
  const tabsDetails = getTabDetails(data!);
  if (!tabsDetails) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <SideNav tabDetails={tabsDetails!} />
      <Routes>
        {tabsDetails && tabsDetails[0] && (
          <Route
            path={'/'}
            element={
              <BasicPage
                title={tabsDetails[0].title}
                plugins={tabsDetails[0].AllPlugins}
                tabId={tabsDetails[0].tabId}
              />
            }
          />
        )}

        {tabsDetails!.map((tab) => (
          <Route
            key={tab.title}
            path={tab.title}
            element={
              <BasicPage
                title={tab.title}
                plugins={tab.AllPlugins}
                tabId={tab.tabId}
              />
            }
          />
        ))}
      </Routes>
    </div>
  );
};
export default Main;

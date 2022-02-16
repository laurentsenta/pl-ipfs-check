import { CheckCID } from "components/CheckCID";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

const CheckCIDPage: React.FC = () => {
  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <CheckCID />
      </div>
    </div>
  );
};

const PageContainer: React.FC = ({ children }) => {
  return (
    <div className="main">
      <Outlet />
    </div>
  );
};

const PageHeader: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          IPFS Check
        </a>
        <a
          href="#"
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </div>
  );
};

const NotFound: React.FC = () => {
  return <div>Not Found</div>;
};

function App() {
  return (
    <div className="App">
      <PageHeader />
      <Routes>
        <Route path="/" element={<PageContainer />}>
          <Route index element={<CheckCIDPage />} />
          {/* <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

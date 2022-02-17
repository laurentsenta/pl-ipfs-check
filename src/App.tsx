import { DiagnosePage } from "pages/DiagnosePage";
import { IPFSCheckPage } from "pages/IPFSCheckPage";
import { PageContainer } from "pages/PageContainer";
import { ToolboxPage } from "pages/ToolboxPage";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";

const PageHeader: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          PL Diagnose
        </Link>
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
      <div className="navbar-start">
        <Link className="navbar-item" to="/">
          IPFS Check
        </Link>
        <Link className="navbar-item" to="/diagnose">
          Diagnose
        </Link>
        <Link className="navbar-item" to="/toolbox">
          Toolbox
        </Link>
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
          <Route index element={<IPFSCheckPage />} />
          <Route path="/toolbox" element={<ToolboxPage />} />
          <Route path="/diagnose" element={<DiagnosePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

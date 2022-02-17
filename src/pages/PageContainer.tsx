import { Outlet } from "react-router-dom";

export const PageContainer: React.FC = ({ children }) => {
  return (
    <>
      <div className="main py-2">
        <div className="columns is-centered">
          <div className="column is-10">
            <Outlet />
          </div>
        </div>
      </div>
      <footer className="footer mt-4">
        <div className="content has-text-centered">
          <p>
            <strong>PL Diagnose</strong>
            <br />
            <a href="https://github.com/laurentsenta/pl-ipfs-check">Github</a>.
          </p>
        </div>
      </footer>
    </>
  );
};

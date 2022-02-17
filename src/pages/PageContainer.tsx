import { Outlet } from "react-router-dom";

export const PageContainer: React.FC = ({ children }) => {
  return (
    <div className="main py-2">
      <div className="columns is-centered">
        <div className="column is-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

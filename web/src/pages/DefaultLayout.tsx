import { Outlet } from "react-router";
import Snb from "../components/Snb";

export default function DefaultLayout() {
  return (
    <div className="DefaultLayout">
      <Snb />
      <Outlet />
    </div>
  );
}

import { Outlet } from "react-router-dom";

export function PageLayout() {
  return (
    <section>
      <Outlet />
    </section>
  );
}

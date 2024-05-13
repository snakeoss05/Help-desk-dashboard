import { Sidebar } from "../dashboard/components/Sidebar";

export default function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

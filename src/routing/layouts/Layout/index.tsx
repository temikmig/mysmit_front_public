/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from "react-router-dom";
import { Header } from "../../../components/Layout/Header";
import { Sidebar } from "../../../components/Layout/Sidebar";
import styles from "./Layout.module.css";

interface LayoutProps {
  withSuspense?: boolean;
}

export const Layout = ({ withSuspense = false }: LayoutProps) => {
  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.layoutBox}>
          <Header />
          <main className={styles.main}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

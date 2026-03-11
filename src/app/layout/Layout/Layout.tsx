/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from "react-router-dom";

import { Header } from "@widgets/header";
import { Sidebar } from "@widgets/sidebar";

import styles from "./Layout.module.css";

interface LayoutProps {
  withSuspense?: boolean;
}

export const Layout = ({ withSuspense = false }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className={styles.layoutBox}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

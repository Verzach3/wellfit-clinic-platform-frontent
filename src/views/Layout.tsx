import {AppShell} from "@mantine/core"
import {NavbarSegmented} from "../components/Layout/NavBarSegmented"
import {Outlet} from "react-router-dom";

function Layout() {


  return (
    <AppShell
      navbar={{breakpoint: "sm", width: 300}}
    >
      <AppShell.Navbar>
        <NavbarSegmented/>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  )
}

export default Layout;


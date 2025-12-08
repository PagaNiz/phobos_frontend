import { useThemeContext } from "@/provider/ThemeContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    link: "/",
    icon: <DashboardIcon />,
  },
  {
    name: "Estoque",
    link: "/estoque",
    icon: <InventoryIcon />,
  },
  {
    name: "Pedidos",
    link: "/pedidos",
    icon: <ShoppingCartIcon />,
  },
  {
    name: "Fornecedores",
    link: "/fornecedores",
    icon: <LocalShippingIcon />,
  },
  {
    name: "Clientes",
    link: "/clients",
    icon: <PersonIcon />,
  },
];

export const SideMenu = () => {
  const [open, setOpen] = useState(false);
  const { mode } = useThemeContext();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List
        sx={{
          backgroundColor: mode === "light" ? "background.paper" : "#1e1e1e",
          height: "100vh",
        }}
      >
        {menuItems.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            sx={{ color: mode === "light" ? "text.primary" : "white" }}
          >
            <Link href={item.link}>
              <ListItemButton>
                <ListItemIcon
                  sx={{ color: mode === "light" ? "text.primary" : "white" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
        <Divider />
      </List>
    </Box>
  );

  return (
    <div style={{ padding: "0" }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

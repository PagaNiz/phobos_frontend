import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

import { useAuth } from "@/provider/auth";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import * as React from "react";
import { AvatarMenu } from "./Avatar/AvatarMenu";
import { NotificationBell } from "./Notification/NotificationBell";
import { SideMenu } from "./SideMenu/SideMenu";
import style from "./styles/MenuAppBar.module.scss";

import { useThemeContext } from "@/provider/ThemeContext";

type Props = {
  titlePage: string;
};

const MenuAppBar = ({ titlePage }: Props) => {
  const { signOut } = useAuth();
  const { mode } = useThemeContext();
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setAuth(event.target.checked);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: mode === "light" ? "primary.main" : "#1e1e1e",
          backgroundImage: "none",
        }}
      >
        <Toolbar>
          <SideMenu />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {titlePage}
          </Typography>
          <div style={{ display: "flex", alignItems: "center", gap: "5rem" }}>
            <NotificationBell />
            <FormGroup>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FormControlLabel
                  control={
                    <Switch
                      className={style.switch}
                      onChange={handleChange}
                      aria-label="login switch"
                    />
                  }
                  label=""
                />
                <AvatarMenu logout={signOut} />
              </div>
            </FormGroup>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuAppBar;

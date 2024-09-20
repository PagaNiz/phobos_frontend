import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { AvatarMenu, LoginButton } from "./Avatar/AvatarMenu";
import style from "./styles/MenuAppBar.module.scss";
import { SideMenu } from "./SideMenu/SideMenu";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  titlePage: string;
};

const MenuAppBar = ({ titlePage }: Props) => {
  const router = useRouter();

  const [auth, setAuth] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <SideMenu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {titlePage}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  className={style.switch}
                  checked={auth}
                  onChange={handleChange}
                  aria-label="login switch"
                />
              }
              label={
                <AvatarMenu
                  logout={() => {
                    setAuth(false);
                    router.push("/login");
                  }}
                />
              }
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuAppBar;

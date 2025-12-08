import { useThemeContext } from "@/provider/ThemeContext";
import { Avatar, FormControlLabel, IconButton, Switch } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import BackgroundLetterAvatars from "./Avatar";

type Props = {
  logout?: () => void;
  login?: () => void;
};

export const LoginButton = ({ login }: Props) => {
  return <Avatar src="/broken-image.jpg" onClick={login} />;
};

export const AvatarMenu = ({ logout }: Props) => {
  const { toggleTheme, mode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
        style={{ padding: "0" }}
      >
        <BackgroundLetterAvatars />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <FormControlLabel
            control={
              <Switch checked={mode === "dark"} onChange={toggleTheme} />
            }
            label={mode === "dark" ? "Dark Mode" : "Light Mode"}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>Perfil</MenuItem>
        <MenuItem onClick={logout}>Sair</MenuItem>
      </Menu>
    </div>
  );
};

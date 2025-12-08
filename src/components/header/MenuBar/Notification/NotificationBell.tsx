import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Tooltip } from "@mui/material";
import styles from "./styles/styles.module.scss";

export const NotificationBell = () => {
  return (
    <Tooltip title="Notificações">
      <Badge
        badgeContent={4}
        color="primary"
        sx={{
          "& .MuiBadge-badge": (theme) =>
            theme.palette.mode === "light"
              ? {
                  backgroundColor: "black",
                  color: "white",
                }
              : {},
        }}
      >
        <button className={styles.button}>
          <NotificationsIcon className={styles.icon} />
        </button>
      </Badge>
    </Tooltip>
  );
};

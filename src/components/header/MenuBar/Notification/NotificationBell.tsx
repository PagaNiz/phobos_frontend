import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, Tooltip } from "@mui/material";
import styles from "./styles/styles.module.scss";
import { useState } from "react";

export const NotificationBell = () => {
  return (
    <Tooltip title="Notificações">
      <Badge badgeContent={4} color="primary">
        <button className={styles.button}>
          <NotificationsIcon className={styles.icon} />
        </button>
      </Badge>
    </Tooltip>
  );
};

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import style from "./styles.module.scss";
import { Typography } from "@mui/material";

type Props = {
  opacity: string;
};

export const LoadingCircle = ({ opacity }: Props) => {
  return (
    <Box className={style.loadingContainer} sx={{ opacity: `${opacity}` }}>
      <CircularProgress className={style.loadingCircle} />
      <Typography className={style.typographyLoading}>
        Carregando Aguarde...
      </Typography>
    </Box>
  );
};

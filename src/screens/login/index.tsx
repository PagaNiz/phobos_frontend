import api from "@/services/api";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { object, string } from "yup";
import { InputLogin } from "./InputLogin";
import { LoginButton } from "./LoginButton";
import { LoginForm } from "./types";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export const LoginScreen = () => {
  const router = useRouter();
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };
  const validationSchema = object({
    email: string().email("Email inválido").required("Email é obrigatório!"),
    password: string().required("Senha é obrigatória!"),
  });

  const handleSubmit = async (values: LoginForm) => {
    try {
      const { data } = await api.post("/api/login", {
        email: values.email,
        password: values.password,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Card
          sx={{
            minWidth: 275,
            mx: "auto",
            maxWidth: "50%",
            padding: "50px",
          }}
        >
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <InputLogin />
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <LoginButton />
          </CardActions>
        </Card>
      </Formik>
    </div>
  );
};

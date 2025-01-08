import { useAuth } from "@/provider/auth";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Formik } from "formik";
import { object, string } from "yup";
import { InputLogin } from "./InputLogin";
import { LoginButton } from "./LoginButton";
import { LoginForm } from "./types";

export const LoginScreen = () => {
  const { signIn } = useAuth();

  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  const validationSchema = object({
    email: string().email("Email inválido").required("Email é obrigatório!"),
    password: string().required("Senha é obrigatória!"),
  });

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
        onSubmit={(values) => signIn(values)}
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

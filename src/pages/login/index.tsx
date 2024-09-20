import { Button } from "@mui/material";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Pagina de login</h1>
      <Button variant="outlined" onClick={() => router.push("/")}>
        Logar
      </Button>
    </div>
  );
};

export default Login;

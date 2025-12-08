import { useAuth } from "@/provider/auth";
import MenuAppBar from "./MenuBar/MenuApp";

const Header = () => {
  const { user } = useAuth();
  return user && <MenuAppBar titlePage="PHOBOS" />;
};

export default Header;

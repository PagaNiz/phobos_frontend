// import { DefaultRoutes } from "@/common/defaultRoutes";
import api from "@/services/api";
import { AxiosError, AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

import { openRoutes } from "@/config/openRoutes";
import { SetState } from "@/types/Utils";
import { User } from "@/types/User";

type OAuthResponse = {
  type: string;
  token: string;
  expires_at: string;
};

type SignIn = {
  email: string;
  password: string;
};

type InitialValue = {
  signIn(credentials: SignIn): Promise<void>;
  signOut(cleanLogin?: boolean): void;
  user: User | null;
  setUser: SetState<User | null>;
  isAuthenticated: boolean;
};

const AuthContext = createContext({} as InitialValue);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [logged] = useState(!!user);
  const isAuthenticated = !!user;

  const signOut = useCallback(
    (cleanLogin?: boolean) => {
      destroyCookie(null, "Phobos.token");
      destroyCookie(undefined, "Phobos.user");
      if (cleanLogin) {
        setUser(null);
        router.push("/login");
      } else {
        if (router.asPath.includes("redirectTo")) return;
        setUser(null);
        router.push(
          `${"/login"}${
            router.asPath !== "/"
              ? `?redirectTo=${router.asPath.replace("?redirectTo/", "")}`
              : ""
          } `
        );
      }
    },
    [router]
  );

  const getUser = useCallback(
    async (abortController?: AbortController) => {
      const params = {
        ...(abortController ? { signal: abortController.signal } : {}),
      };
      await api
        .get("/api/login", params)
        .then(async (res: AxiosResponse<User>) => {
          setUser({
            ...res.data,
          });
        })
        .catch((error) => {
          if (!abortController?.signal?.aborted) {
            signOut();
            if (error?.request?.status && error?.request?.status === 401)
              toast.warning("Você não está autorizado.");
            console.log("Provider.Auth.GetUser", error);
          }
        });
    },
    [signOut]
  );

  useEffect(() => {
    const abortController = new AbortController();
    if (!openRoutes.includes(router.pathname)) {
      getUser(abortController);
    }
    return () => abortController.abort();
  }, [getUser, router.pathname]);

  const signIn = useCallback(
    async ({ email, password }: SignIn) => {
      const shot = (code: string) => {
        toast.error(
          `Ops! Sistema temporariamente indisponível | Erro: ${code}`
        );
      };
      try {
        const successfullyLoggedIn = await api
          .post(`/api/login`, {
            email,
            password,
          })
          .then((res: AxiosResponse<OAuthResponse>) => {
            const { token } = res.data;
            setCookie(undefined, "Phobos.token", token, {
              maxAge: 60 * 60 * 24 * 10, // 10 Dias
              path: "/",
            });
            api.defaults.headers = {
              Authorization: `Bearer ${token}`,
            } as any;

            toast.success("Logado com sucesso!");
            const redirectTo = searchParams.get("redirectTo");
            router.push(redirectTo ? redirectTo : "/");

            return true;
          })
          .catch((error: AxiosError) => {
            if (error.response?.status === 500) {
              toast.error("Credenciais invalidas");
            } else {
              shot("2220581");
            }
            return false;
          });

        if (successfullyLoggedIn) {
          getUser();
        }
      } catch (err) {
        shot("2220582");
      }
    },
    [getUser, router, searchParams]
  );

  // Save into cookies
  useEffect(() => {
    setCookie(null, "Phobos.user", String(user?.id), {
      maxAge: 60 * 60 * 24 * 10, // 10 Dias
      path: "/",
    });
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      logged,
      setUser,
      isAuthenticated,
      signIn,
      signOut,
    }),
    [user, logged, isAuthenticated, signOut, signIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

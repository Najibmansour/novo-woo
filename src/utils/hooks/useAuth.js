import { useState } from "react";
import Cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const useAuth = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const signUp = async (userData) => {
    try {
      setError(null);
      const { username, password } = userData;
      const data = await axios.post("/api/signup", userData).then((data) => {
        return data;
      });
      // console.log("OK:", data);

      login({ username, password });
    } catch (error) {
      if (error) {
        const err = error.response.data;
        // console.log(error);
        if (err["code"]) {
          switch (err["code"]) {
            case "registration-error-email-exists":
              setError(
                <>
                  An account is already registered with your email address.{" "}
                  <Link href="/login" className="underline">
                    Please Login
                  </Link>
                </>
              );
              break;

            case "registration-error-username-exists":
              setError(<p>This Username is already taken</p>);
              break;
          }
        }
      }
    }
  };

  const login = async (credentials) => {
    try {
      const data = await axios.post("/api/login", credentials).then((data) => {
        return data.data;
      });
      // console.log("OK:", data);
      // Your login logic here, for example, making an API call to authenticate the user
      // Assuming your API returns a JWT token upon successful authentication
      const token = data.token; // Replace with actual token from your API
      setToken(token);
      Cookies.set("woo_jwt", token, { expires: 7 }); // Store token in cookies
      router.push("/"); // Redirect user to dashboard or any other protected route
    } catch (error) {
      const err = error.response.data;
      // console.log("ERR:", err);
      switch (err["code"]) {
        case "[jwt_auth] incorrect_password":
          setError(
            <p>The password you entered for this username is incorrect</p>
          );
          break;

        case "[jwt_auth] too_many_retries":
          //we are removing this patter because backend return a string containing how much time is left for next retry
          const code = err.message.replace("<strong>ERROR</strong>: ", "");
          setError(code);
          break;
      }
    }
  };

  const logout = () => {
    setToken(null);
    Cookies.remove("woo_jwt"); // Remove token from cookies
    router.push("/login"); // Redirect user to login page after logout
  };

  return { token, error, signUp, login, logout };
};

export default useAuth;

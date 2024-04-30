"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import LOGOIMG from "../../../public/photos/logo.jpg";
import Image from "next/image";
import axios from "axios";
import { ErrorLabel } from "../ui/errorlabel";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cookies } from "next/headers";

export default function LogIn() {
  const [errMessage, setErr] = useState();
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();

  const onLogin = (e) => {
    console.log("login client event");
    console.table(e);
    if (e["bot_field"] == "") {
      delete e["cpassword"];
      delete e["bot_field"];
      axios
        .post("/api/login", e)
        .then((data) => {
          console.log(data.data);
          checkIfValidLogin(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const checkIfValidLogin = (data) => {
    if (data["code"]) {
      //checking for what error code go returned and displaying an error mesg corresponfing to it
      switch (data["code"]) {
        case "[jwt_auth] incorrect_password":
          setErr(
            <p>The password you entered for this username is incorrect</p>
          );
          break;

        case "[jwt_auth] too_many_retries":
          const code = data.message.replace("<strong>ERROR</strong>: ", "");
          setErr(<p>{code}</p>);
          break;
      }
    } else {
      console.log(data);
      cookies.set("woo_auth_token", data.token);
      redirect("/login");
    }
  };

  return (
    <Card className="w-[450px] mx-5">
      <CardHeader>
        <Image src={LOGOIMG} width={400} height={200} alt="logo-img" />

        <CardDescription className="text-center text-lg">
          Login to your Account
        </CardDescription>
        {errMessage && (
          <CardDescription className="bg-red-400 p-3 text-white tracking-wide">
            {errMessage}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <ErrorLabel>{errors.username?.message}</ErrorLabel>
              <Input
                id="username"
                placeholder="Enter your username"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is Required",
                  },
                })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <ErrorLabel>{errors.password?.message}</ErrorLabel>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              <div className="flex items-center justify-between">
                <Link
                  className="text-xs text-gray-500 hover:underline"
                  href="#"
                >
                  Forgot your password?
                </Link>
                <Link
                  className="text-xs text-gray-500 hover:underline"
                  href="/signup"
                >
                  Dont have an Account?
                </Link>
              </div>
            </div>
          </div>
          {/* bot  field to prevet from bots spamming */}
          <input
            name="bot-field"
            placeholder="do not fill this"
            type="hidden"
            {...register("bot_field")}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button asChild>
          <button onClick={handleSubmit(onLogin)}>Login</button>
        </Button>
      </CardFooter>
    </Card>
  );
}

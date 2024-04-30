"use client";
import { useForm } from "react-hook-form";
import {
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import LOGOIMG from "../../../public/photos/logo.jpg";
import Link from "next/link";
import { ErrorLabel } from "../ui/errorlabel";
import axios from "axios";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Signup() {
  const [errMessage, setErr] = useState();
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();

  const onSignup = (e) => {
    // console.log(e);
    if (e["bot_field"] == "") {
      delete e["cpassword"];
      delete e["bot_field"];
      axios.post("/api/signup", e).then((data) => {
        console.log(data.data);
        checkIfValidSignup(data.data);
      });
    }
  };

  const checkIfValidSignup = (data) => {
    if (data["code"]) {
      //checking for what error code go returned and displaying an error mesg corresponfing to it
      switch (data["code"]) {
        case "registration-error-email-exists":
          setErr(
            <p>
              An account is already registered with your email address.{" "}
              <Link href="/login" className="underline">
                Please Login
              </Link>
            </p>
          );
          break;

        case "registration-error-username-exists":
          setErr(<p>This Username is already taken</p>);
          break;
      }
    } else {
      redirect("/login");
    }
  };

  return (
    <Card className="w-[550px] min-w-[350px] mx-5">
      <CardHeader>
        <div className="w-full flex flex-row justify-center">
          <Image src={LOGOIMG} width={400} height={200} alt="logo-img"></Image>
        </div>
        <CardDescription className="text-center text-lg">
          Create your account
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
              <ErrorLabel>
                {errors.first_name?.message || errors.last_name?.message}
              </ErrorLabel>

              <div className="flex flex-row space-x-1.5">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    placeholder="John"
                    type="text"
                    {...register("first_name", {
                      required: {
                        value: true,
                        message: "First Name is required",
                      },
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>

                  <Input
                    id="last_name"
                    placeholder="Doe"
                    type="text"
                    {...register("last_name", {
                      required: {
                        value: true,
                        message: "Last Name is required",
                      },
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <ErrorLabel>{errors.username?.message}</ErrorLabel>
              <Input
                id="username"
                placeholder="johndoe1"
                type="text"
                {...register("username", {
                  required: { value: true, message: "Username is required" },
                  minLength: {
                    value: 6,
                    message: "Username should be bigger than 6 letters",
                  },
                })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <ErrorLabel>{errors.email?.message}</ErrorLabel>
              <Input
                id="email"
                placeholder="johndoe@gmail.com"
                type="email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}",
                    message: "Please enter a correct email",
                  },
                })}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Password</Label>
              <ErrorLabel>
                {errors.password?.message || errors.cpassword?.message}
              </ErrorLabel>
              <Input
                id="password"
                placeholder="Enter a password"
                type="password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: {
                    value: 8,
                    message: "Password should be bigger than 8 characters",
                  },
                })}
              />
              <Input
                id="cpassword"
                placeholder="Confirm password"
                type="password"
                {...register("cpassword", {
                  required: {
                    value: true,
                    message: "Passwords do not match",
                  },
                  validate: (val) =>
                    val === watch("password") || "The passwords do not match",
                })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/login"
                className="text-xs text-gray-500 hover:underline"
              >
                Already have an account?
              </Link>
            </div>
          </div>
          {/* bot  field to prevet from bots spamming */}
          <input
            name="bot_field"
            placeholder="do not fill this"
            type="hidden"
            {...register("bot_field")}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Link href="/">Cancel</Link>
        </Button>

        <Button asChild>
          <button onClick={handleSubmit(onSignup)}>Sign Up</button>
        </Button>
      </CardFooter>
    </Card>
  );
}

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
import { ErrorLabel } from "../ui/errorlabel";
import { useForm } from "react-hook-form";
import useAuth from "@/utils/hooks/useAuth";
import { LOGOIMG } from "../layout/logoImg";

export default function LogIn() {
  const { error, login } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onLogin = (e) => {
    // console.log("login client event");
    console.table(e);
    if (e["bot_field"] == "") {
      delete e["cpassword"];
      delete e["bot_field"];
      login(e);
    }
  };

  return (
    <Card className="mx-5 w-[450px]">
      <CardHeader>
        <div className="flex w-full flex-row justify-center">
          <LOGOIMG className="w-56 invert-[1]" />
        </div>
        <CardDescription className="text-center text-lg">
          Login to your Account
        </CardDescription>
        {error && (
          <CardDescription className="bg-red-400 p-3 tracking-wide text-white">
            {error}
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

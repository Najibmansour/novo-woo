"use client";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import Image from "next/image";

import LOGOIMG from "../../../public/photos/logo.jpg";
import Link from "next/link";
import { ErrorLabel } from "../ui/errorlabel";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSignUp = (e) => {
    console.log(e);
  };
  return (
    <Card className="w-[450px] mx-5 ">
      <CardHeader>
        <Image src={LOGOIMG} width={400} height={200} alt="logo-img" />
        <CardDescription className="text-center text-lg">
          Create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSignUp())}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row space-x-1.5">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  placeholder="John"
                  type="text"
                  {...register("first_name", { required: true })}
                />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  placeholder="Doe"
                  type="text"
                  {...register("last_name", { required: true })}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <ErrorLabel>{errors.email}</ErrorLabel>
              <Input
                id="email"
                placeholder="johndoe@gmail.com"
                type="text"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}",
                    message: "Please enter a correct email",
                  },
                })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <ErrorLabel>{errors.password}</ErrorLabel>
              <Input
                id="password"
                placeholder="Enter a password"
                type="password"
                {...register("password", { required: true })}
              />
              <Input
                id="cpassword"
                placeholder="Confirm password"
                type="password"
                {...register("cpassword", {
                  required: true,
                  validate: () => {
                    if (watch("password") != val) {
                      return "Passwords do no match";
                    }
                  },
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
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button>Sign Up</Button>
      </CardFooter>
    </Card>
  );
}

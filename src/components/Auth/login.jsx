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

export default function LogIn() {
  return (
    <Card className="w-[450px] mx-5">
      <CardHeader>
        <Image src={LOGOIMG} width={400} height={200} alt="logo-img" />

        <CardDescription className="text-center text-lg">
          Login to your Account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
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
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button>Login</Button>
      </CardFooter>
    </Card>
  );
}

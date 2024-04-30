import { client } from "@/utils/client/woocomerce-client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const data = await req.json();
  const { username, password, email, first_name, last_name } = data;
  let resConfig = { data: { msg: "default" }, status: 0 };
  const val = await client
    .post("customers", {
      username: username,
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    })
    .then((res) => {
      // console.log(res.data);
      resConfig.data = res.data;
      resConfig.status = res.data.status;
    })
    .catch((err) => {
      // console.log(err.response.data);
      resConfig.data = err.response.data;
      resConfig.status = err.response.data.status;
    });

  console.log(val);
  return NextResponse.json(resConfig.data, resConfig.status);
}

// return NextResponse.json({ message: "asd" }, { status: 201 });
// return NextResponse.json({ message: "error" }, { status: 500 });

export async function GET(req, res) {
  return NextResponse.json({ message: "hello novo" }, { status: 200 });
}

import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const data = await req.json();
  const { username, password } = data;
  let responseVal = null;
  let responseStatus = null;

  const val = await axios
    .post(
      `https://novyikoncept.ru/headless/index.php/wp-json/jwt-auth/v1/token?username=${username}&password=${password}`
      // "https://novyikoncept.ru/headless/index.php/wp-json/jwt-auth/v1/token?username=john.doe&password=johnpasas"
    )
    .then((ret) => {
      console.log(ret.data);
      responseVal = ret.data;
      responseStatus = ret.data.status;
    })
    .catch((err) => {
      console.log(err.response.data);
      responseVal = err.response.data;
      responseStatus = err.response.data.status;
    });

  return NextResponse.json(responseVal, { status: responseStatus });
}

// return NextResponse.json({ message: "asd" }, { status: 201 });
// return NextResponse.json({ message: "error" }, { status: 500 });

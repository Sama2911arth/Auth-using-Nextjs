import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { dbConfig } from "@/dbConfig.ts/dbConfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConfig();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: "User doesn't exists" }, { status: 400 });
        }
        console.log(user);
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,

        }, { status: 200 });

        response.cookies.set("token", token, { httpOnly: true });
        return response;


    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



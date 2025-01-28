import { NextResponse } from "next/server";
import User from "@/models/userModels";
import { dbConfig } from "@/dbConfig.ts/dbConfig";
import { NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

dbConfig();


export async function GET(request: NextRequest) {
    try {
        const userid = getDataFromToken(request);
        const user = await User.findOne({ _id: userid });
        return NextResponse.json({ user }, { status: 200 });
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


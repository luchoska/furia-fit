import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import cloudinary from "@/lib/cloudinary";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file specificed" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return new Promise<NextResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "furia-fit/products" },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        resolve(NextResponse.json({ error: "Failed to upload to cloudinary" }, { status: 500 }));
                    } else {
                        resolve(NextResponse.json({ url: result!.secure_url }, { status: 200 }));
                    }
                }
            );

            uploadStream.end(buffer);
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
    }
}

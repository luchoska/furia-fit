import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const data = await req.json();

        const product = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                imageUrl: data.imageUrl,
                isAvailable: data.isAvailable,
                sizes: data.sizes,
            }
        });

        return NextResponse.json({ success: true, product });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: "Error creando producto" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
    }
}

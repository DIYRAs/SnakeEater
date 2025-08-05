import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { name, imageUrl, previewUrl, category } = await req.json()
    const result = await pool.query(
        'UPDATE themes SET name = $1, image_url = $2, preview_url = $3, category = $4 WHERE id = $5 RETURNING *',
        [name, imageUrl, previewUrl, category, params.id]
    )
    return NextResponse.json(result.rows[0])
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await pool.query(
        'DELETE * FROM themes WHERE id = $1', [params.id]
    )
    return NextResponse.json({ success: true })
}
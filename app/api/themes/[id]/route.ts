import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop()
    const { name, imageUrl, previewUrl, category } = await req.json()
    const result = await pool.query(
        'UPDATE themes SET name = $1, image_url = $2, preview_url = $3, category = $4 WHERE id = $5 RETURNING *',
        [name, imageUrl, previewUrl, category, id]
    )
    return NextResponse.json(result.rows[0])
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop()
    await pool.query(
        'DELETE * FROM themes WHERE id = $1', [id]
    )
    return NextResponse.json({ success: true })
}
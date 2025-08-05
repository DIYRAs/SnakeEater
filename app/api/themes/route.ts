import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')

    if (category && category !== 'Semua Tema') {
        const result = await pool.query('SELECT * FROM themes WHERE category = $1 ORDER BY id ASC', [category])
        return NextResponse.json(result.rows)
    } else {
        const result = await pool.query('SELECT * FROM themes ORDER BY id ASC')
        return NextResponse.json(result.rows)
    }
}

export async function POST(req: NextRequest) {
    const { name, imageUrl, previewUrl, category } = await req.json()
    const result = await pool.query(
        'INSERT INTO themes (name, image_url, preview_url, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, imageUrl, previewUrl, category]
    )
    return NextResponse.json(result.rows[0])
}
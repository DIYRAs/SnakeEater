import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')?.trim()

    const isSearch = search && search.trim() !== ''
    const isCategory = category && category !== 'Semua Tema'

    try {
        let result

        if (isSearch && isCategory) {
            // Search + Category
            result = await pool.query(
                'SELECT * FROM themes WHERE name ILIKE $1 AND category = $2 ORDER BY id ASC',
                [`%${search}%`, category]
            )
        } else if (isSearch) {
            // Search only
            result = await pool.query(
                'SELECT * FROM themes WHERE name ILIKE $1 ORDER BY id ASC',
                [`%${search}%`]
            )
        } else if (isCategory) {
            // Category only
            result = await pool.query(
                'SELECT * FROM themes WHERE category = $1 ORDER BY id ASC',
                [category]
            )
        } else {
            // No filter
            result = await pool.query('SELECT * FROM themes ORDER BY id ASC')
        }

        return NextResponse.json(result.rows)
    } catch (err) {
        console.error('Error fetching themes:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}


export async function POST(req: NextRequest) {
    const { name, imageUrl, previewUrl, category } = await req.json()

    if (!name || !imageUrl || !previewUrl) {
        return NextResponse.json(
            { message: 'Isi dulu lah' },
            { status: 400 }
        )
    }

    const checkDuplicate = await pool.query(
        'SELECT * FROM themes WHERE LOWER(name) = LOWER($1) OR image_url = $2 OR preview_url = $3',
        [name, imageUrl, previewUrl]
    )
    const isDuplicate = checkDuplicate.rows.length > 0

    if (isDuplicate) {
        return NextResponse.json(
            { message: 'Sudah ada temanya' },
            { status: 409 }
        )
    }

    const result = await pool.query(
        'INSERT INTO themes (name, image_url, preview_url, category) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, imageUrl, previewUrl, category]
    )
    return NextResponse.json({
        data: result.rows[0],
        message: 'Mnatap'
    })
}
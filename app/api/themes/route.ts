// import { PrismaClient, Prisma } from "@prisma/client";
// import { NextResponse, NextRequest } from "next/server";

// const prisma = new PrismaClient()

// export async function GET(req: NextRequest) {
//     const { searchParams } = new URL(req.url)
//     const search = searchParams.get('search')?.trim()
//     const category = searchParams.get('category')

//     const isSearch = search && search.trim() !== ''
//     const isCategory = category && category !== 'Semua Tema'

//     const where: Prisma.ThemeWhereInput = {}
//     if (isSearch && isCategory) {
//         where.category = category
//         where.name = { contains: search }
//     }
//     else if (isSearch) {
//         where.name = { contains: search }
//     }
//     else if (isCategory) {
//         where.category = category
//     }

//     const themes = await prisma.theme.findMany({
//         where,
//         orderBy: { id: 'asc' }
//     })

//     return NextResponse.json(themes)
// }

// export async function POST(req: NextRequest) {
//     const { name, imageUrl, previewUrl, category } = await req.json()

//     if (!name.trim() || !imageUrl.trim() || !previewUrl.trim()) {
//         return NextResponse.json({
//             message: "isi dulu lah",
//             status: 400
//         })
//     }

//     const duplicate = await prisma.theme.findMany({
//         where: {
//             OR: [{
//                 name: name.trim(),
//                 imageUrl: imageUrl.trim(),
//                 previewUrl: previewUrl.trim()
//             }]
//         }
//     })

//     if (duplicate.length > 0) {
//         return NextResponse.json({
//             message: 'Sudah ada temanya',
//             status: 400
//         })
//     }

//     const theme = await prisma.theme.create({
//         data: { name, imageUrl, previewUrl, category }
//     })

//     return NextResponse.json({
//         data: theme,
//         message: 'Mantap'
//     })
// }

import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')?.trim()
    const search = searchParams.get('search')?.trim()
    const page = searchParams.get('page')?.trim() || 1
    const limit = 40
    const offset = (Number(page) - 1) * limit

    const isSearch = search && search.trim() !== ''
    const isCategory = category && category !== 'Semua Tema'

    try {
        let result
        let countResult

        if (isSearch && isCategory) {
            // Search + Category
            result = await pool.query(
                'SELECT * FROM themes WHERE name ILIKE $1 AND category = $2 ORDER BY id ASC LIMIT $3 OFFSET $4',
                [`%${search}%`, category, limit, offset]
            )
            countResult = await pool.query(
                'SELECT COUNT(*) FROM themes WHERE name ILIKE $1 AND category = $2',
                [`%${search}%`, category]
            )
        } else if (isSearch) {
            // Search only
            result = await pool.query(
                `SELECT * FROM themes WHERE name ILIKE $1 ORDER BY CASE category
                WHEN 'Wedding' THEN 1
                WHEN 'Kids & Birthday' THEN 2
                WHEN 'Aqiqah & Tasmiyah' THEN 3
                WHEN 'Tasyakuran Khitan' THEN 4
                WHEN 'Umum & Seminar' THEN 5
                WHEN 'Christmas & New Year' THEN 6
                WHEN 'Syukuran & Islami' THEN 7
                WHEN 'Party & Dinner' THEN 8
                WHEN 'School & Graduation' THEN 9
                ELSE 99
                END
                LIMIT $2 OFFSET $3`,
                [`%${search}%`, limit, offset]
            )
            countResult = await pool.query(
                'SELECT COUNT(*) FROM themes WHERE name ILIKE $1',
                [`%${search}%`]
            )
        } else if (isCategory) {
            // Category only
            result = await pool.query(
                'SELECT * FROM themes WHERE category = $1 ORDER BY category DESC LIMIT $2 OFFSET $3',
                [category, limit, offset]
            )
            countResult = await pool.query(
                'SELECT COUNT(*) FROM themes WHERE category = $1',
                [category]
            )
        } else {
            // No filter
            result = await pool.query(`SELECT * FROM themes ORDER BY CASE category 
                WHEN 'Wedding' THEN 1
                WHEN 'Kids & Birthday' THEN 2
                WHEN 'Aqiqah & Tasmiyah' THEN 3
                WHEN 'Tasyakuran Khitan' THEN 4
                WHEN 'Umum & Seminar' THEN 5
                WHEN 'Christmas & New Year' THEN 6
                WHEN 'Syukuran & Islami' THEN 7
                WHEN 'Party & Dinner' THEN 8
                WHEN 'School & Graduation' THEN 9
                ELSE 99
                END
                LIMIT $1 OFFSET $2`,
                [limit, offset]
            )
            countResult = await pool.query(
                'SELECT COUNT(*) FROM themes'
            )
        }

        const total = parseInt(countResult.rows[0].count);
        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            data: result.rows,
            pagination: {
                page, total, totalPages, limit
            }
        })
    } catch (err) {
        console.error('Error fetching themes:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}


export async function POST(req: NextRequest) {
    const { name, imageUrl, previewUrl, category } = await req.json()

    function slugify(text: string) {
        return text.toLowerCase().trim().replace(/\s+/g, '-');
    }
    const slug = slugify(name)

    if (!name || !imageUrl || !previewUrl) {
        return NextResponse.json(
            { message: 'Isi dulu lah' },
            { status: 400 }
        )
    }

    if (!imageUrl.includes(slug) || !previewUrl.includes(slug)) {
        return NextResponse.json(
            { message: 'Bebujur, nama tema lawan URL nya beda' },
            { status: 400 }
        );
    }

    // const pattern = new RegExp(`/${slug}/`);

    // if (!pattern.test(imageUrl) || !pattern.test(previewUrl)) {
    //     return NextResponse.json(
    //         { message: 'Bebujur njir, nama tema lawan image/ previewnya beda' },
    //         { status: 400 }
    //     );
    // }


    const checkDuplicate = await pool.query(
        'SELECT * FROM themes WHERE LOWER(name) = LOWER($1) OR imageUrl = $2 OR previewUrl = $3',
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
        'INSERT INTO themes (name, imageUrl, previewUrl, category) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, imageUrl, previewUrl, category]
    )
    return NextResponse.json({
        data: result.rows[0],
        message: 'Mantap'
    })
}
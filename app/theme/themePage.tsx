'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TrendingThemeCard } from "../UI/components/home/cards";
import { Theme } from "../data/trendingThemes";

export default function ThemePage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const abortControllerRef = useRef<AbortController | null>(null)

    const [isLoading, setIsLoading] = useState(false)
    const [themes, setThemes] = useState<Theme[]>([])
    const [page, setPage] = useState({ currentPage: 1, totalPages: 1 })

    // Extracted states from URL (derived)
    const currentCategory = searchParams.get('category') || 'Semua Tema'
    const currentSearch = searchParams.get('search') || ''
    const currentPage = parseInt(searchParams.get('page') || '1')
    // const currentPage = Math.max(
    //     1,
    //     Math.min(parseInt(searchParams.get("page") || "1"), page.totalPages)
    // )

    const themeFilter = [
        'Semua Tema',
        'Wedding', 'Kids & Birthday', 'Aqiqah & Tasmiyah',
        'Tasyakuran Khitan', 'Umum & Seminar', 'Christmas & New Year',
        'Syukuran & Islami', 'Party & Dinner', 'School & Graduation'
    ]

    // Helper: Update query params in URL
    const updateQueryParam = (key: string, value: string | number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(key, String(value))
        // Reset page ke 1 kalau search/category berubah
        if (key !== 'page') params.set('page', '1')
        router.replace(`?${params.toString()}`)
    }

    // Fetch themes (reusable for all use cases)
    const fetchThemes = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true)
        try {
            const query = `?${searchParams.toString()}`
            const res = await fetch(`/api/themes${query}`, {
                cache: 'no-store',
                signal
            })
            const data = await res.json()
            setThemes(data.data)
            setPage({
                currentPage: data.pagination.page,
                totalPages: data.pagination.totalPages
            })
        } catch (err) {
            if (!(err instanceof DOMException && err.name === 'AbortError')) {
                console.error('fetch error:', err)
            }
        } finally {
            setIsLoading(false)
        }
    }, [searchParams])

    // Fetch themes on param change
    useEffect(() => {
        fetchThemes()
    }, [searchParams, fetchThemes])

    // Search handler
    const searchThemes = (search: string) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        const controller = new AbortController()
        abortControllerRef.current = controller

        updateQueryParam('search', search)
        // fetchThemes will auto run via useEffect
    }

    // Pagination handler
    const paginationThemes = (page: number) => {
        updateQueryParam('page', page)
    }

    // Category filter handler
    const handleCategoryClick = (cat: string) => {
        updateQueryParam('category', cat)
    }

    // Pagination UI generator
    const renderPagination = () => {
        const items = []
        for (let i = 1; i <= page.totalPages; i++) {
            items.push(
                <div key={i}
                    onClick={() => paginationThemes(i)}
                    className={`py-2 px-3 text-md rounded-lg hover:scale-105 cursor-pointer select-none
                    ${i === currentPage ? 'bg-emerald-700 text-white' : 'bg-zinc-400 text-black'}`}>
                    {i}
                </div>
            )
            // if (i <= 3 || i === page.totalPages) {
            // }
            // else if (i === currentPage + 3) {
            //     items.push(
            //         <div key={`dots-${i}`} className="px-4 py-2 rounded-lg select-none bg-zinc-400">...</div>
            //     )
            // }
        }
        return items
    }
    // const renderPagination = () => {
    //     const items: React.ReactNode[] = []
    //     const total = page.totalPages
    //     const windowSize = 3

    //     // Helper untuk tombol halaman
    //     const PageBtn = (i: number) => (
    //         <div
    //             key={i}
    //             onClick={() => paginationThemes(i)}
    //             className={`py-2 px-4 text-xl rounded-lg hover:scale-105 cursor-pointer select-none 
    //         ${i === currentPage ? "bg-emerald-700 text-white" : "bg-zinc-400 text-black"}`}
    //         >
    //             {i}
    //         </div>
    //     )

    //     // Jika total halaman sedikit, tampilkan semua
    //     if (total <= windowSize) {
    //         for (let i = 1; i <= total; i++) items.push(PageBtn(i))
    //         return items
    //     }

    //     // Hitung jendela geser: [start..end] berukuran 3
    //     const start = Math.max(1, Math.min(currentPage, total - windowSize + 1))
    //     const end = start + windowSize - 1

    //     // Tampilkan window
    //     for (let i = start; i <= end; i++) items.push(PageBtn(i))

    //     // Jika masih ada halaman di belakang, tampilkan "…", lalu halaman terakhir
    //     if (end < total) {
    //         items.push(
    //             <div key="dots" className="px-4 py-2 rounded-lg select-none bg-zinc-400">…</div>
    //         )
    //         items.push(PageBtn(total))
    //     }

    //     return items
    // }

    return (
        <div className="flex flex-col items-center justify-start w-full min-h-screen py-10 text-black bg-white gap-y-10">
            {/* Header */}
            <header className="flex flex-col items-center justify-center w-full px-10 py-10 text-white pt-18 gap-y-5 bg-emerald-600">
                <h1 className="text-3xl font-bold">Tema Undangan Digital</h1>
                <h3>Pilih tema undangan sesuai kebutuhanmu</h3>
                <input
                    onChange={(e) => searchThemes(e.target.value)}
                    defaultValue={currentSearch}
                    type="text"
                    placeholder="Cari Tema: Contoh Cinnamoroll, Aysha, Peony, ..."
                    className="max-w-[500px] w-full py-3 px-6 rounded-lg bg-white text-black text-sm"
                />
            </header>

            {/* Filter */}
            <section className="flex flex-wrap items-center justify-center w-full gap-2 px-3 md:px-10 *:cursor-pointer *:hover:bg-zinc-400">
                {themeFilter.map((theme, index) => (
                    <button
                        key={index}
                        disabled={isLoading}
                        onClick={() => handleCategoryClick(theme)}
                        className={`${currentCategory === theme ? 'bg-emerald-300' : 'bg-zinc-300'} 
                        p-2 text-xs md:text-md w-40 md:w-[200px] rounded-lg`}>
                        {theme}
                    </button>
                ))}
            </section>

            {/* Cards */}
            <section className="flex flex-wrap items-center justify-center w-full gap-3 py-3 md:gap-7">
                {themes.length > 0 ? (
                    themes.map((theme) => (
                        <TrendingThemeCard
                            key={theme.id}
                            title={theme.name}
                            imgUrl={theme.imageurl}
                            linkPreview={theme.previewurl || '/themes'}
                        />
                    ))
                ) : (
                    <p className="text-3xl italic font-semibold">Belum ada tema</p>
                )}

                {themes.length > 0 && (
                    <div className="flex items-center justify-center w-full gap-3 mt-6 font-semibold">
                        {renderPagination()}
                    </div>
                )}
            </section>
        </div>
    );
}

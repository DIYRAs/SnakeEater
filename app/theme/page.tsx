'use client'

import { useEffect, useState } from "react";
import { Theme, trendingThemes } from "../data/trendingThemes";
import { TrendingThemeCard } from "../UI/components/home/cards";

// async function getThemes() {
//     const res = await fetch('http://localhost:3000/api/themes', { cache: 'no-store' })
//     return res.json()
// }

export default function ThemePage() {
    // const themes = await getThemes()
    const [isLoading, setIsLoading] = useState(false)
    const [themes, setThemes] = useState([])
    const [category, setCategory] = useState('Semua Tema')

    useEffect(() => {
        const fetchThemes = async () => {
            setIsLoading(true)
            const query = category === 'Semua Tema' ? '' : `?category=${encodeURIComponent(category)}`
            const res = await fetch(`/api/themes${query}`)
            const data = await res.json()
            setThemes(data)
            setIsLoading(false)
        }
        fetchThemes()
    }, [category])

    const themeFilter = [
        'Semua Tema',
        'Wedding', 'Kids & Birthday', 'Aqiqah & Tasmiyah',
        'Tasyakuran Khitan', 'Umum & Seminar', 'Christmas & New Year',
        'Syukuran & Islami', 'Party & Dinner', 'School & Graduation'
    ]

    return (
        <div className="flex flex-col items-center justify-start w-full min-h-screen py-10 text-black bg-white gap-y-10">
            <header className="flex flex-col items-center justify-center w-full px-10 py-10 text-white pt-18 gap-y-5 bg-emerald-600">
                <h1 className="text-3xl font-bold">
                    Tema Undangan Digital
                </h1>
                <h3>
                    Pilih tema undangan sesuai kebutuhanmu acaramu
                </h3>
                <input type="text"
                    placeholder="Cari Tema: Contoh Cinnamoroll, Aysha, Peony, ..."
                    className="max-w-[500px] w-full py-3 px-6 rounded-lg bg-white text-black text-sm" />
            </header>

            <section className="flex flex-wrap items-center justify-center w-full gap-2 px-3 md:px-10 *:cursor-pointer *:hover:bg-zinc-400">
                {themeFilter.map((theme, index) => (
                    <button key={index}
                        disabled={isLoading}
                        onClick={() => { setCategory(theme) }}
                        className={`${category === theme ? 'bg-emerald-300' : 'bg-zinc-300'} p-2 text-xs md:text-md w-40 md:w-[200px] rounded-lg`}>
                        {theme}
                    </button>
                ))}
            </section>

            <section className="flex flex-wrap items-center justify-center w-full gap-3 p-2 md:gap-7">
                {themes.length > 0 ? (
                    themes.map((theme: any) => (
                        <TrendingThemeCard
                            key={theme.id}
                            title={theme.name}
                            imgUrl={theme.image_url}
                            linkPreview={theme.preview_url} />
                    ))
                ) : (
                    <p className="text-3xl italic font-semibold">Belum ada tema</p>
                )}
            </section>
        </div >
    );
}
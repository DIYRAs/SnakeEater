'use client'

import { useEffect, useState } from "react"

export default function AdminUpload() {
    const themeFilter = [
        'Wedding', 'Kids & Birthday', 'Aqiqah & Tasmiyah',
        'Tasyakuran Khitan', 'Umum & Seminar', 'Christmas & New Year',
        'Syukuran & Islami', 'Party & Dinner', 'School & Graduation'
    ]

    const [data, setData] = useState<{ message?: string } | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [category, setCategory] = useState('')


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const selected = localStorage.getItem('category')?.toString() ?? ''
            setCategory(selected)
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)
        const category = formData.get('category')?.toString() || ''
        localStorage.setItem('category', category)

        const payload = {
            name: formData.get('name'),
            imageUrl: formData.get('imageUrl'),
            previewUrl: formData.get('previewUrl'),
            category: formData.get('category')
        }

        const res = await fetch('/api/themes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            alert('Gagal upload bro')
        }

        const data = await res.json()
        setData(data)
        console.log(data)
        form.reset()
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col items-center w-full min-h-screen py-10 text-black bg-zinc-300">
            <h1 className="font-mono text-4xl font-semibold">
                HALO, <br />
                Isi lah data undangannya. Ty.
            </h1>

            <p className="mt-10 text-2xl">{data && data.message ? data.message : ''}</p>
            <form onSubmit={handleSubmit}
                className={`flex flex-col max-w-[500px] w-full mt-8 items-center justify-center gap-5 p-5 bg-zinc-800 text-zinc-100 rounded-lg *:w-full
                ${isLoading ? 'pointer-events-none select-none opacity-50' : 'pointer-events-auto select-auto opacity-100'} `}>
                <div className="flex flex-col">
                    <label htmlFor="name">Nama Tema</label>
                    <input
                        id="name" type="text" name="name"
                        className="border" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="imageUrl">Link Image</label>
                    <input
                        id="imageUrl" type="text" name="imageUrl"
                        className="border" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="previewUrl">Link Preview</label>
                    <input
                        id="previewUrl" type="text" name="previewUrl"
                        className="border" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="category">Categori</label>
                    <select
                        defaultValue={category}
                        className="border"
                        name="category" id="category">
                        <option value="">Pilih kategori tema</option>
                        {themeFilter.map((theme, index) => (
                            <option key={index} value={theme}>{theme}</option>
                        ))}
                    </select>
                </div>
                <button type="submit"
                    className="h-10 font-semibold tracking-widest text-black rounded-full cursor-pointer bg-emerald-200">
                    Uplaod
                </button>
            </form>

            {/* STYLEEEEEE */}
            <style jsx>{`
            input, select {
            padding: 2px 4px;
            height: 2.5rem;
            background-color: white;
            color: black;
            border: none;
            }
            `}</style>
        </div>
    );
}
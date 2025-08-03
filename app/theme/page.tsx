import { Theme, trendingThemes } from "../data/trendingThemes";
import { TrendingThemeCard } from "../UI/components/home/cards";

export default function ThemePage() {
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
                    className="border max-w-[500px] w-full py-3 px-6 rounded-lg bg-white text-black text-sm" />
            </header>

            <section className="flex flex-wrap items-center justify-center w-full gap-2 px-0 md:px-10 *:cursor-pointer *:hover:bg-zinc-400">
                {themeFilter.map((theme, index) => (
                    <button key={index}
                        className="p-2 text-sm bg-zinc-300 w-[180px] md:w-[200px] rounded-lg">
                        {theme}
                    </button>
                ))}
            </section>

            <section className="flex flex-wrap items-center justify-center w-full p-2 gap-7">
                {trendingThemes.map((theme: Theme, index) => (
                    <TrendingThemeCard
                        key={index}
                        title={theme.name}
                        imgUrl={theme.imgUrl}
                        linkPreview={theme.linkPreview}
                        className=" shrink" />
                ))}
            </section>
        </div>
    );
}
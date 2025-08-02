import Link from "next/link"

export function CTAButton({ text, className }: { text: string, className?: string }) {
    return (
        <button className={`px-5 py-2 text-white rounded-full cursor-pointer px bg-green-950 ${className}`}>
            {text}
        </button>
    )
}

export function PreviewBuyBtn({ linkPreview, theme }: { linkPreview: string, theme: string }) {
    return (
        <div className="flex items-center justify-center w-full gap-3 *:rounded-md *:px-2 *:py-1 *:cursor-pointer">
            <Link
                className="grow bg-zinc-400/60 text-zinc-800"
                href={linkPreview}
                target="_blank"
                rel="noopener noreferrer">
                <button>
                    Preview
                </button>
            </Link>

            <Link
                className="grow bg-emerald-500 text-zinc-900"
                href={`https://wa.me/+62882021235692?text=Halo%20kak%20Irfan%2C%20saya%20mau%20pesan%20undangan%20digital%20tema%20%2A${theme}%2A`}
                target="_blank"
                rel="noopener noreferrer">
                <button>
                    Pesan
                </button>
            </Link>
        </div>
    )
}
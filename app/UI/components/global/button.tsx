import Link from "next/link"

export function CTAButton({ href = 'wa.me/+62882021235692', text, className, colors = 'bg-green-950 text-white' }: { href?: string, text: string, className?: string, colors?: string }) {
    return (
        <Link href={href}
            className={`px-4 py-2 text-[16px] md:text-[16px] md:px-4 rounded-full cursor-pointer px ${colors} ${className}
            transition hover:-translate-y-1 active:-translate-y-1`}>
            {text}
        </Link>
    )
}

export function PreviewBuyBtn({ linkPreview, theme }: { linkPreview: string, theme: string }) {
    return (
        <div className="flex flex-wrap items-center justify-center w-full gap-3 *:rounded-md *:px-2 *:py-1 *:cursor-pointer *:text-center">
            <Link
                className="cursor-pointer grow bg-zinc-200 text-zinc-800"
                href={linkPreview}
                target="_blank"
                rel="noopener noreferrer">
                Preview
            </Link>

            <Link
                className="cursor-pointer grow bg-emerald-500 text-zinc-900"
                href={`https://wa.me/+62882021235692?text=Halo%20kak%20Irfan%2C%20saya%20mau%20pesan%20undangan%20digital%20tema%20%2A${theme}%2A`}
                target="_blank"
                rel="noopener noreferrer">
                    Pesan
            </Link>
        </div>
    )
}
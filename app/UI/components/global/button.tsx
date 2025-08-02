export function CTAButton({ text, className }: { text: string, className?: string }) {
    return (
        <button className={`px-5 py-2 text-white rounded-full cursor-pointer px bg-green-950 ${className}`}>
            {text}
        </button>
    )
}

export function PreviewBuyBtn() {
    return (
        <div className="flex items-center justify-center w-full gap-3 *:rounded-md *:px-2 *:py-1 *:cursor-pointer">
            <button className="grow bg-zinc-400">
                Preview
            </button>

            <button className="grow bg-emerald-500 text-zinc-900">
                Pesan
            </button>
        </div>
    )
}
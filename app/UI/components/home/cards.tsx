import { CTAButton, PreviewBuyBtn } from "../global/button";
import Image from "next/image";

export function ValueCard({ title, text }: { title: string, text: string }) {
    return (
        <div className="px-8 py-3 bg-gray-50/70 shadow-sm shadow-black/50 min-h-[190px] w-[380px] rounded-2xl text-start space-y-3">
            <p className="text-2xl font-bold">{title}</p>
            <p>
                {text}
            </p>
        </div>
    )
}

export default function FeatureCard({ title }: { title: string }) {
    return (
        <div className="flex flex-col items-center w-full h-full md:h-max md:w-[250px] gap-3 px-3 py-6 bg-emerald-200/70 rounded-xl">
            <div className="w-12 h-12 bg-black"></div>
            <p className="">{title}</p>
        </div>
    );
}

export function TrendingThemeCard({ title, imgUrl, linkPreview, className }: { title: string, imgUrl?: string, linkPreview: string, className?: string }) {
    return (
        <div style={{ backgroundImage: `url(${imgUrl || '/ph.png'})` }}
            className={`h-[250px] w-[180px] md:h-[350px] md:w-[280px] flex items-center hover:scale-95 transition justify-end bg-center bg-cover flex-col rounded-lg overflow-hidden ${className}`}>
            <div className="flex flex-col items-start justify-center w-full p-4 pt-3 transition-all duration-300 ease-in-out rounded-b-lg group-hover:translate-y-0 gap-y-2 bg-black/40 backdrop-blur-lg" >
                <p className="tracking-wider text-white text-[16px]">{title}</p>
                <PreviewBuyBtn linkPreview={linkPreview} theme={title} />
            </div>
        </div>
    )
}
// export function TrendingThemeCard({ title, imgUrl, linkPreview }: { title: string, imgUrl?: string, linkPreview: string }) {
//     return (
//         <div style={{ backgroundImage: `url(${imgUrl || '/ph.png'})` }}
//             className="h-[350px] w-[280px] flex items-center group hover:scale-95 transition justify-end bg-center bg-cover flex-col rounded-lg overflow-hidden">
//             <div className="flex flex-col items-start justify-center w-full p-4 pt-3 transition-all duration-300 ease-in-out translate-y-[100px] rounded-b-lg group-hover:translate-y-0 gap-y-2 bg-black/10 backdrop-blur-lg" >
//                 <p className="tracking-wider text-white text-[16px]">{title}</p>
//                 <PreviewBuyBtn linkPreview={linkPreview} theme={title} />
//             </div>
//         </div>
//     )
// }

export function PriceCard({ plan, initialPrice, price, features }: { plan: string, initialPrice?: string, price: string, features: string[] }) {
    return (
        <div className="flex flex-col items-center justify-center px-5 py-4 border border-black/50 gap-y-5 rounded-2xl">
            <p className="text-xl font-semibold tracking-wider text-center text-black/80">
                Paket {plan}
            </p>

            <Image
                src={'/ph.png'}
                alt={`the photo of ${plan} package`}
                height={300}
                width={300}
                className="rounded-xl" />

            <div className="w-full text-center">
                {initialPrice && <p className="text-sm text-red-500 line-through">Rp {initialPrice}</p>}
                <p className="text-xl">Rp {price}</p>
            </div>

            <ul className="list-disc ">
                {features.map((feature, index) => (
                    <li key={index}
                        className="text-start">
                        {feature}
                    </li>
                ))}
            </ul>

            <CTAButton
                text="Pilih Paket →"
                className="w-full" />
        </div>
    )
}
import { CTAButton, PreviewBuyBtn } from "../global/button";
import Image from "next/image";
import { ReactElement } from "react";

export function ValueCard({ title, text, icon, animationDelay }: { title: string, text: string, icon?: ReactElement, animationDelay?: string }) {
    return (
        <div
            data-aos="flip-up"
            data-aos-delay={animationDelay}
            className="px-8 py-3 bg-gray-50/70 min-h-[190px] md:w-[380px] w-full rounded-2xl text-start space-y-2">
            <span className="text-5xl">
                {icon}
            </span>
            <p className="mt-3 text-2xl font-bold">{title}</p>
            <p>
                {text}
            </p>
        </div>
    )
}

export default function FeatureCard({ title, icon, animationDelay }: { title: string, icon?: ReactElement, animationDelay?: string }) {
    return (
        <div
            data-aos="zoom-in-up"
            data-aos-delay={animationDelay}
            className="flex flex-col items-center w-full h-full md:h-max md:w-[250px] gap-3 px-3 py-6 bg-emerald-200/70 rounded-xl">
            <span className="text-5xl">
                {icon}
            </span>
            <p className="">{title}</p>
        </div>
    );
}

export function TrendingThemeCard({ title, imgUrl, animationDelay, linkPreview, className }: { title: string, imgUrl: string, animationDelay?: string, linkPreview: string, className?: string }) {
    return (
        <div
            data-aos="fade-up"
            data-aos-delay={animationDelay}
            className={`h-[300px] relative w-40 md:h-[350px] md:w-64 flex items-center transition justify-end flex-col rounded-lg overflow-hidden ${className}`}>
            <Image
                src={imgUrl ?? '/snakeeater-logo.webp'}
                placeholder="blur"
                blurDataURL="/snakeeater-logo.webp"
                alt={`Preview undangan ${title}`}
                height={300}
                width={150}
                className="object-cover object-center w-full h-full" />
            <div className="flex flex-col items-start justify-center w-full p-4 pt-3 transition-all duration-300 ease-in-out rounded-b-lg bg-zinc-800 group-hover:translate-y-0 gap-y-2" >
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

export function PriceCard({ plan, initialPrice, price, features, href }: { plan: string, initialPrice?: string, price: string, features: string[], href?: string }) {
    return (
        <div
            data-aos="fade-up"
            className="flex flex-col items-center justify-center px-5 py-4 border border-black/50 gap-y-5 rounded-2xl">
            <p className="text-xl font-semibold tracking-wider text-center text-black/80">
                Paket {plan}
            </p>

            <Image
                src={'/snakeeater-logo.webp'}
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
                className="w-full"
                href={href} />
        </div>
    )
}
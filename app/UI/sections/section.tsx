interface SectionProps {
    children: React.ReactNode,
    title: string,
    subTitle?: string,
    id: string,
    className?: string
}

export default function Section({ children, id, title, subTitle, className }: SectionProps) {
    return (
        <section id={id}
            className={`flex flex-col items-center justify-start w-full py-10 text-center ${className}`} >
            <div className="max-w-[500px] space-y-2">
                <h2
                    data-aos="fade-up"
                    className="text-2xl font-semibold md:text-3xl">
                    {title}
                </h2>
                {subTitle ? (
                    <h3
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="text-sm md:text-[16px]">
                        {subTitle}
                    </h3>
                ) : null}
            </div>

            {children}
        </section>
    );
}
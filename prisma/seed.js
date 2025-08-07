import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    await prisma.theme.createMany({
        data: [
            {
                name: 'Garuda',
                imageUrl: 'https://kuladigital.webinvit.id/themes/garuda/garuda.webp',
                previewUrl: 'https://kuladigital.webinvit.id/preview/garuda',
                category: 'Umum & Seminar',
            },
            {
                name: 'Gadang',
                imageUrl: 'https://kuladigital.webinvit.id/themes/gadang/gadang.webp',
                previewUrl: 'https://kuladigital.webinvit.id/preview/gadang',
                category: 'Wedding',
            },
            {
                name: 'Mickey Red',
                imageUrl: 'https://kuladigital.webinvit.id/themes/mickey-red/mickey-red.webp',
                previewUrl: 'https://kuladigital.webinvit.id/preview/mickey-red',
                category: 'Kids & Birthday',
            },
            {
                name: 'Beautiful Aqsa',
                imageUrl: 'https://kuladigital.webinvit.id/themes/beautiful-aqsa/beautiful-aqsa.webp',
                previewUrl: 'https://kuladigital.webinvit.id/preview/beautiful-aqsa',
                category: 'Wedding',
            },
            {
                name: 'BPJS',
                imageUrl: 'https://kuladigital.webinvit.id/themes/bpjs/bpjs.webp',
                previewUrl: 'https://kuladigital.webinvit.id/preview/bpjs',
                category: 'Umum & Seminar',
            },
            {
                name: 'Line Art Brown',
                imageUrl: 'https://kuladigital.webinvit.id/themes/line-art-brown/line-art-brown.webp',
                previewUrl: 'https://kuladigital.webinvit.id/preview/line-art-brown',
                category: 'Wedding',
            },
            {
                name: 'SMF',
                imageUrl: 'https://kuladigital.webinvit.id/themes/smf/smf.webp',
                previewUrl: 'https://kuladigital.webinvit.id/preview/smf',
                category: 'Umum & Seminar',
            },
            {
                name: 'Sunda Minang',
                imageUrl: 'https://kuladigital.webinvit.id/themes/sunda-minang/sunda-minang.webp',
                previewUrl: 'https://kuladigital.webinvit.id/preview/sunda-minang',
                category: 'Wedding',
            },
            {
                name: 'Padang',
                imageUrl: 'https://kuladigital.webinvit.id/themes/padang/padang.webp',
                previewUrl: 'https://kuladigital.webinvit.id/preview/padang',
                category: 'Wedding',
            },
            {
                name: 'Kuda Macan',
                imageUrl: 'https://kuladigital.webinvit.id/themes/kuda-macan/kuda-macan.webp',
                previewUrl: 'https://kuladigital.webinvit.id/preview/kuda-macan',
                category: 'Wedding',
            },
            {
                name: 'Novianty',
                imageUrl: 'https://kuladigital.webinvit.id/themes/novianty/novianty.webp',
                previewUrl: 'https://kuladigital.webinvit.id/preview/novianty',
                category: 'Wedding',
            },
            {
                name: 'Lotte Gold',
                imageUrl: 'https://kuladigital.webinvit.id/themes/lotte-gold/lotte-gold.webp',
                previewUrl: 'https://kuladigital.webinvit.id/preview/lotte-gold',
                category: 'Umum & Seminar',
            },
        ]
    })
}
main()
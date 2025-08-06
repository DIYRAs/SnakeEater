import Image from "next/image";
import { CTAButton } from "./UI/components/global/button";
import Section from "./UI/sections/section";
import FeatureCard, { PriceCard, TrendingThemeCard, ValueCard } from "./UI/components/home/cards";
import { Theme, trendingThemes } from "./data/trendingThemes";
import { SiGooglemaps, SiTinyletter } from "react-icons/si";
import { TbPencilHeart, TbPhotoHeart } from "react-icons/tb";
import { MdCardGiftcard, MdOutlineLibraryBooks } from "react-icons/md";
import { FaMusic, FaRegIdCard, FaYoutube } from "react-icons/fa6";
import { BsChatHeart } from "react-icons/bs";
import { PiClockCountdownFill, PiScreencastFill } from "react-icons/pi";
import { IoQrCodeOutline } from "react-icons/io5";

export default function Home() {
  const whyUsValue = [
    'Tanpa sampah',
    'Fitur melimpah',
    'Ramah lingkungan',
    'Lebih Praktis dan efisien',
    'Hemat biaya, waktu, dan tenaga',
    'Bisa diakses dimana saja dan kapan saja',
  ]

  const CompleteFeatures = [
    "Custom Nama Tamu Undangan",
    "Custom Musik Latar",
    "Tema Lengkap Bisa Custom",
    "Form RSVP & Ucapan",
    "Amplop Digital & Tanda Kasih",
    "Hitung Mundur Waktu Acara",
    "Galeri Foto & Video",
    "Integrasi Google Maps",
    "Informasi Live Streaming",
    "QR Code Check-In Acara",
    "Layar Sapa & Check-In Counter",
    "Kirim Undangan Pake HP",
    "Beragam Tata Letak Halaman",
    "Ubah Warna & Ukuran Font"
  ]


  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen py-10 text-black bg-white">
      {/* HERO SECTION */}
      <section id="hero"
        className="flex flex-col-reverse items-center justify-center w-full min-h-screen px-10 pt-16 md:pt-0 gap-x-20 gap-y-10 md:flex-row md:px-14">
        <Image
          className="border-2 grow rounded-4xl"
          src={'/ph.png'}
          alt="image of SnakeEater's logo"
          width={600}
          height={800}
          priority />

        <div className="space-y-5 grow">
          <h1 className="text-3xl font-bold md:text-4xl">
            Miliki Undangan Digital Website Kekinian Dengan <span className="bg-emerald-400 px-0.5">
              Harga dan Kualitas Terbaik
            </span>
          </h1>

          <p className="text-sm md:text-md md:text-justify">
            Merencanakan pernikahan, ulang tahun, syukuran, dan acara lainnya
            bisa menjadi pengalaman yang menyenangkan sekaligus menegangkan.
            Solusinya yaitu menggunakan undangan digital berbentuk website yang
            memberikan berbagai manfaat.
          </p>

          <CTAButton
            text="Hubungi Kami"
            className="mt-6" />
        </div>
      </section>

      {/* WHY US SECTION */}
      <Section id="whyUs"
        title="Kenapa Harus Menggunakan Undangan Digital?"
        className="px-4" >

        <ul className="flex flex-col md:flex-row text-start max-w-[700px] mt-6 mb-24 text-sm md:text-[16px] flex-wrap items-start justify-center md:items-center *:before:content-['✅'] *:before:mr-1 gap-x-5 gap-y-1">
          {whyUsValue.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-center gap-5 *:transition *:active:-translate-y-3 *:hover:-translate-y-3 w-full">
          <ValueCard
            icon={<SiTinyletter />}
            title="Beragam Pilihan Tema"
            text="Pilih tema favoritmu dari puluhan tema dan bisa kamu custom sendiri,
            mau ganti background dengan foto prewed? atau ubah warna tulisan? Bisa!." />

          <ValueCard
            icon={<TbPencilHeart />}
            title="Custome Nama Tamu"
            text="Ngundang teman sebaya atau yang lebih tua gak perlu hawatir. Tetap sopan
            dengan undangan digital karena kamu bisa kirim undangan dengan nama tamu." />

          <ValueCard
            icon={<MdOutlineLibraryBooks />}
            title="Konfirmasi Kehadiran"
            text="Kini kamu bisa mengetahui berapa jumlah tamu yang hadir atau tidak, 
            sehingga bisa mengurangi makanan sisa yang tidak termakan." />
        </div>
      </Section>

      {/* FEATURED SECTION */}
      <Section id="feature"
        title="Fitur Lengkap"
        subTitle="Undangan Digital Dengan Fitur yang Lengkap hanya disini" >

        <div className="grid grid-cols-2 gap-5 mt-10 md:flex md:flex-wrap px-5 md:items-center md:justify-center place-items-center *:transition *:hover:-translate-y-3 *:active:-translate-y-3">
          <FeatureCard
            icon={<FaRegIdCard />}
            title="Custom Nama Tamu" />
          <FeatureCard
            icon={<FaMusic />}
            title="Custom Musik Latar" />
          <FeatureCard
            icon={<BsChatHeart />}
            title="RSVP & Ucapan" />
          <FeatureCard
            icon={<MdCardGiftcard />}
            title="Amplop Digital" />
          <FeatureCard
            icon={<PiClockCountdownFill />}
            title="Countdown Timer" />
          <FeatureCard
            icon={<TbPhotoHeart />}
            title="Galeri Foto & Video" />
          <FeatureCard
            icon={<SiGooglemaps />}
            title="Integrasi Google Maps" />
          <FeatureCard
            icon={<FaYoutube />}
            title="Info Live Streaming" />
          <FeatureCard
            icon={<IoQrCodeOutline />}
            title="QR Code Checkin Acara" />
          <FeatureCard
            icon={<PiScreencastFill />}
            title="Layar Sapa Real Time" />
        </div>
      </Section>

      {/* TRENDING THEME SECTION */}
      <Section id="trending"
        title="Trending Themes!"
        subTitle="Pilih tema undangan digitalmu disini!"
        className="gap-y-14">
        <div className="flex flex-wrap items-center justify-center w-full gap-3 md:gap-7">
          {trendingThemes.map((theme: Theme, index) => (
            <TrendingThemeCard
              key={index}
              title={theme.name}
              imgUrl={theme.image_url}
              linkPreview={theme.preview_url} />
          ))}
        </div>

        <CTAButton
          href="/theme"
          text="Lihat tema lainnya" />
      </Section>

      {/* ADDITIONAL SECTION */}
      <section id="allFeatures"
        className="flex flex-col items-center justify-center w-full px-10 py-12 md:px-8 md:flex-row gap-x-32 gap-y-12">
        <Image
          src={'/ph.png'}
          alt="the complete version of digital invitation"
          height={700}
          width={500}
          className="rounded-full" />

        <div className="flex flex-col items-start justify-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Undangan Digital Dengan Fitur yang Lengkap
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 my-6 *:before:content-['✅'] gap-x-5 gap-y-1">
            {CompleteFeatures.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <CTAButton
            text="Buat Undangan Digital →" />
        </div>

      </section>

      {/* HOW TO ORDER SECTION */}
      <Section id="howToOrder"
        title="Cara Pesan Undangan Digital"
        subTitle="Proses order sangat mudah hanya tiga langkah sederhana"
        className="px-5 mt-10 gap-y-12 bg-emerald-300">

        <div className="flex flex-wrap items-center justify-center w-full gap-5">
          <ValueCard
            title="Pilih Tema Undangan"
            text="Telusuri koleksi tema undangan online kami dan pilih salah satu yang paling sesuai dari ratusan template yang berbeda dan kreatif." />
          <ValueCard
            title="Chat Admin"
            text="Chat Admin dan admin akan meminta data detil acara kamu, kamu juga bisa konsultasi terkait harga dan tema." />
          <ValueCard
            title="Lakukan Pembayaran"
            text="Kamu dapat melakukan pembayaran sesuai paket yang kamu pilih. Admin akan memproses pesanan kamu hingga selesai." />
        </div>

      </Section>

      {/* PRICE LIST SECTION */}
      <Section id="priceList"
        title="Daftar Harga"
        subTitle="Pilih Paket yang sesuai dengan kebutuhanmu, chat Admin untuk konsultasi gratis!"
        className="px-5">

        <div className="flex flex-wrap items-start justify-center gap-6 mt-12">
          <PriceCard
            plan="Express"
            initialPrice="150,000"
            price="120,000"
            href="wa.me/wa.me/+62882021235692?text=Halo%20kak%20Irfan%2C%20saya%20mau%20pesan%20undangan%20digital%20paket%20%2AExpress%2A"
            features={[
              "Proses < 1 Hari Kerja",
              "Maksimal Revisi Bebas",
              "Unlimited Tamu Undangan",
              "Custom Music Latar",
              "Hitung Mundur Waktu Acara",
              "Integrasi Google Maps",
              "Ucapan & RSVP",
              "QR Code Check-In",
              "Amplop Digital",
              "Galeri Foto & Video"
            ]} />
          <PriceCard
            plan="Mewah"
            initialPrice="100,000"
            price="80,000"
            href="wa.me/wa.me/+62882021235692?text=Halo%20kak%20Irfan%2C%20saya%20mau%20pesan%20undangan%20digital%20paket%20%2AMewah%2A"
            features={[
              "Proses < 1 Hari Kerja",
              "Maksimal Revisi 5x",
              "Unlimited Tamu Undangan",
              "Custom Music Latar",
              "Hitung Mundur Waktu Acara",
              "Integrasi Google Maps",
              "Ucapan & RSVP",
              "QR Code Check-In",
              "Amplop Digital",
              "Galeri Foto & Video"
            ]} />
          <PriceCard
            plan="Standar"
            price="50,000"
            href="wa.me/wa.me/+62882021235692?text=Halo%20kak%20Irfan%2C%20saya%20mau%20pesan%20undangan%20digital%20paket%20%2AStandar%2A"
            features={[
              "Proses < 1 Hari Kerja",
              "Maksimal Revisi 3x",
              "Unlimited Tamu Undangan",
              "Custom Music Latar",
              "Hitung Mundur Waktu Acara",
              "Integrasi Google Maps",
            ]} />
        </div>
      </Section>
    </div>
  );
}
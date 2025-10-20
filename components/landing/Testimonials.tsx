import React from 'react';
import { Testimonial } from '../../types';

const testimonials: Testimonial[] = [
    {
        id: '1',
        quote: "Ini tempat andalan saya untuk cari barang langka! Kualitasnya selalu terbaik dan koleksinya dikurasi dengan penuh cinta. Saya menemukan 'holy grail' saya di sini!",
        name: 'Andi Collector',
        role: 'Kolektor Seni Vinyl',
        avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    {
        id: '2',
        quote: "Sebagai reseller, punya sumber yang bisa diandalkan itu kunci. Variasi dan kondisi figurnya tak tertandingi. Pelanggan saya selalu senang dengan pembelian mereka.",
        name: 'Budi Reseller',
        role: 'Reseller Mainan',
        avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    },
    {
        id: '3',
        quote: "Saya baru mulai koleksi, dan timnya sangat membantu! Mereka memandu saya saat pembelian pertama dan sekarang saya benar-benar ketagihan. Tidak sabar untuk menambah koleksi saya.",
        name: 'Citra Regular',
        role: 'Kolektor Baru',
        avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial, index: number }> = ({ testimonial, index }) => (
    <div 
        className="bg-surface p-8 rounded-xl shadow-lg animate-fade-in-up"
        style={{ opacity: 0, animationDelay: `${index * 100 + 200}ms` }}
    >
        <p className="text-text-secondary italic">"{testimonial.quote}"</p>
        <div className="flex items-center mt-6">
            <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-14 h-14 rounded-full" />
            <div className="ml-4">
                <p className="font-bold text-text-primary">{testimonial.name}</p>
                <p className="text-sm text-primary">{testimonial.role}</p>
            </div>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 animate-fade-in-up" style={{ opacity: 0 }}>
                    <h2 className="text-4xl font-extrabold text-text-primary">Kata Para Kolektor</h2>
                    <p className="mt-2 text-lg text-text-secondary max-w-2xl mx-auto">
                        Kami bangga menjadi bagian tepercaya dari komunitas kolektor.
                    </p>
                    <div className="mt-4 h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
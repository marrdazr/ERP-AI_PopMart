import React from 'react';

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-surface">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="animate-fade-in-up" style={{ opacity: 0, animationDelay: '200ms' }}>
                        <h2 className="text-4xl font-extrabold text-text-primary">
                            Lebih dari Sekedar Koleksi
                        </h2>
                        <div className="mt-4 mb-6 h-1.5 w-24 bg-primary rounded-full mx-auto"></div>
                        <p className="text-lg text-text-secondary mb-4">
                            Kami percaya setiap figur menceritakan sebuah kisah. Koleksi kami dikurasi dengan penuh semangat, menyatukan barang langka, karya klasik yang dicintai, dan rilisan terbaru dari dunia PopMart dan mainan desainer.
                        </p>
                        <p className="text-lg text-text-secondary">
                            Baik Anda seorang kolektor berpengalaman atau baru memulai perjalanan, kami menyediakan ruang tepercaya untuk menemukan karya unik yang menambah karakter dan kegembiraan di rak pajangan Anda. Kami sendiri adalah kolektor, dan kami senang berbagi semangat kami dengan Anda.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
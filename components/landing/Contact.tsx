
import React from 'react';
import { SendIcon } from '../icons/Icons';

const Contact: React.FC = () => {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            name: { value: string };
            email: { value: string };
            message: { value: string };
        };
        const name = target.name.value;
        const email = target.email.value;
        const message = target.message.value;
        const subject = `Pesan dari ${name} (${email}) melalui Website`;
        const body = encodeURIComponent(message);
        window.location.href = `mailto:mardafhzrx@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    };

    return (
        <section id="contact" className="py-20 bg-surface">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 animate-fade-in-up" style={{ opacity: 0 }}>
                    <h2 className="text-4xl font-extrabold text-text-primary">Hubungi Kami</h2>
                    <p className="mt-2 text-lg text-text-secondary max-w-2xl mx-auto">
                        Punya pertanyaan atau mencari figur tertentu? Kirimkan pesan kepada kami!
                    </p>
                    <div className="mt-4 h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
                </div>
                <div className="max-w-xl mx-auto animate-fade-in-up" style={{ opacity: 0, animationDelay: '200ms' }}>
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="name" className="sr-only">Nama</label>
                            <input type="text" id="name" name="name" placeholder="Nama Anda" required className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition" />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input type="email" id="email" name="email" placeholder="Alamat Email Anda" required className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition" />
                        </div>
                        <div>
                            <label htmlFor="message" className="sr-only">Pesan</label>
                            <textarea id="message" name="message" placeholder="Pesan Anda" rows={5} required className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition"></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="inline-flex items-center justify-center bg-primary text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg hover:bg-primary-dark transition-transform duration-300 hover:scale-105">
                                <SendIcon className="w-5 h-5 mr-2" />
                                Kirim Pesan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

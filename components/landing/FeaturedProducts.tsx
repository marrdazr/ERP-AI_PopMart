import React from 'react';
import { FeaturedProduct } from '../../types';

const featuredProducts: FeaturedProduct[] = [
    {
        id: 'fp1',
        name: 'Hirono Little Mischief',
        series: 'Hirono',
        imageUrl: '', // Dihapus sesuai permintaan
        price: 250000,
    },
    {
        id: 'fp2',
        name: 'Crybaby Crying Parade',
        series: 'Crybaby',
        imageUrl: '', // Dihapus sesuai permintaan
        price: 280000,
    },
    {
        id: 'fp3',
        name: 'TinyTiny City Adventure',
        series: 'TinyTiny',
        imageUrl: '', // Dihapus sesuai permintaan
        price: 220000,
    },
    {
        id: 'fp4',
        name: 'Kubo Walks of Life',
        series: 'Kubo',
        imageUrl: '', // Dihapus sesuai permintaan
        price: 260000,
    },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

interface ProductCardProps {
    product: FeaturedProduct;
    index: number;
    onAddToCart: (product: FeaturedProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, onAddToCart }) => (
    <div 
        className="bg-surface rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition-transform duration-300 hover:-translate-y-2 animate-fade-in-up"
        style={{ opacity: 0, animationDelay: `${index * 100 + 200}ms` }}
    >
        <div>
            <span className="text-sm font-semibold uppercase tracking-wider bg-primary/20 text-primary px-3 py-1 rounded-full">{product.series}</span>
            <h3 className="text-2xl font-bold mt-3 text-text-primary">{product.name}</h3>
        </div>
        <div className="mt-4">
            <p className="text-2xl font-bold text-secondary mb-4">{formatCurrency(product.price)}</p>
            <button
                onClick={() => onAddToCart(product)}
                className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
            >
                + Tambah ke Keranjang
            </button>
        </div>
    </div>
);

interface FeaturedProductsProps {
    onAddToCart: (product: FeaturedProduct) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onAddToCart }) => {
    return (
        <section id="featured" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 animate-fade-in-up" style={{ opacity: 0 }}>
                    <h2 className="text-4xl font-extrabold text-text-primary">Koleksi Unggulan</h2>
                    <p className="mt-2 text-lg text-text-secondary max-w-2xl mx-auto">
                        Lihat beberapa figur paling populer dan yang baru ditambahkan dalam koleksi kami.
                    </p>
                    <div className="mt-4 h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} onAddToCart={onAddToCart} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
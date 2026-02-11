import React from 'react';
import ProductList from "./ProductList.jsx";
import '../styles/Home.css';

const Home = () => {
    return (
        <main>
            <section className="hero-section">
                <div className="hero-left">
                    <h2>nos thés</h2>
                    <button>
                        découvrir
                    </button>
                </div>
                <div className="hero-right">
                    <h2>nos cafés</h2>
                    <button>
                        découvrir
                    </button>
                </div>
            </section>

            <ProductList />
        </main>
    );
};

export default Home;
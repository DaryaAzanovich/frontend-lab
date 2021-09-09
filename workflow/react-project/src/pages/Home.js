import './Home.css';
import './pagesMedia.css'
import React, { useState } from 'react';
import Modal from '../components/Modal';
import QuotesCarousel from '../components/QuotesCarousel';

export const Home = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <div className="wrap">
                {openModal && <Modal modalState={setOpenModal}/>}

                <h1 className="homepage-title">Cocktail App</h1>

                <section className="content">
                        <QuotesCarousel></QuotesCarousel>
                    <div className="content-cocktail">
                        <img 
                            className="content-img" 
                            alt="Green cocktail" 
                            src="./green-cocktail.png"
                            onClick={() => {
                                setOpenModal(true)
                            }}
                        />
                        <p className="content-prompt">Press on glass to get a random cocktail</p>
                    </div>
                </section>
            </div>
        </>
    )
}
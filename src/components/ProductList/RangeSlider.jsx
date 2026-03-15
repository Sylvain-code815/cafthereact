import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import './ProductList.css';

// Utilisation de la librarie Radix UI (accessibilité+contrôle css)
const PriceSlider = ({ min, max, value, onChange }) => {
    return (
        <div className="filter-group">
            <label className="filter-label">Prix (€)</label>

            <Slider.Root
                className="SliderRoot"
                defaultValue={value}
                min={min}
                max={max}
                step={1}
                onValueChange={onChange} // Radix renvoie directement [min, max]
            >
                <Slider.Track className="SliderTrack">
                    <Slider.Range className="SliderRange" />
                </Slider.Track>

                {/* Curseur Minimum */}
                <Slider.Thumb className="SliderThumb" aria-label="Prix minimum" />

                {/* Curseur Maximum */}
                <Slider.Thumb className="SliderThumb" aria-label="Prix maximum" />
            </Slider.Root>

            <div className="price-values">
                <span>{value[0]}€</span>
                <span>{value[1]}€</span>
            </div>
        </div>
    );
};

export default PriceSlider;
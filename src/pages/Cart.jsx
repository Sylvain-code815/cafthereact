// Créé un contexte pour le panier comme pour le login, avec un vrai ou faux pour savoir s'il y a des choses à l'intérieur ou non
import {CartContext} from '../context/CartContext.jsx'
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

const Cart = () => {
    const { basketFill } = useContext(CartContext);
    const [id, setId] = useState('');
    const [quantite, setQuantite] = useState('');
    const [prix_ttc, setPrix_ttc] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const response = await fetch (
                `${import.env.VITE_API_URL}/api/\`
                )
        }
    }
}
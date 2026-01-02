export default function handleWhatsAppContact() {
    const message = encodeURIComponent('¡Hola! Me interesa conocer más sobre sus servicios Webs. ¿Podrían proporcionarme información sobre sus productos y precios?');
    const phoneNumber = '+573216123545'; // Reemplazar con el número real
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
};

export const Contact = () => {
  return (
   <section id="contact" className="py-20">
            <div className="container mx-auto px-6 ">
                <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Contáctame</h2>
                <form className="max-w-lg mx-auto border-purple-800 border-4 p-4 rounded" id="contact-form">
                    <div className="mb-4 flex justify-center">
                        <p className="text-white px-4 bg-green-800 rounded-lg" id="success"></p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="from_name" className="block mb-2">Nombre</label>
                        <input type="text" id="from_name" name="from_name"
                            className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <input type="email" id="email" name="email"
                            className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block mb-2">Mensaje</label>
                        <textarea id="message" name="message" rows={4}
                            className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required></textarea>
                    </div>
                    <button type="submit" id="btn"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">Enviar
                        Mensaje
                    </button>
                </form>
            </div>
        </section>
  )
}

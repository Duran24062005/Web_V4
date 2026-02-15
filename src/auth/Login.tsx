import { useState } from 'react';

const Login = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [showRegister, setShowRegister] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    birthDate: '',
    termsAccepted: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  /*const handleSubmit2 = (event: FormEvent): void => {
    event.preventDefault();
    console.log('Datos del formulario:', formData);
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    console.log('Formulario enviado');
  };*/

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const terms = [
    {
      title: "1. Aceptación de los Términos",
      content: "Al utilizar nuestro servicio, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de los términos, no podrá utilizar nuestro servicio."
    },
    {
      title: "2. Uso del Servicio",
      content: "Nuestro servicio está destinado únicamente para uso personal y no comercial. Usted se compromete a no utilizar el servicio para fines ilegales o no autorizados."
    },
    {
      title: "3. Cuenta de Usuario",
      content: "Para acceder a ciertas funciones del servicio, es posible que deba crear una cuenta. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña."
    },
    {
      title: "4. Propiedad Intelectual",
      content: "El contenido del servicio, incluyendo textos, gráficos, logotipos, y software, está protegido por derechos de autor y otras leyes de propiedad intelectual."
    },
    {
      title: "5. Limitación de Responsabilidad",
      content: "En ningún caso seremos responsables por daños indirectos, incidentales, especiales o consecuentes que resulten del uso o la imposibilidad de usar nuestro servicio."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 bg-cover bg-center flex items-center justify-center p-4" 
         style={{ backgroundImage: "url('/assets/img/Fondo2.jpg')" }}>
      <div className={`flex ${!showRegister ? 'gap-6 w-full max-w-6xl' : 'w-full max-w-sm'}`}>
        {/* Login/Register Form */}
        <div className={`${showRegister ? 'w-full' : 'w-1/2'} bg-white/20 backdrop-blur-md rounded-lg shadow-2xl p-8`}>
          {showRegister ? (
            <>
              <h1 className="text-2xl font-bold text-center text-gray-100">EduConnect</h1>
              <p className='text-center text-slate-300'>Conexión Educativa</p>
              <p className='text-center text-slate-400 mb-6'>Inicie sesión para continuar</p>
              <form className="mt-6 space-y-4" onSubmit={()=>{}}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-200">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingrese su correo electrónico"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-200">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingrese su contraseña"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Iniciar Sesión
                </button>
              </form>
              <div className="mt-4 text-center text-sm">
                <a href="#" className="text-blue-500 hover:underline">¿Olvidó su contraseña?</a>
                <p>¿No tienes una cuenta? <a href="#" className="text-blue-600 hover:underline" onClick={() => setShowRegister(false)}>Registrate aquí</a></p>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-center text-slate-100">Registro en EduConnect</h1>
              <p className='text-center text-slate-400'>Haz parte de nuestra comunidad Educativa.</p>
              <form className="mt-6 space-y-4" onSubmit={()=>{}}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-slate-200">Nombres</label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparen text-blackt"
                      placeholder="Ingrese su nombre completo"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-slate-200">Apellidos</label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Ingrese sus apellidos"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-200">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Ingrese su correo electrónico"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-200">Contraseña</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Ingrese su contraseña"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPass" className="block text-sm font-medium text-slate-200">Confirmar Contraseña</label>
                    <input
                      type="password"
                      id="confirmPass"
                      name="confirmPass"
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      placeholder="Ingrese su contraseña"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="userType" className="block text-sm font-medium text-slate-200">Tipo de usuario</label>
                    <select
                      id="userType"
                      name="userType"
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      required
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="student">Estudiante</option>
                      <option value="teacher">Docente</option>
                      <option value="parent">Padre/Madre</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="birthDate" className="block text-sm font-medium text-slate-200">Fecha de nacimiento</label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      onChange={handleChange}
                      className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="termsAccepted" className="ml-2 text-sm text-gray-300">
                    Acepto los términos y condiciones
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Registrarse
                </button>
              </form>
              <div className="mt-4 text-center text-sm">
                <p>¿Ya tienes una cuenta? <a href="#" className="text-blue-600 hover:underline" onClick={() => setShowRegister(true)}>Inicia sesión aquí</a></p>
              </div>
            </>
          )}
        </div>

        {/* Terms and Conditions Panel - Only shown in register mode */}
        {!showRegister && (
          <div className="w-1/2 bg-white/20 backdrop-blur-md rounded-lg shadow-2xl p-8 overflow-y-auto max-h-[800px]">
            <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">Términos y Condiciones</h2>
            <div className="space-y-4">
              {terms.map((term, index) => (
                <div key={index} className="border-b border-gray-200/30 pb-4">
                  <button
                    className="w-full text-left font-semibold py-2 px-4 rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200 text-slate-200"
                    onClick={() => toggleSection(index)}
                  >
                    {term.title}
                    <span className="float-right">{openSection === index ? '▲' : '▼'}</span>
                  </button>
                  {openSection === index && (
                    <div className="mt-2 px-4 text-slate-300">
                      {term.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import storeAuth from "../../context/storeAuth";
import dino from "../../assets/dino.jpg";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState("");
  const [rol, setRol] = useState("ADMIN");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setToken, setRol: setUserRol } = storeAuth();

  // Manejo del login tradicional (Admin)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const endpoint =
        rol === "ADMIN"
          ? `${import.meta.env.VITE_BACKEND_URL}/admin/login`
          : `${import.meta.env.VITE_BACKEND_URL}/pasante/login`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: passwords }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Error al iniciar sesión");

      const token = data.token;
      const usuario = data.admin || data.pasante;

      if (!usuario?.rol) throw new Error("Rol del usuario no definido");

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      setToken(token);
      setUserRol(usuario.rol.toLowerCase());

      if (usuario.rol.toLowerCase().includes("admin")) {
        navigate("/admin/dashboard");
      } else if (usuario.rol.toLowerCase() === "pasante") {
        navigate("/pasante/dashboard");
      } else {
        throw new Error("Rol no reconocido: " + usuario.rol);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Login con Google (solo para pasantes)
  const handleGoogleLogin = () => {
    // Redirige al backend que maneja la autenticación con Google
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  // Verificar si viene de un callback OAuth exitoso
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const rolParam = params.get("rol");

    if (token && rolParam) {
      const rolNormalizado = rolParam.toLowerCase();
      
      // Crear objeto usuario con todos los datos disponibles
      const usuario = {
        id: params.get("id") || "",
        rol: rolNormalizado,
        nombre: params.get("nombre") || "",
        email: params.get("email") || "",
        facultad: params.get("facultad") || "",
        celular: params.get("celular") || ""
      };

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      setToken(token);
      setUserRol(rolNormalizado);

      // Limpiar los parámetros de la URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Redirigir según el rol
      if (rolNormalizado === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (rolNormalizado === "pasante") {
        navigate("/pasante/dashboard", { replace: true });
      } else {
        setError("Rol de usuario no reconocido");
      }
    }
  }, [navigate, setToken, setUserRol]);

  return (
    <div className="min-h-screen flex">
      {/* Imagen lateral */}
      <div className="w-1/2 hidden md:block">
        <img src={dino} alt="Museo" className="w-full h-full object-cover" />
      </div>

      {/* Formulario */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-green-50">
        <h2 className="text-4xl font-bold text-teal-900 mb-8">Iniciar Sesión</h2>

        <form
          className="w-full max-w-md space-y-6 bg-white p-6 rounded-xl shadow-lg"
          onSubmit={handleSubmit}
        >
          {/* Selector de tipo de usuario */}
          <div>
            <label className="block text-teal-800 font-semibold mb-2">
              Tipo de usuario
            </label>
            <select
              value={rol}
              onChange={(e) => {
                setRol(e.target.value);
                setError(""); // Limpiar errores al cambiar
              }}
              required
              className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="ADMIN">Administrador</option>
              <option value="PASANTE">Pasante</option>
            </select>
          </div>

          {/* Campos de login tradicional (solo para Admin) */}
          {rol === "ADMIN" && (
            <>
              <div>
                <label className="block text-teal-800 font-semibold mb-2">
                  Correo electrónico
                </label>
                <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-teal-500">
                  <FaUser className="text-teal-700 mr-2" />
                  <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="w-full focus:outline-none bg-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-teal-800 font-semibold mb-2">
                  Contraseña
                </label>
                <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2 relative focus-within:ring-2 focus-within:ring-teal-500">
                  <FaLock className="text-teal-700 mr-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    className="w-full focus:outline-none bg-transparent pr-10"
                    value={passwords}
                    onChange={(e) => setPasswords(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 text-teal-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-800 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold"
              >
                Iniciar sesión
              </button>

              <div className="text-right">
                <Link
                  to="/recuperar"
                  className="text-sm text-teal-700 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </>
          )}

          {/* Botón de Google (solo para Pasantes) */}
          {rol === "PASANTE" && (
            <>
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">
                  Los pasantes deben iniciar sesión con su cuenta institucional de Google
                </p>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C35.5 2.6 30.1 0 24 0 14.6 0 6.4 5.4 2.4 13.2l7.9 6.1C12.3 13.1 17.7 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.1 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.4c-.5 2.8-2.1 5.2-4.5 6.8l7 5.4c4.1-3.8 6.5-9.4 6.5-16.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.3 28.7c-1.2-2.8-1.2-6 0-8.8l-7.9-6.1c-3.4 6.8-3.4 14.8 0 21.6l7.9-6.7z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.1 0 11.4-2 15.2-5.5l-7-5.4c-2 1.3-4.7 2.1-8.2 2.1-6.3 0-11.6-4.3-13.5-10.2l-7.9 6.1C6.4 42.6 14.6 48 24 48z"
                  />
                </svg>
                Iniciar sesión con Google
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  ¿No tienes cuenta?{" "}
                  <Link to="/registro" className="text-teal-700 hover:underline font-semibold">
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </>
          )}

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
        </form>

        {/* Volver al inicio */}
        <div className="mt-6 w-full max-w-md">
          <Link
            to="/"
            className="flex items-center justify-center text-sm text-teal-800 hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};
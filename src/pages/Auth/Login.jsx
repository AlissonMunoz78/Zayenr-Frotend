import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import storeAuth from "../../context/storeAuth";
import dino from "../../assets/dino.jpg";
import { useMsal } from "@azure/msal-react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("ADMIN"); // Valor inicial ADMIN
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setToken, setRol: setUserRol } = storeAuth();
  const { instance } = useMsal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint =
        rol === "ADMIN"
          ? `${import.meta.env.VITE_BACKEND_URL}/admin/login`
          : `${import.meta.env.VITE_BACKEND_URL}/pasantes/login`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Error al iniciar sesión");

      const token = data.token;
      const usuario = data.admin || data.pasante || data.usuario;
      if (!usuario?.rol) throw new Error("Rol del usuario no definido");

      const rolNormalizado = usuario.rol.toLowerCase();
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      setToken(token);
      setUserRol(rolNormalizado);

      if (rolNormalizado.includes("admin")) {
        navigate("/admin/dashboard");
      } else if (rolNormalizado === "pasante") {
        navigate("/dashboard");
      } else {
        throw new Error("Rol no reconocido: " + rolNormalizado);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMicrosoftLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/microsoft`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 hidden md:block">
        <img src={dino} alt="Museo" className="w-full h-full object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-green-50">
        <h2 className="text-4xl font-bold text-teal-900 mb-8">Iniciar Sesión</h2>

        <form
          className="w-full max-w-md space-y-6 bg-white p-6 rounded-xl shadow-lg"
          onSubmit={handleSubmit}
        >
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
            </>
          )}

          <div>
            <label className="block text-teal-800 font-semibold mb-2">
              Tipo de usuario
            </label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
              className="w-full border border-teal-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
            >
              <option value="ADMIN">Administrador</option>
              <option value="PASANTE">Pasante</option>
            </select>
          </div>

          {rol === "PASANTE" && (
            <>
              {/* Botón de Microsoft */}
              <button
                type="button"
                onClick={handleMicrosoftLogin}
                className="w-full mt-4 flex items-center justify-center bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition-colors shadow-md animate-fadeIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="11" height="11" fill="#F35325" />
                  <rect x="13" width="11" height="11" fill="#81BC06" />
                  <rect y="13" width="11" height="11" fill="#05A6F0" />
                  <rect x="13" y="13" width="11" height="11" fill="#FFBA08" />
                </svg>
                Iniciar sesión con Microsoft
              </button>

             {/* Botón de Google */}
<button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full mt-4 flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md animate-fadeIn"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="mr-3">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.5 2.6 29.9 0 24 0 14.6 0 6.3 5.4 2.5 13.3l7.9 6.2C12.1 13.4 17.6 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 2.8-2.1 5.2-4.4 6.8l6.8 6.8C43.5 38.4 46.5 31.9 46.5 24.5z" />
    <path fill="#FBBC05" d="M10.4 28.3c-.5-1.4-.8-2.9-.8-4.3s.3-3 .8-4.3l-7.9-6.2C1.6 16.4 0 20.1 0 24s1.6 7.6 2.5 10.5l7.9-6.2z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-6.8-6.8c-2 1.4-4.6 2.3-9 2.3-6.4 0-11.9-3.9-14-9.4l-7.9 6.2C6.3 42.6 14.6 48 24 48z" />
  </svg>
  Iniciar sesión con Google
</button>


              <div className="text-right mt-2">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-sm text-teal-700 hover:underline"
                >
                  Volver 
                </button>
              </div>
            </>
          )}

          {rol === "ADMIN" && (
            <>
              <button
                type="submit"
                className="w-full bg-teal-800 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors mt-6"
              >
                Iniciar sesión
              </button>

              <div className="text-right mt-2">
                <Link
                  to="/recuperar"
                  className="text-sm text-teal-700 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </>
          )}

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </form>

        <div className="flex justify-between mt-6 w-full max-w-md">
          <Link
            to="/"
            className="flex items-center text-sm text-teal-800 hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

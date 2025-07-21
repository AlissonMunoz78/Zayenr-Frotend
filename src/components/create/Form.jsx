import { useState, useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from "react-toastify"
import { generateAvatar, convertBlobToBase64 } from "../../helpers/consultarIA"

export const FormPasante = ({ pasante }) => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm()
  const { fetchDataBackend } = useFetch()

  const [avatar, setAvatar] = useState({
    image: "https://cdn-icons-png.flaticon.com/512/2138/2138440.png",
    prompt: "",
    loading: false
  })

  const handleGenerateImage = async () => {
    setAvatar(prev => ({ ...prev, loading: true }))
    const blob = await generateAvatar(avatar.prompt)

    if (blob?.type === "image/jpeg" || blob?.type === "image/png") {
      const base64Image = await convertBlobToBase64(blob)
      const imageUrl = URL.createObjectURL(blob)
      setAvatar(prev => ({ ...prev, image: imageUrl, loading: false }))
      setValue("avatarIA", base64Image)
    } else {
      toast.error("Error al generar la imagen, intenta de nuevo.")
      setAvatar(prev => ({
        image: "https://cdn-icons-png.flaticon.com/512/2138/2138440.png",
        loading: false
      }))
    }
  }

  const enviarDatos = async (data) => {
    const storedUser = JSON.parse(localStorage.getItem("auth-token"))
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser?.state?.token}`
    }

    let url = `${import.meta.env.VITE_BACKEND_URL}/pasante/registro`
    let method = "POST"

    if (pasante?._id) {
      url = `${import.meta.env.VITE_BACKEND_URL}/pasante/actualizar/${pasante._id}`
      method = "PUT"
    }

    const response = await fetchDataBackend(url, JSON.stringify(data), method, headers)

    if (response) {
      toast.success(pasante ? "Pasante actualizado exitosamente" : "Pasante registrado exitosamente")
      setTimeout(() => navigate("/dashboard/pasantes"), 2000)
    }
  }

  useEffect(() => {
    if (pasante) {
      reset({
        cedula: pasante.cedula || "",
        nombres: pasante.nombres || "",
        correo: pasante.correo || "",
        telefono: pasante.telefono || "",
        carrera: pasante.carrera || "",
        institucion: pasante.institucion || "",
        avatarIA: pasante.avatarIA || ""
      })

      if (pasante.avatarIA) {
        setAvatar(prev => ({ ...prev, image: pasante.avatarIA }))
      }
    }
  }, [pasante, reset])

  return (
    <form onSubmit={handleSubmit(enviarDatos)} className="space-y-6">
      <ToastContainer />
      <fieldset className="border-2 border-gray-500 p-6 rounded-lg shadow-lg">
        <legend className="text-xl font-bold text-gray-700 bg-gray-200 px-4 py-1 rounded-md">
          {pasante ? "Actualizar Pasante" : "Registro de Pasante"}
        </legend>

        {/* Campos del pasante */}
        {[
          { name: "cedula", label: "Cédula" },
          { name: "nombres", label: "Nombres completos" },
          { name: "correo", label: "Correo electrónico", type: "email" },
          { name: "telefono", label: "Teléfono", type: "tel" },
          { name: "carrera", label: "Carrera" },
          { name: "institucion", label: "Institución" }
        ].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label className="mb-2 block text-sm font-semibold">{label}</label>
            <input
              type={type}
              placeholder={`Ingrese ${label.toLowerCase()}`}
              {...register(name, { required: true })}
              className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
            />
            {errors[name] && <span className="text-red-600 text-sm">Campo obligatorio</span>}
          </div>
        ))}

        {/* Imagen generada por IA */}
        <div className="mt-5">
          <label className="mb-2 block text-sm font-semibold">Prompt para imagen IA</label>
          <div className="flex items-center gap-10 mb-5">
            <input
              type="text"
              placeholder="Describe cómo debe lucir el pasante"
              className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
              value={avatar.prompt}
              onChange={(e) => setAvatar(prev => ({ ...prev, prompt: e.target.value }))}
            />
            <button
              type="button"
              onClick={handleGenerateImage}
              className="py-1 px-8 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
              disabled={avatar.loading}
            >
              {avatar.loading ? "Generando..." : "Generar IA"}
            </button>
          </div>
          {avatar.image && (
            <img src={avatar.image} alt="Avatar generado" width={100} height={100} className="rounded-full shadow-md" />
          )}
          <input type="hidden" {...register("avatarIA")} />
        </div>

        <input
          type="submit"
          value={pasante ? "Actualizar Pasante" : "Registrar Pasante"}
          className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg 
          hover:bg-gray-600 cursor-pointer transition-all"
        />
      </fieldset>
    </form>
  )
}

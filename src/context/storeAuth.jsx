import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// crear la variable global 
const storeAuth = create(
    persist(
        set => ({
            token: null,
            rol: null,
            setToken: (token) => set({ token }),
            setRol: (rol) => set({ rol }),
            clearToken: () => set({ token: null })
        }),
        { name: "auth-token" }
    )

)


export default storeAuth;
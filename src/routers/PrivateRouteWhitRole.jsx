// src/routers/PrivateRouteWithRole.jsx
import storeAuth from "../context/storeAuth";
import { Forbidden } from "../pages/Forbidden";

export default function PrivateRouteWithRole({ children, rolPermitido }) {
  const { rol } = storeAuth();
  const rolNormalizado = rol?.toLowerCase();

  return rolNormalizado === rolPermitido.toLowerCase()
    ? children
    : <Forbidden />;
}

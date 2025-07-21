import storeAuth from '../context/storeAuth';
import { Forbidden } from '../pages/Forbidden';


export default function PrivateRouteWithRole({ children }) {

    const {rol} = storeAuth()
    
    return ("paciente" === rol) ? <Forbidden/> : children
    
}
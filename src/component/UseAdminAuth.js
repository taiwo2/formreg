import { useEffect } from "react";
import {Navigate} from 'react-router-dom'

import { checkUserIsAdmin } from "./adminright";
import {useAuthValue} from './AuthContext'

export default function UseAdminAuth({children}) {
  const {currentUser} = useAuthValue()
    if(!checkUserIsAdmin(currentUser?.emailVerified)){
        return <Navigate to='/' replace/>
      }
  
  return children
}


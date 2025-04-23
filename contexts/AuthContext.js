
"use client";
import ApiServeces from "@/lib/ApiServeces";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [usersOrders, setUsersOrders] = useState([]);
const[plans,setPlans] = useState([])

  const getUsersOrders = async()=>{
  
    try {
      const res = await ApiServeces.getUserOrders(user._id)
      if(res.data.success){
        const orders = res.data.orders
        setUsersOrders(orders)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getAllPlans= async()=>{
  
    try {
      const res = await ApiServeces.getAllPlans()
      if(res.data.success){
        const plans = res.data.plans
        setPlans(plans)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") {
 
      return null;
    } else {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    }
  }, []);

  useEffect(()=>{
    if(user){
       getUsersOrders()
       getAllPlans()}

  },[user])

  

  // Logout function
  const logout = async () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const value = {
    user,
    logout,
    setUser,
    usersOrders,
    getUsersOrders,
    plans,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

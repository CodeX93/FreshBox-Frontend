"use client";
import ApiServeces from "@/lib/ApiServeces";
import { createContext, useContext, useEffect, useState } from "react";
const servicesContext = createContext({});

export function ServicesProvider({ children }) {
  const [servicesAreas, setServicesAreas] = useState([]);
  const [services, setServices] = useState([]);
  //get services
  const getAllServices = async () => {
    try {
      const res = await ApiServeces.getActiveServices();

      if (res.data.success) {
        
        const services = res.data.services;
        setServices(services);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get services areas

  const getAllServicesAreas = async () => {
    try {
      const res = await ApiServeces.getActiveServicesAreas();

      if (res.data.success) {
        const areas = res.data.areas;
        setServicesAreas(areas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllServices();
    getAllServicesAreas();
  }, []);

  const value = {
    services,
    servicesAreas,
  };

  return (
    <servicesContext.Provider value={value}>
      {children}
    </servicesContext.Provider>
  );
}

export const useServices = () => {
  return useContext(servicesContext);
};

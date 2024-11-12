import type { JWTPayload } from "@/@types/jwt";

import cookies from "js-cookie";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export function getMemberAreas() {
  const [areas, setAreas] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.get("t21-arena-park.session-token");

    if (!token) {
      return navigate("/");
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1])) as JWTPayload;

      setAreas(Array.isArray(payload.area) ? payload.area : []);
    } 
    
    catch (error) {
      navigate("/");
    }
  }, [navigate]);

  return areas;
}
import type { JWTPayload } from "@/@types/jwt";

import cookies from "js-cookie";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export function getMemberId() {
    const [userId, setUserId] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = cookies.get("t21-arena-park.session-token");

        if (!token) {
            return navigate("/");
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1])) as JWTPayload;
            
            setUserId(payload.sub);
        } 
        
        catch (error) {
            navigate("/");
        }
    }, [navigate]);

    return userId;
}

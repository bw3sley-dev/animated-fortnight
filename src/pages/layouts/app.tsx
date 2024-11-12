import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";
import { Loading } from "@/components/ui/loading";

import { useAuth } from "@/hooks/use-auth";

import clsx from "clsx";

import { useEffect, useState } from "react";

import { Outlet, useMatch, useNavigate } from "react-router-dom";

export function AppLayout() {
    const navigate = useNavigate();

    const match = useMatch("/athletes/:id/anamnesis");

    const { authenticated, loading } = useAuth();

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    useEffect(() => {
        if (!loading && authenticated === false) {
            navigate("/");
        }
    }, [authenticated, loading, navigate]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={clsx("grid grid-cols-1 grid-rows-[auto_1fr] h-full min-h-screen bg-slate-900 text-slate-200", match === null && "lg:grid-cols-[auto_1fr]")}>
            <Header isOpen={isNavbarOpen} onClickOpen={setIsNavbarOpen} hasGoBack={match !== null} />

            {match === null && <Navbar isOpen={isNavbarOpen} />}

            <div className="overflow-auto h-[calc(100vh-72px)] lg:h-[calc(100vh-80px)]">
                <Outlet />
            </div>
        </div>
    )
}
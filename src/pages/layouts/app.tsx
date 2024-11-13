import { Header } from "@/components/header";

import { Navbar } from "@/components/navbar";

import { Loading } from "@/components/ui/loading";

import { useAuth } from "@/hooks/use-auth";

import { api } from "@/lib/axios";

import { getMemberRole } from "@/utils/auth/get-member-role";

import { isAxiosError } from "axios";

import clsx from "clsx";

import { useEffect, useState } from "react";

import { Outlet, useMatch, useNavigate } from "react-router-dom";

export function AppLayout() {
    const navigate = useNavigate();

    const match = useMatch("/athletes/:id/anamnesis");

    const { authenticated, loading } = useAuth();

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const role = getMemberRole();
    
    const isMembersPage = useMatch("/members");

    useEffect(() => {
        if (!loading && authenticated === false) {
            navigate("/", { replace: true });
        }

        if (role === "MEMBER" && isMembersPage) {
            navigate("/404", { replace: true });
        }

        const interceptorId = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (isAxiosError(error)) {
                    const status = error.response?.status;

                    if (status === 401 || status === 403 || status === 404) {
                        navigate("/404", { replace: true });
                    }

                    if (status === 400) {
                        navigate("/", { replace: true });
                    }
                }
            },
        )

        return () => {
            api.interceptors.response.eject(interceptorId);
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
import { Helmet } from "react-helmet-async";

import { AthleteCard } from "./athlete-card";
import { AthleteAnamnesisCard } from "./athlete-anamnesis-card";
import { AthleteGuardianCard } from "./athlete-guardian-card";
import { AthleteAddressCard } from "./athlete-address-card";
import { AthleteTermsCard } from "./athlete-terms-card";
import { AthleteThreadCard } from "./athlete-thread-card";

import { AthleteSkeletonCard } from "./athlete-skeleton-card";
import { AthleteAnamnesisSkeletonCard } from "./athlete-anamnesis-skeleton-card";
import { AthleteGuardianSkeletonCard } from "./athlete-guardian-skeleton-card";
import { AthleteAddressSkeletonCard } from "./athlete-address-skeleton-card";

import { useQuery } from "@tanstack/react-query";

import { getAthlete } from "@/api/get-athlete";

import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";

export function Athlete() {
    const { athleteId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (!athleteId) {
            navigate("/404");
        }
    }, [athleteId, navigate]);

    if (!athleteId) {
        return null;
    }

    const { data, isLoading } = useQuery({
        queryKey: ["athletes", athleteId],
        queryFn: () => getAthlete({ athleteId: athleteId }),
        enabled: Boolean(athleteId)
    })

    // const { data: threds, isLoading: isLoadingThreads } = useQuery({
    //     queryKey: ["athlete-threads", athleteId],
    //     queryFn: () => getAthleteThread({ athleteId: athleteId, area:  })
    // })

    return (
        <>
            {data && <Helmet title={`Perfil de ${data?.athlete?.name}`} />}

            <div className="flex flex-col max-w-[1352px] p-6 pb-10 gap-10 mx-auto">
                <div className="grid items-start gap-y-10 gap-x-6 w-full mt-10 mx-auto mb-11">
                    <main className="grid lg:grid-cols-[321px_1fr] items-start lg:gap-8 gap-4 relative">
                        <aside className="self-start lg:sticky md:top-6 flex flex-col gap-4">
                            {isLoading || !data ? <AthleteSkeletonCard /> : <AthleteCard athlete={data.athlete} />}

                            <AthleteTermsCard isLoading={isLoading} data={{
                                guardian: {
                                    name: data?.guardian?.name ?? "",
                                    cpf: data?.guardian?.cpf ?? "",
                                    rg: data?.guardian?.rg ?? ""
                                },

                                athlete: {
                                    name: data?.athlete?.name ?? ""
                                }
                            }} />
                        </aside>

                        <div className="flex flex-col gap-4 overflow-hidden">
                            {isLoading || !data ? <AthleteAnamnesisSkeletonCard /> : <AthleteAnamnesisCard athleteId={athleteId} anamnesis={data.anamnesis} />}

                            {isLoading || !data ? <AthleteGuardianSkeletonCard /> : <AthleteGuardianCard athleteId={athleteId} guardian={data.guardian ?? null} />}

                            {isLoading || !data ? <AthleteAddressSkeletonCard /> : <AthleteAddressCard athleteId={athleteId} address={data?.address ?? null} />}

                            {data && <AthleteThreadCard athleteId={data.athlete.id} />}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
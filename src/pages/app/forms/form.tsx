import { Helmet } from "react-helmet-async";

import { useQuery } from "@tanstack/react-query";

import { useNavigate, useParams } from "react-router-dom";

import { getAthleteAnamnesis } from "@/api/get-athlete-anamnesis";

import { useEffect } from "react";

import { Tabs, TabsList } from "@/components/ui/tabs";

import { FormTabTrigger } from "./form-tab-trigger";
import { FormTabTriggerSkeleton } from "./form-tab-trigger-skeleton";
import { FormTabContent } from "./form-tab-content";
import { FormTabContentSkeleton } from "./form-tab-content-skeleton";

export function Form() {
    const { athleteId, slug } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (!athleteId) {
            navigate("/404");
        }
    }, [athleteId, slug, navigate])

    if (!athleteId) {
        return null;
    }

    const { data, isLoading } = useQuery({
        queryKey: ["athlete-anamnesis", athleteId],
        queryFn: () => getAthleteAnamnesis({ athleteId }),
        enabled: Boolean(athleteId)
    })

    const defaultTabValue = data && data.anamnesis.sections[0].id;

    return (
        <>
            <Helmet title={`Anamnese do(a) ${data?.athlete.name}`} />

            <div className="flex flex-col max-w-[1352px] p-6 pb-10 gap-10 mx-auto">
                <div className="grid items-start gap-y-10 gap-x-6 w-full mt-10 mx-auto mb-11">
                    <div className="col-span-full flex flex-col gap-1">
                        <h1 className="font-bold font-error text-2xl">Anamnese do <small>(a)</small> {data?.athlete.name}</h1>

                        <p className="text-sm text-slate-400">
                            Gerencie as informações da anamnese do atleta.
                        </p>
                    </div>

                    {data?.anamnesis && (
                        <Tabs defaultValue={isLoading ? "loading" : defaultTabValue} className="grid lg:grid-cols-[400px_1fr] items-start lg:gap-8">
                            <TabsList asChild>
                                <aside className="flex lg:flex-col">
                                    {isLoading ? <FormTabTriggerSkeleton /> : data.anamnesis.sections.map(section => (
                                        <FormTabTrigger key={section.id} section={section} />
                                    ))}
                                </aside>
                            </TabsList>

                            <main className="mt-10 lg:mt-0">
                                {isLoading ? <FormTabContentSkeleton /> : data.anamnesis.sections.map(section => (
                                    <FormTabContent key={section.id} section={section} />
                                ))}
                            </main>
                        </Tabs>
                    )}
                </div>
            </div>
        </>
    )
}
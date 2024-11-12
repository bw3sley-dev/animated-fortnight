import { TabsTrigger } from "@/components/ui/tabs";

import { getIconByName } from "@/utils/get-icon-by-name";

import { ChevronRight } from "lucide-react";

interface FormTabTriggerProps {
    section: {
        id: string,
            
        name: string,
        description: string,
        icon: string,

        questions: {
            id: string,

            name: string,

            options?: {
                id: string,

                label: string,
                value: string
            }[]
        }[]
    }
}

export function FormTabTrigger({ section }: FormTabTriggerProps) {
    return (
        <TabsTrigger key={section.id} value={section.id} className="space-x-3">
            {getIconByName(section.icon)}

            <span className="text-start mr-auto text-base hover:text-slate-300 hidden lg:flex flex-1">
                {section.name}
            </span>

            <ChevronRight className="size-4 hidden lg:inline-block" />
        </TabsTrigger>
    )
}
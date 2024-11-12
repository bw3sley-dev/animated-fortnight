import { Button } from "@/components/ui/button";

import { TabsContent } from "@/components/ui/tabs";

import { FormQuestion } from "./form-question";

import { getIconByName } from "@/utils/get-icon-by-name";

interface FormTabContentProps {
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

export function FormTabContent({ section }: FormTabContentProps) {
    return (
        <TabsContent key={section.id} value={section.id}>
            <div className="flex items-center gap-3 mb-8">
                {getIconByName(section.icon)}

                <h2 className="text-xl">{section.name}</h2>
            </div>

            <form method="POST" className="w-full flex flex-col gap-4">
                <div className="py-10 px-12 border border-slate-700 bg-slate-800 rounded-md space-y-6">
                    {section.questions.map(question => (
                        <FormQuestion key={question.id} question={question} />
                    ))}
                </div>

                <div className="self-end">
                    <Button type="submit" variant="primary" size="lg">
                        <span>Salvar</span>
                    </Button>
                </div>
            </form>
        </TabsContent>
    )
}
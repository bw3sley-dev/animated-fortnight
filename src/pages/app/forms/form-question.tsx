import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

interface FormQuestionProps {
    question: {
        id: string,

        name: string,

        options?: {
            id: string,

            label: string,
            value: string
        }[]
    }
}

export function FormQuestion({ question }: FormQuestionProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={question.id}>{question.name}</Label>

            <Textarea />
        </div>
    )
}
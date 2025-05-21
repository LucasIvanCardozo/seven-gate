import { z } from "zod"

export function parse<T extends z.ZodTypeAny>({
    schema,
    data,
    arrayFields = [],
}: Props<T>): z.infer<T> {
    const obj: Record<string, any> = {}

    for (const key of data.keys()) {
        const values = data.getAll(key).map((v) => String(v))

        if (arrayFields.includes(key)) {
            obj[key] = values
        } else {
            obj[key] = values.length > 1 ? values : values[0]
        }
    }

    const parsed = schema.safeParse(obj)
    if (!parsed.success) throw new Error(parsed.error.errors[0].message)
    return parsed.data
}

interface Props<T extends z.ZodTypeAny> {
    schema: T
    data: FormData
    arrayFields?: string[]
}

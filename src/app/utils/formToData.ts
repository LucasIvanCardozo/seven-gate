export const formToData = (formData: FormData) =>
    Object.fromEntries(formData.entries())
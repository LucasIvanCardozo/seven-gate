import bcrypt from "bcryptjs"

export const hash = (str: string) => bcrypt.hashSync(str, 10)
export const compare = (str: string, hash: string) =>
    bcrypt.compareSync(str, hash)

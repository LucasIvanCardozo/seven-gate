"use server"
import {
    v2 as cloudinary,
    UploadApiResponse,
    UploadApiOptions,
} from "cloudinary"

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env

if (!CLOUDINARY_CLOUD_NAME) throw new Error("CLOUDINARY_CLOUD_NAME is missing!")
if (!CLOUDINARY_API_KEY) throw new Error("CLOUDINARY_API_KEY is missing!")
if (!CLOUDINARY_API_SECRET) throw new Error("CLOUDINARY_API_SECRET is missing!")

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
})

export const uploadFile = async (file: File, options?: UploadApiOptions) => {
    const type = file.type.split("/").reverse()[0]
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const response: UploadApiResponse = await cloudinary.uploader.upload(
        `data:application/${type};base64,${buffer.toString("base64")}`,
        {
            ...options,
            resource_type: "raw",
            access_mode: "public",
        },
    )

    const { url } = response

    return {
        url,
    }
}

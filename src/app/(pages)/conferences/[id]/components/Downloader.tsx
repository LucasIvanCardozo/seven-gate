"use client"

export const Downloader = ({ url, title }: { url: string; title: string }) => {
    const downloadFile = async () => {
        const response = await fetch(url)
        const blob = await response.blob()
        const link = document.createElement("a")
        link.href = window.URL.createObjectURL(blob)
        link.download = title
        link.click()
    }
    return (
        <button onClick={() => downloadFile()} className="text dark">
            Descargar
        </button>
    )
}

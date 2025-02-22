"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Upload() {
    const router = useRouter()

    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return alert("لطفا یک فایل انتخاب کنید");

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://localhost:4000/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("فایل با موفقیت آپلود شد");
                router.push("/chat")
            } else {
                alert("خطا در آپلود فایل");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("مشکلی پیش آمد");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6">
            {/* باکس آپلود فایل */}
            <label
                className="w-80 h-40 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                <input type="file" onChange={handleFileChange} className="hidden"/>
                <span className="text-gray-600">{file ? file.name : "برای آپلود کلیک کنید"}</span>
            </label>

            {/* دکمه آپلود */}
            <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 transition"
            >
                {uploading ? "در حال آپلود..." : "آپلود فایل"}
            </button>
        </div>
    );
}

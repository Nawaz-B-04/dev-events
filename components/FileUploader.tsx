"use client";

import { CldUploadWidget } from 'next-cloudinary';
import { useCallback } from 'react';
import Image from 'next/image';

interface FileUploaderProps {
    onFieldChange: (url: string) => void;
    imageUrl: string;
}

export default function FileUploader({ onFieldChange, imageUrl }: FileUploaderProps) {
    const onUpload = useCallback((result: any) => {
        onFieldChange(result.info.secure_url);
    }, [onFieldChange]);

    return (
        <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
            onSuccess={onUpload}
            options={{
                multiple: false,
                resourceType: "image",
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open()}
                        className="flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-slate-950 border-2 border-dashed border-slate-800 items-center justify-center hover:bg-slate-900 transition-colors"
                    >
                        {imageUrl ? (
                            <div className="relative h-full w-full">
                                <Image
                                    src={imageUrl}
                                    alt="uploaded-image"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-5 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-slate-600"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                <p className="font-medium">Click to upload image</p>
                                <p className="text-xs text-gray-500 mt-2">SVG, PNG, JPG</p>
                            </div>
                        )}
                    </div>
                );
            }}
        </CldUploadWidget>
    );
}

import { useCallback, useId, useState } from "react";
import { set, unset, UrlInputProps } from "sanity";
import { Stack, Text } from "@sanity/ui";
import Image from "next/image";

export function R2Uploader(props: UrlInputProps) {
    const { value, onChange, elementProps } = props;
    const inputId = useId();
    const [uploading, setUploading] = useState(false);

    const handleFileChange = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setUploading(true);
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload-image-r2", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            const url = data.url;

            onChange(url ? set(url) : unset());
            setUploading(false);
        },
        [onChange]
    )

    const { value: _omitValue, ...safeProps } = elementProps;
    void _omitValue;

    return (
        <Stack space={3}>
            {value && (
                <div className="w-[300] aspect-[16/9] relative">
                    <Image src={value} alt="Uploaded" fill className="nextImage" />
                </div>
            )}
            <label htmlFor={inputId}>
                <input
                    {...safeProps}
                    id={inputId}
                    type="file"
                    onChange={handleFileChange}
                    disabled={uploading}
                />
            </label>
            {uploading && <Text size={1}>Uploading...</Text>}
        </Stack>
    )
}
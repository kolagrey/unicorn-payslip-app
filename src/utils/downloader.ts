import axios from "axios";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { TDownloadFileFromUrlParams } from "../types/downloader.type";

export const downloadFileFromUrl = async ({
  url,
  fileName,
}: TDownloadFileFromUrlParams): Promise<void> => {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "blob",
    });

    const blob: Blob = response.data;

    // Convert blob to base64
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64Data: string | ArrayBuffer | null = reader.result;
      if (typeof base64Data === "string") {
        await Filesystem.writeFile({
          path: fileName,
          data: base64Data,
          directory: Directory.Documents,
        });
      } else {
        throw new Error("Failed to convert file to Base64 string");
      }
    };
  } catch (error) {
    console.error("Download error:", error);
  }
};

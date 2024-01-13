import {
  Portfolio,
  PortfolioInputs,
  Profile,
  ProfileSchema,
} from "@/types/api";
import { Response } from "@/types/api";
import useSWR from "swr";

export async function fetcher<TData>(
  endpoint: string,
  options?: RequestInit
): Promise<TData> {
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_DB_URL);
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch at " + endpoint);
  }

  return res.json();
}

export const useProfile = () => {
  const { data, error, isLoading } = useSWR<Profile>("/profiles/1", fetcher);

  return {
    profile: data,
    isLoadingProfile: isLoading,
    isErrorProfile: error,
  };
};

export const usePortfolio = () => {
  const { data, error, isLoading } = useSWR<Portfolio[]>(
    "/portfolios",
    fetcher
  );

  return {
    portfolio: data,
    isLoadingPorto: isLoading,
    isErrorPorto: error,
  };
};

export async function convertToCloudinaryURL(url: string) {
  try {
    if (!url.startsWith("blob")) {
      return url;
    }

    const data = new FormData();
    data.append("file", await fetch(url).then((res) => res.blob()));
    data.append("upload_preset", "ruvcqm7j");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dywbf3czv/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!res.ok) {
      throw new Error("failed to upload product photo");
    }

    const json = await res.json();

    // Remove version
    const secureUrl = new URL(json.secure_url as string);
    const segments = secureUrl.pathname.split("/");
    segments.splice(4, 1);
    secureUrl.pathname = segments.join("/");

    return secureUrl.toString();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

    return null;
  }
}

export async function updatePortfolio(
  mode: "add" | "edit",
  payload: PortfolioInputs,
  id?: number
): Promise<Response> {
  try {
    const { avatar, backgroundImage, ...data } = payload;

    const convertedImage = await convertToCloudinaryURL(backgroundImage);
    const convertedAvatar = await convertToCloudinaryURL(avatar);

    if (!convertedImage) {
      throw new Error("Failed to upload the image. Try again later");
    }
    if (!convertedAvatar) {
      throw new Error("Failed to upload the avatar. Try again later");
    }

    const url = new URL(
      `${mode === "edit" ? `/profiles/${id}` : "/profiles"}`,
      process.env.NEXT_PUBLIC_DB_URL
    );

    const options: RequestInit = {
      method: mode === "add" ? "POST" : "PATCH",
      headers: {
        accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
        avatar: convertedAvatar,
        backgroundImage: convertedImage,
      }),
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to update a product");
    }

    return {
      success: true,
      message: `Product ${mode === "add" ? "added" : "updated"}`,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Something went wrong",
    };
  }
}

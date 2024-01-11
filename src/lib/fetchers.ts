import { PortfolioInputs } from "@/types/api";
import { Response } from "@/types/api";

export async function updatePost(
  mode: "add" | "edit",
  payload: PortfolioInputs,
  id?: number
): Promise<Response> {
  try {
    const formData = new FormData();
    //   formData.append("name", payload.name)
    //   formData.append("generic_name", payload.generic_name)
    //   formData.append("content", payload.content)
    //   formData.append("description", payload.description)
    //   formData.append("drug_form", payload.drug_form)
    //   formData.append("unit_in_pack", payload.unit_in_pack)
    //   formData.append("weight", payload.weight.toString())
    //   formData.append("length", payload.length.toString())
    //   formData.append("width", payload.width.toString())
    //   formData.append("height", payload.height.toString())
    //   formData.append("image", payload.image)
    //   formData.append("manufacturer_id", payload.manufacturer_id.toString())
    //   formData.append("selling_unit", payload.selling_unit.toString())
    //   formData.append(
    //     "drug_classification_id",
    //     payload.drug_classification_id.toString(),
    //   )
    //   formData.append(
    //     "product_category_id",
    //     payload.product_category_id.toString(),
    //   )

    const url = new URL(
      `${mode === "edit" ? `/v1/products/${id}` : "/v1/products"}`,
      process.env.NEXT_PUBLIC_DB_URL
    );

    const options: RequestInit = {
      method: mode === "add" ? "POST" : "PUT",
      headers: {
        accept: "application/json",
      },
      body: formData,
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to update a product");
    }

    if (mode === "edit") {
      //   mutate(url);
      const id = (await res.json()).id as string;
      await fetch(`/api/revalidate/products/${id}`);
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

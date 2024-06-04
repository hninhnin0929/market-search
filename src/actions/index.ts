// actions/index.ts
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function searchByKeywords(
  formState: { message: string },
  formData: FormData
) {
  try {
    // Check the user's inputs and make sure they're valid
    const allowedKeywords = formData.get("allowed_keywords") as string;
    const excludedKeywords = formData.get("excluded_keywords") as string;
    console.log("allowedKeywords--------", allowedKeywords);
    console.log("allowedKeywords---------", excludedKeywords);

    // if(typeof title != 'string' || title.length < 3){
    //     return {
    //         message: 'Title must be longer'
    //     };
    // }

    if (!allowedKeywords || allowedKeywords.trim() === "") {
      return {
        message: "Enter allowed keywords",
      };
    }

    const searchData = {
      searchedKeywords: allowedKeywords
        .split(",")
        .map((keyword) => keyword.trim()),
      excludeKeywords: excludedKeywords
        .split(",")
        .map((keyword) => keyword.trim()),
    };
    console.log("Search Data-----------", searchData);

    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("backend data------------", data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong...",
      };
    }
  }

  revalidatePath("/");
  // Redirect the user back to the root route
  redirect("/");
}

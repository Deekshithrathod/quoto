"use server";
import { revalidatePath } from "next/cache";

export const handleClickServer = () => {
	console.log("clicked server");
	revalidatePath("/");
};

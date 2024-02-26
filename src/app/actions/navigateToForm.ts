"use server";

import { redirect } from "next/navigation";

export async function navigate(id: string) {
  redirect(`/forms/edit/${id}`);
}

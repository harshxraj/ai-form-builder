"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { forms } from "@/db/schema";

export const getSubmissions = async (formId: number) => {
  const form = await db.query.forms.findFirst({
    where: eq(forms.id, formId),
    with: {
      questions: {
        with: {
          fieldOptions: true,
        },
      },
      submissions: {
        with: {
          answers: {
            with: {
              fieldOption: true,
            },
          },
        },
      },
    },
  });
  return form;
};

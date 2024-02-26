"use server";

import { db } from "@/db";
import { forms, questions as dbQuestions, fieldOptions } from "@/db/schema";
import { auth } from "@/auth";
import { InferInsertModel, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

type Form = InferInsertModel<typeof forms>;
type Question = InferInsertModel<typeof dbQuestions>;
type FieldOption = InferInsertModel<typeof fieldOptions>;

interface SaveFormData extends Form {
  questions: Array<Question & { fieldOptions?: FieldOption[] }>;
}

export async function saveForm(data: SaveFormData) {
  const { name, description, questions } = data;
  const session = await auth();
  const userId = session?.user?.id;

  const newForm = await db
    .insert(forms)
    .values({
      formID: uuidv4(),
      name,
      description,
      userId,
      published: false,
    })
    .returning({ insertedId: forms.id, newFormCreated: forms.formID });
  const formId = newForm[0].insertedId;
  console.log("formId created", formId);
  console.log("formId created", newForm[0].newFormCreated);

  const newQuestions = data.questions.map((question) => {
    return {
      text: question.text,
      fieldType: question.fieldType,
      fieldOptions: question.fieldOptions,
      formId,
    };
  });

  await db.transaction(async (tx) => {
    for (const question of newQuestions) {
      const [{ questionId }] = await tx
        .insert(dbQuestions)
        .values(question)
        .returning({ questionId: dbQuestions.id });
      if (question.fieldOptions && question.fieldOptions.length > 0) {
        await tx.insert(fieldOptions).values(
          question.fieldOptions.map((option) => ({
            text: option.text,
            value: option.value,
            questionId,
          }))
        );
      }
    }
  });

  return newForm[0].newFormCreated;
}

"use server";

import { db } from "@/db";
import { forms, questions as dbQuestions, fieldOptions } from "@/db/schema";
import { auth } from "@/auth";
import { InferInsertModel, eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { getCurrentForm } from "./getUserForms";
import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = process.env.GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

type Form = InferInsertModel<typeof forms>;
type Question = InferInsertModel<typeof dbQuestions>;
type FieldOption = InferInsertModel<typeof fieldOptions>;

interface SaveFormData extends Form {
  questions: Array<Question & { fieldOptions?: FieldOption[] }>;
  user_prompt: string;
}

export async function saveForm(data: SaveFormData) {
  const { name, description, questions, user_prompt } = data;
  const session = await auth();
  const userId = session?.user?.id;

  const newForm = await db
    .insert(forms)
    .values({
      formID: uuidv4(),
      name,
      description,
      userId,
      user_prompt,
      published: false,
    })
    .returning({ insertedId: forms.id, newFormCreated: forms.formID });
  const formId = newForm[0].insertedId;
  // console.log("formId created", formId);
  // console.log("formId created", newForm[0].newFormCreated);

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

export async function publishForm(formId: string) {
  await db
    .update(forms)
    .set({ published: true })
    .where(eq(forms.formID, formId));
}

export async function deleteForm(formId: string) {
  await db.delete(forms).where(eq(forms.formID, formId));
}

export async function addMoreQuestion(
  prompt: string,
  id: number,
  formID: string,
  allQuestions: string
) {
  try {
    console.log("indside");
    const user_prompt = `${prompt} Based on the description, generate a survey object with 1 field of "questions" array where every element has 2 fields: text and the fieldType and fieldType can be of these options RadioGroup, Select, Input, Textarea, Switch; and return it in json format. For RadioGroup, and Select types also return fieldOptions array with text and value fields. And questions should 2 in quantity and more importantly the questions does not include these question ${allQuestions}. For example, for RadioGroup, and Select types, the field options array can be [{text: 'Yes', value: 'yes'}, {text: 'No', value: 'no'}] and for Input, Textarea, and Switch types, the field options array can be empty. For example, for Input, Textarea, and Switch types, the field options array can be []`;
    const result = await model.generateContent(user_prompt);
    const response = await result.response;
    const text = response.text();
    const jsonString = text.replace(/^```json\s*([\s\S]*)\s*```$/g, "$1");

    const responseObject = JSON.parse(jsonString);
    console.log("ADDITION QUESTIOS", responseObject);

    const currentForm = await getCurrentForm(formID || "");

    const newQuestions = responseObject.questions.map((question: any) => {
      return {
        text: question.text,
        fieldType: question.fieldType,
        fieldOptions: question.fieldOptions,
        formId: id,
      };
    });

    const updatedQuestions = [
      ...(currentForm?.questions || []),
      ...newQuestions,
    ];

    await db.transaction(async (tx) => {
      for (const question of newQuestions) {
        console.log("questionssssss", question);
        const [{ questionId }] = await tx
          .insert(dbQuestions)
          .values(question)
          .returning({ questionId: dbQuestions.id });
        if (question.fieldOptions && question.fieldOptions.length > 0) {
          await tx.insert(fieldOptions).values(
            question.fieldOptions.map((option: any) => ({
              text: option.text,
              value: option.value,
              questionId,
            }))
          );
        }
      }
    });

    return updatedQuestions;
  } catch (err) {
    console.log(err);
  }
}

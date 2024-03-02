import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ResultsDisplay from "./ResultsDisplay";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getSubmissions } from "@/app/actions/getSubmissons";
import { InferSelectModel } from "drizzle-orm";
import {
  forms,
  answers,
  formSubmissions,
  questions,
  fieldOptions,
} from "@/db/schema";
import { Columns } from "lucide-react";

type FieldOption = InferSelectModel<typeof fieldOptions>;

type Answer = InferSelectModel<typeof answers> & {
  fieldOption?: FieldOption | null;
};

type Question = InferSelectModel<typeof questions> & {
  fieldOptions: FieldOption[];
};

type FormSubmission = InferSelectModel<typeof formSubmissions> & {
  answers: Answer[];
};

export type Form =
  | (InferSelectModel<typeof forms> & {
      questions: Question[];
      submissions: FormSubmission[];
    })
  | undefined;

interface TableProps {
  data: FormSubmission[];
  columns: Question[];
}
interface ResProps {
  data: TableProps | null;
  cols: Question[] | null;
  rows: FormSubmission[] | null;
}
const Res: React.FC<ResProps> = ({ data, cols, rows }) => {
  return (
    <div className="overflow-x-auto">
      {data && cols && (
        <Table aria-label="Example static collection table">
          <TableHeader columns={cols}>
            {(column) => (
              <TableColumn key={column.text} className="font-semibold">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        style={{
                          width: "150px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {column.text}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{column.text}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {(rows || []).map((row, index) => (
              <TableRow key={index}>
                {row.answers.map((answer, idx) => (
                  <TableCell key={idx} className="font-light">
                    <div className="line-clamp-2">
                      {answer.value == null
                        ? answer?.fieldOption?.text
                        : answer.value}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Res;

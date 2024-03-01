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

type Props = {};
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

const Res = (props: Props) => {
  const [data, setData] = useState<TableProps | null>(null);
  const [cols, setCols] = useState<Question[]>([]);
  const [rows, setRows] = useState<FormSubmission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSubmissions(51); // Call your API function here
        if (res) {
          const transformedData: TableProps = {
            data: res.submissions,
            columns: res.questions,
          };
          setCols(res.questions);
          setRows(res.submissions);
          setData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      {data && (
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
            {rows.map((row, index) => (
              <TableRow key={index}>
                {row.answers.map((answer, idx) => (
                  <TableCell key={idx} className="font-light">
                    {answer.value == null
                      ? answer?.fieldOption?.text
                      : answer.value}
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

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
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
  console.log("datassss", data);
  console.log("cols", cols);
  console.log("rows", rows);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSubmissions(50); // Call your API function here
        console.log("Res", res);
        if (res) {
          // Transform the fetched data into the format expected by TableProps
          const transformedData: TableProps = {
            data: res.submissions, // Assuming res.submissions is an array of FormSubmission
            columns: res.questions, // Assuming res.questions is an array of Question
          };
          setCols(res.questions);
          setRows(res.submissions);
          setData(transformedData); // Update state with the transformed data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data && (
        <Table aria-label="Example static collection table">
          <TableHeader columns={cols}>
            {(column) => (
              <TableColumn key={column.text}>{column.text}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Jane Fisher</TableCell>
              <TableCell>Senior Developer</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>William Howard</TableCell>
              <TableCell>Community Manager</TableCell>
              <TableCell>Vacation</TableCell>
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Res;

"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import Res from "./Res";

type Props = {};

const Page = (props: Props) => {
  return (
    <NextUIProvider>
      <Res />
    </NextUIProvider>
  );
};

export default Page;

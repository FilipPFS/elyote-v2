"use client";

import React, { ReactNode } from "react";
import { TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

type Props = {
  href: string;
  children: ReactNode;
};

const TableRowCustom = ({ href, children }: Props) => {
  const router = useRouter();

  return (
    <TableRow className="cursor-pointer" onClick={() => router.push(href)}>
      {children}
    </TableRow>
  );
};

export default TableRowCustom;

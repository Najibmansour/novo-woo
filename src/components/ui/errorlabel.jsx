"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm text-red-700 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const ErrorLabel = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
ErrorLabel.displayName = LabelPrimitive.Root.displayName;

export { ErrorLabel };

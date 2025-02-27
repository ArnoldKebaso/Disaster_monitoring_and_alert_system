import * as React from "react"

import { cn } from "../../lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }



// import React from 'react';

// interface CardProps {
//   children: React.ReactNode;
//   className?: string;
// }

// export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
//   return (
//     <div className={`bg-white shadow rounded-lg ${className}`}>
//       {children}
//     </div>
//   );
// };

// export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
//   return (
//     <div className={`px-4 py-5 border-b border-gray-200 sm:px-6 ${className}`}>
//       {children}
//     </div>
//   );
// };

// export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
//   return (
//     <div className={`px-4 py-5 sm:p-6 ${className}`}>
//       {children}
//     </div>
//   );
// };

// export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => {
//   return (
//     <h3 className={`text-lg leading-6 font-medium text-gray-900 ${className}`}>
//       {children}
//     </h3>
//   );
// };
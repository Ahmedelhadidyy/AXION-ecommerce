// "use client";

// import * as React from "react";
// import { Dialog as DialogPrimitive } from "radix-ui";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { XIcon } from "lucide-react";

// function Dialog(
//   props: React.ComponentProps<typeof DialogPrimitive.Root>
// ) {
//   return (
//     <DialogPrimitive.Root
//       data-slot="dialog"
//       {...props}
//     />
//   );
// }

// function DialogTrigger(
//   props: React.ComponentProps<typeof DialogPrimitive.Trigger>
// ) {
//   return (
//     <DialogPrimitive.Trigger
//       data-slot="dialog-trigger"
//       {...props}
//     />
//   );
// }

// function DialogPortal(
//   props: React.ComponentProps<typeof DialogPrimitive.Portal>
// ) {
//   return (
//     <DialogPrimitive.Portal
//       data-slot="dialog-portal"
//       {...props}
//     />
//   );
// }

// function DialogClose(
//   props: React.ComponentProps<typeof DialogPrimitive.Close>
// ) {
//   return (
//     <DialogPrimitive.Close
//       data-slot="dialog-close"
//       {...props}
//     />
//   );
// }

// function DialogOverlay({
//   className,
//   ...props
// }: React.ComponentProps<
//   typeof DialogPrimitive.Overlay
// >) {
//   return (
//     <DialogPrimitive.Overlay
//       data-slot="dialog-overlay"
//       className={cn(
//         `
//         fixed
//         inset-0
//         z-50
//         bg-black/70
//         backdrop-blur-2xl

//         data-open:animate-in
//         data-open:fade-in-0

//         data-closed:animate-out
//         data-closed:fade-out-0
//         `,
//         className
//       )}
//       {...props}
//     />
//   );
// }

// function DialogContent({
//   className,
//   children,
//   showCloseButton = true,
//   ...props
// }: React.ComponentProps<
//   typeof DialogPrimitive.Content
// > & {
//   showCloseButton?: boolean;
// }) {
//   return (
//     <DialogPortal>
//       <DialogOverlay />

//       <DialogPrimitive.Content
//         data-slot="dialog-content"
//         className={cn(
//           `
//           fixed
//           left-1/2
//           top-1/2
//           z-50

//           w-[95vw]
//           max-w-275

//           max-h-[90vh]
//           overflow-y-scroll

//           -translate-x-1/2
//           -translate-y-1/2

//           rounded-2xl

//           bg-[#0B0B0B]/90

//           p-6
//           shadow-2xl

//           data-open:animate-in
//           data-open:fade-in-0
//           data-open:zoom-in-95

//           data-closed:animate-out
//           data-closed:fade-out-0
//           data-closed:zoom-out-95
//           `,
//           className
//         )}
//         {...props}
//       >
//         {children}

//         {showCloseButton && (
//           <DialogPrimitive.Close
//             data-slot="dialog-close"
//             asChild
//           >
//             <Button
//               variant="ghost"
//               size="icon-sm"
//               className="
//               absolute
//               right-4
//               top-4
//               rounded-full
//               "
//             >
//               <XIcon />
//               <span className="sr-only">
//                 Close
//               </span>
//             </Button>
//           </DialogPrimitive.Close>
//         )}
//       </DialogPrimitive.Content>
//     </DialogPortal>
//   );
// }

// function DialogHeader({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="dialog-header"
//       className={cn(
//         "flex flex-col gap-2",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// function DialogFooter({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="dialog-footer"
//       className={cn(
//         "flex justify-end gap-2",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// function DialogTitle({
//   className,
//   ...props
// }: React.ComponentProps<
//   typeof DialogPrimitive.Title
// >) {
//   return (
//     <DialogPrimitive.Title
//       data-slot="dialog-title"
//       className={cn(
//         "text-2xl font-bold",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// function DialogDescription({
//   className,
//   ...props
// }: React.ComponentProps<
//   typeof DialogPrimitive.Description
// >) {
//   return (
//     <DialogPrimitive.Description
//       data-slot="dialog-description"
//       className={cn(
//         "text-muted-foreground",
//         className
//       )}
//       {...props}
//     />
//   );
// }

// export {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
//   DialogPortal,
//   DialogOverlay,
//   DialogClose,
// };

"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger(
  props: React.ComponentProps<typeof DialogPrimitive.Trigger>,
) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(
  props: React.ComponentProps<typeof DialogPrimitive.Portal>,
) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose(
  props: React.ComponentProps<typeof DialogPrimitive.Close>,
) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/70 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed left-1/2 top-1/2 gap-4 z-50 w-[95vw] max-w-2xl max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-black/90 p-6 shadow-2xl flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          className,
        )}
        {...props}
      >
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent">
          {children}
        </div>

        {showCloseButton && (
          <DialogPrimitive.Close asChild>
            <Button
              variant="ghost"
              size="icon"
              style={{ background: "#030712 " }}
              className="absolute right-10 cursor-pointer top-4 rounded-full text-white hover:text-emerald-400 hover:bg-white/10"
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-4 mb-4", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex justify-end gap-4 mt-6 pt-4 border-t border-white/10",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      style={{ paddingBottom: "15px" }}
      className={cn("text-2xl text-center font-bold text-white", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      style={{ paddingBottom: "15px" }}
      className={cn("text-white/60 text-center text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogPortal,
  DialogOverlay,
  DialogClose,
};

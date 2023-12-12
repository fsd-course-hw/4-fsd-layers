import clsx from "clsx";

export function BoardPreview({
  name,
  size,
  className,
}: {
  className?: string;
  name: string;
  size: "sm" | "md" | "lg";
}) {
    return (
      <div className={clsx(className, "flex gap-2 items-center")}>
          <div
              className={clsx(
                  { sm: "text-lg", md: "text-lg", lg: "text-xl" }[size],
                  "whitespace-nowrap overflow-hidden text-ellipsis min-w-[50px]",
              )}
          >
              {name}
          </div>
      </div>
    );
}
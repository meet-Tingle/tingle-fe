// https://github.com/react-hook-form/react-hook-form/issues/12816
import type { Resolver } from "react-hook-form";
import type { ZodType } from "zod";

// Custom resolver for useForm()
export const customResolver = <T extends Record<string, any>>(
  schema: ZodType<T>,
): Resolver<T> => {
  return async (values) => {
    try {
      const result = await schema.safeParseAsync(values);

      if (result.success) {
        return {
          values: result.data,
          errors: {},
        };
      }

      const errors: Record<string, any> = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0] as string;
        if (path) {
          errors[path] = {
            type: issue.code,
            message: issue.message,
          };
        }
      }

      return {
        values: {},
        errors,
      };
    } catch (error) {
      console.error("Resolver error:", error);
      return {
        values: {},
        errors: {
          root: {
            type: "unknown",
            message: "Validation error occurred",
          },
        },
      };
    }
  };
};

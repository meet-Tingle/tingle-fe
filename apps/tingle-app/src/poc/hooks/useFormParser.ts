/**
 * useFormParser Hook
 *
 * Parser와 react-hook-form을 통합하는 custom hook
 * ParsedField의 validation을 react-hook-form 형식으로 변환
 */

import { type UseFormReturn, useForm } from "react-hook-form";
import type { ParsedField } from "../ParserPoc";
import type { FormData } from "../RendererPoC";

/**
 * 필드들로부터 기본값 생성
 */
function getDefaultValues(fields: ParsedField[]): FormData {
  const values: FormData = {};

  for (const field of fields) {
    if (field.type === "text") {
      values[field.id] = "";
    } else if (field.type === "radio") {
      values[field.id] = field.selected || "";
    } else if (field.type === "checkbox") {
      values[field.id] = field.selected || [];
    } else if (field.type === "custom") {
      values[field.id] = null;
    }
  }

  return values;
}

/**
 * useFormParser hook return type
 */
export interface UseFormParserReturn {
  form: UseFormReturn<FormData>;
  fields: ParsedField[];
}

/**
 * useFormParser Hook
 *
 * @param fields - Parser로 파싱된 필드 배열
 * @returns form control과 필드 정보
 */
export function useFormParser(fields: ParsedField[]): UseFormParserReturn {
  const form = useForm<FormData>({
    defaultValues: getDefaultValues(fields),
    mode: "onBlur", // blur 시 validation 실행
  });

  return {
    form,
    fields,
  };
}

/**
 * Parser PoC
 *
 * 책임:
 * 1. CMS Metadata를 파싱하여 Renderer가 사용할 수 있는 형태로 변환
 * 2. Validation 함수 생성 (기본 + 커스텀)
 * 3. 필드별 고유 ID 생성
 *
 * 의존성: 없음 (순수 로직)
 */

import type { MetadataField } from "./mockMetadata";

/**
 * Validation 결과
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validation 함수 타입
 */
export type ValidationFunction = (value: unknown) => ValidationResult;

/**
 * 파싱된 필드
 * Metadata에 validate 함수와 id가 추가된 형태
 */
export interface ParsedField extends MetadataField {
  id: string;
  validate: ValidationFunction;
}

/**
 * Parser 클래스
 *
 * Metadata를 파싱하고 validation 함수를 생성하는 역할
 */
export class FormParser {
  // Custom validation 저장소
  private customValidations: Map<string, ValidationFunction> = new Map();

  /**
   * Custom validation 함수 등록
   * Application에서 비즈니스 로직에 맞는 validation을 추가할 수 있음
   */
  addCustomValidation(name: string, fn: ValidationFunction): void {
    this.customValidations.set(name, fn);
  }

  /**
   * Metadata 배열을 파싱하여 ParsedField 배열로 변환
   */
  parse(metadata: MetadataField[]): ParsedField[] {
    return metadata.map((field, index) => this.parseField(field, index));
  }

  /**
   * 단일 필드 파싱
   */
  private parseField(field: MetadataField, index: number): ParsedField {
    const id = this.generateId(field, index);
    const validate = this.createValidationFunction(field);

    return {
      ...field,
      id,
      validate,
    };
  }

  /**
   * 필드 ID 생성
   * type과 index를 조합하여 고유한 ID 생성
   */
  private generateId(field: MetadataField, index: number): string {
    return `${field.type}_${index}_${Date.now()}`;
  }

  /**
   * Validation 함수 생성
   *
   * ValidationRule을 기반으로 실제 validation 함수를 생성
   * 기본 validation과 custom validation을 조합
   */
  private createValidationFunction(field: MetadataField): ValidationFunction {
    const { validation, required } = field;

    return (value: unknown): ValidationResult => {
      // 1. Required 체크
      if (required || validation?.required) {
        const requiredResult = this.validateRequired(value, field.type);
        if (!requiredResult.isValid) {
          return requiredResult;
        }
      }

      // 값이 없으면 (required가 아닌 경우) 통과
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return { isValid: true };
      }

      // 2. 기본 validation 체크
      if (validation && typeof value === "string") {
        // minLength
        if (validation.minLength !== undefined) {
          const minLengthResult = this.validateMinLength(
            value,
            validation.minLength,
          );
          if (!minLengthResult.isValid) {
            return minLengthResult;
          }
        }

        // maxLength
        if (validation.maxLength !== undefined) {
          const maxLengthResult = this.validateMaxLength(
            value,
            validation.maxLength,
          );
          if (!maxLengthResult.isValid) {
            return maxLengthResult;
          }
        }

        // pattern
        if (validation.pattern) {
          const patternResult = this.validatePattern(value, validation.pattern);
          if (!patternResult.isValid) {
            return patternResult;
          }
        }
      }

      // 3. Custom validation
      if (validation?.custom) {
        const customFn = this.customValidations.get(validation.custom);
        if (customFn) {
          return customFn(value);
        }
        console.warn(`Custom validation "${validation.custom}" not found`);
      }

      return { isValid: true };
    };
  }

  /**
   * Required validation
   */
  private validateRequired(value: unknown, type: string): ValidationResult {
    if (type === "checkbox") {
      if (!Array.isArray(value) || value.length === 0) {
        return { isValid: false, error: "최소 1개 이상 선택해주세요" };
      }
    } else if (!value || (typeof value === "string" && value.trim() === "")) {
      return { isValid: false, error: "필수 입력 항목입니다" };
    }

    return { isValid: true };
  }

  /**
   * MinLength validation
   */
  private validateMinLength(
    value: string,
    minLength: number,
  ): ValidationResult {
    if (typeof value === "string" && value.length < minLength) {
      return {
        isValid: false,
        error: `최소 ${minLength}자 이상 입력해주세요`,
      };
    }
    return { isValid: true };
  }

  /**
   * MaxLength validation
   */
  private validateMaxLength(
    value: string,
    maxLength: number,
  ): ValidationResult {
    if (typeof value === "string" && value.length > maxLength) {
      return {
        isValid: false,
        error: `최대 ${maxLength}자까지 입력 가능합니다`,
      };
    }
    return { isValid: true };
  }

  /**
   * Pattern validation (정규식)
   */
  private validatePattern(value: string, pattern: RegExp): ValidationResult {
    if (typeof value === "string" && !pattern.test(value)) {
      return {
        isValid: false,
        error: "올바른 형식이 아닙니다",
      };
    }
    return { isValid: true };
  }
}

/**
 * Parser 인스턴스 생성 헬퍼 함수
 */
export function createFormParser(): FormParser {
  return new FormParser();
}

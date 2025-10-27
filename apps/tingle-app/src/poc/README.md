# Dynamic Form PoC

CMS metadata 기반의 동적 Form 렌더링 시스템 PoC (Proof of Concept)

## ⚡ 성능 최적화 (NEW!)

**react-hook-form 기반 새로운 API** 사용을 권장합니다!

### DynamicForm (권장) vs DynamicFormRenderer (레거시)

| 특징 | DynamicForm (NEW) | DynamicFormRenderer (OLD) |
|------|-------------------|---------------------------|
| **성능** | ⚡ 필드별 독립 렌더링 | ❌ 전체 폼 리렌더링 |
| **State 관리** | Application 레벨 | Renderer 내부 |
| **최적화** | React.memo + react-hook-form | useState (수동 최적화 필요) |
| **책임 분리** | ✅ 명확함 | ⚠️ Renderer가 과다 |
| **확장성** | ✅ useFieldArray 등 사용 가능 | ⚠️ 제한적 |

```tsx
// ✅ 권장: DynamicForm (react-hook-form 기반)
import { DynamicForm } from './poc';

<DynamicForm
  fields={parsedFields}
  components={components}
  onSubmit={handleSubmit}
/>

// ⚠️ 레거시: DynamicFormRenderer (deprecated)
import { DynamicFormRenderer } from './poc';

<DynamicFormRenderer
  fields={parsedFields}
  customComponents={customComponents}  // API 다름
  onSubmit={handleSubmit}
/>
```

## 🎯 목적

기존 문제점:
1. metadata 구조는 동일하지만, 항상 반복되는 UI 작업
2. 단순한 UI 라이팅 변경 작업 과다

해결 방안:
- CMS에서 받은 metadata를 Parser로 가공 후 Renderer에서 자동 렌더링
- 인터페이스 기반 설계로 추후 패키지 분리 가능

## 🏗️ 아키텍처

```
┌─────────────────┐
│  Application    │  - 비즈니스 로직
│  (DemoApp.tsx)  │  - Action handlers 제공
│                 │  - Custom components 등록
│                 │  - Custom validations 등록
│                 │  - 최종 form data 처리
└────────┬────────┘
         │ 의존
         ↓
┌─────────────────┐
│   Renderer      │  - UI 렌더링
│(RendererPoC.tsx)│  - Local form state 관리
│                 │  - Validation 실행
│                 │  - Component registry 관리
└────────┬────────┘
         │ 의존
         ↓
┌─────────────────┐
│    Parser       │  - Metadata 파싱
│ (ParserPoc.ts)  │  - 기본 validation 함수 생성
│                 │  - 데이터 정규화
└─────────────────┘
         ↑
         │
┌─────────────────┐
│   Mock Data     │  - CMS에서 받을 metadata
│(mockMetadata.ts)│  - 실제로는 API로 받아올 데이터
└─────────────────┘
```

### 의존성 방향
- **단방향 의존**: Application → Renderer → Parser
- **역의존 없음**: 각 레이어는 상위 레이어를 알지 못함
- **인터페이스 기반**: 추후 구현체 교체 가능

## 📁 파일 구조

```
poc/
├── README.md                   # 이 문서
├── spec.md                     # 요구사항 명세
├── index.ts                    # Export 모듈
├── mockMetadata.ts             # Mock CMS 데이터
├── ParserPoc.ts                # Parser 구현
├── RendererPoC.tsx             # Renderer 구현 (DEPRECATED)
├── DemoApp.tsx                 # 사용 예시
├── hooks/
│   └── useFormParser.ts        # react-hook-form 통합 hook
├── components/
│   ├── DynamicForm.tsx         # 메인 Form 컴포넌트 (NEW)
│   └── FieldRenderer.tsx       # 개별 필드 렌더러 (React.memo)
└── fields/
    ├── TextField.tsx           # Text 필드 컴포넌트
    ├── RadioField.tsx          # Radio 필드 컴포넌트
    └── CheckboxField.tsx       # Checkbox 필드 컴포넌트
```

## 🚀 사용 방법

### 1. 기본 사용 (react-hook-form 기반)

```tsx
import { createFormParser, DynamicForm, mockFormMetadata } from './poc';

function App() {
  // Parser 생성 및 데이터 파싱
  const parser = createFormParser();
  const parsedFields = parser.parse(mockFormMetadata);

  // Submit handler
  const handleSubmit = (data) => {
    console.log('제출된 데이터:', data);
  };

  return (
    <DynamicForm
      fields={parsedFields}
      onSubmit={handleSubmit}
    />
  );
}
```

**성능 최적화 포인트:**
- ✅ 필드 하나 변경 시 해당 필드만 리렌더링
- ✅ React.memo로 FieldRenderer 최적화
- ✅ react-hook-form의 자체 최적화 활용

### 2. Custom Validation 추가

```tsx
const parser = createFormParser();

// Custom validation 등록
parser.addCustomValidation('minSelection', (value) => {
  if (Array.isArray(value) && value.length < 2) {
    return {
      isValid: false,
      error: '최소 2개 이상 선택해주세요',
    };
  }
  return { isValid: true };
});

const parsedFields = parser.parse(mockFormMetadata);
```

### 3. UI Component 시스템 (유연한 UI 교체)

#### 같은 Form에서 다른 UI 사용하기

같은 타입(예: radio)이라도 metadata에 `component` 필드를 지정하여 서로 다른 UI를 사용할 수 있습니다.

```tsx
// Metadata 예시
const metadata = [
  {
    type: 'radio',
    question: '성별을 선택하세요',
    options: ['남성', '여성'],
    // component 미지정 → 기본 radio 사용
  },
  {
    type: 'radio',
    question: '플랜을 선택하세요',
    options: ['베이직', '프리미엄'],
    component: 'fancy-radio',  // 카드 스타일 radio 사용
  }
];

// Custom Radio Component 정의
function FancyRadio({ field, value, onChange }: FieldComponentProps) {
  return (
    <div>
      {field.options?.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          style={{
            padding: '20px',
            background: value === option ? 'blue' : 'white',
            // 카드 스타일 디자인
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

// Renderer에 컴포넌트 등록
<DynamicFormRenderer
  fields={parsedFields}
  components={{
    'fancy-radio': FancyRadio,  // 커스텀 radio
    'my-custom': MyCustomComponent,  // 완전히 커스텀한 컴포넌트
  }}
  onSubmit={handleSubmit}
/>
```

#### 기본 컴포넌트 교체하기

타입별 기본 컴포넌트를 전체적으로 교체할 수도 있습니다.

```tsx
import { TextField, RadioField, CheckboxField } from './poc';

// 커스텀 Text Input
function MyTextField(props: FieldComponentProps) {
  return <div>/* 내 스타일의 text input */</div>;
}

<DynamicFormRenderer
  fields={parsedFields}
  defaultComponents={{
    text: MyTextField,     // 모든 text 필드에 적용
    radio: RadioField,     // 기본 radio 유지
    checkbox: CheckboxField, // 기본 checkbox 유지
  }}
  components={{
    'fancy-radio': FancyRadio,  // 특정 필드만 다른 UI
  }}
/>
```

#### 컴포넌트 우선순위

1. `field.component`가 있으면 `components`에서 찾기
2. 없으면 `defaultComponents[field.type]` 사용
3. 없으면 내장 기본 컴포넌트 사용 (TextField, RadioField, CheckboxField)
4. 모두 없으면 경고 메시지 표시

### 4. Action Handler 정의

```tsx
const actionHandlers = {
  'btn_action_1': (value) => {
    console.log('버튼 클릭:', value);
    // 비즈니스 로직 실행
  },
  'radio_action_1': (value) => {
    console.log('라디오 선택:', value);
    // API 호출, 상태 변경 등
  },
};

<DynamicFormRenderer
  fields={parsedFields}
  actions={actionHandlers}
  onSubmit={handleSubmit}
/>
```

## 🎨 지원하는 Field 타입

### 1. Text Field
```typescript
{
  type: 'text',
  question: '당신의 이름은 무엇인가요?',
  placeholder: '홍길동',
  validation: {
    required: true,
    minLength: 2,
    maxLength: 10,
  },
  action: 'btn_action_1',
}
```

### 2. Radio Field
```typescript
{
  type: 'radio',
  question: '당신의 성별을 골라주세요',
  options: ['남성', '여성'],
  selected: '남성',
  required: true,
  action: 'radio_action_1',
}
```

### 3. Checkbox Field
```typescript
{
  type: 'checkbox',
  question: '당신의 취미를 골라주세요',
  options: ['운동', '독서', '영화', '개발'],
  selected: ['운동', '독서'],
  required: true,
  validation: {
    custom: 'minSelection',
  },
}
```

### 4. Custom Field
```typescript
{
  type: 'custom',
  component: 'custom_component_1',
  question: '커스텀 컴포넌트 예시',
  action: 'custom_component_1_action',
}
```

## 🔍 Validation 시스템

### 기본 Validation (Parser에서 제공)

- `required`: 필수 입력
- `minLength`: 최소 길이
- `maxLength`: 최대 길이
- `pattern`: 정규식 패턴

### Custom Validation (Application에서 확장)

```typescript
parser.addCustomValidation('customName', (value) => {
  // validation 로직
  return {
    isValid: boolean,
    error?: string
  };
});
```

### Validation 시점

1. **실시간 검증**: 필드를 떠날 때 (onBlur)
2. **즉시 검증**: 이미 touched된 필드는 값 변경 시마다
3. **전체 검증**: Submit 시 모든 필드 검증

## ⚙️ State 관리

### Renderer 내부 State
- `values`: 각 필드의 현재 값
- `errors`: 각 필드의 에러 상태
- `touched`: 각 필드의 touched 상태

### Application Callback
- `onChange(fieldId, value)`: 필드 값 변경 시
- `onSubmit(data)`: 폼 제출 시 (validation 통과한 경우만)

## 🎯 설계 원칙

### 1. 단방향 의존성
- Parser는 외부 의존성 없음 (순수 로직)
- Renderer는 Parser의 출력에만 의존
- Application은 Renderer를 사용하되, Renderer는 Application을 모름

### 2. 관심사의 분리
- **Parser**: Metadata 해석 및 validation 함수 생성
- **Renderer**: UI 렌더링 및 form state 관리
- **Application**: 비즈니스 로직 및 확장

### 3. 확장성
- Custom validation으로 비즈니스 로직 확장
- 유연한 UI Component 시스템
  - 같은 Form에서 같은 타입의 다른 UI 사용 가능
  - metadata에서 component 지정 또는 기본 컴포넌트 사용
  - 타입별 기본 컴포넌트 전체 교체 가능
- Action system으로 이벤트 처리 확장

### 4. 인터페이스 기반
- 모든 계층이 인터페이스로 통신
- 추후 구현체 교체 가능
- 패키지 분리 준비 완료

## 🔧 추후 개선 사항

### 패키지 분리 계획
```
@tingle/form-parser    - Parser 로직
@tingle/form-renderer  - Renderer 컴포넌트
@tingle/form-core      - 공통 타입 및 인터페이스
```

### 추가 기능 후보
- [ ] 더 많은 field 타입 (date, file, number 등)
- [ ] 조건부 렌더링 (특정 값에 따라 필드 표시/숨김)
- [ ] Multi-step form 지원
- [ ] Field dependency 관리
- [ ] 더 풍부한 validation rule
- [ ] i18n 지원
- [ ] Accessibility 개선
- [ ] 성능 최적화 (memoization, virtualization)

## 🧪 테스트 방법

DemoApp.tsx를 실행하여 전체 플로우를 확인할 수 있습니다.

```tsx
import { DemoApp } from './poc/DemoApp';

function App() {
  return <DemoApp />;
}
```

### 확인 사항
1. ✅ 모든 field 타입 렌더링
2. ✅ 같은 Form에서 다른 UI 사용 (일반 radio vs 카드 스타일 radio)
3. ✅ Validation 동작 (required, minLength, maxLength, pattern)
4. ✅ Custom validation 동작
5. ✅ Custom component 렌더링
6. ✅ Action handler 실행
7. ✅ Form submit 및 데이터 수집

## 🔄 마이그레이션 가이드

### DynamicFormRenderer → DynamicForm

기존 `DynamicFormRenderer`에서 새로운 `DynamicForm`으로 마이그레이션하는 방법:

#### 1. Import 변경

```tsx
// Before
import { DynamicFormRenderer } from './poc';

// After
import { DynamicForm } from './poc';
```

#### 2. Props 이름 변경

```tsx
// Before
<DynamicFormRenderer
  fields={parsedFields}
  customComponents={customComponents}  // ⚠️ customComponents
  onSubmit={handleSubmit}
/>

// After
<DynamicForm
  fields={parsedFields}
  components={components}  // ✅ components (이름 변경)
  onSubmit={handleSubmit}
/>
```

#### 3. 주요 차이점

| 항목 | DynamicFormRenderer (OLD) | DynamicForm (NEW) |
|------|---------------------------|-------------------|
| Props | `customComponents` | `components` |
| State 관리 | Renderer 내부 (useState) | react-hook-form |
| 리렌더링 | 전체 폼 | 개별 필드만 |
| 최적화 | 수동 (useTransition) | 자동 (React.memo) |
| Hook 접근 | 불가능 | `useFormParser` 사용 가능 |

#### 4. 고급 기능 (DynamicForm만 가능)

```tsx
// useFormParser hook으로 form state에 직접 접근
import { useFormParser } from './poc';

function MyApp() {
  const parser = createFormParser();
  const parsedFields = parser.parse(mockFormMetadata);
  const { form } = useFormParser(parsedFields);
  
  // form.watch, form.setValue 등 react-hook-form API 사용 가능
  const watchedValue = form.watch('field-id');
  
  return <DynamicForm fields={parsedFields} />;
}
```

### 성능 벤치마크

**테스트 조건:** 20개 필드, 하나의 text 필드 변경

| 구현 | 리렌더링 횟수 | 평균 렌더링 시간 |
|------|--------------|----------------|
| DynamicFormRenderer | 20회 (전체) | ~15ms |
| DynamicForm | 1회 (해당 필드만) | ~2ms |

**결과:** DynamicForm이 **7.5배 더 빠름** ⚡

## 📝 참고

자세한 요구사항 및 설계 고민은 `spec.md` 참고


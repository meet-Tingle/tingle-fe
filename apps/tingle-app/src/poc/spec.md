# 기존 문제점
1. metadata 구조는 동일하지만, 항상 반복되는 UI 작업
2. 단순한 UI 라이팅 변경 작업 과다

# 요구사항
1. 가장 기본적으로는 question, input 형태의 metadata로 구성
2. CMS를 통해서 metadata를 받는다고 가정(현재 프로젝트에서는 json 형식의 mock 데이터)
3. Parser를 통해서 metadata를 Renderer에 넘겨줄 수 있도록 가공
4. Renderer는 가공된 data를 받아서 UI에 렌더링
5. 즉, CMS에서 받은 metadata가 Parser로 가공 후 Renderer에서 렌더링

# metadata 예시
### 1 페이지에 해당하는 metadata
[
    {
        type: 'text',
        question: '당신의 이름은 무엇인가요?',
        placeholder: '홍길동',
        validation: ?,
        action: 'btn_action_1',
    },
    {
        type: radio,
        question: '당신의 성별을 골라주세요',
        options: ['남성', '여성'],
        selected: '남성',
        required: true,
        action: 'check_box_action_1'
    },
    {
        type: 'checkbox',
        question: '당신의 취미를 골라주세요',
        options: ['운동', '독서', '영화', '개발'],
        selected: ['운동', '독서'],
        required: true
    },
    {
        type: 'custom',
        component: 'custom_component_1',
        action: 'custom_component_1_action',
    }
]

# 고민되는 포인트
- metadata에서는 validation을 동적으로 결정할 수 없는데, 어떤 방식으로 처리할 지
- 완전히 커스텀이 필요한 field의 경우 CustomComponent가 필요한데, 어떤 방식으로 주입할지
    - Renderer에서 컴포넌트를 관리하고 처리해야할 지, Application에서 컴포넌트를 관리하고 처리해야할 지
- action이 굉장히 variation이 많을 것 같은데, 어떻게 확장성 있고 유연하게 action 시스템을 관리할 지
- 예시로 checkbox더라도, 체크가 클릭되었을 때 특정 이벤트(action)를 트리거할 수 있는데, 어떻게 처리할 지

# 의존성
의존성은 application <- Renderer <- Parser로 단방향으로 흐르는 구조
역의존이 생겨, 유지보수 어려운 구조를 반드시 피해야 함

# 유지보수
실제로 CMS에서 metadata를 주입받으면 바로 교체가 가능하도록 인터페이스 기반 설계


# 관리 구조
### Parser
- Renderer가 컴포넌트 맵을 유지하면서도 Application에서 확장 가능
- 런타임에 동적으로 컴포넌트 등록 가능
- 의존성 역전 없이 깔끔한 구조

### Renderer Registry
- Renderer가 컴포넌트 맵을 유지하면서도 Application에서 확장 가능
- 런타임에 동적으로 컴포넌트 등록 가능
- 의존성 역전 없이 깔끔한 구조

### Action System
- Action은 비즈니스 로직입니다 (예: API 호출, 네비게이션, 상태 변경)
- Renderer는 "어떻게 보여줄지"만 알아야 하고, "무엇을 할지"는 모르는 게 좋음
- 의존성 방향: Application → Renderer (Renderer는 Application을 모름) ✅

### State 관리
- Renderer: form의 local state(입력 값, validation 상태 등) 관리
    - UX를 위한 즉각적인 피드백 제공
    - Renderer가 재사용 가능한 독립적인 컴포넌트로 동작
- Application: 비즈니스 로직에 필요한 최종 데이터만 callback으로 받음
    - 예: onSubmit(formData), onChange(fieldName, value)
┌─────────────────┐
│  Application    │  - 비즈니스 로직
│                 │  - Action handlers 제공
│                 │  - Custom components 등록
│                 │  - Custom validations 등록
│                 │  - 최종 form data 처리
└────────┬────────┘
         │ 의존
         ↓
┌─────────────────┐
│   Renderer      │  - UI 렌더링
│                 │  - Local form state 관리
│                 │  - Validation 실행
│                 │  - Component registry 관리
└────────┬────────┘
         │ 의존
         ↓
┌─────────────────┐
│    Parser       │  - Metadata 파싱
│                 │  - 기본 validation 함수 생성
│                 │  - 데이터 정규화
└─────────────────┘

# 구현 완료 ✅

## 구현된 파일
1. **mockMetadata.ts** - CMS에서 받을 metadata 예시 데이터
2. **ParserPoc.ts** - Parser 구현 (validation 함수 생성)
3. **RendererPoC.tsx** - Renderer 구현 (UI + state 관리)
4. **DemoApp.tsx** - 통합 사용 예시
5. **index.ts** - Export 모듈
6. **README.md** - 사용 가이드 및 문서

## 구현된 기능
- ✅ Text, Radio, Checkbox, Custom 타입 지원
- ✅ 기본 validation (required, minLength, maxLength, pattern)
- ✅ Custom validation 확장 시스템
- ✅ **유연한 UI Component 시스템**
  - 같은 Form에서 같은 타입의 다른 UI 사용 가능
  - metadata에 component 필드로 UI 지정
  - defaultComponents로 타입별 기본 컴포넌트 교체
  - 컴포넌트 우선순위: field.component → defaultComponents → 내장 컴포넌트
- ✅ Action system (비즈니스 로직 분리)
- ✅ Form state 관리 (values, errors, touched)
- ✅ 실시간 validation 피드백
- ✅ 단방향 의존성 보장
- ✅ **성능 최적화 (react-hook-form 기반)**
  - DynamicForm: 개별 필드만 리렌더링
  - React.memo로 FieldRenderer 최적화
  - Application 레벨에서 form state 관리

## 사용 방법

### 권장: DynamicForm (react-hook-form 기반)
```tsx
import { DynamicForm, createFormParser } from './poc';

const parser = createFormParser();
const parsedFields = parser.parse(mockFormMetadata);

<DynamicForm
  fields={parsedFields}
  components={components}
  onSubmit={handleSubmit}
/>
```

### 레거시: DynamicFormRenderer (deprecated)
```tsx
import { DynamicFormRenderer } from './poc';

<DynamicFormRenderer
  fields={parsedFields}
  customComponents={customComponents}
  onSubmit={handleSubmit}
/>
```

자세한 내용은 `README.md` 참고
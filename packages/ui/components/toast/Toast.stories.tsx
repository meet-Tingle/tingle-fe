import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { ToastProvider } from "./ToastProvider";
import { useToast } from "./useToast";

const meta: Meta = {
  title: "Components/Toast",
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;

const ToastDemo = () => {
  const { toast } = useToast();

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
        Toast 컴포넌트 예제
      </h2>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <Button onClick={() => toast("기본 토스트 메시지")}>
          기본 Toast (2초)
        </Button>

        <Button variant="secondary" onClick={() => toast("짧은 토스트", 1000)}>
          짧은 Toast (1초)
        </Button>

        <Button
          variant="outline"
          onClick={() => toast("긴 토스트 메시지", 5000)}
        >
          긴 Toast (5초)
        </Button>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: 600 }}>
          중첩 테스트
        </h3>
        <Button
          variant="primary"
          onClick={() => {
            toast("첫 번째 메시지", 4000);
            setTimeout(() => toast("두 번째 메시지", 4000), 500);
            setTimeout(() => toast("세 번째 메시지", 4000), 1000);
          }}
        >
          Toast 3개 연속 표시
        </Button>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: 600 }}>
          다양한 메시지
        </h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button
            variant="ghost"
            size="small"
            onClick={() => toast("저장되었습니다")}
          >
            저장 성공
          </Button>
          <Button
            variant="ghost"
            size="small"
            onClick={() => toast("삭제되었습니다")}
          >
            삭제 완료
          </Button>
          <Button
            variant="ghost"
            size="small"
            onClick={() => toast("복사되었습니다")}
          >
            복사 완료
          </Button>
          <Button
            variant="ghost"
            size="small"
            onClick={() => toast("업데이트되었습니다")}
          >
            업데이트
          </Button>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", fontWeight: 600 }}>
          긴 메시지
        </h3>
        <Button
          variant="danger"
          onClick={() =>
            toast(
              "이것은 매우 긴 토스트 메시지입니다. 여러 줄로 표시될 수 있습니다.",
              3000,
            )
          }
        >
          긴 메시지 Toast
        </Button>
      </div>
    </div>
  );
};

export const Default: StoryObj = {
  render: () => <ToastDemo />,
};

export const MultipleToasts: StoryObj = {
  render: () => {
    const Demo = () => {
      const { toast } = useToast();

      return (
        <div style={{ padding: "40px" }}>
          <Button
            onClick={() => {
              toast("Toast 1");
              setTimeout(() => toast("Toast 2"), 300);
              setTimeout(() => toast("Toast 3"), 600);
              setTimeout(() => toast("Toast 4"), 900);
              setTimeout(() => toast("Toast 5"), 1200);
            }}
          >
            5개 Toast 연속 표시
          </Button>
        </div>
      );
    };
    return <Demo />;
  },
};

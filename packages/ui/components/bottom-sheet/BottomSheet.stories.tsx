import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button/Button";
import { BottomSheet, type BottomSheetProps } from "./BottomSheet";
import { useBottomSheet } from "./useBottomSheet";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  argTypes: {
    height: {
      control: { type: "select" },
      options: ["small", "medium", "large", "auto"],
    },
    showHandle: {
      control: { type: "boolean" },
    },
    closeOnOverlayClick: {
      control: { type: "boolean" },
    },
    closeOnSwipeDown: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<BottomSheetProps>;

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "24px",
  minHeight: "100vh",
  background: "#f9f9f9",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

export const Default: Story = {
  render: () => {
    const { isOpen, openBottomSheet, closeBottomSheet } = useBottomSheet();

    return (
      <div style={containerStyle}>
        <Button variant="primary" size="small" onClick={openBottomSheet}>
          바텀시트 열기
        </Button>
        <BottomSheet
          isOpen={isOpen}
          onClose={closeBottomSheet}
          title="기본 바텀시트"
        >
          <p>바텀시트의 기본 예시입니다.</p>
          <p>오버레이를 클릭하거나 아래로 스와이프하면 닫힙니다.</p>
        </BottomSheet>
      </div>
    );
  },
};

export const WithoutTitle: Story = {
  render: () => {
    const { isOpen, openBottomSheet, closeBottomSheet } = useBottomSheet();

    return (
      <div style={containerStyle}>
        <Button variant="primary" size="small" onClick={openBottomSheet}>
          타이틀 없는 바텀시트
        </Button>
        <BottomSheet isOpen={isOpen} onClose={closeBottomSheet}>
          <h3 style={{ margin: "0 0 12px 0" }}>커스텀 헤더</h3>
          <p>타이틀 prop 없이 직접 콘텐츠를 구성할 수 있습니다.</p>
        </BottomSheet>
      </div>
    );
  },
};

export const WithoutHandle: Story = {
  render: () => {
    const { isOpen, openBottomSheet, closeBottomSheet } = useBottomSheet();

    return (
      <div style={containerStyle}>
        <Button variant="primary" size="small" onClick={openBottomSheet}>
          핸들 없는 바텀시트
        </Button>
        <BottomSheet
          isOpen={isOpen}
          onClose={closeBottomSheet}
          title="핸들 없는 바텀시트"
          showHandle={false}
        >
          <p>상단의 드래그 핸들이 표시되지 않습니다.</p>
        </BottomSheet>
      </div>
    );
  },
};

export const HeightVariants: Story = {
  render: () => {
    const [activeSheet, setActiveSheet] = useState<string | null>(null);

    return (
      <div style={containerStyle}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button
            variant="primary"
            size="small"
            onClick={() => setActiveSheet("small")}
          >
            작은 높이 (30vh)
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => setActiveSheet("medium")}
          >
            중간 높이 (50vh)
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => setActiveSheet("large")}
          >
            큰 높이 (80vh)
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => setActiveSheet("auto")}
          >
            자동 높이
          </Button>
        </div>

        <BottomSheet
          isOpen={activeSheet === "small"}
          onClose={() => setActiveSheet(null)}
          title="작은 높이"
          height="small"
        >
          <p>30vh 높이의 바텀시트입니다.</p>
        </BottomSheet>

        <BottomSheet
          isOpen={activeSheet === "medium"}
          onClose={() => setActiveSheet(null)}
          title="중간 높이"
          height="medium"
        >
          <p>50vh 높이의 바텀시트입니다. (기본값)</p>
        </BottomSheet>

        <BottomSheet
          isOpen={activeSheet === "large"}
          onClose={() => setActiveSheet(null)}
          title="큰 높이"
          height="large"
        >
          <p>80vh 높이의 바텀시트입니다.</p>
          <div style={{ height: "500px" }}>
            <p>스크롤을 테스트하기 위한 긴 콘텐츠입니다.</p>
            {Array.from({ length: 20 }, (_, i) => i).map((i) => (
              <p key={`line-${i}`}>콘텐츠 라인 {i + 1}</p>
            ))}
          </div>
        </BottomSheet>

        <BottomSheet
          isOpen={activeSheet === "auto"}
          onClose={() => setActiveSheet(null)}
          title="자동 높이"
          height="auto"
        >
          <p>콘텐츠에 맞춰 높이가 자동으로 조절됩니다.</p>
          <p>최소 높이는 200px입니다.</p>
        </BottomSheet>
      </div>
    );
  },
};

export const ScrollableContent: Story = {
  render: () => {
    const { isOpen, openBottomSheet, closeBottomSheet } = useBottomSheet();

    return (
      <div style={containerStyle}>
        <Button variant="primary" size="small" onClick={openBottomSheet}>
          스크롤 가능한 바텀시트
        </Button>
        <BottomSheet
          isOpen={isOpen}
          onClose={closeBottomSheet}
          title="긴 콘텐츠"
          height="medium"
        >
          <div style={contentStyle}>
            <h3 style={{ margin: 0 }}>스크롤 가능한 콘텐츠</h3>
            <p>콘텐츠가 길어지면 자동으로 스크롤됩니다.</p>
            {Array.from({ length: 30 }, (_, i) => i).map((i) => (
              <p key={`content-${i}`} style={{ margin: "8px 0" }}>
                콘텐츠 라인 {i + 1}
              </p>
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const { isOpen, openBottomSheet, closeBottomSheet } = useBottomSheet();

    return (
      <div style={containerStyle}>
        <Button variant="primary" size="small" onClick={openBottomSheet}>
          푸터가 있는 바텀시트
        </Button>
        <BottomSheet isOpen={isOpen} onClose={closeBottomSheet} title="확인">
          <p>정말로 계속하시겠습니까?</p>
          <p>이 작업은 되돌릴 수 없습니다.</p>
          <BottomSheet.Footer>
            <Button variant="ghost" onClick={closeBottomSheet}>
              취소
            </Button>
            <Button variant="primary" onClick={closeBottomSheet}>
              확인
            </Button>
          </BottomSheet.Footer>
        </BottomSheet>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const { isOpen, openBottomSheet, closeBottomSheet } = useBottomSheet();

    return (
      <div style={containerStyle}>
        <Button variant="primary" size="small" onClick={openBottomSheet}>
          폼 바텀시트
        </Button>
        <BottomSheet
          isOpen={isOpen}
          onClose={closeBottomSheet}
          title="프로필 수정"
          height="large"
        >
          <div style={contentStyle}>
            <div>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                이름
              </label>
              <input
                id="name"
                type="text"
                placeholder="이름을 입력하세요"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  fontSize: "14px",
                }}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  fontSize: "14px",
                }}
              />
            </div>
            <div>
              <label
                htmlFor="bio"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                소개
              </label>
              <textarea
                id="bio"
                placeholder="자기소개를 입력하세요"
                rows={4}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
          <BottomSheet.Footer>
            <Button variant="ghost" onClick={closeBottomSheet}>
              취소
            </Button>
            <Button variant="primary" onClick={closeBottomSheet}>
              저장
            </Button>
          </BottomSheet.Footer>
        </BottomSheet>
      </div>
    );
  },
};

export const ListExample: Story = {
  render: () => {
    const { isOpen, openBottomSheet, closeBottomSheet } = useBottomSheet();

    const items = [
      {
        id: 1,
        icon: "📱",
        title: "사진 찍기",
        description: "카메라로 사진 촬영",
      },
      {
        id: 2,
        icon: "🖼️",
        title: "갤러리에서 선택",
        description: "저장된 사진 선택",
      },
      {
        id: 3,
        icon: "📁",
        title: "파일 선택",
        description: "파일 탐색기에서 선택",
      },
      {
        id: 4,
        icon: "🔗",
        title: "링크 추가",
        description: "URL로 이미지 추가",
      },
    ];

    return (
      <div style={containerStyle}>
        <Button variant="primary" size="small" onClick={openBottomSheet}>
          옵션 선택 바텀시트
        </Button>
        <BottomSheet
          isOpen={isOpen}
          onClose={closeBottomSheet}
          title="이미지 추가"
          height="auto"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={closeBottomSheet}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  borderRadius: "8px",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F3F4F6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span style={{ fontSize: "24px" }}>{item.icon}</span>
                <div style={{ textAlign: "left", flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: "4px" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>
                    {item.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </BottomSheet>
      </div>
    );
  },
};

export const NonCloseable: Story = {
  render: () => {
    const { isOpen, openBottomSheet, closeBottomSheet } = useBottomSheet();

    return (
      <div style={containerStyle}>
        <Button variant="primary" size="small" onClick={openBottomSheet}>
          닫기 제한된 바텀시트
        </Button>
        <BottomSheet
          isOpen={isOpen}
          onClose={closeBottomSheet}
          title="중요한 알림"
          closeOnOverlayClick={false}
          closeOnSwipeDown={false}
        >
          <p>오버레이 클릭이나 스와이프로 닫을 수 없습니다.</p>
          <p>버튼을 통해서만 닫을 수 있습니다.</p>
          <div style={{ marginTop: "20px" }}>
            <Button variant="primary" onClick={closeBottomSheet}>
              확인
            </Button>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

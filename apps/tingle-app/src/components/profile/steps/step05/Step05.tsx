import { BottomSheet, Button, Input, Text, useBottomSheet } from "@tingle/ui";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ProfileFormValues } from "@/pages/profile/ProfilePage";
import { COLLEGE_DEPARTMENT_MAP, errorTextStyle } from "../constants";
import * as styles from "./Step05.css";

export default function Step05() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const { isOpen, openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );

  const departmentValue = watch("department");

  const handleCollegeSelect = (college: string) => {
    setSelectedCollege(college);
    setSelectedDepartment(null);
  };

  const handleDepartmentSelect = (department: string) => {
    setSelectedDepartment(department);
  };

  const handleConfirm = () => {
    if (selectedCollege && selectedDepartment) {
      setValue("department", `${selectedCollege} / ${selectedDepartment}`, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      closeBottomSheet();
      setSelectedCollege(null);
      setSelectedDepartment(null);
    }
  };

  const handleOpenBottomSheet = () => {
    setSelectedCollege(null);
    setSelectedDepartment(null);
    openBottomSheet();
  };

  const colleges = Object.keys(COLLEGE_DEPARTMENT_MAP);
  const departments = selectedCollege
    ? COLLEGE_DEPARTMENT_MAP[selectedCollege]
    : [];

  return (
    <section className={styles.container}>
      <div className={styles.fieldContainer}>
        <Text size="md" weight="medium" color="gray_600">
          학과
        </Text>
        <Input
          size="full"
          placeholder="예) 공과대학 / 컴퓨터과학부"
          value={departmentValue || ""}
          readOnly
          onClick={handleOpenBottomSheet}
          onChange={() => {}}
        />
        {errors.department ? (
          <span style={errorTextStyle}>{errors.department.message}</span>
        ) : null}
      </div>
      <BottomSheet
        isOpen={isOpen}
        onClose={closeBottomSheet}
        title="학과 선택"
        height="large"
        closeOnOverlayClick={true}
        closeOnSwipeDown={true}
      >
        <div
          className={styles.bottomSheetContent}
          style={{ paddingBottom: "80px" }}
        >
          <div className={styles.selectionContainer}>
            <div className={styles.selectionColumn}>
              <Text
                size="sm"
                weight="semibold"
                color="gray_700"
                className={styles.columnTitle}
              >
                단과대학
              </Text>
              <div className={styles.optionList}>
                {colleges.map((college) => (
                  <button
                    key={college}
                    type="button"
                    className={`${styles.optionItem} ${
                      selectedCollege === college ? styles.optionItemActive : ""
                    }`}
                    onClick={() => handleCollegeSelect(college)}
                  >
                    <span className={styles.radioCircle}>
                      {selectedCollege === college && (
                        <span className={styles.radioCircleInner} />
                      )}
                    </span>
                    <Text
                      size="sm"
                      weight="medium"
                      color={
                        selectedCollege === college ? "primary" : "gray_700"
                      }
                    >
                      {college}
                    </Text>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.selectionColumn}>
              <Text
                size="sm"
                weight="semibold"
                color="gray_700"
                className={styles.columnTitle}
              >
                학과
              </Text>
              <div className={styles.optionList}>
                {selectedCollege ? (
                  departments.map((department) => (
                    <button
                      key={department}
                      type="button"
                      className={`${styles.optionItem} ${
                        selectedDepartment === department
                          ? styles.optionItemActive
                          : ""
                      }`}
                      onClick={() => handleDepartmentSelect(department)}
                    >
                      <span className={styles.radioCircle}>
                        {selectedDepartment === department && (
                          <span className={styles.radioCircleInner} />
                        )}
                      </span>
                      <Text
                        size="sm"
                        weight="medium"
                        color={
                          selectedDepartment === department
                            ? "primary"
                            : "gray_700"
                        }
                      >
                        {department}
                      </Text>
                    </button>
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <Text size="sm" weight="medium" color="gray_400">
                      단과대학을 먼저 선택해주세요
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <Button variant="ghost" onClick={closeBottomSheet}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            disabled={!selectedCollege || !selectedDepartment}
          >
            선택 완료
          </Button>
        </div>
      </BottomSheet>
    </section>
  );
}

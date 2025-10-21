import IcAdd from "../assets/icons/ic_add.svg?react";
import IcArrowBottom from "../assets/icons/ic_arrowbottom.svg?react";
import IcArrowTop from "../assets/icons/ic_arrowtop.svg?react";
import IcCross from "../assets/icons/ic_cross.svg?react";
import IcHeartEmpty from "../assets/icons/ic_heart_empty.svg?react";
import IcHeartFill from "../assets/icons/ic_heart_filled.svg?react";
import IcRadioActive from "../assets/icons/ic_radio_active.svg?react";
import IcRadioInactive from "../assets/icons/ic_radio_deactive.svg?react";
import IcSearch from "../assets/icons/ic_search.svg?react";

export default {
  title: "Foundations/Icons",
};

const icons = {
  IcRadioActive,
  IcRadioInactive,
  IcHeartEmpty,
  IcHeartFill,
  IcAdd,
  IcArrowBottom,
  IcArrowTop,
  IcCross,
  IcSearch,
};

export const Icons = () => (
  <div style={{ padding: 24 }}>
    <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 700 }}>
      Tingle Icon system 👀
    </h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
        gap: 16,
      }}
    >
      {Object.entries(icons).map(([name, Icon]) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: 16,
            backgroundColor: "#f9f9f9",
            borderRadius: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <Icon width={32} height={32} title={name} />
          <code style={{ fontSize: 12, color: "#555", textAlign: "center" }}>
            {name}
          </code>
        </div>
      ))}
    </div>
  </div>
);

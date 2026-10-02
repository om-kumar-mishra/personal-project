import { MantineThemeOverride } from "@mantine/core";

export const hdfcTheme: MantineThemeOverride = {
  colors: {
    "ocean-blue": ["#7AD1DD"],
    white: ["#FFF"],
    "truboard-primary": ["#001D56", "#1C3568", "#374E7A", "#53668D", "#6E7F9F", "#8A97B1", "#A5B0C3", "#C1C8D6", "#DCE1E8", "#F8F9FA"],
    "truboard-accent": ["#E8E8E8"],
    "truboard-disabled-text": ["#A6A2A2"],
    "truboard-orange": ["#F58538"],
    "truboard-grey": ["#707070"],
    "truboard-selected-blue": ["#dce5ff"],
  },

  primaryColor: "truboard-primary",
  // spacing: {
  //     "3xs": "2px",
  //     xxs: "4px",
  //     xs: "8px",
  //     sm: "10px",
  //     md: "12px",
  //     lg: "14px",
  //     xl: "16px",
  // },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "24px",
  },
  components: {
    Textarea: {
      defaultProps: {
        maxLength: 5000,
      },
    },
    TextInput: {
      defaultProps: {
        maxLength: 1024,
      },
    },
  },
};

// packages/design-tokens/tailwind.preset.js
// Hessekhub (حس خوب) Design System V2.0 Preset
// 100% Token-Driven, RTL Logical Properties, Pure Light Mode Only

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Surfaces & Backgrounds
        canvas: "var(--hk-bg-canvas)",
        surface: {
          DEFAULT: "var(--hk-bg-surface)",
          hover: "var(--hk-bg-surface-hover)",
          active: "var(--hk-bg-surface-active)",
        },
        subtle: "var(--hk-bg-subtle)",
        sunken: "var(--hk-bg-sunken)",
        calm: "var(--hk-bg-calm)",
        disabled: "var(--hk-bg-disabled)",
        backdrop: "var(--hk-bg-backdrop)",

        // Borders
        border: {
          subtle: "var(--hk-border-subtle)",
          DEFAULT: "var(--hk-border-default)",
          control: "var(--hk-border-control)",
          disabled: "var(--hk-border-disabled)",
        },

        // Typography & Text
        strong: "var(--hk-text-strong)",
        body: "var(--hk-text-default)",
        muted: "var(--hk-text-muted)",
        faint: "var(--hk-text-subtle)",
        inverse: "var(--hk-text-inverse)",

        // Brand Primary (Blue 700 / 300)
        primary: {
          DEFAULT: "var(--hk-primary-fill)",
          hover: "var(--hk-primary-fill-hover)",
          active: "var(--hk-primary-fill-active)",
          on: "var(--hk-primary-on)",
          subtle: "var(--hk-primary-subtle)",
          "subtle-hover": "var(--hk-primary-subtle-hover)",
          text: "var(--hk-primary-text)",
        },

        // Semantic Feedback
        success: {
          DEFAULT: "var(--hk-success-fill)",
          text: "var(--hk-success-text)",
          subtle: "var(--hk-success-subtle)",
        },
        warning: {
          DEFAULT: "var(--hk-warning-fill)",
          text: "var(--hk-warning-text)",
          subtle: "var(--hk-warning-subtle)",
        },
        danger: {
          DEFAULT: "var(--hk-danger-fill)",
          hover: "var(--hk-danger-fill-hover)",
          text: "var(--hk-danger-text)",
          subtle: "var(--hk-danger-subtle)",
        },
        info: {
          text: "var(--hk-info-text)",
          subtle: "var(--hk-info-subtle)",
        },

        // Brand Accents
        accent: {
          DEFAULT: "var(--hk-accent-fill)",
          hover: "var(--hk-accent-fill-hover)",
          on: "var(--hk-accent-on)",
        },
        luxe: {
          DEFAULT: "var(--hk-luxe-fill)",
          on: "var(--hk-luxe-on)",
          subtle: "var(--hk-luxe-subtle)",
          text: "var(--hk-luxe-text)",
        },
        notify: "var(--hk-notify-fill)",

        // Base Ink & White
        ink: "var(--hk-ink)",
        white: "var(--hk-white)",

        // Data Viz & Charts
        chart: {
          1: "var(--hk-chart-1)",
          2: "var(--hk-chart-2)",
          3: "var(--hk-chart-3)",
          4: "var(--hk-chart-4)",
          5: "var(--hk-chart-5)",
          ref: "var(--hk-chart-ref)",
          raw: "var(--hk-chart-raw-point)",
          secondary: "var(--hk-chart-secondary-line)",
        },
      },

      fontFamily: {
        sans: ["Montserrat-Latin", "IRANSansFaNum", "system-ui", "-apple-system", "sans-serif"],
        fa: ["IRANSansFaNum", "sans-serif"],
        en: ["Montserrat-Latin", "sans-serif"],
      },

      borderRadius: {
        xs: "var(--hk-radius-xs)",
        sm: "var(--hk-radius-sm)",
        md: "var(--hk-radius-md)",
        lg: "var(--hk-radius-lg)",
        xl: "var(--hk-radius-xl)",
        pill: "var(--hk-radius-pill)",
      },

      spacing: {
        0: "var(--hk-space-0)",
        1: "var(--hk-space-1)",
        2: "var(--hk-space-2)",
        3: "var(--hk-space-3)",
        4: "var(--hk-space-4)",
        5: "var(--hk-space-5)",
        6: "var(--hk-space-6)",
        7: "var(--hk-space-7)",
        8: "var(--hk-space-8)",
        9: "var(--hk-space-9)",
        10: "var(--hk-space-10)",
        11: "var(--hk-space-11)",
        12: "var(--hk-space-12)",
        13: "var(--hk-space-13)",
      },

      maxWidth: {
        container: "var(--hk-container-max)",
        measure: "var(--hk-measure-body)",
      },

      height: {
        control: "var(--hk-control-h)",
        "control-sm": "var(--hk-control-h-sm)",
        "table-row": "var(--hk-table-row-h)",
      },

      minHeight: {
        hit: "var(--hk-hit-min)",
        control: "var(--hk-control-h)",
      },

      minWidth: {
        hit: "var(--hk-hit-min)",
      },

      boxShadow: {
        "elevation-1": "var(--hk-elevation-1)",
        "elevation-2": "var(--hk-elevation-2)",
        "elevation-3": "var(--hk-elevation-3)",
      },

      transitionDuration: {
        instant: "var(--hk-duration-instant)",
        fast: "var(--hk-duration-fast)",
        base: "var(--hk-duration-base)",
        slow: "var(--hk-duration-slow)",
        celebrate: "var(--hk-duration-celebrate)",
      },

      transitionTimingFunction: {
        standard: "var(--hk-ease-standard)",
        flow: "var(--hk-ease-flow)",
        happy: "var(--hk-ease-happy)",
      },

      zIndex: {
        sticky: "var(--hk-z-sticky)",
        dropdown: "var(--hk-z-dropdown)",
        sheet: "var(--hk-z-sheet)",
        modal: "var(--hk-z-modal)",
        toast: "var(--hk-z-toast)",
        tooltip: "var(--hk-z-tooltip)",
      },
    },
  },
  plugins: [],
};


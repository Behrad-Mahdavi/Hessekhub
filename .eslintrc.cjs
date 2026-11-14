module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    // منع استفاده از کلاس‌های فیزیکی چپ/راست تیلویند و الزام به Logical Properties (RTL-First)
    "no-restricted-syntax": [
      "error",
      {
        selector: "Literal[value=/\\b(ml|mr|pl|pr|left|right|text-left|text-right|rounded-l|rounded-r|border-l|border-r)-/]",
        message: "استفاده از کلاس‌های جهت‌دار فیزیکی ممنوع است. از ویژگی‌های منطقی RTL استفاده کنید: ms-*, me-*, ps-*, pe-*, start-*, end-*, text-start, text-end.",
      },
      {
        selector: "Literal[value=/\\btracking-(tighter|tight|wide|wider|widest)\\b/]",
        message: "اعمال letter-spacing روی تایپوگرافی فارسی باعث شکستن حروف متصل می‌شود و ممنوع است.",
      },
    ],
  },
};


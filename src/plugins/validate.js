// vee-validate: 表單驗證
import { defineRule } from "vee-validate";

defineRule("required", (value) => {
  if (!value || !value.length) {
    return "此欄位為必填";
  }
  return true;
});
// 手機
defineRule("phone", (value) => {
  if (!value || !value.length) {
    return true;
  }

  if (!/^1\d{10}$/.test(value)) {
    return "手機號格式無效";
  }
  return true;
});
// 驗證碼
defineRule("code", (value) => {
  if (!value || !value.length) {
    return true;
  }

  if (!/^\d{6}$/.test(value)) {
    return "驗證碼格式無效";
  }
  return true;
});
// 密碼
defineRule("password", (value) => {
  if (!value || !value.length) {
    return true;
  }

  if (!/^[0-9A-Za-z]{8,20}$/.test(value)) {
    return "密碼長度須為 8 ~ 20 個字符";
  }
  return true;
});

defineRule("confirmed", (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return "密碼不一致";
});

// 協議
defineRule("agree", (value) => {
  if (value) {
    return true;
  }
  return "請勾選同意協議";
});

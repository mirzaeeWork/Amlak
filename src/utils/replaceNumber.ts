const e2p = (s: string) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);//تبدیل اعداد انگلیسی به فارسی

const p2e = (s: string) =>
  s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());//تبدیل اعداد فارسی به انگلیسی

const sp = (number: string) => {
  const separatedNumber = parseInt(number).toLocaleString("en-US"); //اعداد را سه تا سه جدا می کند و بین آنها کاما می گذارد
  return e2p(separatedNumber);
};

const splitIntoThreeDigits = (input: string) => {
  // حذف هر کاراکتری که عدد نیست
  const cleanedString = input.replace(/\D/g, '');

  // تعیین اندازه گروه‌ها
  const groupSize = 3;

  // تقسیم رشته به گروه‌های سه رقمی از سمت راست
  const groups = [];
  for (let i = cleanedString.length; i > 0; i -= groupSize) {
    const group = cleanedString.slice(Math.max(0, i - groupSize), i);
    groups.unshift(group);
  }

  // اتصال گروه‌ها با یک جداکننده، مثل ویرگول
  const result = groups.join(',');

  return result;
};

function truncateText(text:string, maxWords:number) {
  if (text.length <= maxWords) {
    return text;
  }

  const truncatedText = text.slice(0, maxWords);
  return `${truncatedText} ...`;
}


export { e2p, p2e, sp, splitIntoThreeDigits ,truncateText};

const services = ["خرید", "فروش", "رهن", "اجاره"];
const cities = [
  "تهران",
  "سنندج",
  "کرمانشاه",
  "اهواز",
  "مشهد",
  "اصفهان",
  "شیراز",
  "خرم آباد",
];

const categories = [{ title: "آپارتمان", name: "apartment", image: '/images/apartment.png' },
{ title: "ویلا", name: "villa", image: '/images/villa.png' },
{ title: "مغازه", name: "store", image: '/images/store.png' },
{ title: "دفتر", name: "office", image: '/images/office.png' }]

type CategoryObject = {
  [key: string]: string;
};

const getCategories: CategoryObject = { apartment: "آپارتمان", villa: "ویلا", store: "مغازه", office: "دفتر" };


export { services, cities, categories, getCategories };

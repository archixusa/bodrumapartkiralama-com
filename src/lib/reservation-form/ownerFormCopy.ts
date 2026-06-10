// 4 dilli form metinleri — OwnerApplicationForm eskiden sabit Türkçeydi ve
// 4 dile çevrilen evinizi-kiraya-verin sayfasının dönüşüm noktası en/de/ru
// ziyaretçiye Türkçe görünüyordu (İ18N bütünlüğü bulgusu).
//
// ÖNEMLİ: Burada YALNIZ görünen etiketler çevrilir. DB'ye giden value'lar
// (REGIONS/CHANNELS dizileri, select option value'ları, radio value'ları)
// DEĞİŞMEZ — etiket/value ayrımı bileşende yapılır.

export type OwnerFormLocale = "tr" | "en" | "de" | "ru";

export interface OwnerFormCopy {
  title: string;
  titleLuxury: string;
  sub: string;
  name: string;
  phone: string;
  email: string;
  region: string;
  select: string;
  propertyType: string;
  /** option value → görünen etiket (value DB'ye olduğu gibi gider) */
  propertyTypes: Record<"villa" | "apart" | "daire" | "apart_otel" | "karma", string>;
  propertyCount: string;
  ownershipDuration: string;
  /** option value → görünen etiket */
  durations: Record<"yeni" | "0-1" | "1-3" | "3+", string>;
  rentingLegend: string;
  renting: Record<"yes" | "no" | "planning", string>;
  channelsLegend: string;
  /** DB value → görünen etiket (Airbnb/Booking marka adları aynen kalır) */
  channelLabels: Record<string, string>;
  /** "Diğer" bölge value'sunun görünen etiketi */
  regionOther: string;
  message: string;
  messagePlaceholder: string;
  referral: string;
  kvkkPrefix: string;
  kvkkLink: string;
  kvkkSuffix: string;
  submit: string;
  submitLuxury: string;
  submitting: string;
  errRequired: string;
  errPhone: string;
  errKvkk: string;
  errSend: string;
  successTitle: string;
  successBody: string;
  waButton: string;
  waMessage: (site: string, name: string) => string;
}

export const OWNER_FORM_COPY: Record<OwnerFormLocale, OwnerFormCopy> = {
  tr: {
    title: "Başvuru Formu",
    titleLuxury: "Mülkünüzü Değerlendirelim",
    sub: "Bilgileriniz size özel. 1-2 saat içinde sizi arayacağız.",
    name: "Ad Soyad *",
    phone: "Telefon *",
    email: "E-posta",
    region: "Bölge",
    select: "Seçin",
    propertyType: "Mülk tipi",
    propertyTypes: {
      villa: "Villa",
      apart: "Apart",
      daire: "Daire",
      apart_otel: "Apart otel",
      karma: "Birden fazla farklı",
    },
    propertyCount: "Mülk sayısı",
    ownershipDuration: "Ne kadar süredir size ait?",
    durations: {
      yeni: "Yeni aldım",
      "0-1": "1 yıldan az",
      "1-3": "1-3 yıl",
      "3+": "3 yıldan fazla",
    },
    rentingLegend: "Şu an kiralıyor musunuz?",
    renting: { yes: "Evet", no: "Hayır", planning: "Planlıyorum" },
    channelsLegend: "Hangi kanallarda?",
    channelLabels: {
      Direkt: "Direkt",
      "Diğer komisyoncu": "Diğer komisyoncu",
      Hiçbiri: "Hiçbiri",
    },
    regionOther: "Diğer",
    message: "Mesaj / Sorularınız",
    messagePlaceholder: "Mülkünüz hakkında bilmemizi istediğiniz detaylar…",
    referral: "Referans kodunuz var:",
    kvkkPrefix: "Kişisel verilerimin ",
    kvkkLink: "KVKK Aydınlatma Metni",
    kvkkSuffix: "'ne uygun şekilde işlenmesini onaylıyorum.",
    submit: "Başvurumu gönder",
    submitLuxury: "Mülkümü değerlendirin",
    submitting: "Gönderiliyor…",
    errRequired: "Lütfen ad ve telefonu doldurun.",
    errPhone: "Lütfen geçerli bir telefon numarası girin.",
    errKvkk: "Devam etmek için KVKK onayı vermelisiniz.",
    errSend: "Bir sorun oluştu, lütfen tekrar deneyin.",
    successTitle: "Teşekkürler!",
    successBody:
      "Başvurunuz alındı. Ekibimiz 1-2 saat içinde size dönüş yapacak; mülkünüzü değerlendirmek için randevu ayarlayacağız.",
    waButton: "WhatsApp'tan da yazın",
    waMessage: (site, name) =>
      `Merhaba, ${site} sitesinden mülk sahibi başvurusu yaptım. Adım ${name}.`,
  },
  en: {
    title: "Application Form",
    titleLuxury: "Let's Assess Your Property",
    sub: "Your details stay private. We'll call you within 1-2 hours.",
    name: "Full name *",
    phone: "Phone *",
    email: "Email",
    region: "Region",
    select: "Select",
    propertyType: "Property type",
    propertyTypes: {
      villa: "Villa",
      apart: "Apart",
      daire: "Flat",
      apart_otel: "Apart hotel",
      karma: "Several different",
    },
    propertyCount: "Number of properties",
    ownershipDuration: "How long have you owned it?",
    durations: {
      yeni: "Just bought it",
      "0-1": "Less than a year",
      "1-3": "1-3 years",
      "3+": "More than 3 years",
    },
    rentingLegend: "Are you currently renting it out?",
    renting: { yes: "Yes", no: "No", planning: "Planning to" },
    channelsLegend: "On which channels?",
    channelLabels: {
      Direkt: "Direct",
      "Diğer komisyoncu": "Other agency",
      Hiçbiri: "None",
    },
    regionOther: "Other",
    message: "Message / questions",
    messagePlaceholder: "Anything you'd like us to know about your property…",
    referral: "You have a referral code:",
    kvkkPrefix: "I consent to my personal data being processed under the ",
    kvkkLink: "KVKK privacy notice",
    kvkkSuffix: ".",
    submit: "Send my application",
    submitLuxury: "Assess my property",
    submitting: "Sending…",
    errRequired: "Please fill in your name and phone number.",
    errPhone: "Please enter a valid phone number.",
    errKvkk: "Please confirm the KVKK consent to continue.",
    errSend: "Something went wrong, please try again.",
    successTitle: "Thank you!",
    successBody:
      "We've received your application. Our team will get back to you within 1-2 hours to arrange a visit to assess your property.",
    waButton: "Or message us on WhatsApp",
    waMessage: (site, name) =>
      `Hello, I submitted a property owner application on ${site}. My name is ${name}.`,
  },
  de: {
    title: "Anfrageformular",
    titleLuxury: "Lassen Sie uns Ihre Immobilie bewerten",
    sub: "Ihre Angaben bleiben vertraulich. Wir rufen Sie innerhalb von 1-2 Stunden an.",
    name: "Vor- und Nachname *",
    phone: "Telefon *",
    email: "E-Mail",
    region: "Region",
    select: "Bitte wählen",
    propertyType: "Objekttyp",
    propertyTypes: {
      villa: "Villa",
      apart: "Apartment",
      daire: "Wohnung",
      apart_otel: "Aparthotel",
      karma: "Mehrere verschiedene",
    },
    propertyCount: "Anzahl der Objekte",
    ownershipDuration: "Seit wann gehört es Ihnen?",
    durations: {
      yeni: "Gerade gekauft",
      "0-1": "Weniger als 1 Jahr",
      "1-3": "1-3 Jahre",
      "3+": "Mehr als 3 Jahre",
    },
    rentingLegend: "Vermieten Sie derzeit?",
    renting: { yes: "Ja", no: "Nein", planning: "Ich plane es" },
    channelsLegend: "Über welche Kanäle?",
    channelLabels: {
      Direkt: "Direkt",
      "Diğer komisyoncu": "Anderer Vermittler",
      Hiçbiri: "Keine",
    },
    regionOther: "Andere",
    message: "Nachricht / Fragen",
    messagePlaceholder: "Details, die wir über Ihre Immobilie wissen sollten…",
    referral: "Sie haben einen Empfehlungscode:",
    kvkkPrefix:
      "Ich willige in die Verarbeitung meiner personenbezogenen Daten gemäß der ",
    kvkkLink: "KVKK-Datenschutzerklärung",
    kvkkSuffix: " ein.",
    submit: "Anfrage absenden",
    submitLuxury: "Meine Immobilie bewerten",
    submitting: "Wird gesendet…",
    errRequired: "Bitte füllen Sie Name und Telefon aus.",
    errPhone: "Bitte geben Sie eine gültige Telefonnummer ein.",
    errKvkk: "Bitte bestätigen Sie die KVKK-Einwilligung, um fortzufahren.",
    errSend: "Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut.",
    successTitle: "Vielen Dank!",
    successBody:
      "Wir haben Ihre Anfrage erhalten. Unser Team meldet sich innerhalb von 1-2 Stunden, um einen Termin zur Bewertung Ihrer Immobilie zu vereinbaren.",
    waButton: "Oder per WhatsApp schreiben",
    waMessage: (site, name) =>
      `Hallo, ich habe über ${site} eine Eigentümer-Anfrage gesendet. Mein Name ist ${name}.`,
  },
  ru: {
    title: "Форма заявки",
    titleLuxury: "Давайте оценим вашу недвижимость",
    sub: "Ваши данные конфиденциальны. Мы перезвоним вам в течение 1-2 часов.",
    name: "Имя и фамилия *",
    phone: "Телефон *",
    email: "Эл. почта",
    region: "Район",
    select: "Выберите",
    propertyType: "Тип объекта",
    propertyTypes: {
      villa: "Вилла",
      apart: "Апарт",
      daire: "Квартира",
      apart_otel: "Апарт-отель",
      karma: "Несколько разных",
    },
    propertyCount: "Количество объектов",
    ownershipDuration: "Как давно объект принадлежит вам?",
    durations: {
      yeni: "Недавно купил(а)",
      "0-1": "Меньше года",
      "1-3": "1-3 года",
      "3+": "Больше 3 лет",
    },
    rentingLegend: "Сдаёте ли вы объект сейчас?",
    renting: { yes: "Да", no: "Нет", planning: "Планирую" },
    channelsLegend: "На каких площадках?",
    channelLabels: {
      Direkt: "Напрямую",
      "Diğer komisyoncu": "Другой посредник",
      Hiçbiri: "Никаких",
    },
    regionOther: "Другое",
    message: "Сообщение / вопросы",
    messagePlaceholder: "Детали о вашем объекте, которые нам стоит знать…",
    referral: "У вас есть реферальный код:",
    kvkkPrefix:
      "Я соглашаюсь на обработку моих персональных данных в соответствии с ",
    kvkkLink: "уведомлением о конфиденциальности KVKK",
    kvkkSuffix: ".",
    submit: "Отправить заявку",
    submitLuxury: "Оценить мою недвижимость",
    submitting: "Отправка…",
    errRequired: "Пожалуйста, укажите имя и телефон.",
    errPhone: "Пожалуйста, введите корректный номер телефона.",
    errKvkk: "Пожалуйста, подтвердите согласие KVKK, чтобы продолжить.",
    errSend: "Произошла ошибка, попробуйте ещё раз.",
    successTitle: "Спасибо!",
    successBody:
      "Мы получили вашу заявку. Наша команда свяжется с вами в течение 1-2 часов, чтобы договориться об оценке вашего объекта.",
    waButton: "Или напишите нам в WhatsApp",
    waMessage: (site, name) =>
      `Здравствуйте, я отправил(а) заявку владельца на сайте ${site}. Меня зовут ${name}.`,
  },
};

export function pickOwnerFormCopy(locale: string): OwnerFormCopy {
  return OWNER_FORM_COPY[(locale as OwnerFormLocale) in OWNER_FORM_COPY ? (locale as OwnerFormLocale) : "en"];
}

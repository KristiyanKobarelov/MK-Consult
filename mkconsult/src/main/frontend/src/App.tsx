import {
  ArrowRight,
  BarChart3,
  Building2,
  Calculator,
  CheckCircle2,
  Factory,
  FileText,
  Landmark,
  LineChart,
  Mail,
  MapPin,
  PieChart,
  ShieldCheck,
  ShoppingCart,
  Target,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import emkaLogo from "./assets/emka-logo-cropped.png";

type Lang = "bg" | "en";
type Page = "home" | "services" | "experience" | "team" | "contact";

type ServiceGroup = {
  title: string;
  summary: string;
  bullets: string[];
  icon: typeof Target;
};

type ExperienceGroup = {
  title: string;
  intro?: string;
  points: string[];
  icon: typeof Factory;
};

type TeamPoint = {
  title: string;
  text: string;
};

type Copy = {
  nav: Record<Page, string>;
  ui: {
    language: string;
    ctaPrimary: string;
    ctaSecondary: string;
    learnMore: string;
    sourceLabel: string;
    breadcrumbHome: string;
    contactButton: string;
    footerNav: string;
    footerServices: string;
    footerContact: string;
    rights: string;
    builtBy: string;
  };
  home: {
    eyebrow: string;
    title: string;
    accent: string;
    lead: string;
    missionTitle: string;
    missionIntro: string;
    mission: string[];
    focus: Array<{ value: string; label: string }>;
  };
  services: {
    title: string;
    intro: string;
    groups: ServiceGroup[];
  };
  experience: {
    title: string;
    intro: string;
    groups: ExperienceGroup[];
  };
  team: {
    title: string;
    intro: string;
    points: TeamPoint[];
  };
  contact: {
    title: string;
    intro: string;
    addressLabel: string;
    emailLabel: string;
    formTitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
  };
};

const sourceUrl = "https://www.emkaconsult.bg/en/your-trusted-financial-business-partner/";

const serviceIcons = [LineChart, Calculator, Target, UserRound];
const experienceIcons = [Factory, ShoppingCart, Building2];

const translations: Record<Lang, Copy> = {
  bg: {
    nav: {
      home: "Начало",
      services: "Услуги",
      experience: "Опит",
      team: "Нашият екип",
      contact: "Контакти",
    },
    ui: {
      language: "BG",
      ctaPrimary: "Вижте услугите",
      ctaSecondary: "Нашият опит",
      learnMore: "Виж повече",
      sourceLabel: "Източник: emkaconsult.bg",
      breadcrumbHome: "Начало",
      contactButton: "Свържете се с нас",
      footerNav: "Навигация",
      footerServices: "Услуги",
      footerContact: "Контакти",
      rights: "© 2026 MK Consult. Всички права запазени.",
      builtBy: "Изработка на уебсайт от — R6",
    },
    home: {
      eyebrow: "",
      title: "Вашият Стратегически",
      accent: "Финансов Партньор",
      lead: "Ние предоставяме точни данни за контрол на разходите, управление на паричните потоци и устойчив растеж",
      missionTitle: "Нашата цел",
      missionIntro: "Трансформация на финансовата функция чрез стратегическо бизнес партньорство, стойност и доверие.",
      mission: [
        "Трансформация на финансовата функция – не просто счетоводство, а стратегическо бизнес партньорство",
        "Създаване на стойност за бизнеса в правилната посока",
        "Комплексни финансови услуги, съобразени с нуждите на всеки бизнес",
        "Дългосрочно партньорство",
        "Доверие",
      ],
      focus: [
        { value: "Данни", label: "Надеждна основа за решения" },
        { value: "Контрол", label: "Разходи и оперативна ефективност" },
        { value: "Поток", label: "Управление на парични потоци" },
        { value: "Растеж", label: "Устойчиво развитие" },
      ],
    },
    services: {
      title: "Услуги",
      intro: "Комплексни финансови, счетоводни и административни услуги, съобразени с нуждите на бизнеса.",
      groups: [
        {
          title: "Финансово планиране и анализи",
          summary: "Отчети, KPI, бюджетиране и контролинг за по-добра видимост върху бизнеса",
          icon: serviceIcons[0],
          bullets: [
            "Разработване на отчети за анализ на рентабилността на ниво регион и/или продукт",
            "Мониторинг и контрол на оперативните разходи",
            "Задаване на ключови бизнес показатели (KPI) за наблюдение и сравнение",
            "Планиране и бюджетиране",
            "Месечно отчитане и сравнение спрямо бюджет",
            "Управление на паричните потоци",
            "Работа с банки и подготовка на бизнес планове, свързани с кредити",
            "Внедряване и координиране на процеси, добри практики и процедури във финансовата и контролингова област",
          ],
        },
        {
          title: "Счетоводно обслужване",
          summary: "Пълно счетоводно обслужване, регулаторно съответствие и отчетност",
          icon: serviceIcons[1],
          bullets: [
            "Пълно счетоводно обслужване",
            "Изготвяне и подаване на Справка-декларация по ЗДДС",
            "Регистрация по ЗДДС",
            "Представителство пред НАП, НОИ, НСИ и БНБ",
            "Изготвяне на отчети за Българска народна банка",
            "Изготвяне на годишни финансови отчети",
            "Управление на годишен финансов одит",
            "Осигуряване на съответствие със счетоводните стандарти и други регулаторни изисквания",
          ],
        },
        {
          title: "Стратегическо партньорство",
          summary: "Подкрепа при инвестиции, оценки, капиталово структуриране и сделки",
          icon: serviceIcons[2],
          bullets: [
            "Стратегическо планиране",
            "Разработване на инвестиционни проекти",
            "Оценка на бизнеси при продажба или преструктуриране",
            "Набиране на капитал и финансово структуриране",
            "Сливания и придобивания",
          ],
        },
        {
          title: "Обработка на възнагражденията и администриране на персонала",
          summary: "Payroll, HR администрация, вътрешни правила, проверки и препоръки",
          icon: serviceIcons[3],
          bullets: [
            "Калкулиране на възнаграждения и изготвяне на ведомости, рекапитулации, фишове, декларации и платежни нареждания",
            "Изготвяне и подаване на годишни и периодични отчети за НСИ и справки по чл. 55 и чл. 73 от ЗДДФЛ",
            "Администриране на трудови договори, анекси, заповеди, майчинство, болест и граждански договори",
            "Съдействие при вътрешно-фирмена документация: правилник за вътрешния трудов ред, работно време и вътрешни правила за работната заплата",
            "Съдействие при проверки и комуникация с държавни институции",
            "Консултации за изчисляване на възнаграждения и администриране на персонала",
            "Одит на съществуващата ЧР система и доклад с препоръки за по-ефективно и устойчиво управление",
          ],
        },
      ],
    },
    experience: {
      title: "Опит",
      intro: "Практически финансови решения за логистика, продажби, бързооборотни стоки, лизинг и недвижими имоти.",
      groups: [
        {
          title: "В логистиката",
          icon: experienceIcons[0],
          intro:
            "Интегрирани финансови решения за логистични фирми, фокусирани върху оптимизация на разходите, повишаване на печалбата и решения в реално време.",
          points: [
            "Анализ на цена на POS: проследяване на транзакционни такси, комисионни и скрити разходи",
            "Проследяване на цена на километър, включително гориво, поддръжка и тол такси",
            "Изчисляване на цена на маршрут и оптимизация за минимални разходи и максимална натовареност",
            "Оперативна точност: поръчки, редове в поръчка и доставки по цикъл",
          ],
        },
        {
          title: "В продажбите",
          icon: experienceIcons[1],
          intro:
            "Интегрирани решения за търговски организации и FMCG бизнеси чрез аналитични платформи и данни в реално време.",
          points: [
            "Анализ на SKU ниво: продажби, маржове, обръщаемост и оптимизация на портфолиото",
            "Контрол на запасите чрез прогнози и автоматизирани поръчки",
            "Финансово табло за ежедневен мониторинг на търговските операции",
            "Анализ на растежа по обем, микс и цена",
            "Позициониране на пазарния дял и сравнение с конкуренти",
            "Анализ на брутен и оперативен марж по продукти, канали и търговски обекти",
            "Ефективност на оборотния капитал: DPO, DSO и DSI",
            "Управление и анализ на връщанията",
          ],
        },
        {
          title: "В лизинг и недвижими имоти",
          icon: experienceIcons[2],
          intro: "Финансово-счетоводни услуги за управление на недвижими имоти и оценка на имотна ефективност.",
          points: [
            "Коефициент на капитализация (Cap Rate) и пазарна привлекателност",
            "Брутна и нетна доходност от наем",
            "Коефициент на покритие на обслужването на дълга (DSCR)",
            "Коефициент на заетост и свободни площи",
            "Нетен оперативен доход (NOI)",
            "Приходи или разходи на квадратен метър",
            "Коефициент на събираемост и контрол на лоши дългове",
          ],
        },
      ],
    },
    team: {
      title: "Нашият екип",
      intro: "Екип със силна академична основа, доказан практически опит и участие в значими трансформации.",
      points: [
        {
          title: "Солидно образование",
          text: "Силна академична основа във финанси, счетоводство и човешки ресурси, с непрекъснато професионално развитие.",
        },
        {
          title: "Доказан опит",
          text: "Дългогодишен практически опит в управлението на сложни финансови операции в различни бизнес сфери.",
        },
        {
          title: "Забележителни постижения",
          text: "Успешно участие в множество значителни сделки и преструктуриране за клиенти.",
        },
      ],
    },
    contact: {
      title: "Контакти",
      intro: "Свържете се с нас за консултация или допълнителна информация.",
      addressLabel: "Адрес",
      emailLabel: "Имейл",
      formTitle: "Изпратете ни съобщение",
      name: "Име",
      email: "Имейл",
      phone: "Телефон",
      message: "Съобщение",
      submit: "Изпрати",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      experience: "Experience",
      team: "Our Team",
      contact: "Contact",
    },
    ui: {
      language: "EN",
      ctaPrimary: "View services",
      ctaSecondary: "Our experience",
      learnMore: "Learn more",
      sourceLabel: "Source: emkaconsult.bg",
      breadcrumbHome: "Home",
      contactButton: "Contact us",
      footerNav: "Navigation",
      footerServices: "Services",
      footerContact: "Contact",
      rights: "© 2026 MK Consult. All rights reserved.",
      builtBy: "Website by — R6",
    },
    home: {
      eyebrow: "",
      title: "Your Strategic",
      accent: "Financial Partner",
      lead: "We deliver reliable data for cost control, cash flow management and sustainable growth",
      missionTitle: "Our Mission",
      missionIntro: "Transforming the finance function through strategic business partnership, value creation and trust.",
      mission: [
        "Transformation of the finance function: not just accounting, but strategic business partnership",
        "Value creation in the right direction",
        "Comprehensive financial services tailored to each business",
        "Long-term partnership",
        "Trust",
      ],
      focus: [
        { value: "Data", label: "Reliable basis for decisions" },
        { value: "Control", label: "Costs and operational efficiency" },
        { value: "Cash flow", label: "Working capital visibility" },
        { value: "Growth", label: "Sustainable development" },
      ],
    },
    services: {
      title: "Our Services",
      intro: "Comprehensive financial, accounting and administrative services tailored to business needs.",
      groups: [
        {
          title: "Financial Planning and Reporting",
          summary: "Reports, KPIs, budgets and controlling for clearer business visibility",
          icon: serviceIcons[0],
          bullets: [
            "Develop reports for profitability analysis on regional, country and product levels",
            "Monitoring and control of operational costs",
            "Set up business KPIs for monitoring and comparison to competitors",
            "Planning and budgeting",
            "Monthly reporting and comparison against budget",
            "Cash flow management",
            "Work with banks and preparation of business plans related to loans",
            "Implement and coordinate processes, best practices and procedures in financial and controlling areas",
          ],
        },
        {
          title: "Accounting",
          summary: "Day-to-day accounting, regulatory compliance and financial reporting",
          icon: serviceIcons[1],
          bullets: [
            "Day-to-day accounting services",
            "Preparation and submitting monthly VAT reports",
            "VAT registration",
            "Representation before NRA, NSSI, NSI and BNB",
            "Preparation of reports for Bulgarian National Bank",
            "Financial statement preparation",
            "Manage annual financial audit",
            "Ensure compliance with accounting standards and other regulatory requirements",
          ],
        },
        {
          title: "Your Strategic Partner",
          summary: "Support for investments, valuations, capital structuring and transactions",
          icon: serviceIcons[2],
          bullets: [
            "Strategic planning",
            "Development of investment projects",
            "Valuation of businesses upon sale or restructuring",
            "Capital raising and financial structuring",
            "Mergers and acquisitions",
          ],
        },
        {
          title: "Payroll and personnel administration",
          summary: "Payroll, HR administration, internal policies, inspections and recommendations",
          icon: serviceIcons[3],
          bullets: [
            "Salaries calculation and preparation of payrolls, recapitulations, pay slips, monthly declarations and payment orders",
            "Preparation and submission of annual and periodic reports for NSI and reports under Art. 55 and Art. 73 of the Personal Income Tax Act",
            "Personnel administration: employment contracts, annexes, orders, maternity and illness documents, civil contracts",
            "Assistance with internal documentation: Internal Labor Regulations, Working Time Orders and Internal Salary Rules",
            "Assistance in inspections and communication with government institutions",
            "Consultations related to remuneration calculation and personnel administration",
            "Audit of the existing HR system and a report with recommendations for more effective and sustainable personnel management",
          ],
        },
      ],
    },
    experience: {
      title: "Experience",
      intro: "Practical financial solutions for logistics, sales, FMCG, leasing and real estate operations.",
      groups: [
        {
          title: "In Logistics",
          icon: experienceIcons[0],
          intro:
            "Integrated financial solutions for logistics companies focused on cost optimization, profit improvement and real-time decision-making.",
          points: [
            "POS cost analysis: tracking transaction fees, commissions and hidden costs",
            "Cost-per-kilometer tracking, including fuel, maintenance and tolls",
            "Route cost calculation and optimization for minimum cost and maximum utilization",
            "Operational excellence: accurate orders, lines per order fulfillment and bins delivered per cycle",
          ],
        },
        {
          title: "In Sales",
          icon: experienceIcons[1],
          intro: "Integrated solutions for sales organizations and FMCG businesses through analytics platforms and real-time data.",
          points: [
            "SKU analyses: product performance, margins, turnover and portfolio optimization",
            "Inventory control with forecasting and automated ordering tools",
            "Financial dashboard for daily monitoring of sales operations",
            "Volume and revenue growth trends by volume, mix and price",
            "Market share positioning and competitor comparison",
            "Gross and operating margin analysis by products, channels and outlets",
            "Working capital efficiency: DPO, DSO and DSI",
            "Returns management and outlet performance",
          ],
        },
        {
          title: "In Leasing and Real Estate",
          icon: experienceIcons[2],
          intro: "Financial and accounting services for real estate management and property performance evaluation.",
          points: [
            "Cap Rate and market attractiveness",
            "Gross and net rental yield",
            "Debt Service Coverage Ratio (DSCR)",
            "Occupancy rate and vacancy rate",
            "Net Operating Income (NOI)",
            "Revenue or cost per square meter",
            "Collection rates and bad-debt control",
          ],
        },
      ],
    },
    team: {
      title: "Our Team",
      intro: "A team with advanced education, proven hands-on experience and notable work on significant transformations.",
      points: [
        {
          title: "Advanced Education",
          text: "Strong academic foundation in finance, accounting and human resources with continuous professional development.",
        },
        {
          title: "Proven Track Record",
          text: "Years of hands-on experience managing complex financial operations across diverse industries.",
        },
        {
          title: "Notable Achievements",
          text: "Successfully led significant transactions and transformations for clients across multiple sectors.",
        },
      ],
    },
    contact: {
      title: "Contact Us",
      intro: "Contact us for a consultation or additional information.",
      addressLabel: "Address",
      emailLabel: "Email",
      formTitle: "Send us a message",
      name: "Name",
      email: "Email",
      phone: "Phone",
      message: "Message",
      submit: "Send",
    },
  },
};

const pageOrder: Page[] = ["home", "services", "experience", "team", "contact"];

function App() {
  const [page, setPage] = useState<Page>("home");
  const [lang, setLang] = useState<Lang>("bg");
  const copy = translations[lang];

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-[1480px] overflow-hidden bg-paper shadow-panel">
        <Header copy={copy} lang={lang} page={page} onLanguageChange={setLang} onNavigate={navigate} />
        {page === "home" && <HomePage copy={copy} onNavigate={navigate} />}
        {page === "services" && <ServicesPage copy={copy} onNavigate={navigate} />}
        {page === "experience" && <ExperiencePage copy={copy} onNavigate={navigate} />}
        {page === "team" && <TeamPage copy={copy} onNavigate={navigate} />}
        {page === "contact" && <ContactPage copy={copy} />}
        <Footer copy={copy} onNavigate={navigate} />
      </div>
    </div>
  );
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <img
      src={emkaLogo}
      alt="MK Consult"
      className={`h-14 w-auto object-contain sm:h-16 ${inverse ? "bg-white/95 p-1" : ""}`}
    />
  );
}

function Header({
  copy,
  lang,
  page,
  onLanguageChange,
  onNavigate,
}: {
  copy: Copy;
  lang: Lang;
  page: Page;
  onLanguageChange: (lang: Lang) => void;
  onNavigate: (page: Page) => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/95 px-5 py-4 backdrop-blur md:px-10 lg:px-12">
      <div className="flex items-center justify-between gap-4">
        <button aria-label="MK Consult" className="shrink-0 text-left" onClick={() => onNavigate("home")}>
          <Logo />
        </button>
        <nav className="hidden items-center gap-7 text-[0.72rem] font-bold uppercase tracking-[0.06em] lg:flex">
          {pageOrder.map((item) => (
            <button
              key={item}
              className={`border-b py-2 transition ${
                page === item ? "border-copper text-copper" : "border-transparent hover:border-copper/50"
              }`}
              onClick={() => onNavigate(item)}
            >
              {copy.nav[item]}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle lang={lang} onLanguageChange={onLanguageChange} />
          <button
            className="hidden h-12 items-center gap-3 bg-copper px-5 text-[0.72rem] font-bold uppercase tracking-[0.06em] text-white transition hover:bg-olive sm:inline-flex"
            onClick={() => onNavigate("contact")}
          >
            {copy.ui.contactButton}
          </button>
        </div>
      </div>
      <nav className="mt-4 flex gap-2 overflow-x-auto text-[0.68rem] font-bold uppercase tracking-[0.06em] lg:hidden">
        {pageOrder.map((item) => (
          <button
            key={item}
            className={`shrink-0 border px-3 py-2 ${
              page === item ? "border-copper bg-copper text-white" : "border-line"
            }`}
            onClick={() => onNavigate(item)}
          >
            {copy.nav[item]}
          </button>
        ))}
      </nav>
    </header>
  );
}

function LanguageToggle({ lang, onLanguageChange }: { lang: Lang; onLanguageChange: (lang: Lang) => void }) {
  return (
    <div className="grid grid-cols-2 border border-line bg-paper text-[0.7rem] font-bold uppercase tracking-[0.08em]">
      {(["bg", "en"] as const).map((item) => (
        <button
          key={item}
          className={`h-10 px-3 transition ${lang === item ? "bg-ink text-white" : "text-ink hover:bg-cream"}`}
          onClick={() => onLanguageChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function Button({
  children,
  variant = "filled",
  onClick,
  type = "button",
}: {
  children: string;
  variant?: "filled" | "outline";
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes =
    variant === "filled"
      ? "bg-copper text-white hover:bg-olive"
      : "border border-copper/70 text-copper hover:bg-copper hover:text-white";

  return (
    <button
      type={type}
      className={`inline-flex h-12 items-center gap-3 px-6 text-[0.74rem] font-bold uppercase tracking-[0.06em] transition ${classes}`}
      onClick={onClick}
    >
      {children}
      <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
    </button>
  );
}

function HomePage({ copy, onNavigate }: { copy: Copy; onNavigate: (page: Page) => void }) {
  return (
    <main>
      <section className="grid min-h-[620px] grid-cols-1 lg:grid-cols-[1.08fr_1fr]">
        <div className="flex items-center px-7 py-16 sm:px-12 lg:px-16">
          <div className="max-w-2xl">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-copper">{copy.home.eyebrow}</p>
            <h1 className="font-serif text-5xl font-semibold leading-[1.04] sm:text-6xl lg:text-[3.75rem] xl:text-[4.35rem]">
              <span className="block sm:whitespace-nowrap">{copy.home.title}</span>
              <span className="block sm:whitespace-nowrap text-copper">{copy.home.accent}</span>
            </h1>
            <p className="mt-8 max-w-[36rem] text-base leading-8 text-ink/85 sm:text-lg">{copy.home.lead}</p>
            <div className="mt-10 flex flex-wrap gap-5">
              <Button onClick={() => onNavigate("services")}>{copy.ui.ctaPrimary}</Button>
              <Button variant="outline" onClick={() => onNavigate("experience")}>
                {copy.ui.ctaSecondary}
              </Button>
            </div>
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden shadow-wall">
          <div className="leaf-shadow absolute inset-0 opacity-70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img src={emkaLogo} alt="MK Consult" className="w-64 max-w-[72%] object-contain sm:w-80 lg:w-[22rem]" />
          </div>
        </div>
      </section>
      <MissionBand copy={copy} />
      <ServiceStrip copy={copy} onNavigate={onNavigate} />
    </main>
  );
}

function MissionBand({ copy }: { copy: Copy }) {
  return (
    <section className="border-y border-line bg-cream px-7 py-16 text-ink sm:px-12 lg:px-16">
      <div className="mx-auto grid max-w-5xl gap-8">
        {copy.home.mission.map((item) => (
          <div key={item} className="flex items-center gap-6">
            <CheckCircle2 className="h-11 w-11 shrink-0 text-copper" strokeWidth={1.5} />
            <p className="text-lg font-semibold leading-8 text-ink/60 sm:text-xl">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServiceStrip({ copy, onNavigate }: { copy: Copy; onNavigate: (page: Page) => void }) {
  return (
    <section className="border-y border-line bg-white px-7 py-16 sm:px-12 lg:px-16">
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper">{copy.services.title}</p>
        <div className="mx-auto mt-5 h-px w-10 bg-copper" />
      </div>
      <div className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {copy.services.groups.map((service, index) => {
          const Icon = service.icon;
          return (
            <article
              key={service.title}
              className={`border-line px-6 first:pl-0 sm:border-r ${index === copy.services.groups.length - 1 ? "border-r-0" : ""}`}
            >
              <Icon className="h-12 w-12 text-copper" strokeWidth={1.2} />
              <h3 className="mt-6 min-h-12 text-sm font-bold leading-5">{service.title}</h3>
              <p className="mt-4 text-sm leading-6 text-ink/70">{service.summary}</p>
              <button
                className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-copper"
                onClick={() => onNavigate("services")}
              >
                {copy.ui.learnMore} <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PageShell({
  copy,
  page,
  title,
  intro,
  children,
}: {
  copy: Copy;
  page: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-paper px-7 py-14 sm:px-12 lg:px-16">
      <p className="text-sm text-ink/70">
        {copy.ui.breadcrumbHome} / {page}
      </p>
      <h1 className="mt-8 font-serif text-5xl font-semibold">{title}</h1>
      <p className="mt-8 max-w-3xl text-base leading-8 text-ink/75">{intro}</p>
      <div className="mt-12">{children}</div>
    </main>
  );
}

function ServicesPage({ copy, onNavigate }: { copy: Copy; onNavigate: (page: Page) => void }) {
  return (
    <PageShell copy={copy} page={copy.nav.services} title={copy.services.title} intro={copy.services.intro}>
      <div className="grid gap-6 lg:grid-cols-2">
        {copy.services.groups.map((service) => {
          const Icon = service.icon;
          return (
            <article key={service.title} className="border border-line bg-paper p-7">
              <div className="flex items-start gap-5">
                <Icon className="h-11 w-11 shrink-0 text-copper" strokeWidth={1.2} />
                <div>
                  <h2 className="font-serif text-3xl font-semibold">{service.title}</h2>
                  <p className="mt-3 text-sm font-bold leading-6 text-ink/70">{service.summary}</p>
                </div>
              </div>
              <ul className="mt-7 grid gap-3 text-sm leading-6 text-ink/75">
                {service.bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-copper" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}

function ExperiencePage({ copy, onNavigate }: { copy: Copy; onNavigate: (page: Page) => void }) {
  return (
    <PageShell copy={copy} page={copy.nav.experience} title={copy.experience.title} intro={copy.experience.intro}>
      <div className="grid gap-7">
        {copy.experience.groups.map((group) => {
          const Icon = group.icon;
          return (
            <article key={group.title} className="border border-line bg-cream p-7">
              <div className="grid gap-6 lg:grid-cols-[5rem_0.8fr_1.2fr] lg:items-start">
                <Icon className="h-14 w-14 text-copper" strokeWidth={1.1} />
                <div>
                  <h2 className="font-serif text-3xl font-semibold">{group.title}</h2>
                  {group.intro && <p className="mt-4 text-sm leading-7 text-ink/70">{group.intro}</p>}
                </div>
                <ul className="grid gap-3 text-sm leading-6 text-ink/75">
                  {group.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-copper" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}

function TeamPage({ copy, onNavigate }: { copy: Copy; onNavigate: (page: Page) => void }) {
  return (
    <PageShell copy={copy} page={copy.nav.team} title={copy.team.title} intro={copy.team.intro}>
      <div className="grid gap-6 lg:grid-cols-3">
        {copy.team.points.map((point) => (
          <article key={point.title} className="border border-line bg-cream p-7">
            <UserRound className="h-11 w-11 text-copper" strokeWidth={1.3} />
            <h2 className="mt-6 font-serif text-3xl font-semibold">{point.title}</h2>
            <p className="mt-4 text-sm leading-7 text-ink/72">{point.text}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function ContactPage({ copy }: { copy: Copy }) {
  return (
    <PageShell copy={copy} page={copy.nav.contact} title={copy.contact.title} intro={copy.contact.intro}>
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1fr]">
        <div className="space-y-8">
          {[
            [MapPin, copy.contact.addressLabel, "Sofia, 1000"],
            [Mail, copy.contact.emailLabel, "finance@emkaconsult.bg"],
          ].map(([Icon, title, text]) => {
            const ItemIcon = Icon as typeof MapPin;
            return (
              <div key={title as string} className="flex gap-5">
                <ItemIcon className="mt-1 h-7 w-7 text-copper" strokeWidth={1.3} />
                <div>
                  <h2 className="font-bold">{title as string}</h2>
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-ink/70">{text as string}</p>
                </div>
              </div>
            );
          })}
        </div>
        <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
          <h2 className="font-serif text-3xl font-semibold">{copy.contact.formTitle}</h2>
          <input className="h-12 border border-line bg-transparent px-4 outline-none focus:border-copper" placeholder={copy.contact.name} />
          <input className="h-12 border border-line bg-transparent px-4 outline-none focus:border-copper" placeholder={copy.contact.email} />
          <input className="h-12 border border-line bg-transparent px-4 outline-none focus:border-copper" placeholder={copy.contact.phone} />
          <textarea className="min-h-40 border border-line bg-transparent p-4 outline-none focus:border-copper" placeholder={copy.contact.message} />
          <div>
            <Button type="submit">{copy.contact.submit}</Button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}

function Footer({ copy, onNavigate }: { copy: Copy; onNavigate: (page: Page) => void }) {
  return (
    <footer className="border-t border-line bg-cream px-7 py-14 text-ink sm:px-12 lg:px-16">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.8fr_1fr_1.15fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-7 text-ink/70">{copy.home.lead}</p>
          <a className="mt-5 inline-block text-xs text-copper underline-offset-4 hover:underline" href={sourceUrl} target="_blank" rel="noreferrer">
            {copy.ui.sourceLabel}
          </a>
        </div>
        <FooterColumn
          title={copy.ui.footerNav}
          items={pageOrder.map((item) => ({ label: copy.nav[item], onClick: () => onNavigate(item) }))}
        />
        <FooterColumn
          title={copy.ui.footerServices}
          items={copy.services.groups.map((item) => ({ label: item.title, onClick: () => onNavigate("services") }))}
        />
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-copper">{copy.ui.footerContact}</h2>
          <div className="mt-5 space-y-4 text-sm leading-6 text-ink/70">
            <p>Sofia, 1000</p>
            <p>Finance@emkaconsult.bg</p>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-sm text-ink/60 sm:flex-row sm:justify-between">
        <span>{copy.ui.rights}</span>
        <span>{copy.ui.builtBy}</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: Array<{ label: string; onClick: () => void }> }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-copper">{title}</h2>
      <div className="mt-5 grid gap-3 text-sm text-ink/70">
        {items.map((item) => (
          <button key={item.label} className="text-left transition hover:text-copper" onClick={item.onClick}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useMemo } from "react";
import {
  Recycle,
  Users,
  Handshake,
  MapPin,
  Factory,
  Scale,
  Wallet,
  Database,
  Leaf,
  Wrench,
  TrendingUp,
  Globe2,
  CheckCircle2,
  Search,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------------------------------------------------------------- */
/* Design tokens                                                          */
/* ---------------------------------------------------------------------- */

const T = {
  forest: "#14432F",
  forestDeep: "#0C2A1D",
  forestMid: "#1E5A3F",
  marigold: "#E3A62F",
  marigoldDeep: "#B9820F",
  rust: "#B8552E",
  paper: "#EFF2EC",
  paperDeep: "#E2E7DE",
  white: "#FFFFFF",
  ink: "#1E2621",
  inkSoft: "#4B564E",
  line: "#C9D2C8",
};

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');";

/* ---------------------------------------------------------------------- */
/* Mock data                                                              */
/* ---------------------------------------------------------------------- */

const CATEGORY_LIST = ["Paper", "Plastic", "Metal", "E-waste", "Glass & Textile"];

const PRICE_BOARD = [
  { category: "Paper", name: "Newspaper / Raddi", range: "₹12 – ₹16", unit: "per kg" },
  { category: "Paper", name: "Cardboard / Carton", range: "₹6 – ₹10", unit: "per kg" },
  { category: "Paper", name: "Books / Office Paper", range: "₹8 – ₹14", unit: "per kg" },
  { category: "Plastic", name: "PET Bottles", range: "₹10 – ₹20", unit: "per kg" },
  { category: "Plastic", name: "Mixed Rigid Plastic", range: "₹8 – ₹16", unit: "per kg" },
  { category: "Metal", name: "Iron & Steel", range: "₹24 – ₹40", unit: "per kg" },
  { category: "Metal", name: "Aluminium", range: "₹100 – ₹170", unit: "per kg" },
  { category: "Metal", name: "Copper", range: "₹500 – ₹750", unit: "per kg" },
  { category: "Metal", name: "Brass", range: "₹400 – ₹550", unit: "per kg" },
  { category: "E-waste", name: "Small Appliances", range: "₹20 – ₹90", unit: "per kg" },
  { category: "E-waste", name: "Batteries", range: "₹70 – ₹110", unit: "per kg" },
  { category: "Glass & Textile", name: "Glass Bottles", range: "₹1 – ₹2", unit: "per kg" },
  { category: "Glass & Textile", name: "Old Clothing", range: "₹2 – ₹6", unit: "per kg" },
];

const NODAL_CENTRES_SEED = [
  { id: "NC-2026-0114", name: "Kothrud Ward Centre", ward: "Ward 12 – Kothrud", city: "Pune", state: "Maharashtra", categories: ["Paper", "Plastic", "Metal"], capacity: "1.8 t/day" },
  { id: "NC-2026-0128", name: "Yerawada Ward Centre", ward: "Ward 21 – Yerawada", city: "Pune", state: "Maharashtra", categories: ["Plastic", "E-waste"], capacity: "1.1 t/day" },
  { id: "NC-2026-0201", name: "Indiranagar Ward Centre", ward: "Ward 84 – Indiranagar", city: "Bengaluru", state: "Karnataka", categories: ["Paper", "Plastic", "Glass & Textile"], capacity: "2.2 t/day" },
  { id: "NC-2026-0219", name: "Yeshwanthpur Ward Centre", ward: "Ward 25 – Yeshwanthpur", city: "Bengaluru", state: "Karnataka", categories: ["Metal", "E-waste"], capacity: "1.6 t/day" },
  { id: "NC-2026-0304", name: "Vijay Nagar Ward Centre", ward: "Ward 7 – Vijay Nagar", city: "Indore", state: "Madhya Pradesh", categories: ["Paper", "Metal"], capacity: "1.3 t/day" },
  { id: "NC-2026-0322", name: "Rajendra Nagar Ward Centre", ward: "Ward 15 – Rajendra Nagar", city: "Indore", state: "Madhya Pradesh", categories: ["Plastic", "E-waste", "Glass & Textile"], capacity: "0.9 t/day" },
  { id: "NC-2026-0410", name: "Alambagh Ward Centre", ward: "Ward 33 – Alambagh", city: "Lucknow", state: "Uttar Pradesh", categories: ["Paper", "Plastic"], capacity: "1.4 t/day" },
  { id: "NC-2026-0455", name: "Varachha Ward Centre", ward: "Ward 9 – Varachha", city: "Surat", state: "Gujarat", categories: ["Plastic", "Metal", "E-waste"], capacity: "2.0 t/day" },
];

const CIRCULAR_FEATURES = [
  { icon: Handshake, title: "EPR credit marketplace", desc: "Registered plants and nodal centres settle Extended Producer Responsibility obligations directly with producers, at CPCB-linked certificate rates." },
  { icon: Recycle, title: "Waste-to-wealth exchange", desc: "Surplus feedstock logged at one nodal centre can be listed and claimed by a plant elsewhere in the network, cutting transport waste and idle capacity." },
  { icon: Leaf, title: "Organics & compost loop", desc: "Wet-waste nodal points feed local composting or biogas units, closing the loop on the roughly half of India's municipal waste that is biodegradable." },
  { icon: Wrench, title: "Repair & refurbish network", desc: "Appliance and e-waste centres flag repairable items to certified refurbishers before they ever enter the recycling stream." },
  { icon: TrendingUp, title: "Carbon & impact accounting", desc: "Registry data on tonnes diverted from landfill supports verifiable carbon-credit and ESG reporting for municipalities and producers." },
  { icon: Globe2, title: "Open impact dashboard", desc: "A public view of recycling volumes by ward and city — the transparent data layer India's waste sector currently lacks." },
];

const HOW_IT_WORKS = [
  { n: "01", title: "Collect", desc: "Collectors gather recyclables on the rounds they already walk — nothing about their routine changes." },
  { n: "02", title: "Sell your way", desc: "Sell to a local aggregator as usual, or walk straight into the ward nodal centre for the full rate." },
  { n: "03", title: "Weigh & log", desc: "The nodal centre weighs, sorts and pays at the uniform national rate. Every sale is entered in the registry." },
  { n: "04", title: "Route to a plant", desc: "Sorted material is matched to a registered recycling plant nearby, by its declared intake capacity." },
];

const TREND_DATA = [
  { month: "Apr", tonnes: 14200 },
  { month: "May", tonnes: 16800 },
  { month: "Jun", tonnes: 18100 },
  { month: "Jul", tonnes: 19650 },
  { month: "Aug", tonnes: 21300 },
  { month: "Sep", tonnes: 22750 },
];

const ROLES = [
  { id: "collector", label: "Collector", icon: Users, blurb: "An individual waste picker or door-to-door collector." },
  { id: "aggregator", label: "Aggregator", icon: Handshake, blurb: "A local scrap dealer who buys from collectors." },
  { id: "nodal", label: "Nodal Centre", icon: MapPin, blurb: "A ward-level centre run with a municipal body." },
  { id: "plant", label: "Recycling Plant", icon: Factory, blurb: "A registered facility that processes sorted material." },
];

const ROLE_PREFIX = { collector: "CO", aggregator: "AG", nodal: "NC", plant: "RP" };

const FORM_FIELDS = {
  collector: [
    { name: "name", label: "Full name", type: "text", placeholder: "e.g. Rina Devi" },
    { name: "phone", label: "Phone number", type: "tel", placeholder: "10-digit mobile number" },
    { name: "city", label: "City / town", type: "text", placeholder: "e.g. Pune" },
    { name: "ward", label: "Ward, if you know it", type: "text", placeholder: "e.g. Ward 12 – Kothrud", optional: true },
    { name: "categories", label: "What do you usually collect?", type: "chips" },
    { name: "payout", label: "Preferred payout", type: "radio", options: ["Cash", "Digital (UPI / bank)"] },
  ],
  aggregator: [
    { name: "business", label: "Business / shop name", type: "text", placeholder: "e.g. Shree Ganesh Scrap Traders" },
    { name: "phone", label: "Phone number", type: "tel", placeholder: "10-digit mobile number" },
    { name: "city", label: "City / town", type: "text", placeholder: "e.g. Surat" },
    { name: "categories", label: "Categories you handle", type: "chips" },
  ],
  nodal: [
    { name: "centreName", label: "Proposed centre name", type: "text", placeholder: "e.g. Kothrud Ward Centre" },
    { name: "municipalBody", label: "Municipal body / ULB partner", type: "text", placeholder: "e.g. Pune Municipal Corporation" },
    { name: "ward", label: "Ward", type: "text", placeholder: "e.g. Ward 12 – Kothrud" },
    { name: "city", label: "City", type: "text", placeholder: "e.g. Pune" },
    { name: "categories", label: "Categories to be handled", type: "chips" },
    { name: "capacity", label: "Estimated daily intake (kg)", type: "number", placeholder: "e.g. 900" },
  ],
  plant: [
    { name: "plantName", label: "Plant / facility name", type: "text", placeholder: "e.g. Deccan Recyclers Pvt. Ltd." },
    { name: "license", label: "Authorisation / license no.", type: "text", placeholder: "e.g. MPCB/2025/00457" },
    { name: "city", label: "City", type: "text", placeholder: "e.g. Nagpur" },
    { name: "state", label: "State", type: "text", placeholder: "e.g. Maharashtra" },
    { name: "categories", label: "Materials accepted", type: "chips" },
    { name: "capacity", label: "Maximum intake capacity (tonnes / month)", type: "number", placeholder: "e.g. 450" },
  ],
};

/* ---------------------------------------------------------------------- */
/* Small shared pieces                                                    */
/* ---------------------------------------------------------------------- */

function Badge({ children, tone = "forest" }) {
  const bg = tone === "forest" ? T.forest : tone === "marigold" ? T.marigold : T.rust;
  const fg = tone === "marigold" ? T.forestDeep : T.white;
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded"
      style={{ backgroundColor: bg, color: fg, fontFamily: "Inter, sans-serif" }}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      className="text-sm font-semibold mb-3"
      style={{ color: T.marigoldDeep, fontFamily: "Inter, sans-serif" }}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, type = "button", full = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={"px-5 py-3 text-sm font-semibold rounded-md transition-colors" + (full ? " w-full" : "")}
      style={{ backgroundColor: T.forest, color: T.white, fontFamily: "Inter, sans-serif" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = T.forestMid)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = T.forest)}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, full = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={"px-5 py-3 text-sm font-semibold rounded-md border-2 transition-colors" + (full ? " w-full" : "")}
      style={{ borderColor: T.forest, color: T.forest, backgroundColor: "transparent", fontFamily: "Inter, sans-serif" }}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/* Navigation                                                             */
/* ---------------------------------------------------------------------- */

const PAGES = [
  { id: "home", label: "Home" },
  { id: "register", label: "Register" },
  { id: "prices", label: "Price Board" },
  { id: "centres", label: "Nodal Centres" },
  { id: "circular", label: "Circular Loop" },
  { id: "registry", label: "Registry" },
];

function TopNav({ view, setView }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ backgroundColor: T.forestDeep }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between h-16">
          <button
            className="flex items-center gap-2"
            onClick={() => {
              setView("home");
              setOpen(false);
            }}
          >
            <div
              className="w-8 h-8 flex items-center justify-center rounded"
              style={{ backgroundColor: T.marigold }}
            >
              <Recycle size={18} color={T.forestDeep} strokeWidth={2.5} />
            </div>
            <span
              className="font-extrabold tracking-tight text-lg"
              style={{ color: T.white, fontFamily: "Archivo, sans-serif" }}
            >
              Kabadiwala Connect
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {PAGES.map((p) => (
              <button
                key={p.id}
                onClick={() => setView(p.id)}
                className="px-3 py-2 text-sm font-semibold"
                style={{
                  color: view === p.id ? T.marigold : "#C9D6CE",
                  fontFamily: "Inter, sans-serif",
                  borderBottom: view === p.id ? `2px solid ${T.marigold}` : "2px solid transparent",
                }}
              >
                {p.label}
              </button>
            ))}
          </nav>

          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} color={T.white} /> : <Menu size={22} color={T.white} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            {PAGES.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setView(p.id);
                  setOpen(false);
                }}
                className="px-3 py-2 text-sm font-semibold text-left rounded"
                style={{
                  color: view === p.id ? T.forestDeep : T.white,
                  backgroundColor: view === p.id ? T.marigold : "transparent",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: T.forestDeep, color: "#9FB3A6" }}>
      <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
          Kabadiwala Connect — Smart India Hackathon 2026, SIH26229
        </div>
        <div className="text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
          Frontend prototype · all data on this site is illustrative
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------- */
/* Home page                                                              */
/* ---------------------------------------------------------------------- */

function Hero({ setView }) {
  return (
    <section style={{ backgroundColor: T.forest }}>
      <div className="max-w-6xl mx-auto px-5 py-20 md:py-28">
        <div className="max-w-2xl">
          <p
            className="text-sm font-semibold mb-5"
            style={{ color: T.marigold, fontFamily: "Inter, sans-serif" }}
          >
            A national registry for India's recycling chain
          </p>
          <h1
            className="text-4xl md:text-5xl font-extrabold leading-tight mb-6"
            style={{ color: T.white, fontFamily: "Archivo, sans-serif" }}
          >
            Every kabadiwala already does this work. Now it gets counted.
          </h1>
          <p
            className="text-lg mb-9 max-w-xl"
            style={{ color: "#D3E0D8", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}
          >
            Ward-level nodal centres, one national price chart, and a live registry
            connecting collectors, aggregators and recycling plants — without asking
            anyone to change how they already work.
          </p>
          <div className="flex flex-wrap gap-4">
            <PrimaryButton onClick={() => setView("register")}>Register your centre</PrimaryButton>
            <button
              onClick={() => setView("prices")}
              className="px-5 py-3 text-sm font-semibold rounded-md border-2"
              style={{ borderColor: "#3C6E56", color: T.white, fontFamily: "Inter, sans-serif" }}
            >
              See today's rates
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatStrip() {
  const stats = [
    { value: "1.5–4M", label: "informal collectors nationally" },
    { value: "60–70%", label: "of urban recyclables they already recover" },
    { value: "8", label: "ward nodal centres live in this pilot" },
    { value: "13", label: "material categories tracked" },
  ];
  return (
    <div style={{ backgroundColor: T.forestDeep, borderTop: "1px solid #1E4433" }}>
      <div className="max-w-6xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label}>
            <div
              className="text-3xl font-extrabold"
              style={{ color: T.marigold, fontFamily: "Archivo, sans-serif" }}
            >
              {s.value}
            </div>
            <div
              className="text-sm mt-1"
              style={{ color: "#9FB3A6", fontFamily: "Inter, sans-serif" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section style={{ backgroundColor: T.paper }}>
      <div className="max-w-6xl mx-auto px-5 py-20">
        <SectionLabel>How it works</SectionLabel>
        <h2
          className="text-3xl font-extrabold mb-12 max-w-lg"
          style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}
        >
          Four steps from the street to a registered plant
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_IT_WORKS.map((step) => (
            <div
              key={step.n}
              className="p-6 rounded-md bg-white"
              style={{ border: `1.5px solid ${T.line}` }}
            >
              <div
                className="text-sm font-bold mb-4"
                style={{ color: T.marigoldDeep, fontFamily: "Archivo, sans-serif" }}
              >
                {step.n}
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm"
                style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif", lineHeight: 1.55 }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CircularTeaser({ setView }) {
  return (
    <section style={{ backgroundColor: T.white }}>
      <div className="max-w-6xl mx-auto px-5 py-20">
        <div
          className="rounded-md p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          style={{ backgroundColor: T.forest }}
        >
          <div className="max-w-lg">
            <SectionLabel>Beyond collection</SectionLabel>
            <h2
              className="text-2xl md:text-3xl font-extrabold mb-3"
              style={{ color: T.white, fontFamily: "Archivo, sans-serif" }}
            >
              The same registry can carry a full circular economy
            </h2>
            <p style={{ color: "#D3E0D8", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
              EPR credit trading, a waste-to-wealth exchange between plants, a compost
              loop for organics, and an open impact dashboard — all riding on the same
              national data layer.
            </p>
          </div>
          <button
            onClick={() => setView("circular")}
            className="shrink-0 px-5 py-3 text-sm font-semibold rounded-md inline-flex items-center gap-2"
            style={{ backgroundColor: T.marigold, color: T.forestDeep, fontFamily: "Inter, sans-serif" }}
          >
            Explore the circular loop
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function HomePage({ setView }) {
  return (
    <>
      <Hero setView={setView} />
      <StatStrip />
      <HowItWorks />
      <CircularTeaser setView={setView} />
    </>
  );
}

/* ---------------------------------------------------------------------- */
/* Register page                                                          */
/* ---------------------------------------------------------------------- */

function ChipSelect({ options, values, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = values.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(active ? values.filter((v) => v !== opt) : [...values, opt])}
            className="px-3 py-1.5 text-sm font-medium rounded-md border-2 transition-colors"
            style={{
              borderColor: active ? T.forest : T.line,
              backgroundColor: active ? T.forest : T.white,
              color: active ? T.white : T.ink,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function RadioSelect({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onChange(opt)}
            className="px-3 py-1.5 text-sm font-medium rounded-md border-2 transition-colors"
            style={{
              borderColor: active ? T.forest : T.line,
              backgroundColor: active ? T.forest : T.white,
              color: active ? T.white : T.ink,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function FormField({ field, value, onChange }) {
  const labelEl = (
    <label
      className="block text-sm font-semibold mb-2"
      style={{ color: T.ink, fontFamily: "Inter, sans-serif" }}
    >
      {field.label}
      {field.optional && (
        <span className="font-normal" style={{ color: T.inkSoft }}>
          {" "}
          (optional)
        </span>
      )}
    </label>
  );

  if (field.type === "chips") {
    return (
      <div>
        {labelEl}
        <ChipSelect options={CATEGORY_LIST} values={value || []} onChange={onChange} />
      </div>
    );
  }
  if (field.type === "radio") {
    return (
      <div>
        {labelEl}
        <RadioSelect options={field.options} value={value || ""} onChange={onChange} />
      </div>
    );
  }
  return (
    <div>
      {labelEl}
      <input
        type={field.type}
        value={value || ""}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 text-sm rounded-md outline-none"
        style={{ border: `1.5px solid ${T.line}`, fontFamily: "Inter, sans-serif", color: T.ink }}
      />
    </div>
  );
}

function RegisterPage({ registrations, addRegistration, setView }) {
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    setFormData({});
    setErrors({});
    setResult(null);
  }, [role]);

  if (!role) {
    return (
      <section style={{ backgroundColor: T.paper, minHeight: "70vh" }}>
        <div className="max-w-6xl mx-auto px-5 py-16">
          <SectionLabel>Registration</SectionLabel>
          <h1
            className="text-3xl font-extrabold mb-3"
            style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}
          >
            Who's registering today?
          </h1>
          <p className="mb-10 max-w-xl" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
            Pick the option that describes you. Registration is optional for
            collectors and aggregators — it just makes it easier for a nodal centre
            to find you.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ROLES.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className="text-left p-6 rounded-md bg-white transition-colors"
                  style={{ border: `1.5px solid ${T.line}` }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = T.forest)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.line)}
                >
                  <div
                    className="w-11 h-11 flex items-center justify-center rounded-md mb-4"
                    style={{ border: `1.5px solid ${T.forest}` }}
                  >
                    <Icon size={20} color={T.forest} />
                  </div>
                  <h3
                    className="text-base font-bold mb-1.5"
                    style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}
                  >
                    {r.label}
                  </h3>
                  <p className="text-sm" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
                    {r.blurb}
                  </p>
                </button>
              );
            })}
          </div>

          {registrations.length > 0 && (
            <div className="mt-14">
              <SectionLabel>Registered this session</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {registrations.map((reg) => (
                  <Badge key={reg.id} tone="forest">
                    {reg.id} · {reg.roleLabel}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (result) {
    return (
      <section style={{ backgroundColor: T.paper, minHeight: "70vh" }}>
        <div className="max-w-2xl mx-auto px-5 py-20 text-center">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ border: `2px dashed ${T.forest}` }}
          >
            <CheckCircle2 size={34} color={T.forest} />
          </div>
          <h1
            className="text-2xl font-extrabold mb-2"
            style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}
          >
            You're registered
          </h1>
          <p className="mb-6" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
            Your registration ID has been added to the national registry for this
            session.
          </p>
          <div
            className="inline-block px-6 py-3 rounded-md mb-8 text-lg font-extrabold"
            style={{ backgroundColor: T.white, border: `1.5px solid ${T.line}`, color: T.forest, fontFamily: "Archivo, sans-serif" }}
          >
            {result.id}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <SecondaryButton onClick={() => setRole(null)}>Register another</SecondaryButton>
            <PrimaryButton onClick={() => setView("registry")}>View the registry</PrimaryButton>
          </div>
        </div>
      </section>
    );
  }

  const fields = FORM_FIELDS[role];
  const roleInfo = ROLES.find((r) => r.id === role);

  const handleSubmit = () => {
    const newErrors = {};
    fields.forEach((f) => {
      if (f.optional) return;
      const v = formData[f.name];
      if (f.type === "chips") {
        if (!v || v.length === 0) newErrors[f.name] = true;
      } else if (!v || String(v).trim() === "") {
        newErrors[f.name] = true;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const id = `${ROLE_PREFIX[role]}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const reg = { id, role, roleLabel: roleInfo.label, data: formData };
    addRegistration(reg);
    setResult(reg);
  };

  return (
    <section style={{ backgroundColor: T.paper, minHeight: "70vh" }}>
      <div className="max-w-2xl mx-auto px-5 py-16">
        <button
          onClick={() => setRole(null)}
          className="text-sm font-semibold mb-6"
          style={{ color: T.forest, fontFamily: "Inter, sans-serif" }}
        >
          ← Choose a different role
        </button>
        <SectionLabel>Registering as</SectionLabel>
        <h1
          className="text-2xl font-extrabold mb-8"
          style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}
        >
          {roleInfo.label}
        </h1>
        <div className="bg-white rounded-md p-6 md:p-8" style={{ border: `1.5px solid ${T.line}` }}>
          <div className="flex flex-col gap-6">
            {fields.map((f) => (
              <div key={f.name}>
                <FormField
                  field={f}
                  value={formData[f.name]}
                  onChange={(v) => setFormData((prev) => ({ ...prev, [f.name]: v }))}
                />
                {errors[f.name] && (
                  <p className="text-xs mt-1.5 font-medium" style={{ color: T.rust }}>
                    This field is needed before you can register.
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PrimaryButton onClick={handleSubmit} full>
              Complete registration
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Price board page                                                       */
/* ---------------------------------------------------------------------- */

function PriceBoardPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const tabs = ["All", ...CATEGORY_LIST];

  const rows = useMemo(() => {
    return PRICE_BOARD.filter((row) => {
      const matchesCategory = activeCategory === "All" || row.category === activeCategory;
      const matchesQuery = row.name.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <section style={{ backgroundColor: T.paper, minHeight: "70vh" }}>
      <div className="max-w-4xl mx-auto px-5 py-16">
        <SectionLabel>Today's rate board</SectionLabel>
        <h1
          className="text-3xl font-extrabold mb-3"
          style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}
        >
          One price chart, nationwide
        </h1>
        <p className="mb-8 max-w-xl" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
          Indicative reference bands from a multi-city scrap-rate survey. Nodal
          centres pay within these bands, wherever you are in the country.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-white flex-1"
            style={{ border: `1.5px solid ${T.line}` }}
          >
            <Search size={16} color={T.inkSoft} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a material…"
              className="w-full text-sm outline-none"
              style={{ fontFamily: "Inter, sans-serif", color: T.ink }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => {
            const active = tab === activeCategory;
            return (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className="px-3 py-1.5 text-sm font-medium rounded-md border-2 transition-colors"
                style={{
                  borderColor: active ? T.forest : T.line,
                  backgroundColor: active ? T.forest : T.white,
                  color: active ? T.white : T.ink,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-md overflow-hidden" style={{ border: `1.5px solid ${T.line}` }}>
          <div
            className="grid grid-cols-[1fr_auto] gap-4 px-5 py-3 text-xs font-bold uppercase"
            style={{ backgroundColor: T.forestDeep, color: "#9FB3A6", fontFamily: "Inter, sans-serif" }}
          >
            <span>Material</span>
            <span>Rate</span>
          </div>
          {rows.length === 0 && (
            <div className="px-5 py-8 text-center text-sm" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
              No materials match your search.
            </div>
          )}
          {rows.map((row, i) => (
            <div
              key={row.name}
              className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4 items-center"
              style={{ borderTop: i === 0 ? "none" : `1px solid ${T.line}` }}
            >
              <div>
                <div className="text-sm font-semibold" style={{ color: T.ink, fontFamily: "Inter, sans-serif" }}>
                  {row.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
                  {row.category}
                </div>
              </div>
              <div
                className="text-base font-extrabold whitespace-nowrap"
                style={{ color: T.forest, fontFamily: "Archivo, sans-serif" }}
              >
                {row.range}
                <span className="text-xs font-normal ml-1" style={{ color: T.inkSoft }}>
                  {row.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs mt-4" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
          Rates shown are illustrative reference bands, not a live feed. The
          national chart would be set by the proposed multi-city price survey.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Nodal centres page                                                     */
/* ---------------------------------------------------------------------- */

function NodalCentresPage() {
  const [cityFilter, setCityFilter] = useState("All");
  const cities = ["All", ...Array.from(new Set(NODAL_CENTRES_SEED.map((c) => c.city)))];

  const centres = NODAL_CENTRES_SEED.filter((c) => cityFilter === "All" || c.city === cityFilter);

  return (
    <section style={{ backgroundColor: T.paper, minHeight: "70vh" }}>
      <div className="max-w-6xl mx-auto px-5 py-16">
        <SectionLabel>Find a centre</SectionLabel>
        <h1
          className="text-3xl font-extrabold mb-3"
          style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}
        >
          Ward nodal centres
        </h1>
        <p className="mb-8 max-w-xl" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
          Every centre below is set up with a local municipal body and registered
          on the national database, with the categories it currently handles.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {cities.map((city) => {
            const active = city === cityFilter;
            return (
              <button
                key={city}
                onClick={() => setCityFilter(city)}
                className="px-3 py-1.5 text-sm font-medium rounded-md border-2 transition-colors"
                style={{
                  borderColor: active ? T.forest : T.line,
                  backgroundColor: active ? T.forest : T.white,
                  color: active ? T.white : T.ink,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {city}
              </button>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {centres.map((c) => (
            <div key={c.id} className="bg-white rounded-md p-5" style={{ border: `1.5px solid ${T.line}` }}>
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-md"
                  style={{ border: `1.5px solid ${T.forest}` }}
                >
                  <MapPin size={16} color={T.forest} />
                </div>
                <Badge tone="marigold">Active</Badge>
              </div>
              <h3 className="text-base font-bold mb-1" style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}>
                {c.name}
              </h3>
              <p className="text-xs mb-3" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
                {c.ward}, {c.city}, {c.state}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {c.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs px-2 py-1 rounded"
                    style={{ backgroundColor: T.paperDeep, color: T.ink, fontFamily: "Inter, sans-serif" }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <div
                className="flex items-center justify-between pt-3 text-xs"
                style={{ borderTop: `1px solid ${T.line}`, fontFamily: "Inter, sans-serif" }}
              >
                <span style={{ color: T.inkSoft }}>{c.id}</span>
                <span className="font-semibold" style={{ color: T.forest }}>
                  {c.capacity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Circular loop page                                                     */
/* ---------------------------------------------------------------------- */

function CircularPage() {
  return (
    <section style={{ backgroundColor: T.paper, minHeight: "70vh" }}>
      <div className="max-w-6xl mx-auto px-5 py-16">
        <SectionLabel>Beyond collection</SectionLabel>
        <h1
          className="text-3xl font-extrabold mb-3"
          style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}
        >
          The circular economy layer
        </h1>
        <p className="mb-10 max-w-xl" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
          Once material and price data flow through one registry, the same rails
          can carry more than scrap sales.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CIRCULAR_FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-white rounded-md p-6" style={{ border: `1.5px solid ${T.line}` }}>
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-md mb-4"
                  style={{ backgroundColor: T.forest }}
                >
                  <Icon size={20} color={T.white} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-sm" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif", lineHeight: 1.55 }}>
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Registry / dashboard page                                              */
/* ---------------------------------------------------------------------- */

function RegistryPage({ registrations }) {
  const counts = useMemo(() => {
    const base = { nodal: 8, plant: 4, collector: 126, aggregator: 19 };
    registrations.forEach((r) => {
      base[r.role] = (base[r.role] || 0) + 1;
    });
    return base;
  }, [registrations]);

  const stats = [
    { label: "Nodal centres registered", value: counts.nodal, icon: MapPin },
    { label: "Recycling plants registered", value: counts.plant, icon: Factory },
    { label: "Collectors registered", value: counts.collector, icon: Users },
    { label: "Material logged this month", value: "22,750 t", icon: Scale },
  ];

  return (
    <section style={{ backgroundColor: T.paper, minHeight: "70vh" }}>
      <div className="max-w-6xl mx-auto px-5 py-16">
        <SectionLabel>Live snapshot</SectionLabel>
        <h1
          className="text-3xl font-extrabold mb-3"
          style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}
        >
          The national registry
        </h1>
        <p className="mb-10 max-w-xl" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
          Every registration on this site updates the counters below for this
          session, so you can see how the registry grows as people sign up.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-md p-5" style={{ border: `1.5px solid ${T.line}` }}>
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-md mb-4"
                  style={{ border: `1.5px solid ${T.forest}` }}
                >
                  <Icon size={16} color={T.forest} />
                </div>
                <div className="text-2xl font-extrabold" style={{ color: T.forest, fontFamily: "Archivo, sans-serif" }}>
                  {s.value}
                </div>
                <div className="text-xs mt-1" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
          <div className="bg-white rounded-md p-6" style={{ border: `1.5px solid ${T.line}` }}>
            <h3 className="text-base font-bold mb-1" style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}>
              Material logged nationally
            </h3>
            <p className="text-xs mb-4" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
              Tonnes per month, illustrative trend
            </p>
            <div style={{ width: "100%", height: 240 }}>
              <ResponsiveContainer>
                <LineChart data={TREND_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke={T.line} strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: T.inkSoft }} axisLine={{ stroke: T.line }} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: T.inkSoft }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 6, border: `1px solid ${T.line}`, fontFamily: "Inter, sans-serif", fontSize: 13 }}
                    formatter={(v) => [`${v.toLocaleString()} t`, "Material logged"]}
                  />
                  <Line type="monotone" dataKey="tonnes" stroke={T.forest} strokeWidth={2.5} dot={{ r: 3, fill: T.forest }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-md p-6" style={{ border: `1.5px solid ${T.line}` }}>
            <h3 className="text-base font-bold mb-1" style={{ color: T.ink, fontFamily: "Archivo, sans-serif" }}>
              Recent activity
            </h3>
            <p className="text-xs mb-4" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
              Registrations made this session
            </p>
            {registrations.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center text-center py-10 rounded-md"
                style={{ border: `1.5px dashed ${T.line}` }}
              >
                <Database size={22} color={T.inkSoft} />
                <p className="text-sm mt-3" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
                  Nothing registered yet this session.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {registrations
                  .slice()
                  .reverse()
                  .map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between px-3 py-2.5 rounded-md"
                      style={{ backgroundColor: T.paper }}
                    >
                      <div>
                        <div className="text-sm font-semibold" style={{ color: T.ink, fontFamily: "Inter, sans-serif" }}>
                          {r.id}
                        </div>
                        <div className="text-xs" style={{ color: T.inkSoft, fontFamily: "Inter, sans-serif" }}>
                          {r.roleLabel}
                        </div>
                      </div>
                      <CheckCircle2 size={16} color={T.forest} />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* App                                                                    */
/* ---------------------------------------------------------------------- */

export default function App() {
  const [view, setView] = useState("home");
  const [registrations, setRegistrations] = useState([]);

  const addRegistration = (reg) => setRegistrations((prev) => [...prev, reg]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div style={{ backgroundColor: T.white, minHeight: "100vh" }}>
      <style>{`${FONT_IMPORT}
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
      <TopNav view={view} setView={setView} />
      {view === "home" && <HomePage setView={setView} />}
      {view === "register" && (
        <RegisterPage registrations={registrations} addRegistration={addRegistration} setView={setView} />
      )}
      {view === "prices" && <PriceBoardPage />}
      {view === "centres" && <NodalCentresPage />}
      {view === "circular" && <CircularPage />}
      {view === "registry" && <RegistryPage registrations={registrations} />}
      <Footer />
    </div>
  );
}

import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'wasp/client/router';

export default function AnaSayfa() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-green-900 text-white overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-green-800 skew-x-12 translate-x-20 opacity-50"></div>
        
        <div className="relative container mx-auto px-4 py-32 flex flex-col items-start max-w-6xl">
            <span className="bg-green-700 text-green-100 text-sm font-bold px-3 py-1 rounded-full mb-6">Wir liefern</span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight max-w-3xl">
                Täglich frisches Sortiment <br/>
                <span className="text-green-400">aus erster Hand</span> für den Fachhandel
            </h1>
            <p className="text-xl mb-10 opacity-90 max-w-2xl leading-relaxed">
              Wir liefern Obst für jeden mit Foss Food. Profitieren Sie von unserer langjährigen Erfahrung am Großmarkt.
            </p>
            <div className="flex flex-wrap gap-4">
                <Link to="/urunler" className="bg-white text-green-900 px-8 py-4 rounded-lg font-bold hover:bg-green-50 transition shadow-lg flex items-center gap-2">
                    Artikel lesen
                    <span>→</span>
                </Link>
            </div>
            {/* Slider Dots Simulation */}
            <div className="flex gap-2 mt-8">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <div className="w-3 h-3 rounded-full bg-green-700"></div>
                <div className="w-3 h-3 rounded-full bg-green-700"></div>
            </div>
        </div>
      </div>

      {/* Intro / About */}
      <section id="uber-uns" className="py-24 bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center max-w-6xl">
            <div>
                <h2 className="text-green-600 font-bold uppercase tracking-wider mb-2 text-sm">Fruveg das Unternehmen</h2>
                <h3 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">Gemeinsam sind wir stärker!</h3>
                <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                    <p>
                        Die Im Jahr 2007 gegründete Früchte Stern Frankfurt GmbH & Co.KG aus dem Frischezentrum in Frankfurt am Main (Großmarkthalle) ist der Grundbaustein für Fruveg. Eine erhöhte Nachfrage der Kunden für eine Lieferung vor Ort bewegte einen Teil des Teams 2017 zur Gründung der Früchtestern Gastroservice GmbH. Durch die Pandemie 2020 veränderten sich die Kundennachfragen und wir entschlossen uns für einen Wandel innerhalb der Branche durch eine stärkere Zusammenarbeit.
                    </p>
                    <p>
                        Durch unsere regional starken Erzeugern, Lieferanten aus Europa und unseren Produkten aus aller Welt bieten wir für unsere Kunden eine breite Produktvielfalt an. Mit unserem Slogan “Alles aus einer Hand” haben wir unser Produktportfolio gemeinsam mit unseren Kunden erweitert.
                    </p>
                    <p className="font-semibold text-gray-800">
                        Als Signal für die Veränderung entschieden wir uns die Früchtestern Gastroservice GmbH mit dem neuen Firmennamen Fruveg & Ataturabi GmbH fortzuführen. Die langjährige Erfahrung im Obst- und Gemüsegroßhandel wird durch den Lieferservice erweitert.
                    </p>
                </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 h-full min-h-[500px] flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-green-200 opacity-20 group-hover:scale-105 transition duration-700"></div>
                 <div className="text-center z-10">
                    <div className="text-6xl mb-4">🏢</div>
                    <span className="text-gray-500 text-lg font-medium">Büro & Großmarkt Frankfurt</span>
                 </div>
            </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-10 text-center">
                <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
                    <div className="text-5xl font-extrabold text-green-600 mb-4">7+</div>
                    <div className="font-bold text-xl text-gray-900 mb-3">individuelle Kundenberater</div>
                    <p className="text-gray-600 leading-relaxed">Jeder unserer Kunden erhält einen zugewiesenen Kundenberater, der immer zur Verfügung steht.</p>
                </div>
                <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
                    <div className="text-5xl font-extrabold text-green-600 mb-4">981+</div>
                    <div className="font-bold text-xl text-gray-900 mb-3">Breites Sortiment</div>
                    <p className="text-gray-600 leading-relaxed">Wir bieten unseren Gastronomie-Kunden ein Vollsortiment an. Nach erfolgreicher Bedarfsanalyse erhalten Sie ein auf Ihre Bedürfnisse entsprechendes Produktangebot.</p>
                </div>
                <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
                    <div className="text-5xl font-extrabold text-green-600 mb-4">3+</div>
                    <div className="font-bold text-xl text-gray-900 mb-3">flexible Liefertouren</div>
                    <p className="text-gray-600 leading-relaxed">Unsere flexible Flotte ermöglicht eine kundengerechte Lieferung. Je nach Kundenbedarf liefern wir in drei verschiedenen Zeitmodellen.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Sortiment Section */}
      <section id="sortiment" className="py-24 bg-white relative overflow-hidden">
        <div className="container relative mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-green-600 font-bold uppercase tracking-wider mb-2 text-sm">Sortiment</h2>
            <h3 className="text-4xl font-bold text-gray-900 mb-12">Die Produktvielfalt in jeder Form</h3>

            <div className="flex justify-center flex-wrap gap-4 mb-12 uppercase text-sm font-bold text-gray-500">
                {/* Visual Category List could go here if we want to match the "Sortiment" listing exactly, but sticking to Grid is usually better for UX. Given the "Werfen Sie einen Blick auf unser Sortiment" request above, I will just keep the button prominent. */}
            </div>
            
            <div className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Werfen Sie einen Blick auf unser Sortiment.
            </div>

            <Link to="/urunler" className="inline-block bg-green-600 text-white px-12 py-4 rounded-lg hover:bg-green-500 transition font-bold shadow-lg text-lg">
                Sortiment
            </Link>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
                <h2 className="text-green-600 font-bold uppercase tracking-wider mb-2 text-sm">Wir sind die Fruveg & Ataturabi GmbH</h2>
                <h3 className="text-4xl font-bold text-gray-900">Unser Unternehmens-Portfolio</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Die Limette */}
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition duration-300 border border-gray-100">
                    <div className="w-24 h-24 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6 text-4xl">
                        🍋
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Die Limette</h3>
                    <p className="text-gray-500">Frische Zitrusfrüchte und mehr.</p>
                    <button className="mt-6 text-green-600 font-semibold hover:text-green-800 transition">Mehr erfahren →</button>
                </div>

                {/* Foss Food */}
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition duration-300 border border-gray-100">
                    <div className="w-24 h-24 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6 text-4xl">
                        🥗
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Foss Food</h3>
                    <p className="text-gray-500">Gesunde Ernährung für jeden.</p>
                     <button className="mt-6 text-green-600 font-semibold hover:text-green-800 transition">Mehr erfahren →</button>
                </div>

                {/* Dattel Box */}
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:-translate-y-2 transition duration-300 border border-gray-100">
                    <div className="w-24 h-24 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6 text-4xl">
                        📦
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Dattel Box</h3>
                    <p className="text-gray-500">Exquisite Datteln direkt importiert.</p>
                     <button className="mt-6 text-green-600 font-semibold hover:text-green-800 transition">Mehr erfahren →</button>
                </div>
            </div>
        </div>
      </section>

      {/* Blog / Scene */}
      <section id="szene" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                <div>
                    <h2 className="text-green-600 font-bold uppercase tracking-wider mb-2 text-sm">Szene-Themen</h2>
                    <h3 className="text-4xl font-bold text-gray-900">Aus unseren Szene-Themen</h3>
                </div>
                <a href="#" className="text-green-600 font-bold hover:underline">Alle Artikel ansehen →</a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Blog Item 1 */}
                <article className="group cursor-pointer flex flex-col h-full bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="h-48 bg-gray-100 rounded-t-xl overflow-hidden relative">
                         <div className="absolute inset-0 bg-green-50 flex items-center justify-center text-4xl">🍌</div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="text-xs font-bold text-green-600 uppercase mb-2 tracking-wide">Wir liefern</div>
                        <h4 className="font-bold text-lg mb-3 group-hover:text-green-600 transition leading-snug">Täglich frisches Sortiment aus erster Hand</h4>
                        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">Ungleich anderer Obstsorten, die saisonal in Deutschland angepflanzt werden, wie Äpfel und Birnen, müssen Bananen einen weiten Weg zurücklegen...</p>
                        <div className="mt-auto text-xs text-gray-400 font-medium pt-2 border-t border-gray-100">25. November 2020</div>
                    </div>
                </article>

                {/* Blog Item 2 */}
                <article className="group cursor-pointer flex flex-col h-full bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="h-48 bg-gray-100 rounded-t-xl overflow-hidden relative">
                         <div className="absolute inset-0 bg-green-50 flex items-center justify-center text-4xl">🍎</div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="text-xs font-bold text-green-600 uppercase mb-2 tracking-wide">Wir liefern</div>
                        <h4 className="font-bold text-lg mb-3 group-hover:text-green-600 transition leading-snug">Obst für jeden mit Foss Food</h4>
                        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">Obst für zu Hause, im Büro, im Fitnessstudio oder im Stammlokal macht kein Unterschied. Mit Foss Food ermöglichen wir...</p>
                        <div className="mt-auto text-xs text-gray-400 font-medium pt-2 border-t border-gray-100">28. September 2020</div>
                    </div>
                </article>

                 {/* Blog Item 3 */}
                <article className="group cursor-pointer flex flex-col h-full bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="h-48 bg-gray-100 rounded-t-xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-green-50 flex items-center justify-center text-4xl">🥦</div>
                     </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="text-xs font-bold text-green-600 uppercase mb-2 tracking-wide">Bio-Gemüse</div>
                        <h4 className="font-bold text-lg mb-3 group-hover:text-green-600 transition leading-snug">Vorteile des Verzehrs von Gemüse</h4>
                        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">Es ist Zeit, Vitamine und Nährstoffe bereitzustellen. Heute werden wir die Vorteile des Verzehrs von Gemüse für unseren Körper unter...</p>
                        <div className="mt-auto text-xs text-gray-400 font-medium pt-2 border-t border-gray-100">9. September 2020</div>
                    </div>
                </article>

                 {/* Blog Item 4 */}
                <article className="group cursor-pointer flex flex-col h-full bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="h-48 bg-gray-100 rounded-t-xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-green-50 flex items-center justify-center text-4xl">🥬</div>
                     </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="text-xs font-bold text-green-600 uppercase mb-2 tracking-wide">Essen und Sport</div>
                        <h4 className="font-bold text-lg mb-3 group-hover:text-green-600 transition leading-snug">Spinat und seine lebenswichtigen Elemente</h4>
                        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4">Der Spinat ist eine Quelle für lebenswichtige Vitamine, Elemente und Antioxidantien. Der Spinat ist sehr nährstoffreich...</p>
                        <div className="mt-auto text-xs text-gray-400 font-medium pt-2 border-t border-gray-100">5. September 2020</div>
                    </div>
                </article>
            </div>
        </div>
      </section>

      {/* Kontakt Section (Combined) */}
      <section id="kontakt" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16">
                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Schreiben Sie uns.</h2>
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Firma *</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                            </div>
                            <div className="col-span-2 md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Adresse *</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">PLZ *</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ort *</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ihr Vorname *</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ihr Nachname *</label>
                                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">E-Mail-Adresse *</label>
                                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                            </div>
                             <div className="col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ihre Nachricht</label>
                                <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"></textarea>
                            </div>
                        </div>
                        <button className="bg-green-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-green-700 transition w-full">
                            Absenden
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col justify-center space-y-12">
                     <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Fruveg & Ataturabi GmbH</h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Josef Eicher Straße 10<br/>
                            60437 Frankfurt am Main<br/>
                            Deutschland
                        </p>
                     </div>
                     
                     <div>
                        <h3 className="text-2xl font-bold text-green-600 mb-4">Vertreten durch:</h3>
                        <p className="text-lg text-gray-600">M. Fatih Koca</p>
                     </div>

                     <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Kontakt</h3>
                        <div className="space-y-3 text-lg text-gray-600">
                             <p>Telefon: <span className="text-green-600 font-semibold">069 - 9 451 560 80</span></p>
                             <p>Telefax: <span className="text-green-600 font-semibold">069 - 9 451 560 89</span></p>
                             <p>Mobil: <span className="text-green-600 font-semibold">0178 – 679 86 18</span></p>
                             <p>Mobil #2: <span className="text-green-600 font-semibold">0178 – 679 85 36</span></p>
                             <p>E-Mail: <a href="mailto:info@fruveg.de" className="text-green-600 font-semibold hover:underline">info@fruveg.de</a></p>
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontakt" className="bg-gray-900 text-gray-400 py-20 border-t border-gray-800">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl">
            <div>
                <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Fruveg & Ataturabi GmbH</h4>
                <p className="mb-6 leading-relaxed">Täglich frisches Sortiment aus erster Hand für den Fachhandel.</p>
                <div className="space-y-4 text-sm">
                     <p className="flex items-start gap-3">
                        <span className="text-green-500">📍</span>
                        <span>Josef Eicher Straße 10<br/>60437 Frankfurt am Main<br/>Deutschland</span>
                     </p>
                </div>
            </div>

            <div>
                 <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Kontakt</h4>
                 <div className="space-y-4 text-sm">
                    <p className="flex items-center gap-3">
                        <span className="text-green-500">📞</span>
                        Telefon: 069 - 9 451 560 80
                    </p>
                    <p className="flex items-center gap-3">
                        <span className="text-green-500">📠</span>
                        Telefax: 069 - 9 451 560 89
                    </p>
                    <p className="flex items-center gap-3">
                         <span className="text-green-500">✉️</span>
                        E-Mail: info@fruveg.de
                    </p>
                 </div>
            </div>

            <div>
                <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Rechtliches</h4>
                <ul className="space-y-3 text-sm">
                    <li><a href="#" className="hover:text-green-400 transition flex items-center gap-2"><span>→</span> Impressum</a></li>
                    <li><a href="#" className="hover:text-green-400 transition flex items-center gap-2"><span>→</span> Datenschutz</a></li>
                    <li><a href="#" className="hover:text-green-400 transition flex items-center gap-2"><span>→</span> AGB</a></li>
                </ul>
            </div>

             <div>
                <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Internes</h4>
                <ul className="space-y-3 text-sm">
                    <li><a href="#" className="hover:text-green-400 transition flex items-center gap-2"><span>→</span> Über uns</a></li>
                    <li><a href="#" className="hover:text-green-400 transition flex items-center gap-2"><span>→</span> Sortiment</a></li>
                    <li><a href="#" className="hover:text-green-400 transition flex items-center gap-2"><span>→</span> Karriere</a></li>
                </ul>
            </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-sm opacity-50">
            &copy; {new Date().getFullYear()} Fruveg & Ataturabi GmbH. Alle Rechte vorbehalten.
        </div>
      </footer>
    </div>
  );
}

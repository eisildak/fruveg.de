# Fruveg.de - Projekt Dokumentation

**Erstellt am:** 14. Januar 2026  
**Technologie:** Wasp Framework 0.20.1  
**Sprache:** Deutsch (German)

---

## 📋 Inhaltsverzeichnis

1. [Projektübersicht](#projektübersicht)
2. [Technologie-Stack](#technologie-stack)
3. [Projektstruktur](#projektstruktur)
4. [Datenbank Schema](#datenbank-schema)
5. [Backend API](#backend-api)
6. [Frontend Komponenten](#frontend-komponenten)
7. [Benutzerflüsse](#benutzerflüsse)
8. [Installation & Setup](#installation--setup)
9. [Deployment](#deployment)
10. [Zukünftige Erweiterungen](#zukünftige-erweiterungen)

---

## 🎯 Projektübersicht

**Fruveg Market** ist eine moderne, vollständige E-Commerce-Plattform für den Verkauf von frischem Obst und Gemüse. Das Projekt wurde mit dem Wasp Framework entwickelt und bietet:

- ✅ Benutzerregistrierung und Authentifizierung
- 🛒 Warenkorbverwaltung
- 📦 Bestellsystem mit Statusverfolgung
- 💳 Mehrere Zahlungsmethoden
- 👨‍💼 Admin-Panel für Produkt- und Bestellverwaltung
- 📱 Vollständig responsive Design
- 🌐 Deutsche Benutzeroberfläche

### Hauptmerkmale

- **Minimale Bestellmenge:** 500 € (anpassbar)
- **Kategorien:** Obst, Gemüse, Bio-Produkte
- **Einheiten:** kg, Stück, Bund, Kiste
- **Zahlungsmethoden:** Kreditkarte, Überweisung, Zahlung bei Lieferung

---

## 🛠 Technologie-Stack

### Frontend
- **React** - UI-Bibliothek
- **TypeScript** - Typsicherheit
- **TailwindCSS** - Styling
- **Wasp Router** - Routing

### Backend
- **Node.js** - Laufzeitumgebung
- **Wasp Framework** - Full-Stack Framework
- **Prisma** - ORM
- **PostgreSQL** - Datenbank

### Entwicklungstools
- **Wasp CLI** - Projektmanagement
- **TypeScript Compiler**
- **PostCSS** - CSS-Verarbeitung

---

## 📂 Projektstruktur

```
fruveg.de/
├── main.wasp                    # Wasp-Konfigurationsdatei
├── schema.prisma                # Datenbankschema
├── package.json                 # Node.js-Abhängigkeiten
├── tailwind.config.js           # TailwindCSS-Konfiguration
├── tsconfig.json                # TypeScript-Konfiguration
│
├── src/
│   ├── client/                  # Frontend-Code
│   │   ├── App.tsx              # Root-Komponente
│   │   ├── components/          # Wiederverwendbare Komponenten
│   │   │   ├── Navbar.tsx       # Navigationsleiste
│   │   │   └── ProductCard.tsx  # Produktkarte
│   │   │
│   │   └── pages/               # Seitenkomponenten
│   │       ├── AnaSayfa.tsx     # Startseite
│   │       ├── Urunler.tsx      # Produktliste
│   │       ├── Sepet.tsx        # Warenkorb
│   │       ├── Odeme.tsx        # Kasse
│   │       ├── Siparislerim.tsx # Bestellhistorie
│   │       ├── Admin.tsx        # Admin-Panel
│   │       └── auth/            # Authentifizierungsseiten
│   │           ├── Login.tsx
│   │           ├── Signup.tsx
│   │           ├── EmailVerification.tsx
│   │           └── PasswordReset.tsx
│   │
│   └── server/                  # Backend-Code
│       ├── queries.ts           # Datenabfragen
│       └── actions.ts           # Datenmanipulationen
│
├── docs/                        # Dokumentation
│   ├── PROJEKT_DETAILS.md       # Diese Datei
│   ├── API_REFERENZ.md          # API-Dokumentation
│   └── ENTWICKLUNG.md           # Entwicklungshandbuch
│
└── .env.server.example          # Umgebungsvariablen-Vorlage
```

---

## 🗄 Datenbank Schema

### User (Benutzer)
```prisma
model User {
  id                      Int       @id @default(autoincrement())
  email                   String    @unique
  password                String
  isEmailVerified         Boolean   @default(false)
  isAdmin                 Boolean   @default(false)
  cart                    Cart?
  orders                  Order[]
  createdAt               DateTime  @default(now())
}
```

**Felder:**
- `id` - Eindeutige Benutzer-ID
- `email` - E-Mail-Adresse (Login)
- `password` - Gehashtes Passwort
- `isEmailVerified` - E-Mail-Bestätigungsstatus
- `isAdmin` - Admin-Berechtigung
- `cart` - Verknüpfung zum Warenkorb
- `orders` - Liste der Bestellungen

### Product (Produkt)
```prisma
model Product {
  id                Int       @id @default(autoincrement())
  name              String
  description       String?
  price             Decimal   @db.Decimal(10, 2)
  unit              String    // "kg", "Stück", "Bund", "Kiste"
  category          String    // "Obst", "Gemüse", "Bio"
  imageUrl          String?
  stock             Int       @default(0)
  isAvailable       Boolean   @default(true)
  minOrderQuantity  Int       @default(1)
  cartItems         CartItem[]
  orderItems        OrderItem[]
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

**Felder:**
- `name` - Produktname (z.B. "Tomaten")
- `price` - Preis pro Einheit in Euro
- `unit` - Verkaufseinheit
- `category` - Produktkategorie
- `stock` - Verfügbare Menge
- `minOrderQuantity` - Mindestbestellmenge

### Cart & CartItem (Warenkorb)
```prisma
model Cart {
  id        Int        @id @default(autoincrement())
  userId    Int        @unique
  user      User       @relation(...)
  items     CartItem[]
}

model CartItem {
  id         Int      @id @default(autoincrement())
  cartId     Int
  productId  Int
  quantity   Int      @default(1)
  cart       Cart     @relation(...)
  product    Product  @relation(...)
  
  @@unique([cartId, productId])
}
```

**Logik:**
- Jeder Benutzer hat einen Warenkorb
- Ein Produkt kann nur einmal im Warenkorb sein (Menge wird aktualisiert)
- CartItems speichern Produktreferenz und Menge

### Order & OrderItem (Bestellung)
```prisma
model Order {
  id                 Int         @id @default(autoincrement())
  userId             Int
  orderNumber        String      @unique
  status             String      @default("Ausstehend")
  totalPrice         Decimal     @db.Decimal(10, 2)
  deliveryAddress    String
  deliveryCity       String
  deliveryPostalCode String
  deliveryPhone      String
  deliveryNotes      String?
  paymentMethod      String      @default("Kreditkarte")
  paymentStatus      String      @default("Ausstehend")
  items              OrderItem[]
  user               User        @relation(...)
  createdAt          DateTime    @default(now())
}

model OrderItem {
  id         Int      @id @default(autoincrement())
  orderId    Int
  productId  Int
  quantity   Int
  price      Decimal  @db.Decimal(10, 2)  // Preis zum Bestellzeitpunkt
  unit       String
  order      Order    @relation(...)
  product    Product  @relation(...)
}
```

**Status-Werte:**
- `Ausstehend` - Bestellung eingegangen
- `Bestätigt` - Bestellung vom Admin bestätigt
- `In Vorbereitung` - Wird verpackt
- `Versendet` - Unterwegs zum Kunden
- `Zugestellt` - Erfolgreich geliefert
- `Storniert` - Bestellung abgebrochen

---

## 🔌 Backend API

### Queries (Lesevorgänge)

#### `getProducts`
**Beschreibung:** Holt alle verfügbaren Produkte  
**Parameter:** Keine  
**Rückgabe:** `Product[]`

```typescript
export const getProducts: GetProducts<void, Product[]> = async (_args, context) => {
  return context.entities.Product.findMany({
    where: { isAvailable: true },
    orderBy: { category: 'asc', name: 'asc' }
  });
};
```

#### `getCart`
**Beschreibung:** Holt den Warenkorb des angemeldeten Benutzers  
**Parameter:** Keine (nutzt `context.user`)  
**Rückgabe:** Warenkorb mit Produkten und Gesamtpreis

```typescript
export const getCart: GetCart<void, any> = async (_args, context) => {
  if (!context.user) throw new HttpError(401);
  
  const cart = await context.entities.Cart.findUnique({
    where: { userId: context.user.id },
    include: { items: { include: { product: true } } }
  });
  
  const totalPrice = cart.items.reduce(...);
  return { ...cart, totalPrice };
};
```

#### `getMyOrders`
**Beschreibung:** Holt alle Bestellungen des angemeldeten Benutzers  
**Parameter:** Keine  
**Rückgabe:** `Order[]` mit verschachtelten Items

#### `getAllOrders` (Admin)
**Beschreibung:** Holt alle Bestellungen (nur für Admins)  
**Parameter:** Keine  
**Rückgabe:** `Order[]` mit Benutzerinformationen

---

### Actions (Schreibvorgänge)

#### `addToCart`
**Beschreibung:** Fügt ein Produkt zum Warenkorb hinzu  
**Parameter:**
```typescript
{
  productId: number;
  quantity: number;
}
```

**Validierung:**
- Produkt muss verfügbar sein
- Menge ≥ minOrderQuantity
- Erstellt Warenkorb falls nicht vorhanden
- Aktualisiert Menge wenn Produkt bereits im Warenkorb

#### `updateCartItem`
**Beschreibung:** Ändert die Menge eines Warenkorb-Items  
**Parameter:**
```typescript
{
  cartItemId: number;
  quantity: number;
}
```

#### `removeFromCart`
**Beschreibung:** Entfernt ein Produkt aus dem Warenkorb  
**Parameter:**
```typescript
{
  cartItemId: number;
}
```

#### `createOrder`
**Beschreibung:** Erstellt eine Bestellung aus dem Warenkorb  
**Parameter:**
```typescript
{
  deliveryAddress: string;
  deliveryCity: string;
  deliveryPostalCode: string;
  deliveryPhone: string;
  deliveryNotes?: string;
  paymentMethod: string;
}
```

**Ablauf:**
1. Validiert Warenkorb (nicht leer)
2. Berechnet Gesamtpreis
3. Prüft Mindestbestellwert (500 €)
4. Erstellt eindeutige Bestellnummer
5. Speichert Order mit OrderItems
6. Leert den Warenkorb

#### `updateOrderStatus` (Admin)
**Beschreibung:** Ändert den Status einer Bestellung  
**Parameter:**
```typescript
{
  orderId: number;
  status: string;
}
```

#### `createProduct` (Admin)
**Beschreibung:** Erstellt ein neues Produkt  
**Parameter:** Alle Produktfelder

#### `updateProduct` (Admin)
**Beschreibung:** Aktualisiert ein bestehendes Produkt  
**Parameter:** `productId` + zu ändernde Felder

---

## 🎨 Frontend Komponenten

### Navbar
**Pfad:** `src/client/components/Navbar.tsx`

**Features:**
- Logo und Navigation
- Dynamisches Menü (ändert sich je nach Login-Status)
- Warenkorb-Icon mit Badge (Anzahl der Artikel)
- Admin-Link (nur für Admins sichtbar)

**State:**
- `user` - Aktuell angemeldeter Benutzer
- `cart` - Warenkorb-Daten

### ProductCard
**Pfad:** `src/client/components/ProductCard.tsx`

**Props:**
```typescript
interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description?: string;
    price: number;
    unit: string;
    category: string;
    imageUrl?: string;
    minOrderQuantity: number;
  };
}
```

**Features:**
- Produktbild (oder Emoji-Fallback)
- Kategorie-Badge
- Preis mit Einheit
- Mengenauswahl
- "In den Warenkorb" Button
- Mindestbestellmenge-Hinweis

---

### Seiten

#### AnaSayfa (Startseite)
- Hero Section mit Call-to-Action
- Feature-Grid (Lieferung, Frische, Preis)
- Beliebte Produkte (erste 8)
- Footer

#### Urunler (Produktliste)
- Kategorie-Filter (Alle, Obst, Gemüse, Bio)
- Produktgrid mit allen verfügbaren Produkten

#### Sepet (Warenkorb)
- Liste aller Warenkorb-Artikel
- Mengenänderung pro Artikel
- Artikel entfernen
- Bestellübersicht (Zwischensumme, Versand, Gesamt)
- Mindestbestellwert-Warnung
- "Zur Kasse gehen" Button

#### Odeme (Kasse)
- Lieferadress-Formular
- Zahlungsmethoden-Auswahl
- Bestellübersicht (rechte Sidebar)
- "Bestellung abschließen" Button

#### Siparislerim (Meine Bestellungen)
- Chronologische Liste aller Bestellungen
- Status-Badge (farbcodiert)
- Detailansicht mit Produkten
- Lieferinformationen

#### Admin (Admin-Panel)
- **Tab 1: Bestellungen**
  - Alle Bestellungen mit Kundendaten
  - Status ändern (Dropdown)
  - Sortiert nach Erstellungsdatum
  
- **Tab 2: Produkte**
  - Produktliste
  - Neues Produkt hinzufügen
  - Produkt bearbeiten (Modal)
  - Felder: Name, Beschreibung, Preis, Einheit, Kategorie, Lagerbestand, Mindestmenge, Bild-URL

---

## 👤 Benutzerflüsse

### Kunde bestellt Produkte

1. **Registrierung / Anmeldung**
   - Besucht `/signup` oder `/login`
   - Gibt E-Mail und Passwort ein
   - System erstellt Benutzer mit `isAdmin: false`

2. **Produkte durchsuchen**
   - Besucht Startseite oder `/urunler`
   - Filtert nach Kategorie
   - Sieht Produktdetails (Preis, Einheit, Mindestmenge)

3. **Zum Warenkorb hinzufügen**
   - Wählt Menge (≥ minOrderQuantity)
   - Klickt "In den Warenkorb"
   - `addToCart` Action wird aufgerufen
   - Warenkorb-Badge aktualisiert sich

4. **Warenkorb prüfen**
   - Besucht `/sepet`
   - Sieht alle Artikel
   - Kann Menge ändern oder Artikel entfernen
   - Prüft Gesamtpreis (muss ≥ 500 € sein)

5. **Zur Kasse**
   - Klickt "Zur Kasse gehen"
   - Leitet zu `/odeme` weiter
   - Füllt Lieferformular aus:
     - Adresse
     - Stadt
     - PLZ
     - Telefon
     - Optionale Hinweise
   - Wählt Zahlungsmethode

6. **Bestellung abschließen**
   - Klickt "Bestellung abschließen"
   - `createOrder` Action:
     - Validiert Warenkorb
     - Prüft Mindestbestellwert
     - Erstellt Order + OrderItems
     - Generiert Bestellnummer (z.B. FRU1705251234567)
     - Leert Warenkorb
   - Zeigt Erfolgsmeldung
   - Leitet zu `/siparislerim` weiter

7. **Bestellung verfolgen**
   - Besucht `/siparislerim`
   - Sieht alle eigenen Bestellungen
   - Status-Updates sichtbar:
     - Ausstehend → Bestätigt → In Vorbereitung → Versendet → Zugestellt

---

### Admin verwaltet Shop

1. **Admin-Zugang erhalten**
   - Datenbank-Update: `UPDATE "User" SET "isAdmin" = true WHERE email = '...'`
   - Admin-Link erscheint in Navbar

2. **Produkt hinzufügen**
   - Besucht `/admin`
   - Wechselt zu "Produkte"-Tab
   - Klickt "Neues Produkt hinzufügen"
   - Füllt Formular aus:
     - Name (z.B. "Bio-Tomaten")
     - Beschreibung
     - Preis (z.B. 3.50)
     - Einheit (kg)
     - Kategorie (Bio)
     - Lagerbestand (100)
     - Mindestmenge (2)
     - Bild-URL
   - `createProduct` Action speichert in DB

3. **Produkt bearbeiten**
   - Klickt "Bearbeiten" bei Produkt
   - Modal öffnet sich mit vorausgefüllten Daten
   - Ändert Felder (z.B. Preis auf 3.20)
   - `updateProduct` Action aktualisiert DB

4. **Bestellung bearbeiten**
   - Wechselt zu "Bestellungen"-Tab
   - Sieht alle Kundenbestellungen
   - Ändert Status via Dropdown:
     - Neu → "Bestätigt"
     - Verpackt → "In Vorbereitung"
     - Versandt → "Versendet"
     - Angekommen → "Zugestellt"
   - `updateOrderStatus` Action speichert
   - Kunde sieht Update in `/siparislerim`

---

## 🚀 Installation & Setup

### Voraussetzungen
- Node.js ≥ 18
- PostgreSQL
- Wasp CLI

### Schritt-für-Schritt-Anleitung

#### 1. Wasp CLI installieren
```bash
curl -sSL https://get.wasp.sh/installer.sh | sh
```

#### 2. PATH konfigurieren
```bash
echo 'export PATH=$PATH:/Users/erol/.local/bin' >> ~/.zshrc
source ~/.zshrc
```

#### 3. Projekt klonen / herunterladen
```bash
cd /Users/erol/Documents/erol/fruveg.de
```

#### 4. PostgreSQL-Datenbank starten
**Option A: Docker**
```bash
docker run --name fruveg-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=fruveg \
  -p 5432:5432 \
  -d postgres
```

**Option B: Lokale Installation**
- PostgreSQL installieren
- Datenbank `fruveg` erstellen

#### 5. Umgebungsvariablen konfigurieren
```bash
cp .env.server.example .env.server
```

Inhalt von `.env.server`:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fruveg
```

#### 6. Datenbank migrieren
```bash
wasp db migrate-dev
```

Dies erstellt alle Tabellen gemäß `schema.prisma`.

#### 7. Anwendung starten
```bash
wasp start
```

Die App läuft auf:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001

#### 8. Admin-Benutzer erstellen
```bash
# Terminal öffnen
wasp db studio

# Im Prisma Studio:
# 1. User-Tabelle öffnen
# 2. Gewünschten Benutzer finden
# 3. isAdmin auf true setzen
```

**Alternative (SQL):**
```sql
psql -d fruveg
UPDATE "User" SET "isAdmin" = true WHERE email = 'admin@fruveg.de';
```

---

## 📦 Deployment

### Fly.io (Empfohlen)

```bash
# 1. Fly CLI installieren
curl -L https://fly.io/install.sh | sh

# 2. Fly Login
fly auth login

# 3. Mit Wasp deployen
wasp deploy fly launch fruveg-market

# 4. Umgebungsvariablen setzen
fly secrets set DATABASE_URL="postgresql://..."
```

### Manuelle Deployment

```bash
# 1. Build erstellen
wasp build

# 2. Ins Build-Verzeichnis wechseln
cd .wasp/build

# 3. Dependencies installieren
npm install

# 4. Datenbank migrieren
npm run db-migrate-prod

# 5. Server starten
npm start
```

**Umgebungsvariablen für Produktion:**
- `DATABASE_URL` - PostgreSQL-Verbindungsstring
- `PORT` - Server-Port (Standard: 3001)
- `WASP_WEB_CLIENT_URL` - Frontend-URL

---

## 🔮 Zukünftige Erweiterungen

### Phase 1: Zahlungsintegration
- [ ] **Stripe-Integration**
  - Kreditkartenzahlung
  - Webhooks für Zahlungsbestätigungen
  - Rechnungserstellung
- [ ] **PayPal-Integration**

### Phase 2: Erweiterte Features
- [ ] **Produktsuche**
  - Volltextsuche
  - Filter nach Preis, Verfügbarkeit
  - Sortierung (Preis, Name, Beliebtheit)
  
- [ ] **Benutzerprofil**
  - Adressbuch (mehrere Lieferadressen)
  - Bestellhistorie mit Filteroptionen
  - Favoriten / Merkliste

- [ ] **Bewertungen & Rezensionen**
  - Produktbewertungen (1-5 Sterne)
  - Textrezensionen
  - Bilder hochladen

### Phase 3: Business-Features
- [ ] **Rabattcodes / Gutscheine**
  - Prozentuale Rabatte
  - Feste Beträge
  - Zeitlich begrenzte Aktionen
  
- [ ] **Versandkostenberechnung**
  - PLZ-basierte Zonen
  - Gewichtsbasierte Preise
  
- [ ] **Lagerbestandsverwaltung**
  - Automatische Benachrichtigungen bei niedrigem Bestand
  - Bestellvorschläge an Lieferanten

### Phase 4: Analytics & Marketing
- [ ] **Dashboard für Admin**
  - Umsatzstatistiken
  - Beliebte Produkte
  - Kundenverhalten
  
- [ ] **E-Mail-Benachrichtigungen**
  - Bestellbestätigung
  - Versandbenachrichtigung
  - Lieferbestätigung
  - Newsletter

- [ ] **Mobile App**
  - React Native
  - Push-Benachrichtigungen

---

## 📝 Notizen & Tipps

### Entwicklung

**Hot Reload:**
- Frontend-Änderungen werden sofort geladen
- Backend-Änderungen erfordern Neustart (Wasp macht das automatisch)

**Datenbank zurücksetzen:**
```bash
wasp db reset
```

**Prisma Studio öffnen:**
```bash
wasp db studio
```

**TypeScript-Fehler beheben:**
```bash
rm -rf .wasp/
wasp start
```

### Produktion

**Logs anzeigen (Fly.io):**
```bash
fly logs
```

**Datenbank-Backup erstellen:**
```bash
pg_dump DATABASE_URL > backup.sql
```

**Datenbank wiederherstellen:**
```bash
psql DATABASE_URL < backup.sql
```

---

## 🤝 Mitwirken

Dieses Projekt ist privat, aber Verbesserungsvorschläge sind willkommen:

1. Issue erstellen
2. Feature-Branch erstellen
3. Pull Request öffnen

---

## 📄 Lizenz

Dieses Projekt ist urheberrechtlich geschützt und für den internen Gebrauch bestimmt.

---

**Erstellt mit ❤️ von Erol**  
**Powered by Wasp Framework**

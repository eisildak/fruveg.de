# Entwicklungshandbuch - Fruveg.de

**Für Entwickler - Technische Details und Best Practices**

---

## 🔧 Entwicklungsumgebung einrichten

### 1. Erforderliche Software

```bash
# Node.js (Version 18+)
node --version  # sollte v18+ ausgeben

# PostgreSQL
postgres --version

# Wasp CLI
wasp version  # sollte 0.20.1 ausgeben
```

### 2. IDE-Konfiguration

**VS Code (empfohlen):**

Installiere folgende Extensions:
- **Prisma** (`Prisma.prisma`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
- **ESLint** (`dbaeumer.vscode-eslint`)
- **TypeScript and JavaScript Language Features**

**Einstellungen (.vscode/settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### 3. Projekt-Setup

```bash
# Projekt-Verzeichnis
cd /Users/erol/Documents/erol/fruveg.de

# Dependencies installieren (automatisch durch Wasp)
wasp start
```

---

## 📐 Architektur-Übersicht

### Wasp-Konzepte

**Entities (Datenmodelle):**
- Definiert in `schema.prisma`
- Automatisch in TypeScript verfügbar
- Verwendet von Queries & Actions

**Queries (Lesevorgänge):**
- Read-only Operationen
- In `src/server/queries.ts`
- Automatisch gecached durch Wasp

**Actions (Schreibvorgänge):**
- Datenmutationen
- In `src/server/actions.ts`
- Invalidiert automatisch zugehörige Queries

**Pages (Seiten):**
- React-Komponenten
- Definiert in `main.wasp`
- Automatisches Routing

---

## 🎨 Frontend-Entwicklung

### Komponenten-Struktur

**Atomic Design:**
```
components/
├── atoms/           # Kleinste Einheiten (noch nicht implementiert)
├── molecules/       # Kombinationen (noch nicht implementiert)
└── organisms/       # Komplexe Komponenten
    ├── Navbar.tsx
    └── ProductCard.tsx
```

**Best Practices:**
```typescript
// ✅ Gut: TypeScript-Interfaces verwenden
interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  // ...
}

// ❌ Schlecht: Keine Typdefinitionen
export default function ProductCard({ product }) {
  // ...
}
```

### Styling mit TailwindCSS

**Farbpalette:**
```javascript
// tailwind.config.js
colors: {
  'fruveg-green': {
    50: '#f0fdf4',
    100: '#dcfce7',
    // ...
    600: '#16a34a',  // Primärfarbe
    700: '#15803d',
  }
}
```

**Verwendung:**
```tsx
// ✅ Konsistente Farben verwenden
<button className="bg-green-600 hover:bg-green-700">
  Klick mich
</button>

// ✅ Responsive Design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {products.map(...)}
</div>
```

### State Management

**Wasp Query Hooks:**
```typescript
import { useQuery } from 'wasp/client/operations';
import { getProducts } from 'wasp/client/operations';

function ProductList() {
  const { data: products, isLoading, error } = useQuery(getProducts);
  
  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  
  return <div>{products.map(...)}</div>;
}
```

**Action Hooks:**
```typescript
import { addToCart } from 'wasp/client/operations';

function AddToCartButton({ productId }) {
  const [loading, setLoading] = useState(false);
  
  const handleClick = async () => {
    setLoading(true);
    try {
      await addToCart({ productId, quantity: 1 });
      alert('Erfolgreich hinzugefügt!');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return <button onClick={handleClick} disabled={loading}>
    {loading ? 'Lädt...' : 'Hinzufügen'}
  </button>;
}
```

---

## 🔌 Backend-Entwicklung

### Queries schreiben

**Template:**
```typescript
import type { GetMyData } from 'wasp/server/operations';
import type { MyEntity } from 'wasp/entities';
import { HttpError } from 'wasp/server';

export const getMyData: GetMyData<InputType, OutputType> = async (args, context) => {
  // 1. Authentifizierung prüfen
  if (!context.user) {
    throw new HttpError(401, 'Nicht angemeldet');
  }
  
  // 2. Daten abrufen
  const data = await context.entities.MyEntity.findMany({
    where: { userId: context.user.id },
    include: { relatedEntity: true },
  });
  
  // 3. Daten transformieren/berechnen
  const enrichedData = data.map(item => ({
    ...item,
    computedField: item.field1 + item.field2
  }));
  
  // 4. Zurückgeben
  return enrichedData;
};
```

**In main.wasp deklarieren:**
```wasp
query getMyData {
  fn: import { getMyData } from "@src/server/queries",
  entities: [MyEntity, RelatedEntity]
}
```

### Actions schreiben

**Template:**
```typescript
import type { MyAction } from 'wasp/server/operations';
import { HttpError } from 'wasp/server';

type MyActionInput = {
  field1: string;
  field2: number;
};

export const myAction: MyAction<MyActionInput, void> = async (args, context) => {
  // 1. Authentifizierung
  if (!context.user) {
    throw new HttpError(401);
  }
  
  // 2. Validierung
  if (args.field2 < 0) {
    throw new HttpError(400, 'field2 muss positiv sein');
  }
  
  // 3. Business-Logik
  const existing = await context.entities.MyEntity.findFirst({
    where: { field1: args.field1 }
  });
  
  if (existing) {
    // Update
    await context.entities.MyEntity.update({
      where: { id: existing.id },
      data: { field2: args.field2 }
    });
  } else {
    // Create
    await context.entities.MyEntity.create({
      data: {
        userId: context.user.id,
        field1: args.field1,
        field2: args.field2,
      }
    });
  }
  
  // 4. Return (optional)
  // Bei void-Actions nichts zurückgeben
};
```

### Fehlerbehandlung

**HttpError verwenden:**
```typescript
import { HttpError } from 'wasp/server';

// 400 - Bad Request (Validierungsfehler)
throw new HttpError(400, 'Ungültige E-Mail-Adresse');

// 401 - Unauthorized (nicht angemeldet)
throw new HttpError(401, 'Bitte melden Sie sich an');

// 403 - Forbidden (keine Berechtigung)
throw new HttpError(403, 'Sie haben keine Admin-Rechte');

// 404 - Not Found
throw new HttpError(404, 'Produkt nicht gefunden');

// 500 - Internal Server Error (vermeiden, nur für unerwartete Fehler)
throw new HttpError(500, 'Datenbankfehler');
```

**Try-Catch im Frontend:**
```typescript
try {
  await myAction(data);
  alert('Erfolgreich!');
} catch (error: any) {
  if (error.statusCode === 400) {
    alert('Eingabefehler: ' + error.message);
  } else if (error.statusCode === 401) {
    router.push('/login');
  } else {
    alert('Ein Fehler ist aufgetreten');
  }
}
```

---

## 🗄 Datenbank-Entwicklung

### Prisma Schema Ändern

**1. Schema anpassen:**
```prisma
// schema.prisma
model Product {
  // Neues Feld hinzufügen
  discount     Decimal?  @db.Decimal(5, 2)
}
```

**2. Migration erstellen:**
```bash
wasp db migrate-dev
```

Wasp fragt nach einem Namen:
```
Enter a name for the new migration: add_product_discount
```

**3. Migration wird generiert:**
```
.wasp/build/db/migrations/
└── 20260114123456_add_product_discount/
    └── migration.sql
```

### Prisma-Queries

**Grundlegende Operationen:**
```typescript
// Alle finden
const products = await context.entities.Product.findMany();

// Mit Filter
const available = await context.entities.Product.findMany({
  where: { isAvailable: true }
});

// Mit Sortierung
const sorted = await context.entities.Product.findMany({
  orderBy: { price: 'asc' }
});

// Mit Pagination
const paginated = await context.entities.Product.findMany({
  skip: 0,
  take: 10
});

// Mit Relations
const cartWithItems = await context.entities.Cart.findUnique({
  where: { userId: 1 },
  include: {
    items: {
      include: {
        product: true
      }
    }
  }
});

// Erstellen
const newProduct = await context.entities.Product.create({
  data: {
    name: 'Äpfel',
    price: 2.50,
    unit: 'kg',
    category: 'Obst',
    stock: 100
  }
});

// Aktualisieren
await context.entities.Product.update({
  where: { id: 1 },
  data: { price: 2.80 }
});

// Löschen
await context.entities.Product.delete({
  where: { id: 1 }
});

// Zählen
const count = await context.entities.Product.count({
  where: { category: 'Obst' }
});
```

**Aggregationen:**
```typescript
const stats = await context.entities.OrderItem.aggregate({
  _sum: {
    quantity: true
  },
  _avg: {
    price: true
  },
  where: {
    productId: 1
  }
});

console.log(stats._sum.quantity); // Gesamtmenge verkauft
console.log(stats._avg.price);    // Durchschnittspreis
```

---

## 🧪 Testing

### Backend-Tests (Beispiel)

```typescript
// src/server/__tests__/actions.test.ts
import { describe, it, expect } from '@jest/globals';
import { addToCart } from '../actions';

describe('addToCart', () => {
  it('sollte Produkt zum Warenkorb hinzufügen', async () => {
    const context = {
      user: { id: 1 },
      entities: {
        Product: {
          findUnique: jest.fn().mockResolvedValue({
            id: 1,
            name: 'Tomaten',
            isAvailable: true,
            minOrderQuantity: 1
          })
        },
        Cart: {
          findUnique: jest.fn().mockResolvedValue({
            id: 1,
            userId: 1
          })
        },
        CartItem: {
          findUnique: jest.fn().mockResolvedValue(null),
          create: jest.fn()
        }
      }
    };
    
    await addToCart({ productId: 1, quantity: 2 }, context as any);
    
    expect(context.entities.CartItem.create).toHaveBeenCalledWith({
      data: {
        cartId: 1,
        productId: 1,
        quantity: 2
      }
    });
  });
});
```

### E2E-Tests mit Playwright

```typescript
// e2e/cart.spec.ts
import { test, expect } from '@playwright/test';

test('Kunde kann Produkt zum Warenkorb hinzufügen', async ({ page }) => {
  // Login
  await page.goto('http://localhost:3000/login');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  // Produkt finden
  await page.goto('http://localhost:3000/urunler');
  await page.click('text=Tomaten');
  
  // Zum Warenkorb hinzufügen
  await page.click('text=In den Warenkorb');
  await expect(page.locator('.cart-badge')).toHaveText('1');
  
  // Warenkorb prüfen
  await page.goto('http://localhost:3000/sepet');
  await expect(page.locator('text=Tomaten')).toBeVisible();
});
```

---

## 🐛 Debugging

### Backend debuggen

**Console Logging:**
```typescript
export const myAction = async (args, context) => {
  console.log('Args:', args);
  console.log('User:', context.user);
  
  const result = await context.entities.Product.findMany();
  console.log('Products:', result);
  
  return result;
};
```

**Logs anzeigen:**
```bash
# Terminal wo "wasp start" läuft zeigt Backend-Logs
```

### Frontend debuggen

**React DevTools:**
- Extension installieren
- Komponenten-Baum inspizieren
- Props und State prüfen

**Browser Console:**
```typescript
useEffect(() => {
  console.log('Products:', products);
  console.log('User:', user);
}, [products, user]);
```

### Datenbank inspizieren

**Prisma Studio:**
```bash
wasp db studio
```
- Öffnet Web-UI auf http://localhost:5555
- Alle Tabellen durchsuchbar
- Daten direkt editieren

**psql:**
```bash
psql postgresql://postgres:postgres@localhost:5432/fruveg

# Nützliche Befehle:
\dt                  # Tabellen auflisten
\d "User"            # Tabellen-Schema anzeigen
SELECT * FROM "User"; # Daten abfragen
```

---

## 🚀 Performance-Optimierung

### Query-Optimierung

**❌ N+1 Problem:**
```typescript
// Schlecht: Lädt Produkte einzeln
const items = await context.entities.CartItem.findMany();
for (const item of items) {
  item.product = await context.entities.Product.findUnique({
    where: { id: item.productId }
  });
}
```

**✅ Mit include:**
```typescript
// Gut: Ein Query mit JOIN
const items = await context.entities.CartItem.findMany({
  include: { product: true }
});
```

### Frontend-Performance

**Lazy Loading:**
```typescript
import { lazy, Suspense } from 'react';

const Admin = lazy(() => import('./pages/Admin'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Admin />
    </Suspense>
  );
}
```

**Memoization:**
```typescript
import { useMemo } from 'react';

function ProductList({ products }) {
  const totalPrice = useMemo(() => {
    return products.reduce((sum, p) => sum + p.price, 0);
  }, [products]);
  
  return <div>Gesamt: {totalPrice} €</div>;
}
```

---

## 📦 Build & Deploy

### Lokaler Build

```bash
# Production Build erstellen
wasp build

# Build-Ordner öffnen
cd .wasp/build

# Struktur:
# .wasp/build/
# ├── web-app/         # Frontend (React)
# └── server/          # Backend (Node.js)
```

### Umgebungsvariablen

**Entwicklung (.env.server):**
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fruveg
```

**Produktion:**
```env
DATABASE_URL=postgresql://user:pass@host:5432/fruveg
PORT=3001
WASP_WEB_CLIENT_URL=https://fruveg.de
```

---

## 🔐 Sicherheit

### Best Practices

**1. Nie Passwörter loggen:**
```typescript
// ❌ Schlecht
console.log('User data:', user);  // könnte password enthalten

// ✅ Gut
console.log('User:', { id: user.id, email: user.email });
```

**2. Input validieren:**
```typescript
export const createProduct = async (args, context) => {
  if (args.price < 0) {
    throw new HttpError(400, 'Preis muss positiv sein');
  }
  
  if (!args.name || args.name.length < 2) {
    throw new HttpError(400, 'Name zu kurz');
  }
  
  // ...
};
```

**3. Authorization prüfen:**
```typescript
export const deleteProduct = async (args, context) => {
  if (!context.user?.isAdmin) {
    throw new HttpError(403, 'Nur Admins können Produkte löschen');
  }
  
  // ...
};
```

---

## 📚 Weitere Ressourcen

- **Wasp Docs:** https://wasp-lang.dev/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **TailwindCSS:** https://tailwindcss.com/docs
- **React Docs:** https://react.dev

---

**Happy Coding! 🚀**

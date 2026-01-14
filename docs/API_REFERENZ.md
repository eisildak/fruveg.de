# API Referenz - Fruveg.de

**Backend API Dokumentation für Entwickler**

---

## 📡 API-Übersicht

Die Fruveg.de API basiert auf dem Wasp-Framework und verwendet:
- **Queries** für Lesevorgänge (GET-ähnlich)
- **Actions** für Schreibvorgänge (POST/PUT/DELETE-ähnlich)

Alle Endpunkte sind automatisch unter `http://localhost:3001/api` verfügbar.

---

## 🔍 Queries (Lesevorgänge)

### `getProducts`

Holt alle verfügbaren Produkte aus der Datenbank.

**Typ:**
```typescript
GetProducts<void, Product[]>
```

**Parameter:** Keine

**Rückgabe:**
```typescript
Product[] = [
  {
    id: number;
    name: string;
    description: string | null;
    price: Decimal;
    unit: string;
    category: string;
    imageUrl: string | null;
    stock: number;
    isAvailable: boolean;
    minOrderQuantity: number;
    createdAt: Date;
    updatedAt: Date;
  }
]
```

**Beispiel (Frontend):**
```typescript
import { useQuery } from 'wasp/client/operations';
import { getProducts } from 'wasp/client/operations';

function ProductList() {
  const { data: products, isLoading, error } = useQuery(getProducts);
  
  if (isLoading) return <div>Lädt...</div>;
  if (error) return <div>Fehler: {error.message}</div>;
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

**Besonderheiten:**
- Nur Produkte mit `isAvailable: true` werden zurückgegeben
- Sortierung: Erst nach Kategorie, dann nach Name (alphabetisch)

---

### `getCart`

Holt den aktuellen Warenkorb des angemeldeten Benutzers.

**Typ:**
```typescript
GetCart<void, CartWithTotal>
```

**Parameter:** Keine (nutzt `context.user`)

**Rückgabe:**
```typescript
{
  id: number;
  userId: number;
  items: [
    {
      id: number;
      cartId: number;
      productId: number;
      quantity: number;
      product: {
        id: number;
        name: string;
        price: Decimal;
        unit: string;
        category: string;
        imageUrl: string | null;
        minOrderQuantity: number;
      }
    }
  ];
  totalPrice: number;  // Berechnetes Feld
  createdAt: Date;
  updatedAt: Date;
}
```

**Beispiel:**
```typescript
const { data: cart } = useQuery(getCart);

console.log(cart.totalPrice);  // 47.50
console.log(cart.items.length); // 3
```

**Fehler:**
- `401` - Wenn Benutzer nicht angemeldet ist

**Besonderheiten:**
- `totalPrice` wird serverseitig berechnet: `sum(product.price * quantity)`
- Wenn kein Warenkorb existiert, wird `{ items: [], totalPrice: 0 }` zurückgegeben

---

### `getMyOrders`

Holt alle Bestellungen des angemeldeten Benutzers.

**Typ:**
```typescript
GetMyOrders<void, Order[]>
```

**Parameter:** Keine

**Rückgabe:**
```typescript
Order[] = [
  {
    id: number;
    userId: number;
    orderNumber: string;
    status: string;
    totalPrice: Decimal;
    deliveryAddress: string;
    deliveryCity: string;
    deliveryPostalCode: string;
    deliveryPhone: string;
    deliveryNotes: string | null;
    paymentMethod: string;
    paymentStatus: string;
    items: [
      {
        id: number;
        orderId: number;
        productId: number;
        quantity: number;
        price: Decimal;  // Preis zum Bestellzeitpunkt
        unit: string;
        product: {
          id: number;
          name: string;
          category: string;
          imageUrl: string | null;
        }
      }
    ];
    createdAt: Date;
    updatedAt: Date;
  }
]
```

**Beispiel:**
```typescript
const { data: orders } = useQuery(getMyOrders);

orders.forEach(order => {
  console.log(`Bestellung ${order.orderNumber}: ${order.status}`);
});
```

**Sortierung:** Neueste zuerst (`createdAt DESC`)

**Fehler:**
- `401` - Wenn Benutzer nicht angemeldet ist

---

### `getAllOrders` ⚠️ Admin

Holt alle Bestellungen im System (für Admins).

**Typ:**
```typescript
GetAllOrders<void, OrderWithUser[]>
```

**Parameter:** Keine

**Rückgabe:**
```typescript
OrderWithUser[] = [
  {
    // ... alle Order-Felder wie getMyOrders
    user: {
      email: string;
    }
  }
]
```

**Beispiel:**
```typescript
const { data: orders } = useQuery(getAllOrders);

orders.forEach(order => {
  console.log(`Kunde: ${order.user.email}, Status: ${order.status}`);
});
```

**Fehler:**
- `401` - Wenn Benutzer nicht angemeldet ist
- `403` - Wenn Benutzer kein Admin ist (`isAdmin: false`)

---

## ✍️ Actions (Schreibvorgänge)

### `addToCart`

Fügt ein Produkt zum Warenkorb hinzu oder erhöht die Menge.

**Typ:**
```typescript
AddToCart<AddToCartInput, void>
```

**Parameter:**
```typescript
{
  productId: number;
  quantity: number;
}
```

**Rückgabe:** `void`

**Beispiel:**
```typescript
import { addToCart } from 'wasp/client/operations';

async function handleAddToCart() {
  try {
    await addToCart({ productId: 1, quantity: 2 });
    alert('Produkt hinzugefügt!');
  } catch (error) {
    alert(error.message);
  }
}
```

**Validierung:**
- Produkt muss existieren
- Produkt muss verfügbar sein (`isAvailable: true`)
- Menge ≥ `minOrderQuantity`

**Verhalten:**
- Erstellt Warenkorb automatisch, falls nicht vorhanden
- Wenn Produkt bereits im Warenkorb: Erhöht Menge
- Wenn Produkt neu: Erstellt neues CartItem

**Fehler:**
- `401` - Nicht angemeldet
- `404` - Produkt nicht gefunden
- `400` - Produkt nicht verfügbar
- `400` - Menge unter Mindestbestellmenge

---

### `updateCartItem`

Ändert die Menge eines Produkts im Warenkorb.

**Typ:**
```typescript
UpdateCartItem<UpdateCartItemInput, void>
```

**Parameter:**
```typescript
{
  cartItemId: number;
  quantity: number;
}
```

**Rückgabe:** `void`

**Beispiel:**
```typescript
await updateCartItem({ cartItemId: 5, quantity: 3 });
```

**Validierung:**
- CartItem muss dem angemeldeten Benutzer gehören
- Menge ≥ 1
- Menge ≥ `product.minOrderQuantity`

**Fehler:**
- `401` - Nicht angemeldet
- `404` - CartItem nicht gefunden oder gehört anderem Benutzer
- `400` - Ungültige Menge

---

### `removeFromCart`

Entfernt ein Produkt aus dem Warenkorb.

**Typ:**
```typescript
RemoveFromCart<RemoveFromCartInput, void>
```

**Parameter:**
```typescript
{
  cartItemId: number;
}
```

**Rückgabe:** `void`

**Beispiel:**
```typescript
await removeFromCart({ cartItemId: 5 });
```

**Fehler:**
- `401` - Nicht angemeldet
- `404` - CartItem nicht gefunden

---

### `clearCart`

Leert den gesamten Warenkorb.

**Typ:**
```typescript
ClearCart<void, void>
```

**Parameter:** Keine

**Rückgabe:** `void`

**Beispiel:**
```typescript
if (confirm('Warenkorb wirklich leeren?')) {
  await clearCart();
}
```

**Verhalten:**
- Löscht alle CartItems
- Warenkorb selbst bleibt bestehen (für zukünftige Nutzung)

**Fehler:**
- `401` - Nicht angemeldet

---

### `createOrder`

Erstellt eine Bestellung aus dem aktuellen Warenkorb.

**Typ:**
```typescript
CreateOrder<CreateOrderInput, Order>
```

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

**Rückgabe:**
```typescript
Order = {
  id: number;
  orderNumber: string;
  status: string;
  totalPrice: Decimal;
  // ... alle anderen Order-Felder
  items: OrderItem[];
}
```

**Beispiel:**
```typescript
const order = await createOrder({
  deliveryAddress: 'Musterstraße 123',
  deliveryCity: 'Berlin',
  deliveryPostalCode: '10115',
  deliveryPhone: '030 12345678',
  deliveryNotes: 'Bitte klingeln',
  paymentMethod: 'Kreditkarte'
});

console.log(`Bestellung erstellt: ${order.orderNumber}`);
```

**Ablauf:**
1. Warenkorb validieren (nicht leer)
2. Gesamtpreis berechnen
3. Mindestbestellwert prüfen (500 €)
4. Bestellnummer generieren: `FRU{timestamp}{random}`
5. Order erstellen
6. OrderItems aus CartItems kopieren (mit aktuellem Preis)
7. Warenkorb leeren

**Validierung:**
- Warenkorb darf nicht leer sein
- Gesamtpreis ≥ 500 €
- Alle Pflichtfelder müssen ausgefüllt sein

**Fehler:**
- `401` - Nicht angemeldet
- `400` - Warenkorb leer
- `400` - Mindestbestellwert nicht erreicht

**Besonderheiten:**
- Preis wird zum Bestellzeitpunkt "eingefroren" (in OrderItem gespeichert)
- OrderNumber ist eindeutig (wird nicht zweimal vergeben)

---

### `updateOrderStatus` ⚠️ Admin

Ändert den Status einer Bestellung.

**Typ:**
```typescript
UpdateOrderStatus<UpdateOrderStatusInput, void>
```

**Parameter:**
```typescript
{
  orderId: number;
  status: string;
}
```

**Rückgabe:** `void`

**Erlaubte Status-Werte:**
- `"Ausstehend"` - Bestellung eingegangen
- `"Bestätigt"` - Admin hat bestätigt
- `"In Vorbereitung"` - Wird verpackt
- `"Versendet"` - Unterwegs
- `"Zugestellt"` - Kunde hat erhalten
- `"Storniert"` - Bestellung abgebrochen

**Beispiel:**
```typescript
await updateOrderStatus({ orderId: 42, status: 'Versendet' });
```

**Fehler:**
- `401` - Nicht angemeldet
- `403` - Kein Admin

---

### `createProduct` ⚠️ Admin

Erstellt ein neues Produkt.

**Typ:**
```typescript
CreateProduct<CreateProductInput, void>
```

**Parameter:**
```typescript
{
  name: string;
  description?: string;
  price: number;
  unit: string;
  category: string;
  imageUrl?: string;
  stock: number;
  minOrderQuantity: number;
}
```

**Rückgabe:** `void`

**Beispiel:**
```typescript
await createProduct({
  name: 'Bio-Tomaten',
  description: 'Frische Tomaten aus regionalem Anbau',
  price: 3.50,
  unit: 'kg',
  category: 'Bio',
  stock: 100,
  minOrderQuantity: 2,
  imageUrl: 'https://example.com/tomaten.jpg'
});
```

**Fehler:**
- `401` - Nicht angemeldet
- `403` - Kein Admin

---

### `updateProduct` ⚠️ Admin

Aktualisiert ein bestehendes Produkt.

**Typ:**
```typescript
UpdateProduct<UpdateProductInput, void>
```

**Parameter:**
```typescript
{
  productId: number;
  name?: string;
  description?: string;
  price?: number;
  unit?: string;
  category?: string;
  imageUrl?: string;
  stock?: number;
  isAvailable?: boolean;
  minOrderQuantity?: number;
}
```

**Rückgabe:** `void`

**Beispiel:**
```typescript
// Nur Preis ändern
await updateProduct({ 
  productId: 1, 
  price: 3.20 
});

// Mehrere Felder ändern
await updateProduct({
  productId: 1,
  price: 3.20,
  stock: 150,
  isAvailable: true
});
```

**Fehler:**
- `401` - Nicht angemeldet
- `403` - Kein Admin

---

### `deleteProduct` ⚠️ Admin

"Löscht" ein Produkt (setzt `isAvailable: false`).

**Typ:**
```typescript
DeleteProduct<DeleteProductInput, void>
```

**Parameter:**
```typescript
{
  productId: number;
}
```

**Rückgabe:** `void`

**Beispiel:**
```typescript
await deleteProduct({ productId: 1 });
```

**Verhalten:**
- Produkt wird nicht wirklich gelöscht (wegen Referenzen in OrderItems)
- Stattdessen: `isAvailable = false` gesetzt
- Wird nicht mehr in `getProducts` angezeigt
- Kann nicht mehr zum Warenkorb hinzugefügt werden

**Fehler:**
- `401` - Nicht angemeldet
- `403` - Kein Admin

---

## 🔐 Authentifizierung

Alle Queries/Actions verwenden automatisch den angemeldeten Benutzer via `context.user`.

**User-Objekt:**
```typescript
context.user = {
  id: number;
  email: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
}
```

**Authentifizierungs-Flows:**

### Login
```typescript
import { login } from 'wasp/client/auth';

await login({ email: 'user@example.com', password: 'pass123' });
```

### Logout
```typescript
import { logout } from 'wasp/client/auth';

await logout();
```

### Signup
```typescript
import { signup } from 'wasp/client/auth';

await signup({ email: 'new@example.com', password: 'pass123' });
```

---

## 📊 Fehler-Codes

| Code | Bedeutung | Häufige Ursachen |
|------|-----------|------------------|
| 400 | Bad Request | Validierungsfehler, ungültige Eingaben |
| 401 | Unauthorized | Nicht angemeldet |
| 403 | Forbidden | Keine Berechtigung (z.B. kein Admin) |
| 404 | Not Found | Ressource existiert nicht |
| 500 | Server Error | Datenbankfehler, unerwartete Fehler |

**Fehlerbehandlung:**
```typescript
try {
  await myAction(data);
} catch (error: any) {
  switch (error.statusCode) {
    case 400:
      alert('Ungültige Eingabe: ' + error.message);
      break;
    case 401:
      router.push('/login');
      break;
    case 403:
      alert('Keine Berechtigung');
      break;
    case 404:
      alert('Nicht gefunden');
      break;
    default:
      alert('Fehler: ' + error.message);
  }
}
```

---

## 🔄 Query Invalidation

Wasp invalidiert Queries automatisch basierend auf `entities`:

```wasp
action addToCart {
  fn: import { addToCart } from "@src/server/actions",
  entities: [Cart, CartItem, Product]
}

query getCart {
  fn: import { getCart } from "@src/server/queries",
  entities: [Cart, CartItem, Product]
}
```

**Bedeutung:**
- Wenn `addToCart` ausgeführt wird
- Werden alle Queries mit `Cart`, `CartItem` oder `Product` invalidiert
- Diese werden automatisch neu geladen
- UI aktualisiert sich automatisch

**Manuelles Invalidieren:**
```typescript
import { useQuery } from 'wasp/client/operations';

const { refetch } = useQuery(getCart);

// Später:
await addToCart(...);
refetch();  // Manuell neu laden (normalerweise nicht nötig)
```

---

## 📝 Beispiel: Vollständiger Warenkorb-Flow

```typescript
import { useQuery } from 'wasp/client/operations';
import { 
  getCart, 
  getProducts,
  addToCart,
  updateCartItem,
  removeFromCart,
  createOrder
} from 'wasp/client/operations';

function ShoppingFlow() {
  // 1. Produkte laden
  const { data: products } = useQuery(getProducts);
  
  // 2. Zum Warenkorb hinzufügen
  const handleAddToCart = async (productId: number) => {
    await addToCart({ productId, quantity: 1 });
    // getCart wird automatisch invalidiert & neu geladen
  };
  
  // 3. Warenkorb anzeigen
  const { data: cart } = useQuery(getCart);
  
  // 4. Menge ändern
  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    await updateCartItem({ cartItemId: itemId, quantity: newQuantity });
  };
  
  // 5. Artikel entfernen
  const handleRemove = async (itemId: number) => {
    await removeFromCart({ cartItemId: itemId });
  };
  
  // 6. Bestellung erstellen
  const handleCheckout = async (deliveryData) => {
    try {
      const order = await createOrder(deliveryData);
      alert(`Bestellung ${order.orderNumber} erstellt!`);
      // Warenkorb wird automatisch geleert
    } catch (error: any) {
      if (error.message.includes('500')) {
        alert('Mindestbestellwert 500 € nicht erreicht');
      }
    }
  };
  
  // ... UI-Code
}
```

---

**Ende der API-Referenz**

Für weitere Fragen siehe:
- [ENTWICKLUNG.md](ENTWICKLUNG.md) - Entwicklungshandbuch
- [PROJEKT_DETAILS.md](PROJEKT_DETAILS.md) - Projektdokumentation

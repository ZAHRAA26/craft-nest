<div align="center">

# 🧵 منصة الحرف اليدوية
### Handcraft & Digital Print Platform

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-Real--time-010101?style=for-the-badge&logo=socket.io" />
  <img src="https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
</p>

<p align="center">
  A full-stack marketplace connecting <strong>artisans</strong> with <strong>buyers</strong> — selling handmade physical products and downloadable digital patterns, with real-time chat, custom order negotiation, and an automated commission system.
</p>

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Database Models](#-database-models)
- [API Reference](#-api-reference)
- [Authentication & Roles](#-authentication--roles)
- [Real-time Events](#-real-time-events-socketio)
- [Payment Flow](#-payment-flow)
- [Digital Patterns & File Security](#-digital-patterns--file-security)
- [Commission & Payout System](#-commission--payout-system)
- [Team & Sprint Plan](#-team--sprint-plan)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)

---

## 🌟 Overview

منصة الحرف اليدوية is a bilingual (Arabic/English) e-commerce platform built specifically for the Arabic-speaking artisan market. It goes beyond a simple shop — artisans can sell **physical handmade products**, offer **digital downloadable patterns**, and receive **custom order requests** from buyers. The platform handles the entire lifecycle: discovery → negotiation → payment → fulfillment → review → payout.

### The Problem We Solve

| Traditional Marketplaces | منصة الحرف |
|---|---|
| Generic, not culturally tailored | Built for Arabic artisans from the ground up |
| No custom order flow | Full negotiation system between buyer & artisan |
| Digital files unprotected | S3 private storage + signed URLs + watermarks |
| Manual commission tracking | Automated per-transaction commission with payout requests |
| Static, no real-time | Socket.io messaging per order thread |

---

## ✨ Features

### For Buyers 🛒
- Browse and search handmade products with filters (category, price, rating)
- Buy digital patterns with **instant secure download** after payment
- Send **custom order requests** to specific artisans with specs and budget
- Real-time messaging with artisans per order thread
- Multi-dimension product reviews (craft quality, accuracy, packaging, timing)
- Public order tracking without login

### For Artisans 🎨
- Full product management with up to 8 images per product (auto-resized via Sharp → Cloudinary)
- Upload digital patterns in SVG / PDF / PNG with automatic watermarking
- Respond to custom orders with quotes and negotiate pricing
- Ship orders and update tracking info
- View earnings dashboard, commission breakdown, and request payouts

### For Admins ⚙️
- Approve/reject artisan registrations with custom commission rates
- Platform-wide stats (users, orders, revenue, pending payouts)
- User management with instant account suspension (JWT blacklist)
- Process payout requests with reference number logging

---

## 🛠 Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (Access 15min + Refresh 7d) + bcrypt |
| Real-time | Socket.io |
| File Upload | Multer → Sharp (resize) → Cloudinary / AWS S3 |
| Payments | Stripe + Paymob |
| Email | Nodemailer |
| SMS | Twilio |
| Scheduling | node-cron |

### Frontend
| Layer | Technology |
|---|---|
| Framework | React.js 18 |
| Styling | Tailwind CSS + Shadcn/ui |
| State | Redux Toolkit |
| Data Fetching | TanStack Query (React Query) |
| HTTP Client | Axios |
| Real-time | Socket.io Client |
| Internationalization | i18next (AR / EN) |
| Canvas/Patterns | Fabric.js (SVG interactive preview) |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (React)                    │
│  Redux · TanStack Query · Socket.io · Fabric.js     │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP / WebSocket
┌───────────────────────▼─────────────────────────────┐
│               EXPRESS REST API + Socket.io           │
│                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │   Auth   │ │ Products │ │ Patterns │            │
│  │ Middleware│ │  Router  │ │  Router  │            │
│  └──────────┘ └──────────┘ └──────────┘            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │  Orders  │ │ Messages │ │  Admin   │            │
│  │  Router  │ │  Router  │ │  Router  │            │
│  └──────────┘ └──────────┘ └──────────┘            │
└──────┬──────────────┬──────────────┬────────────────┘
       │              │              │
┌──────▼───┐   ┌──────▼───┐  ┌──────▼───────────────┐
│ MongoDB  │   │Cloudinary│  │   AWS S3 (Private)   │
│  Atlas   │   │ (Images) │  │  (Pattern Files)     │
└──────────┘   └──────────┘  └──────────────────────┘
       │
┌──────▼──────────────────────────────────────────────┐
│              External Services                       │
│   Stripe Webhooks · Paymob · Twilio · Nodemailer   │
└─────────────────────────────────────────────────────┘
```

---

## 🗄 Database Models

<details>
<summary><strong>User Model</strong></summary>

```js
{
  name: String,
  email: String,           // unique
  password: String,        // select: false (never returned)
  role: enum['buyer', 'artisan', 'admin'],
  avatar: String,          // Cloudinary URL
  isEmailVerified: Boolean,
  isActive: Boolean,
  preferredLanguage: enum['ar', 'en'],

  // artisan only
  artisanProfile: {
    bio: { ar: String, en: String },
    craftSpecialty: [String],
    isApproved: Boolean,
    commissionRate: Number,  // default 0.10
    rating: Number,
    totalReviews: Number,
    pendingBalance: Number,
    totalEarnings: Number
  }
}
```
</details>

<details>
<summary><strong>Product Model</strong></summary>

```js
{
  title: { ar: String, en: String },
  description: { ar: String, en: String },
  price: Number,
  category: String,
  stock: Number,
  images: [{ url: String, publicId: String, isMain: Boolean }],
  materials: [{ name: {ar,en}, quantity: Number, unit: String }],
  dimensions: { width, height, unit },
  craftingTime: Number,      // days
  difficultyLevel: enum['beginner','intermediate','advanced'],
  allowCustomOrders: Boolean,
  artisan: ObjectId → User,
  seo: { slug: String },     // auto-generated
  status: enum['active', 'archived'],
  stats: { views, totalSold, avgRating }
}
```
</details>

<details>
<summary><strong>Order Model</strong></summary>

```js
{
  orderNumber: String,       // ORD-2025-XXXXX
  buyer: ObjectId → User,
  items: [{
    productId: ObjectId,
    productModel: enum['Product', 'Pattern'],
    title: { ar, en },
    price: Number,
    quantity: Number,
    type: enum['physical', 'digital']
  }],
  totalAmount: Number,
  status: enum['pending_payment','paid','processing','shipped','delivered','completed'],
  statusHistory: [{ status, timestamp }],
  shippingAddress: { name, street, city, phone },
  paymentMethod: enum['stripe', 'paymob'],
  shippingTracking: { provider, trackingNumber, trackingUrl, estimatedDelivery },
  downloadTokens: [{ patternId, downloadCount, maxDownloads, expiresAt }]
}
```
</details>

<details>
<summary><strong>Other Models</strong></summary>

- **Pattern** — digital files on S3, watermarked previews on Cloudinary, license details
- **CustomOrder** — negotiation thread with quotes array between buyer and artisan
- **Message** — per-order thread with Socket.io real-time delivery
- **Review** — 4-dimension ratings with artisan reply and verified purchase flag
- **Transaction** — per-order financial record with commission calculation and payout status

</details>

---

## 📡 API Reference

> **Base URL:** `/api` &nbsp;|&nbsp; **Format:** JSON &nbsp;|&nbsp; **Auth:** `Authorization: Bearer <accessToken>`

### Endpoints Summary

| Feature | Method | Endpoint | Auth |
|---|---|---|---|
| **Auth** | POST | `/auth/register` | — |
| | POST | `/auth/login` | — |
| | GET | `/auth/verify-email/:token` | — |
| | POST | `/auth/refresh-token` | Cookie |
| | POST | `/auth/forgot-password` | — |
| | POST | `/auth/reset-password/:token` | — |
| | GET | `/auth/me` | 🔒 JWT |
| **Products** | GET | `/products` | — |
| | GET | `/products/:slug` | — |
| | POST | `/products` | 🔒 artisan |
| | PATCH | `/products/:id` | 🔒 owner |
| | DELETE | `/products/:id` | 🔒 owner/admin |
| | GET | `/artisans/:id/portfolio` | — |
| **Patterns** | POST | `/patterns` | 🔒 artisan |
| | GET | `/patterns/:id/download` | 🔒 verified buyer |
| | GET | `/patterns/:id/preview-svg` | — |
| **Cart & Orders** | POST | `/cart/add` | 🔒 buyer |
| | POST | `/orders/create` | 🔒 buyer |
| | POST | `/orders/webhook/stripe` | Stripe sig |
| | GET | `/orders/my-orders` | 🔒 buyer |
| | GET | `/orders/:orderNumber/tracking` | — |
| | PATCH | `/orders/:id/ship` | 🔒 artisan |
| | PATCH | `/orders/:id/confirm-delivery` | 🔒 buyer |
| **Custom Orders** | POST | `/custom-orders` | 🔒 buyer |
| | POST | `/custom-orders/:id/quote` | 🔒 artisan |
| | PATCH | `/custom-orders/:id/accept` | 🔒 buyer |
| **Messages** | GET | `/messages/thread/:orderId` | 🔒 participant |
| | POST | `/messages` | 🔒 participant |
| | GET | `/messages/conversations` | 🔒 JWT |
| | PATCH | `/messages/:threadId/read` | 🔒 receiver |
| **Reviews** | POST | `/reviews` | 🔒 verified buyer |
| | GET | `/reviews/product/:productId` | — |
| | POST | `/reviews/:id/reply` | 🔒 artisan |
| **Finance** | GET | `/artisan/earnings` | 🔒 artisan |
| | GET | `/artisan/transactions` | 🔒 artisan |
| | POST | `/artisan/payout-request` | 🔒 artisan |
| **Admin** | GET | `/admin/stats` | 🔒 admin |
| | PATCH | `/admin/artisans/:id/approve` | 🔒 admin |
| | PATCH | `/admin/payout-requests/:id/approve` | 🔒 admin |
| | GET | `/admin/users` | 🔒 admin |
| | PATCH | `/admin/users/:id/status` | 🔒 admin |

> 📄 Full request/response details for all 52 endpoints: [API Documentation →](https://crafts-presentation.netlify.app/)

---

## 🔐 Authentication & Roles

```
POST /api/auth/register  →  POST /api/auth/login  →  accessToken (15min)
                                                   →  refreshToken (7d, httpOnly cookie)
```

| Role | Permissions |
|---|---|
| `buyer` | Browse, cart, orders, custom order requests, reviews, messages |
| `artisan` | All buyer permissions + add products/patterns, respond to custom orders, ship, request payouts |
| `admin` | Full access + approve artisans, manage users, process payouts, view platform stats |

**Security notes:**
- `password` field has `select: false` in schema — never returned in any response
- Forgot password returns the same response whether email exists or not (prevents user enumeration)
- Account suspension invalidates JWT immediately via blacklist
- Stripe webhook verified with `stripe.webhooks.constructEvent()` signature check

---

## ⚡ Real-time Events (Socket.io)

```js
// Client connects with JWT
socket.auth = { token: accessToken }

// Events emitted by server
socket.on('new_message', ({ _id, sender, content, threadId }) => { ... })
socket.on('messages_read', ({ threadId }) => { ... })

// Events emitted by client
socket.emit('join_room', userId)
```

All messaging is **per-order threaded** — conversations are tied to an Order or CustomOrder, not free-form DMs.

---

## 💳 Payment Flow

### Stripe (International)
```
POST /orders/create  →  clientSecret returned
→  Frontend uses Stripe Elements with clientSecret
→  Stripe calls POST /orders/webhook/stripe on success
→  Backend: order.status → "paid", stock decremented, download tokens created
```

### Paymob (Egypt/MENA)
```
POST /orders/create  →  paymentUrl returned
→  Frontend redirects to Paymob hosted page
→  Paymob calls webhook on success
→  Same post-payment logic as Stripe
```

---

## 🎨 Digital Patterns & File Security

```
Upload flow:
Artisan uploads files  →  Multer  →  Sharp (watermark)  →  Cloudinary (preview)
                                  →  AWS S3 private bucket (originals)

Download flow:
Buyer pays  →  downloadToken created (maxDownloads: 3, expires: 30d)
Buyer requests download  →  Backend verifies purchase from Order model
                         →  Generates S3 signed URL (valid 5 minutes)
                         →  downloadsRemaining decremented
```

- Original files are **never exposed via direct URL**
- SVG previews served as low-res (800px max) for Fabric.js interactive color preview
- License PDF automatically bundled with each download

---

## 💰 Commission & Payout System

```
Order paid  →  Transaction created automatically
            →  grossAmount = order total
            →  commissionAmt = grossAmount × artisan.commissionRate (default 10%)
            →  netAmount = grossAmount - commissionAmt
            →  artisan.pendingBalance += netAmount

Buyer confirms delivery  →  pendingBalance becomes available
Artisan requests payout  →  minimum 200 EGP, via InstaPay / Bank / Vodafone Cash
Admin approves           →  pendingBalance decremented, Transaction marked "paid"
```

---

## 👥 Team & Sprint Plan

The project follows a **Feature-Based sprint model** — the entire team works on one feature per week, eliminating integration issues and enabling weekly demos.

| Week | Feature | Description |
|---|---|---|
| 1 | 🔐 Auth | Registration, login, roles, email verification |
| 2 | 🛍 Products | CRUD, image upload, search & filtering |
| 3 | 🎨 Patterns | Digital upload, watermark, S3 private storage |
| 4 | 💳 Cart & Orders | Checkout, Stripe, Paymob, webhooks |
| 5 | ✉️ Custom Orders | Request → Quote → Negotiation → Accept |
| 6 | 💬 Messages | Real-time Socket.io per-order threads |
| 7 | ⭐ Reviews | Multi-dimension ratings, photos, artisan reply |
| 8 | 💰 Finance | Commission tracking, payout requests |
| 9 | 🚚 Shipping | Tracking, notifications (Email + SMS) |
| 10 | ⚙️ Admin Panel | Stats, approvals, user & payout management |

**Team roles:**
- **Frontend Dev 1** — Pages, UI components, routing (React + Tailwind + Shadcn)
- **Frontend Dev 2** — State management, API integration, real-time (Redux + TanStack Query + Socket.io)
- **Backend Dev** — APIs, database, security, integrations (Node + Express + MongoDB)
- **UI/UX Designer** — Design system, Figma handoff at start of each week

> 📋 Full interactive sprint board: [Team Plan →](https://crafts-platform-team-plan.netlify.app/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas URI)
- AWS S3 bucket (private)
- Cloudinary account
- Stripe account + webhook secret
- Paymob account (for Egypt payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/handcraft-platform.git
cd handcraft-platform

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### Running in Development

```bash
# Backend (from /server)
npm run dev        # starts on port 5000

# Frontend (from /client)
npm run dev        # starts on port 5173
```

---

## 🔧 Environment Variables

Create a `.env` file in `/server`:

```env
# Server
PORT=5002
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://...

# JWT
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
AWS_REGION=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Paymob
PAYMOB_API_KEY=
PAYMOB_INTEGRATION_ID=

# Email (Nodemailer)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# Twilio (SMS)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Client URL (for CORS & email links)
CLIENT_URL=http://localhost:5173
```

---

## 📁 Project Structure

```
handcraft-platform/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level pages
│   │   ├── store/             # Redux slices
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # Axios API calls
│   │   ├── socket/            # Socket.io client setup
│   │   └── i18n/              # Arabic / English translations
│   └── public/
│
└── server/                    # Node.js Backend
    ├── controllers/           # Route handlers
    ├── models/                # Mongoose schemas
    ├── routes/                # Express routers
    ├── middleware/             # Auth, upload, error handling
    ├── services/              # Stripe, Paymob, email, SMS
    ├── utils/                 # Helpers (slug, commission, etc.)
    └── socket/                # Socket.io server setup
```

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  <p>Built with ❤️ for Arabic artisans</p>
</div>
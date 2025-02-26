<h1 align="center">OrderFlow</h1>

<br/>

> Built with Next.js, Redux, TailwindCSS, HeadlessUI and Shadcn written in TypeScript.

---

<br/>

## ✨ Features

- Responsive on every possible screen.
- Utilizes redux for state management, persists the data using redux persist.
- Intuitive user experience.


## ⚙ Tech Stack

- Next.js App 
- Redux toolkit
- Formik
- Zod
- TailwindCSS
- Shadcn
- React Icons

<br/>



  

## 📜 Instructions

#### Directions to Install

```bash
$ git clone https://github.com/Shivd131/next-orderflow.git
$ npm install
```

#### Directions to Run

```bash
$ npm run dev
```

```
Directory structure:
└── src/
    ├── app/
    │   ├── StoreProvider.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── inventory-view/
    │   │   ├── AddItemDialog.tsx
    │   │   ├── EditItemDialog.tsx
    │   │   ├── columns.tsx
    │   │   ├── page.tsx
    │   │   └── validation/
    │   │       ├── validate.ts
    │   │       └── validationSchema.ts
    │   └── orders-view/
    │       ├── ViewOrderDialog.tsx
    │       ├── columns.tsx
    │       └── page.tsx
    ├── components/
    │   ├── SideNavbar.tsx
    │   └── ui/
    │       ├── button.tsx
    │       ├── checkbox.tsx
    │       ├── data-table.tsx
    │       ├── dialog.tsx
    │       ├── dropdown-menu.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       ├── sonner.tsx
    │       └── table.tsx
    └── lib/
        ├── store.ts
        ├── utils.ts
        └── features/
            ├── inventory/
            │   └── inventorySlice.ts
            └── orders/
                └── ordersSlice.ts

```
<p align="center">
	Made with 💖 by Shiv Deshpande 
</p>

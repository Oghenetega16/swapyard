SwapYard-Project/          <-- YOUR ROOT FOLDER
│
├── frontend/              <-- Next.js Application
│   ├── src/               <-- Your source code lives here
│   │   ├── app/           <-- App Router
│   │   ├── components/
│   │   └── lib/
│   ├── public/
│   ├── next.config.ts
│   └── package.json       <-- Frontend dependencies
│
├── backend/               <-- Your Server (Node, Python, Go, etc.)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── .env               <-- Backend secrets
│   └── package.json       <-- Backend dependencies
│
├── .gitignore             <-- Root gitignore (ignore node_modules in both)
└── README.md
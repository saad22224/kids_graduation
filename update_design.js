const fs = require('fs');
const path = require('path');

const dir = 'c:\\\\laragon\\\\www\\\\kids_graduation';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const styleToAdd = `
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
            animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
            animation-delay: 2s;
        }
        
        .animation-delay-4000 {
            animation-delay: 4s;
        }
`;

// Matches the exact old hero background classes
const oldHeroRegex = /<section[^>]*class="relative bg-gradient-to-br from-sky-500 to-teal-500 text-white py-20 overflow-hidden"[^>]*>[\s\S]*?<!-- Background Pattern -->\s*<div class="absolute inset-0 opacity-5">\s*<div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"><\/div>\s*<div class="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full filter blur-3xl"><\/div>\s*<\/div>/g;

const newHeroStart = `<section class="relative bg-gradient-to-br from-indigo-600 via-sky-500 to-teal-400 text-white py-24 overflow-hidden">
        <!-- Animated Background Shapes -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-24 -right-24 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
            <div class="absolute top-1/2 -left-24 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
            <div class="absolute -bottom-24 right-1/4 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] opacity-50"></div>
        </div>`;

files.forEach(f => {
    let content = fs.readFileSync(path.join(dir, f), 'utf-8');
    
    // Add CSS animations if missing
    if (!content.includes('@keyframes blob')) {
        content = content.replace('</style>', styleToAdd + '\n    </style>');
    }
    
    // Replace Hero section background
    if (content.match(oldHeroRegex)) {
        content = content.replace(oldHeroRegex, newHeroStart);
    } else {
        // Fallback for formula.html or others without the exact pattern
        const fallbackHeroRegex = /<section[^>]*class="relative bg-gradient-to-br from-sky-500 to-teal-500 text-white py-20 overflow-hidden"[^>]*>/g;
        content = content.replace(fallbackHeroRegex, newHeroStart.replace(/[\s\S]*<!-- Animated Background Shapes -->/, '<section class="relative bg-gradient-to-br from-indigo-600 via-sky-500 to-teal-400 text-white py-24 overflow-hidden">\n        <!-- Animated Background Shapes -->'));
    }
    
    // Enhance card styles across the page
    // 1. Standard cards
    content = content.replace(/bg-white rounded-xl shadow-lg p-6 card-hover/g, 'bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-6 relative overflow-hidden group border border-slate-100');
    
    // 2. Sections with bg-slate-50
    content = content.replace(/bg-slate-50 rounded-2xl shadow-lg/g, 'bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-slate-100');
    
    // 3. Floating info cards
    content = content.replace(/bg-white rounded-xl p-3 shadow-lg/g, 'bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/50');
    content = content.replace(/bg-white rounded-xl p-4 shadow-lg/g, 'bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/50');
    content = content.replace(/bg-white rounded-lg p-4 shadow-lg/g, 'bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/50');
    
    // 4. White buttons in hero -> gradient or glass buttons
    // No need to change specific buttons, they already look decent.
    
    fs.writeFileSync(path.join(dir, f), content);
    console.log(`Updated ${f}`);
});

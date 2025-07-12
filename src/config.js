// src/config.js

// Objek ini tidak perlu diubah
export const hookTitleMappings = {
    "Problem/Agitate/Solve": { en: "The Core Problem", id: "Inti Masalah" },
    "Before & After": { en: "The Transformation", id: "Transformasi" },
    "Story Hook": { en: "The Opening Story", id: "Pembuka Cerita" },
    "Question Hook": { en: "The Big Question", id: "Pertanyaan Utama" },
    "Contrarian Hook": { en: "The Surprising Truth", id: "Kebenaran Mengejutkan" },
    "Secret Hook": { en: "The Unveiled Secret", id: "Rahasia Terungkap" },
    "Statistic Hook": { en: "The Shocking Statistic", id: "Statistik Mengejutkan" },
    "Objection Hook": { en: "Addressing Doubts", id: "Mengatasi Keraguan" },
    "Testimonial Hook": { en: "Proof from Others", id: "Bukti dari Orang Lain" },
    "How-To Hook": { en: "The First Step", id: "Langkah Pertama" }
};

export const uiTextConfig = {
    en: {
        ...hookTitleMappings,
        supportAdmin: "Support Admin",
        generator: "Generator",
        settings: "Settings",
        contentType: "Content Type",
        singlePost: "Single Post",
        carousel: "Carousel",
        productName: "Product Name",
        productNamePlaceholder: "e.g., AnoTech Ergonomic Chair",
        productDesc: "Product Description",
        productDescPlaceholder: "Explain the main features, advantages, and benefits...",
        languageStyle: "Language Style",
        targetAudience: "Target Audience",
        hookType: "Hook Type",
        hookStyleTitle: "Hook Style",
        numberOfScripts: "Number of Scripts",
        numberOfSlides: "Number of Slides",
        generateButton: "Generate Script with AI",
        generatingButton: "Generating...",
        saveAsPdf: "Save as PDF",
        outputPlaceholderTitle: "Your generated scripts will appear here.",
        outputPlaceholderSubtitle: "Fill out the form and click \"Generate Script with AI\" to start.",
        errorTitle: "Failed to Generate Scripts",
        errorSetApiKey: "Please set your API Key in the Settings page before generating.",
        tryAgain: "Try Again",
        editAndRegenerate: "Edit & Regenerate",
        storytellingBody: "Storytelling Body",
        callToAction: "Call To Action",
        settingsTitle: "Settings",
        apiSettings: "API Settings",
        apiSettingsDesc: "Manage your API key to access external AI tools.",
        apiMode: "API Mode",
        apiModeDefault: "Use AnoTechHub's Default Key",
        apiModeCustom: "Use Your Own API Key",
        yourApiKey: "Your Gemini API Key",
        apiKeyPlaceholder: "Enter your API key here...",
        saveApiSettings: "Save API Settings",
        apiKeySaveWarning: "Don't forget to save your new settings.",
        systemPrompt: "System Instruction Prompt",
        systemPromptDesc: "This prompt will guide the AI's personality and response style.",
        promptInstruction: "Prompt Instruction",
        saveChanges: "Save Changes",
        activePrompt: "Active Prompt Instruction",
        downloadStarted: "Download Started!",
        thankYouMessage: "Thank you for using the Anotechhub generator. Have a great day!",
        close: "Close",
        apiKeyApplied: "API Key Applied!",
        apiKeyAppliedMessage: "Your API key has been saved and will be used for future requests.",
        settingsSaved: "Settings Saved!",
        settingsSavedMessage: "Your new settings have been successfully applied.",
        gotIt: "Got it",
        editAndRegenerateModalTitle: "Edit & Regenerate",
        originalVersion: "Original Version",
        newVersion: "New Version",
        aiIsWorking: "AI is working...",
        newVersionPlaceholder: "New version will appear here.",
        revisionInstructions: "Revision Instructions (Free Form)",
        revisionPlaceholder: "e.g., Make it funnier, target teenagers, use more formal language...",
        regenerate: "Regenerate",
        useThisVersion: "Use This Version",
        apiKeyWarning: "Note: This is a shared key and may have limitations. For the best experience, we highly recommend using your own API key.",
        initialSetupTitle: "Welcome to AnoTechHub!",
        initialSetupSubtitle: "To get started, please set up your API key in the settings. You can use our default key or add your own.",
        goToSettings: "Go to Settings",
        backToGenerator: "Back to Generator",
        mobilePreview: "Mobile Preview",
    },
    id: {
        ...hookTitleMappings,
        supportAdmin: "Dukungan Admin",
        generator: "Generator",
        settings: "Pengaturan",
        contentType: "Jenis Konten",
        singlePost: "Single Post",
        carousel: "Carousel",
        productName: "Nama Produk",
        productNamePlaceholder: "Contoh: Kursi Ergonomis AnoTech",
        productDesc: "Deskripsi Produk",
        productDescPlaceholder: "Jelaskan fitur utama, keunggulan, dan manfaat produk Anda...",
        languageStyle: "Gaya Bahasa",
        targetAudience: "Target Audience",
        hookType: "Jenis Hook",
        hookStyleTitle: "Gaya Hook",
        numberOfScripts: "Jumlah Script",
        numberOfSlides: "Jumlah Slide",
        generateButton: "Buat Script dengan AI",
        generatingButton: "Membuat...",
        saveAsPdf: "Simpan sebagai PDF",
        outputPlaceholderTitle: "Skrip yang Anda buat akan muncul di sini.",
        outputPlaceholderSubtitle: "Isi formulir dan klik \"Buat Script dengan AI\" untuk memulai.",
        errorTitle: "Gagal Membuat Skrip",
        errorSetApiKey: "Harap atur Kunci API Anda di halaman Pengaturan sebelum membuat skrip.",
        tryAgain: "Coba Lagi",
        editAndRegenerate: "Edit & Regenerasi",
        storytellingBody: "Isi Cerita",
        callToAction: "Call To Action",
        settingsTitle: "Pengaturan",
        apiSettings: "Pengaturan API",
        apiSettingsDesc: "Kelola kunci API Anda untuk mengakses tool AI eksternal.",
        apiMode: "Mode API",
        apiModeDefault: "Gunakan Kunci Default AnoTechHub",
        apiModeCustom: "Gunakan Kunci API Sendiri",
        yourApiKey: "Kunci API Gemini Anda",
        apiKeyPlaceholder: "Masukkan kunci API Anda di sini...",
        saveApiSettings: "Simpan Pengaturan API",
        apiKeySaveWarning: "Jangan lupa simpan pengaturan baru Anda.",
        systemPrompt: "Prompt Instruksi Sistem",
        systemPromptDesc: "Prompt ini akan mengarahkan kepribadian dan gaya respons AI.",
        promptInstruction: "Instruksi Prompt",
        saveChanges: "Simpan Perubahan",
        activePrompt: "Instruksi Prompt Aktif",
        downloadStarted: "Unduhan Dimulai!",
        thankYouMessage: "Terima kasih sudah menggunakan generator Anotechhub. Semoga harimu menyenangkan!",
        close: "Tutup",
        apiKeyApplied: "Kunci API Diterapkan!",
        apiKeyAppliedMessage: "Kunci API Anda telah disimpan dan akan digunakan untuk permintaan berikutnya.",
        settingsSaved: "Pengaturan Disimpan!",
        settingsSavedMessage: "Pengaturan baru Anda telah berhasil diterapkan.",
        gotIt: "Mengerti",
        editAndRegenerateModalTitle: "Edit & Regenerasi",
        originalVersion: "Versi Asli",
        newVersion: "Versi Baru",
        aiIsWorking: "AI sedang bekerja...",
        newVersionPlaceholder: "Versi baru akan muncul di sini.",
        revisionInstructions: "Instruksi Revisi (Bebas)",
        revisionPlaceholder: "Contoh: Buat lebih lucu, targetkan untuk remaja, gunakan bahasa yang lebih formal...",
        regenerate: "Regenerasi",
        useThisVersion: "Gunakan Versi Ini",
        apiKeyWarning: "Catatan: Kunci ini digunakan bersama dan mungkin memiliki batasan. Untuk pengalaman terbaik, kami sangat menyarankan menggunakan kunci API Anda sendiri.",
        initialSetupTitle: "Selamat Datang di AnoTechHub!",
        initialSetupSubtitle: "Untuk memulai, harap atur kunci API Anda di pengaturan. Anda dapat menggunakan kunci default kami atau menambahkan kunci Anda sendiri.",
        goToSettings: "Buka Pengaturan",
        backToGenerator: "Kembali ke Generator",
        mobilePreview: "Pratinjau Seluler",
    }
};

// Prompt sistem tidak perlu diubah
export const systemPrompts = {
    en: `You are 'Anoboy', an expert AI copywriter specializing in high-conversion affiliate marketing scripts for social media. Your goal is to create content that feels authentic, engaging, and drives action.

**Your Task:** Generate a script or carousel content based on the user's inputs.

**Key Instructions:**
1. **Hook First:** Always start with a strong hook based on the 'Hook Type' provided by the user. This is the most critical part.
2. **Target Audience:** Deeply consider the 'Target Audience'. Use language, references, and pain points that resonate specifically with them. (e.g., 'Students' care about budget and study-life balance; 'Parents' care about safety, time-saving, and family well-being).
3. **Structure (for Single Post):**
    * **Title:** A catchy, clickable title.
    * **Problem/Hook:** Expand on the chosen 'Hook Type'. Clearly state the problem or grab attention.
    * **Story/Solution:** Weave in the product as a natural solution. Use storytelling if the style is 'Storytelling'.
    * **Call to Action (CTA):** A clear, compelling CTA. e.g., "Click the link in my bio!", "Comment 'INFO' below!", "Limited time offer!".
4. **Structure (for Carousel):** Create distinct points for each slide. The title of each slide should be short and punchy.
5. **Language & Style:** Adapt your tone based on the requested 'Language Style' (Storytelling, Persuasive, Informative).
6. **Language of Response:** Respond ONLY in the requested Language (English or Indonesian).

Now, analyze the user's request and generate the content.`,
    id: `Anda adalah 'Anoboy', seorang copywriter AI ahli yang berspesialisasi dalam skrip pemasaran afiliasi media sosial dengan konversi tinggi. Tujuan Anda adalah membuat konten yang terasa otentik, menarik, dan mendorong tindakan.

**Tugas Anda:** Buat skrip atau konten carousel berdasarkan input pengguna.

**Instruksi Utama:**
1. **Hook Terlebih Dahulu:** Selalu mulai dengan hook yang kuat berdasarkan 'Jenis Hook' yang diberikan pengguna. Ini adalah bagian paling penting.
2. **Target Audiens:** Pertimbangkan 'Target Audiens' secara mendalam. Gunakan bahasa, referensi, dan masalah (pain points) yang beresonansi secara spesifik dengan mereka. (Contoh: 'Pelajar & Mahasiswa' peduli pada anggaran dan keseimbangan studi; 'Orang Tua' peduli pada keamanan, penghematan waktu, dan kesejahteraan keluarga).
3. **Struktur (untuk Single Post):**
    * **Judul:** Judul yang menarik dan mudah diklik.
    * **Masalah/Hook:** Kembangkan 'Jenis Hook' yang dipilih. Nyatakan masalah dengan jelas atau tarik perhatian.
    * **Cerita/Solusi:** Kaitkan produk sebagai solusi alami. Gunakan penceritaan jika gayanya 'Storytelling'.
    * **Call to Action (CTA):** CTA yang jelas dan meyakinkan. Contoh: "Klik link di bio!", "Komen 'INFO' di bawah!", "Penawaran terbatas!".
4. **Struktur (untuk Carousel):** Buat poin-poin yang berbeda untuk setiap slide. Judul setiap slide harus singkat dan kuat.
5. **Bahasa & Gaya:** Sesuaikan nada Anda berdasarkan 'Gaya Bahasa' yang diminta (Storytelling, Persuasif, Informatif).
6. **Bahasa Respons:** Balas HANYA dalam bahasa yang diminta (Inggris atau Indonesia).

Sekarang, analisis permintaan pengguna dan hasilkan kontennya.`
};
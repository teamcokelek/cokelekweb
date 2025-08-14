const filmResponses = {
    "aksiyon": ["The Dark Knight", "Mad Max: Fury Road", "John Wick"],
    "komedi": ["The Grand Budapest Hotel", "Superbad", "Borat"],
    "dram": ["The Shawshank Redemption", "The Godfather", "Schindler's List"],
    "bilim kurgu": ["Inception", "Interstellar", "Blade Runner 2049"],
    "korku": ["The Shining", "Hereditary", "Get Out"],
    "romantik": ["Before Sunrise", "The Notebook", "La La Land"]
};

export const generateBotResponse = (userInput) => {
    userInput = userInput.toLowerCase();

    if (userInput.includes("merhaba") || userInput.includes("selam") || userInput.includes("hey")) {
        return "Merhaba! Size film konusunda nasıl yardımcı olabilirim?";
    }

    if (userInput.includes("adın ne") || userInput.includes("kimsin")) {
        return "Ben Cokelek Film Asistanı! Size film önerileri yapabilirim veya filmler hakkında bilgi verebilirim.";
    }

    for (const genre in filmResponses) {
        if (userInput.includes(genre)) {
            const films = filmResponses[genre];
            return `${genre.charAt(0).toUpperCase() + genre.slice(1)} türünde şu filmleri önerebilirim: ${films.join(", ")}. Hangisi hakkında daha fazla bilgi istersiniz?`;
        }
    }

    const allFilms = Object.values(filmResponses).flat();
    for (const film of allFilms) {
        if (userInput.includes(film.toLowerCase())) {
            return `${film}, IMDB'nin en iyi filmlerinden biridir. Detaylı bilgi için filmin detay sayfasını ziyaret edebilirsiniz!`;
        }
    }
    if (userInput.includes("en iyi") || userInput.includes("top") || userInput.includes("popüler")) {
        return "IMDB'nin en iyi filmlerinden bazıları: The Shawshank Redemption, The Godfather, The Dark Knight. Bu filmler hakkında ne öğrenmek istersiniz?";
    }

    if (userInput.includes("bul") || userInput.includes("ara") || userInput.includes("film var mı")) {
        return "Arama yapmak için üstteki arama kutusunu kullanabilirsiniz. Size yardımcı olması için daha spesifik bir film türü söyleyebilirsiniz.";
    }

    if (userInput.includes("teşekkür") || userInput.includes("sağol")) {
        return "Rica ederim! Başka bir sorunuz olursa yardımcı olmaktan memnuniyet duyarım.";
    }

    if (userInput.includes("yardım") || userInput.includes("nasıl")) {
        return "Size film önerileri yapabilirim, belirli bir film türü hakkında konuşabiliriz veya IMDB'nin en iyi filmleri hakkında bilgi verebilirim. Ne öğrenmek istersiniz?";
    }

    return "Bu konu hakkında daha fazla bilgim yok. Belki belirli bir film türü (aksiyon, komedi, dram vb.) hakkında konuşmak istersiniz?";
};
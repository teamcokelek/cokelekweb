// API bağlantısı yoksa yedek cevaplar üretmek için kullanılacak
export const generateBotResponse = (userInput, movies) => {
    userInput = userInput.toLowerCase();

    // Yanıt şablonu
    let response = {
        text: "", // Metin yanıtı
        films: [] // Önerilecek filmler
    };

    // Film verisi yoksa
    if (!movies || movies.length === 0) {
        response.text = "Film verileri henüz yüklenmedi. Lütfen daha sonra tekrar deneyin.";
        return response;
    }

    // Selamlaşma
    if (userInput.includes("merhaba") || userInput.includes("selam") || userInput.includes("hey")) {
        response.text = "Merhaba! API ile bağlantı kurulamadığı için yerel modda çalışıyorum. Size nasıl yardımcı olabilirim?";
        return response;
    }

    // Tüm film türlerini çıkar
    const allGenres = [...new Set(movies.flatMap(movie => movie.genres))];

    // Türlere göre filmler
    const filmsByGenre = {};
    allGenres.forEach(genre => {
        filmsByGenre[genre.toLowerCase()] = movies.filter(movie =>
            movie.genres.some(g => g.toLowerCase() === genre.toLowerCase())
        );
    });

    // En popüler filmler
    const topRatedFilms = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 3);

    // Film önerme istekleri
    if (userInput.includes("öner") || userInput.includes("tavsiye") || userInput.includes("öneri")) {
        response.text = "API bağlantısı olmadan yapabildiğim en iyi öneriler şunlar:";
        response.films = topRatedFilms;
        return response;
    }

    // En iyi filmler
    if (userInput.includes("en iyi") || userInput.includes("top") || userInput.includes("popüler")) {
        response.text = "API bağlantısı olmadan IMDB'nin en iyi filmlerinden bazıları:";
        response.films = topRatedFilms;
        return response;
    }

    // Film adı arama
    for (const film of movies) {
        if (userInput.includes(film.title.toLowerCase())) {
            response.text = `${film.title} hakkında bilgi için API bağlantım olsaydı daha fazla detay verebilirdim. İşte elimdeki bilgiler:`;
            response.films = [film];
            return response;
        }
    }

    // Genel yanıt
    response.text = "API bağlantısı olmadığı için tam bir yanıt veremiyorum. Ancak size popüler birkaç film önerebilirim:";
    response.films = topRatedFilms;
    return response;
};
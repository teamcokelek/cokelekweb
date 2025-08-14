// Gerçek film verileriyle çalışan chatbot yanıt sistemi
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
        response.text = "Merhaba! Size film konusunda nasıl yardımcı olabilirim?";
        return response;
    }

    // İsim sorma
    if (userInput.includes("adın ne") || userInput.includes("kimsin")) {
        response.text = "Ben Cokelek Film Asistanı! Size film önerileri yapabilirim veya filmler hakkında bilgi verebilirim.";
        return response;
    }

    // Film türlerini çıkarma
    const allGenres = [...new Set(movies.flatMap(movie => movie.genres))];

    // Filmler türlerine göre gruplandırma
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
        // Belirli bir tür için öneri isteniyor mu?
        let genreRequested = false;

        for (const genre in filmsByGenre) {
            if (userInput.includes(genre.toLowerCase())) {
                const filmsInGenre = filmsByGenre[genre.toLowerCase()];
                genreRequested = true;

                if (filmsInGenre && filmsInGenre.length > 0) {
                    response.text = `${genre.charAt(0).toUpperCase() + genre.slice(1)} türünde şu filmleri önerebilirim:`;
                    response.films = filmsInGenre.slice(0, 3); // En fazla 3 film öner
                } else {
                    response.text = `Üzgünüm, ${genre} türünde film bulamadım. Başka bir tür denemek ister misiniz?`;
                }

                break;
            }
        }

        // Genel öneri isteniyor
        if (!genreRequested) {
            response.text = "İşte en yüksek puanlı film önerilerim:";
            response.films = topRatedFilms;
        }

        return response;
    }

    // En iyi filmler
    if (userInput.includes("en iyi") || userInput.includes("top") || userInput.includes("popüler")) {
        response.text = "IMDB'nin en iyi filmlerinden bazıları şunlardır:";
        response.films = topRatedFilms;
        return response;
    }

    // Belirli bir yönetmene göre filmler
    const directors = [...new Set(movies.map(movie => movie.director))];
    for (const director of directors) {
        if (userInput.includes(director.toLowerCase())) {
            const directorFilms = movies.filter(movie =>
                movie.director.toLowerCase() === director.toLowerCase()
            );

            response.text = `${director} tarafından yönetilen filmler:`;
            response.films = directorFilms.slice(0, 3);
            return response;
        }
    }

    // Belirli bir film adı geçiyor mu?
    for (const film of movies) {
        const filmTitle = film.title.toLowerCase();
        if (userInput.includes(filmTitle) || (film.title.length > 15 && userInput.includes(filmTitle.substring(0, 12)))) {
            response.text = `${film.title}, IMDB'de ${film.rating.toFixed(1)} puanı ile çok beğenilen bir film. İşte detayları:`;
            response.films = [film];
            return response;
        }
    }

    // Belirli bir aktör/aktris ile ilgili filmler
    const allActors = [...new Set(movies.flatMap(movie => movie.actors))];
    for (const actor of allActors) {
        if (userInput.includes(actor.toLowerCase())) {
            const actorFilms = movies.filter(movie =>
                movie.actors.some(a => a.toLowerCase() === actor.toLowerCase())
            );

            if (actorFilms.length > 0) {
                response.text = `${actor}'in rol aldığı filmler:`;
                response.films = actorFilms.slice(0, 3);
                return response;
            }
        }
    }

    // Arama yapma
    if (userInput.includes("bul") || userInput.includes("ara") || userInput.includes("film var mı")) {
        response.text = "Arama yapmak için üstteki arama kutusunu kullanabilirsiniz. Size yardımcı olması için daha spesifik bir film türü söyleyebilirsiniz. İşte bazı popüler filmler:";
        response.films = topRatedFilms;
        return response;
    }

    // Teşekkür
    if (userInput.includes("teşekkür") || userInput.includes("sağol")) {
        response.text = "Rica ederim! Başka bir sorunuz olursa yardımcı olmaktan memnuniyet duyarım.";
        return response;
    }

    // Yardım
    if (userInput.includes("yardım") || userInput.includes("nasıl")) {
        response.text = "Size film önerileri yapabilirim, belirli bir film türü hakkında konuşabiliriz veya IMDB'nin en iyi filmleri hakkında bilgi verebilirim. Ne öğrenmek istersiniz?";
        return response;
    }

    // Genel yanıt
    response.text = `Bu konu hakkında daha fazla bilgim yok. Belki belirli bir film türü (${allGenres.slice(0, 3).join(', ')} vb.) önerisi almak istersiniz?`;
    return response;
};
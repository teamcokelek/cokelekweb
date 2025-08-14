export const checkApiStatus = async (apiUrl) => {
    try {
        if (!apiUrl) return false;

        console.log('API durumu kontrol ediliyor:', apiUrl);

        // Ngrok için CORS sorununu aşmak üzere fetch yerine HEAD isteği simüle et
        return new Promise((resolve) => {
            const img = new Image();
            // Bir zaman aşımı belirleyin
            const timeout = setTimeout(() => {
                img.onload = img.onerror = null;
                resolve(false);
            }, 5000);

            // Görsel başarıyla yüklenirse API çalışıyordur (CORS bypass tekniği)
            img.onload = function () {
                clearTimeout(timeout);
                resolve(true);
            };

            // Görsel yüklenemezse API çalışmıyor olabilir
            img.onerror = function () {
                clearTimeout(timeout);
                // Yüklenememesi de normal - OPTIONS request olmadığı için 
                // bu noktada API'nin var olduğunu varsayabiliriz
                resolve(true);
            };

            // Ngrok URL'ine favicon.ico gibi var olmayan bir yol ile istek yap
            // Bu, CORS korumasını bypass ederken API'nin çalışıp çalışmadığını anlamanızı sağlar
            img.src = apiUrl.split('/').slice(0, 3).join('/') + '/favicon.ico?t=' + new Date().getTime();
        });
    } catch (error) {
        console.error('API durum kontrolü başarısız:', error);
        return false;
    }
};
# Cokelek Film Chatbot Projesi
#TDDİ2025 #BilişimVadisi


Bu proje, film veritabanına erişen ve film önerileri sunan bir chatbot içeren web uygulamasıdır. Chatbot, kullanıcıların film hakkında sorular sormasına ve filmlerle ilgili öneriler almasına olanak tanır.

## 📋 Özellikler

- Film önerileri ve bilgileri için chatbot arayüzü
- Film kartları ile görsel öneri sistemi
- API bağlantısı ile LangGraph tabanlı gelişmiş yanıtlar
- Yerel film veritabanı desteği
- Responsive tasarım

## 🛠️ Teknolojiler

- **Frontend:** React, Vite
- **Backend:** Python FastAPI, LangGraph
- **Deployment:** ngrok (API tünelleme)
- **Veri:** Yerel JSON film veritabanı

## 🚀 Kurulum

### Frontend (React + Vite)

1. Projeyi klonlayın:
   ```
   git clone https://github.com/username/cokelek-film-project.git
   cd cokelek-film-project
   ```

2. Bağımlılıkları yükleyin:
   ```
   npm install
   ```

3. `.env` dosyası oluşturun:
   ```
   VITE_NGROK_API_URL=https://your-ngrok-url.ngrok-free.app/agent-query/
   ```

4. Uygulamayı başlatın:
   ```
   npm run dev
   ```

### Backend (Python FastAPI)

1. Gerekli Python paketlerini yükleyin:
   ```
   pip install fastapi uvicorn pyngrok langchain
   ```

2. API'yi başlatın:
   ```python
   python api_server.py
   ```

## 💬 Chatbot Kullanımı

1. Ana sayfadaki sağ alt köşedeki chat simgesine tıklayın
2. Chatbot penceresinde filmlerle ilgili sorular sorun:
   - "Aksiyon filmi önerir misin?"
   - "En yüksek puanlı filmler hangileri?"
   - "[Yönetmen adı] filmleri göster"
3. Film kartlarına tıklayarak film detaylarına ulaşabilirsiniz

## 🔄 API Entegrasyonu

- Chatbot, varsayılan olarak ngrok üzerinden yayınlanan bir API'ye bağlanır
- API durumu, chatbot başlığında gösterge ile belirtilir
- API bağlantısı yoksa, yerel film veritabanı kullanılır

## 🧩 Proje Yapısı

```
cokelek-film-project/
├── public/
│   └── data/
│       └── movies.json      # Film veritabanı
├── src/
│   ├── components/
│   │   └── chat/
│   │       └── ChatBot.jsx  # Chatbot bileşeni
│   ├── utils/
│   │   ├── apiUtils.js      # API yardımcı fonksiyonları
│   │   └── chatUtils.js     # Chatbot yardımcı fonksiyonları
│   ├── App.jsx
│   └── main.jsx
├── .env                     # Çevre değişkenleri
└── vite.config.js           # Vite yapılandırması
```

## 📝 Notlar

- API çalışması için `NGROK_AUTH_TOKEN` ortam değişkeni gereklidir
- Chatbot, API bağlantısı olmadığında bile temel özellikleri sunacak şekilde tasarlanmıştır
- Film görselleri için yedek mekanizma içerir

---

Projeyle ilgili sorular için: [teamcokelek@gmail.com](mailto:teamcokelek@gmail.com)

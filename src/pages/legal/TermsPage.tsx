import { LegalPageLayout, LegalSection } from '../../components/legal/LegalPageLayout';

const SECTIONS: LegalSection[] = [
  {
    id: 'taraflar-ve-kabul',
    title: 'Taraflar ve Sözleşmenin Kabulü',
    paragraphs: [
      'İşbu Kullanım Şartları ("Sözleşme"), DavetKart dijital davetiye platformunu ("Platform") işleten DavetKart ("Şirket") ile Platform\'a üye olan veya Platform\'u ziyaret eden kullanıcı ("Kullanıcı") arasında akdedilmiştir.',
      'Platform\'a erişim sağlayarak, hesap oluşturarak veya hizmetlerimizi kullanarak bu Sözleşme\'nin tamamını okuduğunuzu, anladığınızı ve hükümleriyle bağlı olmayı kabul ettiğinizi beyan etmiş olursunuz. Şartları kabul etmiyorsanız lütfen Platform\'u kullanmayınız.'
    ]
  },
  {
    id: 'hizmet-tanimi',
    title: 'Hizmetin Tanımı',
    paragraphs: [
      'DavetKart; düğün, nişan, kına, doğum günü ve kurumsal etkinlikler için dijital davetiye tasarlama, kişiselleştirme, yayınlama ve davetli katılım (LCV/RSVP) takibi hizmetleri sunan bir yazılım hizmeti (SaaS) platformudur.'
    ],
    bullets: [
      'Hazır şablonlar üzerinden veya yapay zeka destekli tasarım aracıyla davetiye oluşturma,',
      'Davetiyeye özel bağlantı (link) üretme ve dijital kanallar üzerinden paylaşma,',
      'Davetlilerin katılım durumlarını gerçek zamanlı takip etme,',
      'Fotoğraf galerisi, etkinlik akışı, konum ve müzik gibi zenginleştirilmiş içerik alanları.'
    ]
  },
  {
    id: 'hesap-olusturma',
    title: 'Hesap Oluşturma ve Güvenlik',
    paragraphs: [
      'Platform\'un bazı özelliklerinden yararlanmak için hesap oluşturmanız gerekir. Kayıt sırasında verdiğiniz bilgilerin doğru, güncel ve eksiksiz olmasından siz sorumlusunuz.',
      'Hesap kimlik bilgilerinizin (e-posta, şifre) gizliliğini korumak sizin sorumluluğunuzdadır. Hesabınız üzerinden gerçekleştirilen tüm işlemler size ait kabul edilir. Yetkisiz kullanım şüphesi durumunda derhal bizimle iletişime geçmelisiniz.',
      'Platform\'u kullanabilmek için 18 yaşını doldurmuş olmanız veya yasal temsilcinizin onayına sahip olmanız gerekmektedir.'
    ]
  },
  {
    id: 'kullanim-kurallari',
    title: 'Kullanım Kuralları ve Yasaklı Davranışlar',
    paragraphs: [
      'Kullanıcı, Platform\'u yalnızca hukuka uygun amaçlarla kullanacağını kabul eder. Aşağıdaki davranışlar kesinlikle yasaktır:'
    ],
    bullets: [
      'Üçüncü kişilerin fikri mülkiyet, kişilik veya gizlilik haklarını ihlal eden içerik yüklemek,',
      'Yanıltıcı, karalayıcı, müstehcen, nefret söylemi içeren veya hukuka aykırı içerik paylaşmak,',
      'Platform\'un altyapısına zarar verecek şekilde otomatik araçlar (bot, scraper vb.) kullanmak,',
      'Başka bir kullanıcının hesabına yetkisiz erişim sağlamaya çalışmak,',
      'Platform\'u istenmeyen toplu ileti (spam) gönderimi için kullanmak,',
      'Hizmeti tersine mühendislik yoluyla kopyalamaya veya türev ürün oluşturmaya çalışmak.'
    ],
    note: 'Bu kurallara aykırılık tespit edilmesi hâlinde Şirket, ilgili içeriği kaldırma, hesabı askıya alma veya sözleşmeyi tek taraflı feshetme hakkını saklı tutar.'
  },
  {
    id: 'icerik-ve-fikri-mulkiyet',
    title: 'İçerik ve Fikri Mülkiyet Hakları',
    paragraphs: [
      'Platform\'daki tüm şablonlar, tasarımlar, yazılım, logo, marka ve diğer materyallerin fikri mülkiyet hakları Şirket\'e veya lisans verenlerine aittir. Kullanıcıya yalnızca kişisel etkinliği kapsamında, münhasır olmayan ve devredilemez bir kullanım lisansı tanınır.',
      'Kullanıcı tarafından yüklenen fotoğraf, metin ve benzeri içeriklerin ("Kullanıcı İçeriği") mülkiyeti kullanıcıda kalır. Kullanıcı, bu içeriklerin davetiyenin görüntülenmesi ve hizmetin sunulması amacıyla barındırılması ve işlenmesi için Şirket\'e sınırlı bir lisans vermiş sayılır.',
      'Kullanıcı, yüklediği içerikler üzerinde gerekli haklara sahip olduğunu ve içeriklerin üçüncü kişi haklarını ihlal etmediğini taahhüt eder.'
    ]
  },
  {
    id: 'ucretlendirme',
    title: 'Ücretlendirme ve Ödeme',
    paragraphs: [
      'Platform\'daki temel tasarım ve önizleme özellikleri ücretsizdir. Davetiyenin yayınlanması ve premium özellikler, Fiyatlandırma sayfasında ilan edilen ücretlere tabidir.',
      'Tüm ücretler tek seferlik olup abonelik modeli uygulanmaz; ödemeler güvenli ödeme altyapısı üzerinden tahsil edilir. Şirket, fiyatlarda değişiklik yapma hakkını saklı tutar; değişiklikler yalnızca ileriye dönük satın alımlar için geçerli olur.'
    ]
  },
  {
    id: 'cayma-ve-iade',
    title: 'Cayma Hakkı ve İade Koşulları',
    paragraphs: [
      'Mesafeli Sözleşmeler Yönetmeliği uyarınca, elektronik ortamda anında ifa edilen hizmetler ile tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde cayma hakkı kullanılamaz. Davetiyeniz yayınlandığı (yayın bağlantısı oluşturulduğu) anda hizmet ifa edilmiş sayılır.',
      'Davetiye henüz yayınlanmamışsa, satın alma tarihinden itibaren 14 gün içinde gerekçesiz iade talep edebilirsiniz. İade talepleri İletişim sayfası üzerinden iletilir ve onaylanan iadeler 14 iş günü içinde ödeme yönteminize aktarılır.'
    ]
  },
  {
    id: 'hizmet-surekliligi',
    title: 'Hizmet Sürekliliği ve Değişiklikler',
    paragraphs: [
      'Şirket, hizmeti kesintisiz sunmak için makul çabayı gösterir; ancak bakım, güncelleme veya mücbir sebeplerden kaynaklanan geçici kesintiler yaşanabilir. Planlı bakımlar mümkün olduğunca önceden duyurulur.',
      'Şirket, Platform\'un özelliklerini geliştirme, değiştirme veya sonlandırma hakkını saklı tutar. Yayındaki davetiyeleri etkileyecek önemli değişiklikler, kullanıcıya makul bir süre önce e-posta yoluyla bildirilir.'
    ]
  },
  {
    id: 'sorumluluk-sinirlamasi',
    title: 'Sorumluluğun Sınırlandırılması',
    paragraphs: [
      'Platform "olduğu gibi" sunulmaktadır. Şirket; kullanıcı içeriklerinden, davetlilerin verdiği yanıtların doğruluğundan, üçüncü taraf hizmetlerdeki (harita, ödeme altyapısı vb.) kesintilerden ve kullanıcının Platform\'u bu Sözleşme\'ye aykırı kullanmasından doğan zararlardan sorumlu değildir.',
      'Şirket\'in her hâlükârda toplam sorumluluğu, zarara konu olayın gerçekleştiği tarihten önceki 12 ay içinde kullanıcının Platform\'a ödediği toplam tutarla sınırlıdır. Zorunlu tüketici mevzuatından doğan haklar saklıdır.'
    ]
  },
  {
    id: 'uygulanacak-hukuk',
    title: 'Uygulanacak Hukuk ve Uyuşmazlık Çözümü',
    paragraphs: [
      'İşbu Sözleşme Türkiye Cumhuriyeti kanunlarına tabidir. Sözleşmeden doğan uyuşmazlıklarda İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir.',
      'Tüketici sıfatını haiz kullanıcılar, mevzuatta belirlenen parasal sınırlar dâhilinde yerleşim yerlerindeki Tüketici Hakem Heyetleri\'ne ve Tüketici Mahkemeleri\'ne başvurabilir.'
    ]
  },
  {
    id: 'yururluk',
    title: 'Yürürlük ve Değişiklikler',
    paragraphs: [
      'Bu Sözleşme, Platform\'da yayınlandığı tarihte yürürlüğe girer. Şirket, Sözleşme\'yi güncelleyebilir; güncel sürüm her zaman bu sayfada yayınlanır ve önemli değişiklikler kayıtlı kullanıcılara e-posta ile duyurulur.',
      'Değişikliklerin yayınlanmasından sonra Platform\'u kullanmaya devam etmeniz, güncel şartları kabul ettiğiniz anlamına gelir.'
    ]
  }
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      badge="Yasal"
      title="Kullanım"
      accent="Şartları"
      intro="DavetKart platformunu kullanırken tabi olduğunuz koşullar, hak ve yükümlülükleriniz aşağıda açıklanmıştır. Lütfen hizmetlerimizi kullanmadan önce dikkatlice okuyunuz."
      lastUpdated="1 Temmuz 2026"
      sections={SECTIONS}
      related={[
        {
          to: '/privacy',
          label: 'Gizlilik Sözleşmesi',
          description: 'Kişisel verilerinizi hangi amaçlarla ve nasıl işlediğimizi öğrenin.'
        },
        {
          to: '/cookies',
          label: 'Çerez Politikası',
          description: 'Sitemizde kullanılan çerezler ve tercihlerinizi nasıl yöneteceğiniz.'
        },
        {
          to: '/contact',
          label: 'İletişim',
          description: 'Sorularınız için destek ekibimize ulaşın.'
        }
      ]}
    />
  );
}

import type { Language } from '@/context/LanguageContext';
import type { ProductDescription } from '@/types/Product';

// Ukrainian translations of product descriptions from the database.
// Key = original English text, value = translation.
// If a text is not found here, the original English text is shown.
const DESCRIPTIONS_UK: Record<string, string> = {
  'And then there was Pro': 'А потім з’явився Pro',
  'A transformative triple-camera system that adds tons of capability without complexity.':
    'Революційна система з трьох камер, яка додає безліч можливостей без жодних складнощів.',
  'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.':
    'Небачений стрибок у тривалості роботи від батареї. І неймовірний чип, який робить ставку на машинне навчання та розширює межі можливого для смартфона. Знайомтеся з першим iPhone, достатньо потужним, щоб називатися Pro.',
  'Camera': 'Камера',
  'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.':
    'Знайомтеся з першою системою з трьох камер, що поєднує передові технології з легендарною простотою iPhone. Знімайте в чотири рази більше простору в кадрі. Отримуйте чудові знімки навіть за дуже слабкого освітлення. Записуйте відео найвищої якості серед смартфонів — і редагуйте його тими ж інструментами, що й фото. Ви ще ніколи не знімали нічим подібним.',
  'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.':
    'Знімайте. Перевертайте. Наближайте. Обрізайте. Монтуйте. Освітлюйте. Налаштовуйте. Закохуйтеся.',
  'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.':
    'iPhone 11 Pro дає змогу знімати відео, які виглядають неймовірно природно, з більшою деталізацією та плавнішим рухом. Завдяки величезній обчислювальній потужності він записує відео 4K з розширеним динамічним діапазоном і кінематографічною стабілізацією — і все це з частотою 60 кадрів/с. Ви також отримуєте більше творчого контролю: у чотири рази більше простору в кадрі та нові потужні інструменти редагування.',
  'Wonderfull': 'Чудовий',
  'And then was a Pro': 'А потім з’явився Pro',
  'Blast past fast.': 'Швидше за швидкість.',
  '5G speed. A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display. Ceramic Shield with four times better drop performance. And Night mode on every camera. iPhone 12 has it all — in two perfect sizes.':
    'Швидкість 5G. A14 Bionic — найшвидший чип у смартфоні. OLED-дисплей від краю до краю. Ceramic Shield у чотири рази стійкіший до падінь. І нічний режим на кожній камері. У iPhone 12 є все — у двох ідеальних розмірах.',
  'A14 Bionic chip. The only thing even close was our last chip.':
    'Чип A14 Bionic. Наблизитися до нього зміг лише наш попередній чип.',
  'A14 Bionic is the first 5-nanometer chip in the industry, with advanced components literally atoms wide. Forty percent more transistors rev up speeds while increasing efficiency for great battery life. And a new ISP powers Dolby Vision recording — something no pro movie camera, let alone any other phone, can do.':
    'A14 Bionic — перший у галузі 5-нанометровий чип із передовими компонентами завширшки буквально в кілька атомів. На сорок відсотків більше транзисторів підвищують швидкість і водночас ефективність, що забезпечує чудову автономність. А новий процесор обробки зображень підтримує запис у Dolby Vision — на таке не здатна жодна професійна кінокамера, не кажучи вже про інші телефони.',
  'Night mode comes to all your cameras.':
    'Нічний режим тепер на всіх камерах.',
  'Low light is now a highlight. From dimly lit restaurants to moonlit beaches, the new Night mode delivers natural low-light shots — automatically.':
    'Слабке освітлення тепер стає перевагою. Від напівтемних ресторанів до пляжів під місячним світлом — новий нічний режим автоматично створює природні знімки за слабкого освітлення.',
  'Your new superpower.': 'Ваша нова суперсила.',
  'A15 Bionic, the fastest chip ever in a smartphone. Super Retina XDR display with ProMotion. Durable Ceramic Shield with 4x better drop performance. New Night mode on all cameras. It’s the ultimate iPhone, powered by the ultimate chip.':
    'A15 Bionic — найшвидший чип у смартфоні за всю історію. Дисплей Super Retina XDR з ProMotion. Міцний Ceramic Shield, у 4 рази стійкіший до падінь. Новий нічний режим на всіх камерах. Це найкращий iPhone на найкращому чипі.',
  'A15 Bionic chip. Super power. Mini sized.':
    'Чип A15 Bionic. Суперсила в мінірозмірі.',
  'The A15 Bionic chip is the fastest chip ever in a smartphone. It powers everything from photography to gaming. And the incredible Machine Learning accelerators allow you to experience augmented reality like never before.':
    'Чип A15 Bionic — найшвидший чип у смартфоні за всю історію. Він забезпечує роботу всього — від фотографії до ігор. А неймовірні прискорювачі машинного навчання дають змогу відчути доповнену реальність як ніколи раніше.',
  'Amazing Camera. No Pro Required.': 'Неймовірна камера. Pro не обов’язковий.',
  'iPhone 13 Mini takes stunning photos and videos with its advanced dual-camera system, with a new Night mode on all cameras. And Photographic Styles personalizes your photos in the moment for a beautiful look.':
    'iPhone 13 mini створює приголомшливі фото й відео завдяки вдосконаленій системі з двох камер і новому нічному режиму на всіх камерах. А фотографічні стилі персоналізують ваші знімки просто під час зйомки.',
  'The Ultimate Pro Camera System': 'Найкраща професійна система камер',
  "Introducing the first pro camera system that's also an iPhone — delivering 3x optical zoom, macro photography, Night mode portraits, and a new ProRes format for the highest-quality video ever in a smartphone. Get ready to shoot like a pro.":
    'Представляємо першу професійну систему камер, яка водночас є iPhone: 3-кратний оптичний зум, макрозйомка, портрети в нічному режимі та новий формат ProRes для відео найвищої якості серед смартфонів. Готуйтеся знімати як професіонал.',
  'Cinematic Mode': 'Кінематографічний режим',
  'Film like a pro with exclusive access to the depth-of-field effect of Cinema mode, now on both the Wide and Telephoto cameras. Add focus transitions for a creative look, and easily switch between cameras to capture more of the moment.':
    'Знімайте як професіонал з ефектом глибини різкості кінематографічного режиму — тепер і на ширококутній, і на телефотокамері. Додавайте переходи фокуса для творчого вигляду й легко перемикайтеся між камерами, щоб охопити більше моменту.',
  'A15 Bionic': 'A15 Bionic',
  'A15 Bionic is the fastest chip ever in a smartphone. It powers incredible experiences in photography, video, gaming, and more — all while delivering great battery life. And it enables the most advanced machine learning capabilities in any smartphone for next-level experiences.':
    'A15 Bionic — найшвидший чип у смартфоні за всю історію. Він забезпечує неймовірні можливості для фото, відео, ігор та багато іншого — і водночас чудову автономність. А ще він відкриває найдосконаліші можливості машинного навчання серед смартфонів.',
  'ProMotion': 'ProMotion',
  'ProMotion technology automatically adjusts the display to the movement on your screen, for more fluid scrolling, greater responsiveness, and smoother motion — and a battery that lasts all day.':
    'Технологія ProMotion автоматично підлаштовує дисплей під рух на екрані: прокручування стає плавнішим, відгук — швидшим, анімації — м’якшими, а батареї вистачає на весь день.',
  'Powerful Performance': 'Висока продуктивність',
  'Experience incredible power and performance with the Apple iPad Pro 11. With the M1 chip, it delivers a new level of performance, making it faster and more efficient than ever before.':
    'Відчуйте неймовірну потужність і продуктивність Apple iPad Pro 11. Завдяки чипу M1 він виходить на новий рівень продуктивності — швидший і ефективніший, ніж будь-коли.',
  "Whether you're editing photos, designing artwork, or multitasking with demanding apps, the iPad Pro 11 handles it all with ease.":
    'Редагуєте фото, створюєте ілюстрації чи працюєте з кількома вимогливими застосунками одночасно — iPad Pro 11 легко впорається з усім.',
  'Stunning Liquid Retina Display': 'Приголомшливий дисплей Liquid Retina',
  "Enjoy a vibrant and immersive visual experience on the iPad Pro 11's Liquid Retina display. With ProMotion technology and True Tone, the display adapts to your environment, providing smooth scrolling, precise color accuracy, and incredible detail.":
    'Насолоджуйтеся яскравим і захопливим зображенням на дисплеї Liquid Retina в iPad Pro 11. Завдяки технологіям ProMotion і True Tone дисплей підлаштовується під оточення, забезпечуючи плавне прокручування, точну передачу кольорів і неймовірну деталізацію.',
  "From watching movies to editing videos, the iPad Pro 11's display brings your content to life with stunning clarity.":
    'Від перегляду фільмів до монтажу відео — дисплей iPad Pro 11 оживляє ваш контент із вражаючою чіткістю.',
  'Versatile Camera System': 'Універсальна система камер',
  "Capture stunning photos and videos with the iPad Pro 11's advanced camera system. Featuring a 12MP Ultra Wide front camera and a 12MP Wide rear camera with LiDAR scanner, you can take high-quality shots and enjoy augmented reality experiences.":
    'Знімайте приголомшливі фото й відео за допомогою вдосконаленої системи камер iPad Pro 11. Фронтальна надширококутна камера 12 Мп і основна ширококутна камера 12 Мп зі сканером LiDAR дають змогу робити якісні знімки та користуватися доповненою реальністю.',
  "Whether you're video calling, scanning documents, or recording 4K videos, the iPad Pro 11's camera system delivers exceptional performance.":
    'Відеодзвінки, сканування документів чи запис відео 4K — система камер iPad Pro 11 показує виняткові результати.',
  'Thin, Light, and Powerful': 'Тонкий, легкий і потужний',
  "The Apple iPad Air (4th Gen) combines sleek design with powerful performance. With its thin and light form factor, it's incredibly portable and easy to carry wherever you go.":
    'Apple iPad Air (4-го покоління) поєднує елегантний дизайн із високою продуктивністю. Він тонкий і легкий, тож його неймовірно зручно брати з собою куди завгодно.',
  'Featuring the A14 Bionic chip with Neural Engine, the iPad Air delivers fast and efficient performance, making it ideal for multitasking, gaming, and creative tasks.':
    'Завдяки чипу A14 Bionic із Neural Engine iPad Air працює швидко й ефективно, тому ідеально підходить для багатозадачності, ігор і творчих завдань.',
  "Immerse yourself in vivid visuals on the iPad Air's Liquid Retina display. With True Tone and P3 wide color gamut, it offers true-to-life colors and incredible detail.":
    'Поринайте в яскраве зображення на дисплеї Liquid Retina в iPad Air. Завдяки True Tone і широкій колірній гамі P3 він передає природні кольори та неймовірну деталізацію.',
  "Whether you're watching movies, editing photos, or browsing the web, the iPad Air's display provides an immersive and enjoyable viewing experience.":
    'Дивитеся фільми, редагуєте фото чи переглядаєте сайти — дисплей iPad Air дарує захопливий і приємний перегляд.',
  'Versatile Features and Apple Pencil Support':
    'Універсальні можливості та підтримка Apple Pencil',
  "Unlock new possibilities with the iPad Air's versatile features. It supports Apple Pencil (2nd generation), allowing you to take notes, sketch, and annotate documents with precision.":
    'Відкрийте нові можливості з універсальними функціями iPad Air. Він підтримує Apple Pencil (2-го покоління), тож ви можете точно робити нотатки, малювати ескізи й коментувати документи.',
  'With Touch ID built into the top button, you can securely unlock your iPad, make secure purchases, and authenticate apps with a simple touch.':
    'Завдяки Touch ID у верхній кнопці можна надійно розблоковувати iPad, безпечно здійснювати покупки та підтверджувати вхід у застосунки одним дотиком.',
  'Compact and Portable': 'Компактний і портативний',
  "Experience the power of an iPad in a compact size with the Apple iPad Mini (6th Gen). With its 8.3-inch Liquid Retina display and slim design, it's perfect for on-the-go productivity and entertainment.":
    'Відчуйте потужність iPad у компактному розмірі з Apple iPad mini (6-го покоління). Дисплей Liquid Retina 8,3 дюйма й тонкий дизайн роблять його ідеальним для роботи та розваг у дорозі.',
  "Whether you're reading, gaming, or watching videos, the iPad Mini delivers a stunning visual experience in a portable package.":
    'Читаєте, граєте чи дивитеся відео — iPad mini дарує приголомшливе зображення в портативному корпусі.',
  'A15 Bionic Chip and Neural Engine': 'Чип A15 Bionic і Neural Engine',
  'The iPad Mini (6th Gen) is equipped with the powerful A15 Bionic chip and Neural Engine, delivering fast and efficient performance. It can handle demanding tasks and graphics-intensive apps with ease, making it suitable for both work and play.':
    'iPad mini (6-го покоління) оснащений потужним чипом A15 Bionic і Neural Engine, що забезпечують швидку та ефективну роботу. Він легко справляється з вимогливими завданнями та графічно насиченими застосунками, тож підходить і для роботи, і для розваг.',
  'Experience smooth multitasking, immersive gaming, and seamless app usage on the iPad Mini.':
    'Плавна багатозадачність, захопливі ігри та безперебійна робота застосунків на iPad mini.',
  'Advanced Cameras and Center Stage': 'Вдосконалені камери та Center Stage',
  "Capture stunning photos and videos with the iPad Mini's advanced cameras. With a 12MP front camera and a 12MP rear camera, you can take high-quality shots and record impressive videos.":
    'Знімайте приголомшливі фото й відео вдосконаленими камерами iPad mini. Фронтальна камера 12 Мп і основна камера 12 Мп дають змогу робити якісні знімки та записувати вражаючі відео.',
  'The iPad Mini also features Center Stage, a feature that automatically keeps you in frame during video calls, making your conversations more engaging and dynamic.':
    'iPad mini також має функцію Center Stage, яка автоматично утримує вас у кадрі під час відеодзвінків, роблячи розмови живішими та динамічнішими.',
  'Versatile and Affordable': 'Універсальний і доступний',
  "The Apple iPad 10.2 (2020) offers a versatile and affordable option for everyday tasks and entertainment. Whether you're browsing the web, streaming content, or using productivity apps, it delivers a smooth and responsive experience.":
    'Apple iPad 10.2 (2020) — універсальний і доступний варіант для щоденних завдань і розваг. Переглядаєте сайти, дивитеся стрімінги чи працюєте в офісних застосунках — він працює плавно й чуйно.',
  'With its large 10.2-inch Retina display, it provides a great viewing experience for all your content.':
    'Великий дисплей Retina 10,2 дюйма забезпечує чудовий перегляд будь-якого контенту.',
  "Experience powerful performance with the iPad 10.2's A12 Bionic chip. It enables fast and efficient multitasking, allowing you to run multiple apps smoothly and seamlessly.":
    'Відчуйте високу продуктивність чипа A12 Bionic в iPad 10.2. Він забезпечує швидку й ефективну багатозадачність, тож кілька застосунків працюють плавно та без затримок.',
  'From gaming to editing documents, the iPad 10.2 can handle it all with ease.':
    'Від ігор до редагування документів — iPad 10.2 легко впорається з усім.',
  'Apple Pencil and Smart Keyboard Support':
    'Підтримка Apple Pencil і Smart Keyboard',
  'Unlock your creativity and productivity with Apple Pencil and Smart Keyboard support. Take notes, draw, and sketch with precision using the Apple Pencil (1st generation), and transform your iPad into a lightweight laptop with the Smart Keyboard.':
    'Розкрийте творчий потенціал і підвищте продуктивність завдяки підтримці Apple Pencil і Smart Keyboard. Робіть нотатки, малюйте й створюйте ескізи з Apple Pencil (1-го покоління), а зі Smart Keyboard перетворіть iPad на легкий ноутбук.',
  "The iPad 10.2 adapts to your needs, whether you're a student, professional, or creative artist.":
    'iPad 10.2 підлаштовується під ваші потреби — для студентів, професіоналів і творчих людей.',
  'Compact and Powerful': 'Компактний і потужний',
  "The Apple iPad Mini (5th Gen) packs a punch with its compact size and powerful performance. Whether you're on the go or at home, it's perfect for productivity, entertainment, and creativity.":
    'Apple iPad mini (5-го покоління) вражає поєднанням компактного розміру та високої продуктивності. У дорозі чи вдома — він ідеальний для роботи, розваг і творчості.',
  'With its A12 Bionic chip, the iPad Mini delivers fast and efficient performance, allowing you to run demanding apps and games smoothly.':
    'Завдяки чипу A12 Bionic iPad mini працює швидко й ефективно, тож вимогливі застосунки та ігри запускаються плавно.',
  'Retina Display and True Tone': 'Дисплей Retina і True Tone',
  "Experience stunning visuals on the iPad Mini's Retina display. With True Tone technology, it adjusts the display's color temperature to match the ambient lighting, providing a natural and comfortable viewing experience.":
    'Насолоджуйтеся чудовим зображенням на дисплеї Retina в iPad mini. Технологія True Tone підлаштовує колірну температуру дисплея під навколишнє освітлення, тож дивитися на екран природно й комфортно.',
  "From reading ebooks to browsing photos, the iPad Mini's display brings content to life with vibrant colors and sharp details.":
    'Від читання електронних книжок до перегляду фото — дисплей iPad mini оживляє контент яскравими кольорами та чіткими деталями.',
  'Unlock your creativity and productivity with Apple Pencil and Smart Keyboard support. Take notes, sketch, and annotate documents with precision using the Apple Pencil (1st generation), and turn your iPad Mini into a versatile workstation with the Smart Keyboard.':
    'Розкрийте творчий потенціал і підвищте продуктивність завдяки підтримці Apple Pencil і Smart Keyboard. Робіть нотатки, створюйте ескізи та коментуйте документи з Apple Pencil (1-го покоління), а зі Smart Keyboard перетворіть iPad mini на універсальне робоче місце.',
  'The iPad Mini adapts to your needs, making it a powerful tool for both work and play.':
    'iPad mini підлаштовується під ваші потреби — це потужний інструмент і для роботи, і для розваг.',
  'Monitor your health': 'Стежте за здоров’ям',
  'The Apple Watch Series 3 is equipped with sensors to track your heart rate, calories burned, and other fitness metrics throughout the day. It can even track your workouts and suggest personalized fitness goals.':
    'Apple Watch Series 3 має датчики, які протягом дня відстежують пульс, спалені калорії та інші фітнес-показники. Годинник навіть записує тренування й пропонує персональні фітнес-цілі.',
  'Stay connected on the go': 'Будьте на зв’язку в дорозі',
  'With cellular connectivity, you can make calls and send texts from your wrist even without your iPhone nearby. And with Siri, you can get directions, send messages, and set reminders hands-free.':
    'Завдяки стільниковому зв’язку можна дзвонити й надсилати повідомлення просто із зап’ястя, навіть коли iPhone немає поруч. А з Siri можна прокладати маршрути, надсилати повідомлення та створювати нагадування без рук.',
  'Stream your favorite music': 'Слухайте улюблену музику',
  'With Apple Music and Siri, you can stream over 75 million songs on your Apple Watch Series 3. Or listen to your favorite podcasts, audiobooks, and radio stations.':
    'З Apple Music і Siri на Apple Watch Series 3 доступні понад 75 мільйонів пісень. А ще — улюблені подкасти, аудіокниги та радіостанції.',
  'Always-On Retina display': 'Дисплей Retina, що завжди увімкнений',
  'The Apple Watch Series 6 features an Always-On Retina display that is 2.5 times brighter outdoors when your wrist is down. So you can see all the information on your watch face at a glance.':
    'Apple Watch Series 6 має завжди увімкнений дисплей Retina, який надворі у 2,5 раза яскравіший, коли рука опущена. Тож усю інформацію на циферблаті видно з першого погляду.',
  'Blood oxygen sensor': 'Датчик кисню в крові',
  'The Blood Oxygen app measures your blood oxygen levels with a revolutionary new sensor and app. You can also take an ECG from your wrist anytime, anywhere.':
    'Застосунок «Кисень у крові» вимірює рівень кисню в крові за допомогою революційного нового датчика. А ще можна зробити ЕКГ просто із зап’ястя будь-коли й будь-де.',
  'Track your daily activity': 'Відстежуйте щоденну активність',
  'The Apple Watch Series 6 tracks your daily activity including workouts, steps taken, and calories burned. It also has a built-in GPS to track your runs, walks, and hikes.':
    'Apple Watch Series 6 відстежує вашу щоденну активність: тренування, кроки та спалені калорії. А вбудований GPS записує ваші пробіжки, прогулянки й походи.',
  'With the Always-On Retina display, you can easily see the time and important information without raising your wrist. The display is also 30% larger than the Series 3, making it easier to read and interact with.':
    'Завдяки завжди увімкненому дисплею Retina час і важливу інформацію видно, не піднімаючи руки. До того ж дисплей на 30% більший, ніж у Series 3, тож читати й керувати годинником зручніше.',
  'ECG app': 'Застосунок ЕКГ',
  'The ECG app can detect irregular heart rhythms and alert you if something seems amiss. You can also take an ECG anytime, anywhere, right from your wrist.':
    'Застосунок ЕКГ може виявити нерегулярний серцевий ритм і попередити вас, якщо щось не так. А ще ЕКГ можна зробити будь-коли й будь-де — просто із зап’ястя.',
  'Activity tracking': 'Відстеження активності',
  'The Apple Watch Series 5 tracks your daily activity, including workouts, steps taken, and calories burned. It also has a built-in GPS to track your runs, walks, and hikes.':
    'Apple Watch Series 5 відстежує вашу щоденну активність: тренування, кроки та спалені калорії. А вбудований GPS записує ваші пробіжки, прогулянки й походи.',
  'The Apple Watch Series 5 features an Always-On Retina display that allows you to glance at your watch without raising your wrist.':
    'Apple Watch Series 5 має завжди увімкнений дисплей Retina, тож поглянути на годинник можна, не піднімаючи руки.',
  'With the ECG app, you can take an electrocardiogram from your wrist anytime, anywhere.':
    'Із застосунком ЕКГ можна зробити електрокардіограму просто із зап’ястя будь-коли й будь-де.',
  'Track your workouts': 'Відстежуйте тренування',
  'The Apple Watch Series 5 tracks your workouts including running, walking, cycling, and swimming. It also has a built-in GPS to track your location and route.':
    'Apple Watch Series 5 відстежує ваші тренування: біг, ходьбу, велосипед і плавання. А вбудований GPS записує ваше місцезнаходження та маршрут.',
  'Larger display': 'Більший дисплей',
  'The Apple Watch Series 4 has a larger display that lets you see more information at a glance. The display is over 30% larger than the Series 3 and is edge-to-edge with curved corners.':
    'Apple Watch Series 4 має більший дисплей, на якому з першого погляду видно більше інформації. Він більш ніж на 30% більший, ніж у Series 3, і займає всю поверхню від краю до краю із заокругленими кутами.',
  'With the ECG app, you can take an electrocardiogram right from your wrist. This feature is only available in certain countries and regions.':
    'Із застосунком ЕКГ можна зробити електрокардіограму просто із зап’ястя. Функція доступна лише в деяких країнах і регіонах.',
  'Fall detection': 'Виявлення падіння',
  "The Apple Watch Series 4 can detect when you fall and can send an alert to emergency services if you don't respond within a minute. This feature is only available for users over 65 years old.":
    'Apple Watch Series 4 може виявити, що ви впали, і надіслати сигнал екстреним службам, якщо ви не відреагуєте протягом хвилини. Функція доступна лише для користувачів, старших за 65 років.',
  'Retina display': 'Дисплей Retina',
  'The Apple Watch SE features a Retina display that provides clear and vibrant visuals for easy readability.':
    'Apple Watch SE має дисплей Retina з чітким і яскравим зображенням, яке легко читати.',
  'Family Setup': 'Сімейне налаштування',
  "With Family Setup, you can pair your Apple Watch SE with a family member's iPhone, so you can stay connected even without owning an iPhone yourself.":
    'Завдяки сімейному налаштуванню можна під’єднати Apple Watch SE до iPhone члена родини й залишатися на зв’язку, навіть якщо у вас немає власного iPhone.',
  'Fitness tracking': 'Відстеження фітнесу',
  'The Apple Watch SE offers comprehensive fitness tracking features, including activity tracking, heart rate monitoring, and built-in GPS for tracking your outdoor workouts.':
    'Apple Watch SE пропонує повний набір фітнес-функцій: відстеження активності, вимірювання пульсу та вбудований GPS для тренувань на вулиці.',
  'The Apple Watch SE features a stunning Retina display that is always on, so you can easily see the time and important information without having to raise your wrist.':
    'Apple Watch SE має приголомшливий дисплей Retina, що завжди увімкнений, тож час і важливу інформацію видно, навіть не піднімаючи руки.',
  'Health and fitness tracking': 'Відстеження здоров’я та фітнесу',
  'The Apple Watch SE has all the features you need to stay healthy and active, including heart rate monitoring, activity tracking, and sleep tracking. It also has built-in GPS so you can track your workouts and outdoor activities.':
    'В Apple Watch SE є все, щоб залишатися здоровими й активними: вимірювання пульсу, відстеження активності та сну. А вбудований GPS записує ваші тренування й активності на свіжому повітрі.',
  'Stay connected': 'Будьте на зв’язку',
  'With cellular and Wi-Fi connectivity, you can stay connected wherever you go. You can make and receive calls, send texts, and stream music directly from your wrist.':
    'Завдяки стільниковому зв’язку та Wi-Fi ви на зв’язку, де б не були. Приймайте й здійснюйте дзвінки, надсилайте повідомлення та слухайте музику просто із зап’ястя.',
  'The Apple Watch SE features a stunning Retina display that is always on, so you can easily see the time and important information without lifting your wrist.':
    'Apple Watch SE має приголомшливий дисплей Retina, що завжди увімкнений, тож час і важливу інформацію видно, не піднімаючи руки.',
  'The Apple Watch SE tracks your daily activity including workouts, steps taken, and calories burned. It also has a built-in GPS to track your runs, walks, and hikes.':
    'Apple Watch SE відстежує вашу щоденну активність: тренування, кроки та спалені калорії. А вбудований GPS записує ваші пробіжки, прогулянки й походи.',
  'The Apple Watch SE keeps you connected with the people and information you care about most. With cellular service, you can make and receive calls and texts, stream music, and use Siri, all without your iPhone.':
    'Apple Watch SE тримає вас на зв’язку з людьми та інформацією, які для вас найважливіші. Зі стільниковим зв’язком можна дзвонити й надсилати повідомлення, слухати музику та користуватися Siri — і все це без iPhone.',
  'The Apple Watch SE features a stunning Retina display that is always on, providing clear and vibrant visuals for easy readability.':
    'Apple Watch SE має приголомшливий дисплей Retina, що завжди увімкнений, із чітким і яскравим зображенням, яке легко читати.',
  'Fitness and health tracking': 'Відстеження фітнесу та здоров’я',
  'The Apple Watch SE helps you stay active and monitors your health with features like heart rate monitoring, activity tracking, and built-in GPS for tracking your outdoor workouts.':
    'Apple Watch SE допомагає залишатися активними та стежить за здоров’ям: вимірює пульс, відстежує активність, а вбудований GPS записує тренування на вулиці.',
  'With cellular and Wi-Fi connectivity, you can stay connected on the go. Make and receive calls, send messages, stream music, and access Siri right from your wrist.':
    'Завдяки стільниковому зв’язку та Wi-Fi ви завжди на зв’язку в дорозі. Дзвоніть, надсилайте повідомлення, слухайте музику та користуйтеся Siri просто із зап’ястя.',
};

export function translateDescription(
  description: ProductDescription[],
  language: Language,
): ProductDescription[] {
  if (language !== 'uk') {
    return description;
  }

  const translate = (text: string) => DESCRIPTIONS_UK[text.trim()] ?? text;

  return description.map(({ title, text }) => ({
    title: translate(title),
    text: text.map(translate),
  }));
}

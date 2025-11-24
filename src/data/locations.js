export const panoById = {
    paris_eiffel:
        'https://upload.wikimedia.org/wikipedia/commons/d/d1/Pont_de_Bir-Hakeim_and_the_Eiffel_Tower%2C_April_2007.jpg',
    london_westminster:
        'https://upload.wikimedia.org/wikipedia/commons/d/dc/London_360%C2%B0_Panorama_from_the_London_Eye_edit.jpg',
    rome_colosseum:
        'https://upload.wikimedia.org/wikipedia/commons/a/ab/Colosseo_di_Roma_panoramic.jpg',

    nyc_terminal: 'https://pannellum.org/images/jfk.jpg',
    atacama_crossroads: 'https://pannellum.org/images/tocopilla.jpg',
    alma_array: 'https://pannellum.org/images/alma.jpg',
    alma_correlator: 'https://pannellum.org/images/alma-correlator-facility.jpg',
    cerro_toco: 'https://pannellum.org/images/cerro-toco-0.jpg',

};

export const locations = [
    {
        id: 'paris_eiffel',
        difficulty: 'easy',
        region_en: 'Europe',
        region_uk: 'Європа',
        name_en: 'Paris, France',
        name_uk: 'Париж, Франція',
        lat: 48.8584,
        lon: 2.2945,
        panoUrl: panoById.paris_eiffel,
        clue_en:
            'You are near a very famous iron tower above a river in France. Look around in 360° and place your pin on the map.',
        clue_uk:
            'Ти біля дуже відомої металевої вежі над річкою у Франції. Оглянься на 360° та постав пін на мапі.',
    },
    {
        id: 'paris_river_view',
        difficulty: 'normal',
        region_en: 'Europe',
        region_uk: 'Європа',
        name_en: 'Paris, France',
        name_uk: 'Париж, Франція',
        lat: 48.8572,
        lon: 2.2925,
        panoUrl: panoById.paris_eiffel,
        clue_en:
            'You are standing on a bridge over the Seine with a tall iron tower rising nearby.',
        clue_uk:
            'Ти стоїш на мосту над Сеною, поруч височіє висока залізна вежа.',
    },
    {
        id: 'london_westminster',
        difficulty: 'easy',
        region_en: 'Europe',
        region_uk: 'Європа',
        name_en: 'London, United Kingdom',
        name_uk: 'Лондон, Велика Британія',
        lat: 51.5033,
        lon: -0.1195,
        panoUrl: panoById.london_westminster,
        clue_en:
            'You are high above a big European city with a giant wheel and a clock tower by the river.',
        clue_uk:
            'Ти високо над великим європейським містом з великим колесом огляду та годинниковою вежею біля річки.',
    },
    {
        id: 'london_eye_thames_view',
        difficulty: 'normal',
        region_en: 'Europe',
        region_uk: 'Європа',
        name_en: 'London, United Kingdom',
        name_uk: 'Лондон, Велика Британія',
        lat: 51.5045,
        lon: -0.122,
        panoUrl: panoById.london_westminster,
        clue_en:
            'You see the river curving through the British capital, with historic parliament buildings nearby.',
        clue_uk:
            'Ти бачиш, як річка огинає столицю Британії, поряд історичні будівлі парламенту.',
    },
    {
        id: 'rome_colosseum',
        difficulty: 'easy',
        region_en: 'Europe',
        region_uk: 'Європа',
        name_en: 'Rome, Italy',
        name_uk: 'Рим, Італія',
        lat: 41.8902,
        lon: 12.4922,
        panoUrl: panoById.rome_colosseum,
        clue_en:
            'Ancient stone arches and an arena where gladiators once fought surround you.',
        clue_uk:
            'Навколо тебе давні кам’яні арки та арена, де колись билися гладіатори.',
    },
    {
        id: 'rome_forum_view',
        difficulty: 'normal',
        region_en: 'Europe',
        region_uk: 'Європа',
        name_en: 'Rome, Italy',
        name_uk: 'Рим, Італія',
        lat: 41.8921,
        lon: 12.4853,
        panoUrl: panoById.rome_colosseum,
        clue_en:
            'You look over ruins of temples and columns in the historic heart of Italy’s capital.',
        clue_uk:
            'Перед тобою руїни храмів і колони в історичному серці столиці Італії.',
    },
    {
        id: 'mexico_city_zocalo',
        difficulty: 'normal',
        region_en: 'North America',
        region_uk: 'Північна Америка',
        name_en: 'Mexico City, Mexico',
        name_uk: 'Мехіко, Мексика',
        lat: 19.4326,
        lon: -99.1332,
        panoUrl: panoById.mexico_zocalo,
        clue_en:
            'You are on a huge main square with a cathedral, government buildings and a giant national flag.',
        clue_uk:
            'Ти на велетенській головній площі з собором, урядовими будівлями та гігантським державним прапором.',
    },
    {
        id: 'nyc_jfk_terminal',
        difficulty: 'normal',
        region_en: 'North America',
        region_uk: 'Північна Америка',
        name_en: 'New York City, USA',
        name_uk: 'Нью-Йорк, США',
        lat: 40.6413,
        lon: -73.7781,
        panoUrl: panoById.nyc_terminal,
        clue_en:
            'You are inside a busy international airport terminal with high glass ceilings and departure boards.',
        clue_uk:
            'Ти всередині жвавого міжнародного аеропорту з високими скляними стелями та табло вильотів.',
    },
    {
        id: 'nyc_airport_mezzanine',
        difficulty: 'hard',
        region_en: 'North America',
        region_uk: 'Північна Америка',
        name_en: 'New York City, USA',
        name_uk: 'Нью-Йорк, США',
        lat: 40.642,
        lon: -73.782,
        panoUrl: panoById.nyc_terminal,
        clue_en:
            'Escalators, polished floors and rows of check-in counters place you in a major US air hub.',
        clue_uk:
            'Ескалатори, блискучі підлоги та ряди стійок реєстрації видають великий повітряний хаб США.',
    },
    {
        id: 'atacama_crossroads_chile',
        difficulty: 'normal',
        region_en: 'South America',
        region_uk: 'Південна Америка',
        name_en: 'Atacama Desert, Chile',
        name_uk: 'Пустеля Атакама, Чилі',
        lat: -22.35,
        lon: -70.18,
        panoUrl: panoById.atacama_crossroads,
        clue_en:
            'A long straight road cuts through a dry desert landscape with mountains on the horizon.',
        clue_uk:
            'Довга пряма дорога перетинає сухий пустельний ландшафт з горами на горизонті.',
    },
    {
        id: 'alma_observatory',
        difficulty: 'hard',
        region_en: 'South America',
        region_uk: 'Південна Америка',
        name_en: 'ALMA Observatory, Chile',
        name_uk: 'Обсерваторія ALMA, Чилі',
        lat: -23.0236,
        lon: -67.753,
        panoUrl: panoById.alma_array,
        clue_en:
            'You are on a high plateau surrounded by many large white radio dishes pointing at the sky.',
        clue_uk:
            'Ти на високогірному плато серед великих білих радіотарілок, спрямованих у небо.',
    },
    {
        id: 'atacama_high_plateau',
        difficulty: 'hard',
        region_en: 'South America',
        region_uk: 'Південна Америка',
        name_en: 'Atacama Plateau, Chile',
        name_uk: 'Плато Атакама, Чилі',
        lat: -23.05,
        lon: -67.76,
        panoUrl: panoById.alma_array,
        clue_en:
            'Thin air, intense sun and scientific equipment around you hint that you are far above sea level.',
        clue_uk:
            'Рідке повітря, яскраве сонце та наукове обладнання навколо натякають, що ти далеко над рівнем моря.',
    },
    {
        id: 'atacama_desert_road',
        difficulty: 'normal',
        region_en: 'South America',
        region_uk: 'Південна Америка',
        name_en: 'Atacama Desert, Chile',
        name_uk: 'Пустеля Атакама, Чилі',
        lat: -22.35,
        lon: -68.93,
        panoUrl: panoById.atacama_crossroads,
        clue_en:
            'Dry hills, dusty roads and empty desert around you in one of the driest places on Earth.',
        clue_uk:
            'Сухі пагорби, запилені дороги й безлюдна пустеля навколо в одному з найсухіших місць планети.',
    },
    {
        id: 'alma_observatory_array',
        difficulty: 'hard',
        region_en: 'South America',
        region_uk: 'Південна Америка',
        name_en: 'ALMA Observatory Array, Chile',
        name_uk: 'Масив антен ALMA, Чилі',
        lat: -23.029,
        lon: -67.755,
        panoUrl: panoById.alma_array,
        clue_en:
            'Large white radio dishes stand on a high plateau under a crystal clear sky in the Andes.',
        clue_uk:
            'Великі білі радіоантени стоять на високогірному плато під кришталево чистим небом Анд.',
    },
    {
        id: 'alma_correlator_facility',
        difficulty: 'hard',
        region_en: 'South America',
        region_uk: 'Південна Америка',
        name_en: 'ALMA Operations Site, Chile',
        name_uk: 'Операційний центр ALMA, Чилі',
        lat: -23.025,
        lon: -67.755,
        panoUrl: panoById.alma_correlator,
        clue_en:
            'You are at a technical facility that controls antennas high in the Chilean Andes.',
        clue_uk:
            'Ти біля технічного комплексу, який керує антенами високо в Чилійських Андах.',
    },
    {
        id: 'cerro_toco_summit',
        difficulty: 'hard',
        region_en: 'South America',
        region_uk: 'Південна Америка',
        name_en: 'Cerro Toco, Chile',
        name_uk: 'Серро Токко, Чилі',
        lat: -22.944,
        lon: -67.768,
        panoUrl: panoById.cerro_toco,
        clue_en:
            'Metal platforms, thin air and snow-capped peaks around you on a high Andean summit.',
        clue_uk:
            'Металеві платформи, розріджене повітря та засніжені вершини навколо на високій андійській вершині.',
    },
    {
        id: 'andes_plateau_view',
        difficulty: 'normal',
        region_en: 'South America',
        region_uk: 'Південна Америка',
        name_en: 'Andean Plateau, Chile',
        name_uk: 'Андійське плато, Чилі',
        lat: -23.1,
        lon: -67.9,
        panoUrl: panoById.alma_array,
        clue_en:
            'A wide, empty plateau at high altitude with observatory buildings and mountains in the distance.',
        clue_uk:
            'Широке, майже порожнє високогірне плато з будівлями обсерваторії та горами вдалині.',
    },

];

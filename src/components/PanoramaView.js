import React, {useMemo, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {colors, radius, spacing} from '../theme';
import NeonButton from './NeonButton';
import {useLanguage} from '../context/LanguageContext';

const makeSafePanoramaUrl = url => {
    if (!url) return '';
    let result = url;

    if (
        result.includes('commons.wikimedia.org/wiki/Special:FilePath') &&
        !result.includes('width=')
    ) {
        const hasQuery = result.includes('?');
        result = result + (hasQuery ? '&' : '?') + 'width=8000';
    }

    if (
        result.includes('upload.wikimedia.org') &&
        result.includes('/wikipedia/commons/') &&
        !result.includes('/thumb/')
    ) {
        try {
            const parts = result.split('/');
            const commonsIndex = parts.findIndex(p => p === 'commons');
            if (commonsIndex !== -1 && parts.length >= commonsIndex + 4) {
                const origin = parts[0] + '//' + parts[2];
                const hash1 = parts[commonsIndex + 1];
                const hash2 = parts[commonsIndex + 2];
                const filename = parts[commonsIndex + 3];
                result =
                    origin +
                    '/wikipedia/commons/thumb/' +
                    hash1 +
                    '/' +
                    hash2 +
                    '/' +
                    filename +
                    '/8000px-' +
                    filename;
            }
        } catch (e) {}
    }

    return result;
};

const PanoramaView = ({imageUrl}) => {
    const {t, lang} = useLanguage();
    const [failed, setFailed] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    const safeUrl = useMemo(() => makeSafePanoramaUrl(imageUrl), [imageUrl]);

    if (Platform.OS === 'web') {
        return (
            <View style={styles.webFallback}>
                <Text style={styles.webFallbackTitle}>
                    {lang === 'uk'
                        ? 'Панорама недоступна у web-прев’ю'
                        : 'Panorama is not available in web preview'}
                </Text>
                <Text style={styles.webFallbackText}>
                    {lang === 'uk'
                        ? 'Запусти застосунок на Android / iOS пристрої або емуляторі, щоб побачити 360° огляд.'
                        : 'Run the app on an Android / iOS device or emulator to see the 360° view.'}
                </Text>
            </View>
        );
    }

    const html = useMemo(
        () => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <link rel="stylesheet" href="https://unpkg.com/pannellum@2.5.6/build/pannellum.css" />
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            background: #050816;
            overflow: hidden;
          }
          #panorama {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <div id="panorama"></div>
        <script src="https://unpkg.com/pannellum@2.5.6/build/pannellum.js"></script>
        <script>
          try {
            pannellum.viewer('panorama', {
              type: 'equirectangular',
              panorama: '${safeUrl}',
              autoLoad: true,
              showZoomCtrl: false,
              showFullscreenCtrl: false,
              compass: false,
              hfov: 85,
              maxHfov: 100,
              minHfov: 55,
              yaw: 0,
              pitch: 0,
              autoRotate: -1,
              disableKeyboardCtrl: true
            });
          } catch (e) {}
        </script>
      </body>
      </html>
    `,
        [safeUrl],
    );

    const handleError = () => {
        setFailed(true);
    };

    const handleRetry = () => {
        setFailed(false);
        setReloadKey(prev => prev + 1);
    };

    if (failed) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorTitle}>
                    {lang === 'uk'
                        ? 'Не вдалося завантажити панораму'
                        : 'Could not load panorama'}
                </Text>
                <Text style={styles.errorText}>
                    {lang === 'uk'
                        ? 'Спробуй ще раз або перейди до наступної локації.'
                        : 'Try again or skip to the next location.'}
                </Text>
                <NeonButton
                    label={t('map_retry')}
                    variant="secondary"
                    onPress={handleRetry}
                    style={styles.retryButton}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <WebView
                key={reloadKey}
                originWhitelist={['*']}
                style={styles.webview}
                source={{html}}
                javaScriptEnabled
                domStorageEnabled
                scrollEnabled={false}
                onError={handleError}
                onHttpError={handleError}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: radius.lg,
        overflow: 'hidden',
        backgroundColor: colors.bg,
    },
    webview: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    errorContainer: {
        flex: 1,
        borderRadius: radius.lg,
        backgroundColor: colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.md,
    },
    errorTitle: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '600',
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
    errorText: {
        color: colors.muted,
        fontSize: 13,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    retryButton: {
        paddingHorizontal: spacing.lg,
    },
    webFallback: {
        flex: 1,
        borderRadius: radius.lg,
        backgroundColor: colors.card,
        padding: spacing.md,
        justifyContent: 'center',
    },
    webFallbackTitle: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    webFallbackText: {
        color: colors.muted,
        fontSize: 13,
    },
});

export default PanoramaView;

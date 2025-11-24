import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {colors, radius, spacing} from '../theme';
import NeonButton from './NeonButton';
import {useLanguage} from '../context/LanguageContext';

const GuessMap = ({onGuess, guessCoord, answerCoord, showAnswer, compact = false}) => {
    const {t, lang} = useLanguage();
    const [failed, setFailed] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    const isWeb = Platform.OS === 'web';

    const handleMessage = event => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'guess' && typeof onGuess === 'function') {
                onGuess({lat: data.lat, lon: data.lng});
            }
        } catch (e) {}
    };

    const handleError = () => {
        setFailed(true);
    };

    const handleRetry = () => {
        setFailed(false);
        setReloadKey(prev => prev + 1);
    };

    if (isWeb) {
        return (
            <View
                style={[
                    styles.webFallback,
                    compact && styles.webFallbackCompact,
                ]}>
                <Text style={styles.webFallbackTitle}>
                    {lang === 'uk'
                        ? 'Мапа недоступна у web-прев’ю'
                        : 'Map is not available in web preview'}
                </Text>
                {!compact && (
                    <Text style={styles.webFallbackText}>
                        {lang === 'uk'
                            ? 'Запусти застосунок на пристрої або емуляторі, щоб ставити пін на мапі.'
                            : 'Run the app on a device or emulator to place a pin on the map.'}
                    </Text>
                )}
            </View>
        );
    }

    if (failed) {
        return (
            <View style={[styles.errorContainer, compact && styles.errorContainerCompact]}>
                <Text style={styles.errorText}>{t('map_error')}</Text>
                {!compact && (
                    <NeonButton
                        label={t('map_retry')}
                        variant="secondary"
                        onPress={handleRetry}
                        style={styles.retryButton}
                    />
                )}
            </View>
        );
    }

    const initialGuessJson = guessCoord
        ? JSON.stringify({lat: guessCoord.lat, lng: guessCoord.lon})
        : 'null';
    const answerCoordJson = answerCoord
        ? JSON.stringify({lat: answerCoord.lat, lng: answerCoord.lon})
        : 'null';
    const showAnswerFlag = showAnswer ? 'true' : 'false';

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          background: #050816;
          overflow: hidden;
        }
        #map {
          height: 100%;
          width: 100%;
        }
        .leaflet-container {
          background: #050816;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        var initialGuess = ${initialGuessJson};
        var answerCoord = ${answerCoordJson};
        var showAnswer = ${showAnswerFlag};

        var center = { lat: 20, lng: 0 };
        var zoom = 2;

        if (answerCoord) {
          center = { lat: answerCoord.lat, lng: answerCoord.lng };
          zoom = 3;
        }
        if (initialGuess) {
          center = { lat: initialGuess.lat, lng: initialGuess.lng };
          zoom = 3;
        }

        var map = L.map('map', {
          worldCopyJump: true,
          zoomControl: true,
          attributionControl: false,
          minZoom: 2,
          maxZoom: 18,
          scrollWheelZoom: true,
          touchZoom: true
        }).setView([center.lat, center.lng], zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: ''
        }).addTo(map);

        var guessMarker = null;

        if (initialGuess) {
          guessMarker = L.circleMarker([initialGuess.lat, initialGuess.lng], {
            radius: 6,
            color: '#fb7185',
            fillColor: '#fb7185',
            fillOpacity: 0.9
          }).addTo(map);
        }

        if (answerCoord && showAnswer) {
          L.circleMarker([answerCoord.lat, answerCoord.lng], {
            radius: 6,
            color: '#22d3ee',
            fillColor: '#22d3ee',
            fillOpacity: 0.9
          }).addTo(map);
          if (initialGuess) {
            var bounds = L.latLngBounds(
              [initialGuess.lat, initialGuess.lng],
              [answerCoord.lat, answerCoord.lng]
            );
            map.fitBounds(bounds.pad(0.5));
          }
        }

        function handleClick(e) {
          if (showAnswer) {
            return;
          }
          var lat = e.latlng.lat;
          var lng = e.latlng.lng;
          if (guessMarker) {
            guessMarker.setLatLng(e.latlng);
          } else {
            guessMarker = L.circleMarker(e.latlng, {
              radius: 6,
              color: '#fb7185',
              fillColor: '#fb7185',
              fillOpacity: 0.9
            }).addTo(map);
          }
          if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ type: 'guess', lat: lat, lng: lng })
            );
          }
        }

        map.on('click', handleClick);
      </script>
    </body>
    </html>
  `;

    return (
        <View style={compact ? styles.containerCompact : styles.container}>
            <WebView
                key={reloadKey}
                originWhitelist={['*']}
                source={{html}}
                style={styles.webview}
                javaScriptEnabled
                domStorageEnabled
                scrollEnabled={false}
                onMessage={handleMessage}
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
    containerCompact: {
        width: 96,
        height: 96,
        borderRadius: 48,
        overflow: 'hidden',
        backgroundColor: colors.bg,
    },
    webview: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.bg,
    },
    errorContainer: {
        flex: 1,
        borderRadius: radius.lg,
        backgroundColor: colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.sm,
    },
    errorContainerCompact: {
        width: 96,
        height: 96,
        borderRadius: 48,
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
        padding: spacing.sm,
        justifyContent: 'center',
    },
    webFallbackCompact: {
        width: 96,
        height: 96,
        borderRadius: 48,
    },
    webFallbackTitle: {
        color: colors.text,
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    },
    webFallbackText: {
        color: colors.muted,
        fontSize: 12,
        textAlign: 'center',
        marginTop: spacing.xs,
    },
});

export default GuessMap;

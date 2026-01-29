import React from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const fontUrl = Platform.select({
	ios: 'Montserrat-Regular.ttf',
	android: 'file:///android_asset/fonts/Montserrat-Regular.ttf',
});

const fontFamily = 'Montserrat-Regular';
export const NotificationWebView = ({ html }) => {
	const pageHtml = `
      <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <style>
              @font-face {
                font-family: '${fontFamily}'; 
                src: url('${fontUrl}')
              }
           h1, h2, h3, html, body { font-family: '${fontFamily}'; font-size: 14px;}
          </style>
          </head>
          <body>
          ${html}
          </body>
        </html>
      `;

	return (
		<WebView
			originWhitelist={['*']}
			containerStyle={{ height: 200, marginHorizontal: -8 }}
			source={{ html: pageHtml, baseUrl: '' }}
		/>
	);
};

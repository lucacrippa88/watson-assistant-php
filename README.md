# Easily integrate a Watson Assistant Chatbot in a PHP web application

This project allows you to easily integrate a responsive banner at the bottom of web page with a button to a chat panel powered by IBM Watson.


## Prerequisites

In order to use this code, it's necessary to have:

1. An IBM Cloud account. It's free of charge, no credit card required (only a valid email address)
2. A Watson Assistant Lite Service (free of charge)
3. A trained Watson Assistant Workspace
4. A PHP application


## How to use

Integrate this code by following the following customization steps:

1. Download or fork code
2. Edit php/ChatBot.php file with Watson Assistant credentials (username & password), release date of api, Workspace ID of the selected Virtual Assistant
3. Edit CSS to fit in your web application's graphics
4. Edit getWatsonAssistantData() in js/chatbot.js with context variable names to be checked in order to perform actions
5. Edit useWatsonAssistantData() in js/chatbot.js with personal code to perform actions


## Tutorials

Please find tutorials on how to train Watson Assistant here: link to come (Italian spoken, but with English interface).

Video 1)  [Watson Assistant] Parte 1 - Riconoscere gli Intenti
Video 2)  [Watson Assistant] Parte 2 - Gli Intenti generali
Video 3)  [Watson Assistant] Parte 3 - Le Entità
Video 4)  [Watson Assistant] Parte 4 - Raccogliere informazioni con gli Slot
Video 5)  [Watson Assistant] Parte 5 - Le Digressioni 1/2
Video 6)  [Watson Assistant] Parte 6 - Le Digressioni 2/2
Video 7)  [Watson Assistant] Parte 7 - Organizzare Intenti ed Entità
Video 8)  [Watson Assistant] Parte 8 - Raccogliere informazioni testuali da input
Video 9)  [Watson Assistant] Parte 9 - Gestire le Variabili di contesto
Video 10) [Watson Assistant] Parte 10 - Integrazione con altri Servizi
Video 11) [Watson Assistant] Parte 11 - Controllo e debug con Postman
Video 12) [Watson Assistant] Parte 1 - Introduzione all'integrazione con PHP
Video 13) [Watson Assistant] Parte 2 - Coding del backend in PHP
Video 14) [Watson Assistant] Parte 3 - Coding del frontend web
Video 15) [Watson Assistant] Parte 4 - Funzionalità: aiuto alla navigazione
Video 16) [Watson Assistant] Parte 5 - Funzionalità: salvataggio dati su MySQL


## Notes

This code uses an local hosted version of:

1. Carbon Design System: http://www.carbondesignsystem.com/
2. Material Design Lite: https://getmdl.io/

You can also use your own graphic framework.


## Disclaimer

This is not an official asset. It has been created by me and it's not intended for professional use. However, it follows all guidelines you can find in https://console.bluemix.net/docs/services/conversation/ and in https://www.ibm.com/watson/developercloud/assistant/api/v1/.
For Watson Services SLAs, please have a look here: https://www-03.ibm.com/software/sla/sladb.nsf/sla/bm-0038-09.


## Outcome

Here some screenshots of the outcome, in both desktop and mobile screens.

### Desktop layout
![Bottom assistant desktop](https://github.com/lucacrippa88/watson-assistant-php/blob/master/screenshots/bottom-assistant.PNG)
![Bottom assistant desktop chat](https://github.com/lucacrippa88/watson-assistant-php/blob/master/screenshots/bottom-assistant-open.PNG)
### Mobile layout
![Bottom assistant mobile](https://github.com/lucacrippa88/watson-assistant-php/blob/master/screenshots/bottom-assistant-mobile.PNG)
![Bottom assistant mobile chat](https://github.com/lucacrippa88/watson-assistant-php/blob/master/screenshots/bottom-assistant-mobile-open.PNG)

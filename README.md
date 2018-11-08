# Easily integrate a Watson Assistant Chatbot in a PHP web application

This project allows you to easily integrate a responsive banner at the bottom of web page with a button to a chat panel powered by IBM Watson.


## Prerequisites

In order to use this code, it's necessary to have:

1. An IBM Cloud account. It's free of charge, no credit card required (only a valid email address)
2. A Watson Assistant Lite Service (free of charge)
3. A trained Watson Assistant Workspace -> you can start from this folder (italian): https://github.com/lucacrippa88/watson-assistant-php/tree/master/virtual-assistant-ui-mysql-php
4. A PHP application: please hate a look to this tutorial to create it on IBM Cloud (... to come)


## How to use basic Chatbot features

Integrate this code by following the following customization steps:

1. Download or fork code
2. Edit php/ChatBot.php file with Watson Assistant credentials (username & password), release date of api, Workspace ID of the selected Virtual Assistant
3. Edit CSS to fit in your web application's graphics
4. Edit getWatsonAssistantData() in js/chatbot.js with context variable names to be checked in order to perform actions
5. Edit useWatsonAssistantData() in js/chatbot.js with personal code to perform actions


## How to improve Chatbot features

Improve the Chatbot with MySQL writing, create push notification, sending emails to support. These are only general ideas on how to create integration with MySQL, push notifications and email delivery: some coding skills are requested to integrate the solution into your web applications. For more info, please review video tutorials.

Write to MySQL database: use saveDataWA() in mysql-functions.js to create Ajax calls to your DB update APIs. The saveDataWA() functions take input from useWAData() included in chatbot.js.

Send push notification: to be updated.

### Send emails

You can train the Chatbot to understand when the user is asking to create an email message. The Assistant will start to collect all the needed info, handling a natural conversation with digressions enabled and fluent interactions.
The Assistant will collect the subject, the text and the recipients, then a confirmation to proceed to send the email.
Please note: your php server needs to be enabled to send emails.

### Create push notification

To be updated.


## Features

The integration of a Chatbot in a PHP web app allows to easily:
1. Help users to navigate graphic user interface (GUI) by answering to common questions and giving advices
2. Enables to retrieve data from user in order to perform actions triggered by context variables, such as writing on a DB
3. Allows to create and send an email i.e. to the support team
4. Allows to create and send a web push notification -> under development! -> OneSignal required! https://onesignal.com/


## Tutorials

Please find my tutorials on how to train Watson Assistant here: link to come (Italian spoken, but with English interface).

0. Please refer to this Github repository to know how to train Watson Assistant: https://github.com/lucacrippa88/watson-assistant-training
1. Introduzione all'integrazione con PHP: https://www.youtube.com/watch?v=OmXN3bhX_Ww
2. Coding del backend in PHP: https://www.youtube.com/watch?v=f2Rc4OnYbao
3. Coding del frontend web: https://www.youtube.com/watch?v=CBSPNKs5SMU
4. Funzionalità: aiuto alla navigazione UI: https://www.youtube.com/watch?v=9D1JpuXlx60&t=3s
5. Funzionalità: salvataggio dati su MySQL: https://www.youtube.com/watch?v=OMKbOrRxiuc&t=4s
6. - ... -> more to come!


## Notes

This code uses an local hosted version of:

1. Carbon Design System: http://www.carbondesignsystem.com/
2. Material Design Lite: https://getmdl.io/

You can also use your own graphic framework.


## Outcome

Here some screenshots of the outcome, in both desktop and mobile screens.

### Desktop layout
![Bottom assistant desktop](https://github.com/lucacrippa88/watson-assistant-php/blob/master/screenshots/bottom-assistant.PNG)
![Bottom assistant desktop chat](https://github.com/lucacrippa88/watson-assistant-php/blob/master/screenshots/bottom-assistant-open.PNG)
### Mobile layout
![Bottom assistant mobile](https://github.com/lucacrippa88/watson-assistant-php/blob/master/screenshots/bottom-assistant-mobile.PNG)
![Bottom assistant mobile chat](https://github.com/lucacrippa88/watson-assistant-php/blob/master/screenshots/bottom-assistant-mobile-open.PNG)


### CSS

Classes and ids to be used. Can be changed but it's needed to change the js/chatbot.js file.

1. #virtual-assistant-container
2. #virtual-assistant
3. #messages
4. #chat-form
5. #input-ask
6. #chat-button
7. .toggle-assistant -> button to show/hide (toggle) the chat panel


## Disclaimer

This is not an official asset. It has been created by me and it's not intended for professional use. However, it follows all guidelines you can find in https://console.bluemix.net/docs/services/conversation/ and in https://www.ibm.com/watson/developercloud/assistant/api/v1/.
For Watson Services SLAs, please have a look here: https://www-03.ibm.com/software/sla/sladb.nsf/sla/bm-0038-09.
Video tutorial linked are not official assets.


## License

This project uses the Apache License Version 2.0 software license. https://github.com/lucacrippa88/watson-assistant-php/blob/master/LICENSE

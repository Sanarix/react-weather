# React-weather

А simple app to see the weather outside the window.
# Notice
The app only queries weather conditions in Russia. The search is in Russian. Example: Москва
# Languages
[Русский](#Зависимости)

# Requirements
To run the app, you'll need:

__1) A Firebase account. (https://firebase.google.com)__ \
__2) An Openweathermap account. (https://openweathermap.org)__ 

# Preparation

* First, clone the project ```git clone``` 

* Then install the dependencies with the ```npm i``` command

* After that, create a project in Firebase (if you already have one, proceed to the next step).
# Preparing Firebase
* Create a web app in your Firebase project. When creating, select the "Also set up Firebase Hosting for this app" option if you want to host the project, you can do this later. \
You'll get a configuration for your app that looks like this:
```JSON
{
  "apiKey": "Your api key",
  "authDomain": "your auth domain",
  "projectId": "project id",
  "storageBucket": "your storage bucket",
  "messagingSenderId": "your messaging sender id",
  "appId": "your app id"
}
```
# Setting up the application
* Substitute your values ​​into the file at __src/config/firebaseConfig.template.json__

* Get the Api Key from openweathermap and paste it into the file at __src/config/weatherApi.template.json__

* Remove __.template__ from the file names in the folder __src/config/__

# Deploying to Firebase \
You can now use your application. If you don't need to deploy it to a hosting server, skip to the last step - [Run](#Run).

* To deploy your application and perform the following steps, you need to run the command ```npm run build```
* To host an application on Firebase hosting, log in with the command ```firebase login``` 
* Run the command ```firebase init``` \
Customize the configuration for your purposes and select your hosting application.
* Open the __firebase.json__ file in the root directory and change the value ```"public": "public"``` to ```"public": "build"```
* Then run the command ```firebase deploy```

# Run

Done! \
Now you can run the application with the command ```npm start``` \
...or follow the link to your app in Firebase
***

# Зависимости
Для запуска приложения Вам потребуется:

__1) Аккаунт Firebase. (https://firebase.google.com)__ \
__2)Аккаунт на сайте openweathermap. (https://openweathermap.org)__ \

# Подготовка
* Для начала клонируйте проект командой ```git clone```
* Затем установите зависимости командой ```npm i```
* Создайте проект в Firebase (Если он у Вас есть переходите к следующему шагу)

# Подготовка Firebase
* Создайте web app в Вашем Firebase проекте. При создании выберите пункт "Also set up Firebase Hosting for this app" если хотите разместить проект на хостинге, Вы также можете сделать это позже. \
После создания приложения Вам будет доступна конфигурация которая выглядит следующим образом:
```JSON
{
  "apiKey": "Your api key",
  "authDomain": "your auth domain",
  "projectId": "project id",
  "storageBucket": "your storage bucket",
  "messagingSenderId": "your messaging sender id",
  "appId": "your app id"
}
```
# Настройка приложения
* Подставьте значения из конфигурации Firebase в файл __src/config/firebaseConfig.template.json__
* Получите Api Key в вашем кабинете на сайте openweathermap и подставьте его в файл __src/config/weatherApi.template.json__
* Удалите вставку __.template__ из названий файлов в папке __src/config/__

# Размещение сайта на Firebase
Вы уже можете использовать Ваше приложение, если Вам не нужно развёртывать его на хостинге, перейдите к последнему шагу - [Запуск](#Запуск).

* Для размещения приложения на хостинге Вам потребуется сборка. Соберите Ваше приложение командой ```npm run build```
* Войдите в Ваш аккаунт Firebase командой ```firebase login```
* Активируйте Firebase командой ```firebase init`` \
Настройте приложение так, чтобы это соответствовало вашим требованиям и переходите к следующему шагу.
* Откройте файл __firebase.json__ находящийся в корневом каталоге и измените значение ```"public": "public"``` на ```"public": "build"```
* Теперь вы можете сделать деплой Вашего приложения командой ```firebase deploy```

# Запуск
Ваше приложение готово к запуску! \
Запустите его командой ```npm start``` \
... или откройте ссылку на ваше приложение в Firebase

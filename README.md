# Тестовое задание - Frontend Developer (Travelpayouts)
### Цель

Сделать виджет формы, который будет вставляться на сторонние сайты.


### Инструкция по запуску
```
git clone https://github.com/dimavasilyev/tp-test.git

cd tp-test && npm i && npm run build
```

После выполнения вышеуказанных команд в проекте появится папка /build c файлом index.html - HTML-страницей с примером вставленного виджета формы, которую можно открыть в браузере.

### Инструкция по использованию виджета

1. Необходимо создать html контейнер с id="tp-widget" (```<div id="tp-widget"></div>```)
2. Небходимо вставить скрипт обязательно после html контейнера (```<script src="адрес скрипта"></script>```)

Пример кастомизации

```
  <div
    id="tp-widget" 
    data-locale="en-GB" 
    data-bg-color="orange" 
    data-text-color="blue" 
    data-btn-color="green"
  />
```
### Использованные технологии

- React
- TypeScript
- Webpack
- SVG
- ~~PostCSS~~ Styled Components (с обоснованием)
- React Day Picker

### Итоги

- К полям с датами подключены датапикеры, формат даты dd.mm.yyyy
- Реализована возможность кастомизации цветов кнопки (data-btn-color), фона(data-bg-color) и текста(data-text-color). Кастомизация осуществляется изменением настроек в коде для вставки.
- Реализована локализация на английский
- Потрачено около 10 часов
- Выпито 3 чашечки кофе
- Получено удовольствие от задания
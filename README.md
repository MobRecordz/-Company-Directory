# Company Directory

## Задача 
Разработать и реализовать интерфейс для добавления и редактирования справочника по
компаниям.

Необходимый функционал:
* Посмотреть все компании в виде списка
* Добавить компанию
* Редактировать добавленную компанию
* Удалить добавленную компанию

Дополнительный функционал:
* Клиентская пагинация: данные необходимо отображать постранично, максимум 50 элементов
на страницу, необходимо предоставить пользовательскую навигацию для перехода по
страницам.
* Клиентская сортировка: при нажатии на название столбца строки таблицы сортируются по
возрастанию, при повторном клике - по убыванию.
* Использовать сервис с подсказками https://dadata.ru/api/suggest/ для заполнения формы о
новой компании. Пользователь вводит данные в поле и ввод дополняется подсказкой в виде
выпадающего списка с данными из сервиса.

Обязательные колонки в списке и поля формы:
* ИНН компании
* Наименование компании
* Руководитель компании

Данные с записями хранить в localStorage. Компания идентифицируется по ИНН!
Замечания:
* Предпочтительные библиотеки: Vue, AngularJS, MaterializeCSS, Bootstrap;
* Пишите код так, как бы вы его писали в работе - внутренности задания будут оцениваться
даже тщательней, чем внешнее соответствие заданию;
* Код должен быть организован так, чтобы его можно было заново использовать;
* Помните про обработку ошибок и пользовательских действий!



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

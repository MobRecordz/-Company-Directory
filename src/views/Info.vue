<template>
  <div class="main">

    <b-card>
      <h4>Информация</h4>
      <hr>
      <br>

      <h5>Установка зависимостей приложения</h5>
        <div class="code-block"><strong>npm install</strong></div>
      <br>

      <h5>Компиляция и горячая перезагрузка для разработки</h5>
        <div class="code-block"><strong>npm run serve</strong></div>
      <br>

      <h5>Компиляция в production версию</h5>
        <div class="code-block"><strong>npm run build</strong></div>
      <br>
      <br>

      <h4>Задача</h4>
      <hr>
      <br>

      <p>Разработать и реализовать интерфейс для добавления и редактирования справочника по компаниям.</p>
      <span>Необходимый функционал:</span> 
      <ul>
        <li>Посмотреть все компании в виде списка</li>
        <li>Добавить компанию</li>
        <li>Редактировать добавленную компанию</li>
        <li>Удалить добавленную компанию</li>
      </ul>
      <br>

      <span>Дополнительный функционал:</span>
      <ul>
        <li>Клиентская пагинация: данные необходимо отображать постранично, максимум 50 элементов
            на страницу, необходимо предоставить пользовательскую навигацию для перехода по
            страницам.</li>
        <li>Клиентская сортировка: при нажатии на название столбца строки таблицы сортируются по
            возрастанию, при повторном клике - по убыванию.</li>
        <li>Использовать сервис с подсказками https://dadata.ru/api/suggest/ для заполнения формы о
            новой компании. Пользователь вводит данные в поле и ввод дополняется подсказкой в виде
            выпадающего списка с данными из сервиса.</li>
      </ul>
      <br>

      <span>Обязательные колонки в списке и поля формы:</span>
      <ul>
          <li>ИНН компании</li>
          <li>Наименование компании</li>
          <li>Руководитель компании</li>
      </ul>
      <br>

      <span>Данные с записями хранить в localStorage. Компания идентифицируется по ИНН!</span>
      <br>
      <br>
      <span>Предпочтительные библиотеки: Vue, AngularJS, MaterializeCSS, Bootstrap;</span>

    </b-card>

  </div>
</template>

<style scoped lang="scss">

@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro');

.main {
  width: 75vw;
  margin: 1vh auto;
}

.code-block {
  font-family: 'Source Code Pro', monospace;
  display: flex;
  align-items: center;
  padding: 13px;
  width: 30vw;
  height: 5vh;
  background-color: rgb(243, 243, 243);
  border-radius: 7px;
}
</style>

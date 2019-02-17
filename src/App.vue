<template>
  <div id="app">
    <div id="nav">
      <div class="nav-item mr-2"><router-link to="/">Главная</router-link></div>
      <div class="nav-item">
        <router-link to="/info">Информация</router-link>
      </div>
    </div>

    <router-view />
  </div>
</template>

<style lang="scss">
#nav {
  margin: 6vh auto;
  width: 75vw;
  display: flex;

  .nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8vw;
    height: 4vh;
    border-radius: 5px;
    transition: all .2s ease-out;

    &:hover {
      background-color: rgb(246, 246, 246);
    }
  }

  a {
    text-decoration: none;
    // font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #0099ff;
    }
  }
}
</style>

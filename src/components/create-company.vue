<template>
  <div class="create">
    <b-collapse id="create" class="mt-2">
      <b-card>
        <b-form @submit="onSubmit">
          <h5>Добавление новой компании</h5>

          <br />

          <b-form-group label="ИНН Компании:" label-for="inn">
            <b-form-input
              id="inn"
              type="text"
              v-model="inn"
              required
              placeholder="Пример: 644901001"     
            />
          </b-form-group>



          <b-form-group label="Название Компании:" label-for="companyName">
            <b-form-input
              id="companyName"
              type="text"
              v-model="companyName"
              required
              placeholder="Введите название"
            />
          </b-form-group>

          <b-form-group label="Email компании:" label-for="companyLeader">
            <b-form-input
              id="companyEmail"
              type="email"
              v-model="companyEmail"
              required
              placeholder="example@gmail.com"
            />
          </b-form-group>
          <br />

          <b-form-group
            label="Имя и фамилия руководителя:"
            label-for="companyLeader"
          >
            <b-form-input
              id="companyLeader"
              type="text"
              v-model="companyLeader"
              required
              placeholder="Например: Иван Иванович"
            />
          </b-form-group>

          <b-alert show v-model="error.isShow" variant="danger">{{
            error.msg
          }}</b-alert>

          <b-button type="submit" variant="outline-primary">Добавить</b-button>
        </b-form>
      </b-card>
    </b-collapse>

  </div>
</template>

<script>
import $ from 'jquery'
import suggestions from 'suggestions-jquery'

export default {
  name: "create-company",
  props: ["state"],
  data() {
    return {
      inn: '',
      companyName: "",
      companyEmail: "",
      companyLeader: "",

      error: {
        isShow: false,
        msg: ""
      }
    };
  },
  watch: {
    inn(val) {
      let that = this;
      console.log('awd')
      if(this.inn > 0) {
        $('#inn').suggestions({
          token: "5639cfe042dae3267a91973ef8db43f0a2c96f8e",
          type: "PARTY",
          count: 5,
          /* Вызывается, когда пользователь выбирает одну из подсказок */
          onSelect: function(suggestion) {
            that.inn = suggestion.data.inn;
            that.companyName = suggestion.value;
            that.companyLeader = suggestion.data.management.name;
          }
        })
        $('#inn').focus();
      }
    }
  },

  methods: {

    onSubmit() {
      window.event.preventDefault();

      if (this.$store.getters.companies.length > 0) {
        for (let i = 0; i < this.$store.getters.companies.length; i++) {
          let item = this.$store.getters.companies[i];

          if (item.inn == this.inn) {
            this.triggerError("Компания с таким ИНН уже существует.", true);
            break;
          } else if (item.companyName == this.companyName) {
            this.triggerError(
              "Компания с таким НАЗВАНИЕМ уже существует.",
              true
            );
            break;
          } else if (item.companyEmail == this.companyEmail) {
            this.triggerError("Компания с таким ЕМАИЛ уже существует.", true);
            break;
          } else if (this.$store.getters.companies.length == i + 1) {
            this.triggerError("", false);

            this.$store.dispatch("addCompany", {
              inn: this.inn,
              companyName: this.companyName,
              companyEmail: this.companyEmail,
              companyLeader: this.companyLeader
            });

            break;
          } else {
            continue;
          }
        }
      } else {
        this.$store.dispatch("addCompany", {
          inn: this.inn,
          companyName: this.companyName,
          companyEmail: this.companyEmail,
          companyLeader: this.companyLeader
        });
      }
    },
    triggerError(msg, state) {
      this.error.isShow = state;
      this.error.msg = msg;
    }
  }
};
</script>

<style scoped lang="scss">
.controls {
  width: 75vw;
  margin: 1vh auto;
}

#create {
  width: 75vw;
  margin: 1vh auto;
}

.options {
  position: relative;
  background-color: rgb(214, 214, 214);
}
</style>

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
              @focus="onFocus('inn')"
              @blur='onBlur'
            />
            
          </b-form-group>



          <b-form-group label="Название Компании:" label-for="companyName">
            <b-form-input
              id="companyName"
              type="text"
              v-model="companyName"
              required
              placeholder="Введите название"
              @focus="onFocus('companyName')"
              @blur='onBlur'
            />
          </b-form-group>

          <b-form-group label="Email компании:" label-for="companyLeader">
            <b-form-input
              id="companyEmail"
              type="email"
              v-model="companyEmail"
              required
              placeholder="example@gmail.com"
              @focus="onFocus('companyEmail')"
              @blur='onBlur'
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
              placeholder="Пример: Иван Иванович"
              @focus="onFocus('companyLeader')"
              @blur='onBlur'
            />
          </b-form-group>

          <b-alert show v-model="error.isShow" variant="danger">{{
            error.msg
          }}</b-alert>

          <b-button type="submit" variant="outline-primary">Добавить</b-button>
        </b-form>
      </b-card>
    </b-collapse>

    <div id="suggestions" v-show='suggestionsIsShow'>

         <li v-for="(item, index) in suggestions" @click='autocomplete(index)'>
           <div> <strong>Название:</strong> {{item.data.name.full}}</div>
           <div> <strong>ИНН:</strong> {{item.data.inn}}</div>
           <div> <strong>Руководитель:</strong> {{item.data.management.name}}</div>
         </li>
    </div>


  </div>
</template>

<script>
import $ from 'jquery'
import suggestions from 'suggestions-jquery'
import axios from 'axios'

export default {
  name: "create-company",
  props: ["state"],
  data() {
    return {
      inn: '',
      companyName: "",
      companyEmail: "",
      companyLeader: "",

      suggestions: [],
      suggestionsIsShow: false,

      error: {
        isShow: false,
        msg: ""
      }
    };
  },
  watch: {
    inn(val) {
      this.getSuggestions(this.inn);
    },
    companyName() {
       this.getSuggestions(this.companyName);
    },
    companyEmail() {
       this.getSuggestions(this.companyEmail);
    },
    companyLeader() {
       this.getSuggestions(this.companyLeader);
    }
  },

  methods: {
    autocomplete(index) {
      let info = this.suggestions[index];

      this.inn = info.data.inn;
      this.companyName = info.data.name.full;
      this.companyLeader = info.data.management.name;

      if(info.data.email == null) 
        this.companyEmail = 'none@mail.com';
      else 
        this.companyEmail = info.data.emails[0]

      this.suggestionsIsShow = false
    },
    onFocus(id) {
      this.suggestionsIsShow = true;

      let suggestionsEl = document.getElementById('suggestions'),
          el = document.getElementById(id),
          rect = el.getBoundingClientRect();

      suggestionsEl.style.left = rect.x + 'px';
      suggestionsEl.style.top = rect.y + 48 + 'px';
    },
    onBlur() {
      setTimeout(()=>{this.suggestionsIsShow = false}, 100);
    },
    getSuggestions(query) {
      let headers = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token 5639cfe042dae3267a91973ef8db43f0a2c96f8e',
        }
      }

      let data = {
        'query': query
      }

      axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party', data, headers)
          .then((res) => { this.suggestions = res.data.suggestions;
          console.log(res) })
    },

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
            this.triggerError("Компания с таким EMAIL уже существует.", true);
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

#suggestions {
  position: absolute;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  // border: 1px solid rgb(199, 199, 199);
  width: 30vw;
  max-height: 30vh;
  overflow: scroll;
  overflow-x: hidden;

  li {
    list-style-type: none;
    transition: .1s;
    cursor: default;
    border-bottom: 1px solid rgb(214, 214, 214);

    &:hover {
      background-color: #86cfff;
      border-bottom: 1px solid #86cfff;
    }
  }
  // margin: 1vh auto;
}
</style>

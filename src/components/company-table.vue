<template>
  <div class="main">
    <b-row v-if="totalRows > perPage">
      <b-col md="6" class="my-1">
        <b-pagination
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          class="my-0"
        />
      </b-col>
    </b-row>

    <b-table
      borderless
      outlined
      hover
      fixed
      no-provider-paging
      ref="table"
      :busy="isLoading"
      :items="companyArray"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortBy"
      primary-key="inn"
    >
      <template slot="actions" slot-scope="row">
        <b-button @click="setInfo(row)">
          <i class="fas fa-info-circle"></i>Детали
        </b-button>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-row>
          <b-col>
            <b-card>
              <h5>Информация</h5>

              <br />

              <ul>
                <li v-for="(value, key) in row.item" :key="key">
                  <!-- {{ key }}: {{ value }} -->
                  <strong v-if="key == 'inn'">ИНН: </strong>
                  <strong v-else-if="key == 'companyName'"
                    >Название компании:
                  </strong>
                  <strong v-else-if="key == 'companyEmail'"
                    >Email компании:
                  </strong>
                  <strong v-else-if="key == 'companyLeader'"
                    >Имя и фамилия руководителя:
                  </strong>
                  <span v-if="key != '_showDetails'">{{ value }}</span>

                  <br />
                </li>
              </ul>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                excepturi tempora sequi sed repellat dolore natus praesentium
                maiores aut aspernatur?
              </p>

              <b-button
                @click="changeCardIsShow = !changeCardIsShow"
                variant="light"
                class="mr-2"
              >
                <i class="fas fa-sliders-h"></i> Редактировать
              </b-button>
            </b-card>
          </b-col>

          <b-col v-if="changeCardIsShow">
            <b-card>
              <h5>Редактирование компонента</h5>
              <br />

              <b-form>
                <b-form-group label="ИНН:" label-for="inn">
                  <b-form-input
                    id="inn"
                    v-model="changedData.inn"
                    placeholder="Введите ИНН"
                  />
                </b-form-group>

                <b-form-group label="Название компании:" label-for="inn">
                  <b-form-input
                    v-model="changedData.companyName"
                    placeholder="Введите название"
                  />
                </b-form-group>

                <b-form-group label="Email компании:" label-for="inn">
                  <b-form-input
                    v-model="changedData.companyEmail"
                    type="email"
                    placeholder="Введиту Email"
                  />
                </b-form-group>

                <b-form-group
                  label="Имя и фамилия руководителя:"
                  label-for="inn"
                >
                  <b-form-input
                    v-model="changedData.companyLeader"
                    placeholder="Введите Имя и Фамилию руководителя"
                  />
                </b-form-group>

                <b-alert show v-model="error.isShow" variant="danger">{{
                  error.msg
                }}</b-alert>

                <b-button
                  @click="changeItem(row.item)"
                  variant="success"
                  class="mr-2"
                >
                  <i class="fas fa-check"></i> Сохранить
                </b-button>
                <b-button @click="removeItem(row.item)" variant="danger">
                  <i class="fas fa-trash-alt"></i> Удалить
                </b-button>
              </b-form>
            </b-card>
          </b-col>
        </b-row>
      </template>
    </b-table>

    <b-row v-if="totalRows > perPage">
      <b-col md="6" class="my-1">
        <b-pagination
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          class="my-0"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "company-table",
  props: {
    companyArray: {
      type: Array,
      default() {
        return [];
      }
    },
    totalRows: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fields: [
        { key: "inn", sortable: true },
        "companyName",
        "companyLeader",
        "companyEmail",
        "actions"
      ],
      isLoading: false,
      sortBy: "inn",
      currentPage: 1,
      perPage: 20,

      changeCardIsShow: false,
      error: {
        isShow: false,
        msg: ""
      },

      changedData: {
        inn: "",
        companyName: "",
        companyEmail: "",
        companyLeader: "",
        selectedIndex: null
      }
    };
  },
  methods: {
    setInfo(item) {
      if (item.index != this.changedData.selectedIndex) {
        this.companyArray.forEach(item => {
          if (item._showDetails) item._showDetails = false;
        });

        this.changedData.inn = "";
        this.changedData.companyName = "";
        this.changedData.companyEmail = "";
        this.changedData.companyLeader = "";
      }

      item.toggleDetails();
      this.changedData.selectedIndex = item.index;
    },
    changeItem(item) {
      for (let i = 0; i < this.companyArray.length; i++) {
        if (this.companyArray[i].inn == this.changedData.inn) {
          this.triggerError("Компания с таким ИНН уже существует.", true);
          break;
        } else if (
          this.companyArray[i].companyName == this.changedData.companyName
        ) {
          this.triggerError("Компания с таким НАЗВАНИЕМ уже существует.", true);
          break;
        } else if (
          this.companyArray[i].companyEmail == this.changedData.companyEmail
        ) {
          this.triggerError("Компания с таким EMAIL уже существует.", true);
          break;
        } else if (i == this.companyArray.length - 1) {
          this.triggerError("", false);

          this.changeCardIsShow = false;
          this.$store.dispatch("changeCompany", {
            inn: item.inn,
            newData: this.changedData
          });
          break;
        } else {
          continue;
        }
      }
    },
    removeItem(item) {
      this.changeCardIsShow = false;
      this.$store.dispatch("removeCompany", item.inn);
    },
    triggerError(msg, state) {
      this.error.isShow = state;
      this.error.msg = msg;
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  width: 75vw;
  margin: 0 auto;
}

ul {
  li {
    list-style: none;
  }
}
</style>

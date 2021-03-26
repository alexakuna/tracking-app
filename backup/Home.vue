<template>
  <div class="home">
    <div
      class="pre-loader"
      v-if="isVisible"
    >
      <Preloader/>
    </div>

    <div class="header-wrapper">
      <div>По умолчанию выводятся заказы за текущий месяц.</div>
      <form
        class="wrapper-datepicker"
        @submit.prevent="getDataByDate($event)"
      >
        <label for="data1">Показать заказы с</label>
        <input id="data1" type="text" class="datepicker" required>
        <label for="data2"> по</label>
        <input id="data2" type="text" class="datepicker" required>
        <button
          class="btn-small waves-effect waves-light"
          type="submit"
        >
          Загрузить
        </button>
      </form>
    </div>

    <div class="wrapper-note-date">
      <span style="margin-right: 10px;" class="right">
        <span style="padding-right: 5px">Заказы показанны с </span>
        <span class="note-date">{{ fromDate }}</span>
        <span style="padding: 0 5px">по</span>
        <span class="note-date">{{ toDate }}</span>
        <i
          style="padding-left:5px;font-size: 18px;"
          class="material-icons"
        >
          help_outline
        </i>
      </span>
    </div>

    <span class="not-dispatched" style="margin-left: 10px">
      Не отправленных посылок:
      <span v-if="!preloader" style="margin-left:5px" class="not-dispatched-count">
        {{ this.notDispatched.length || 0}}
      </span>
      <i
        style="padding-left:5px;color: darkblue; font-size: 18px"
        class="material-icons tooltipped"
        data-position="right" :data-tooltip="tooltipNotShipped"
      >
        help_outline
      </i>
      <template v-if="preloader">
        <preloaderT />
      </template>
    </span>
    <tabs @clicked="tabClicked">
      <tab v-for="(i, index) in SHOPS"
            :key="index"
            :name="i.name"
      >
        <table>
          <thead>
            <tr>
              <th>Имя покупателя</th>
              <th>Наименование</th>
              <th
                class="date-sold"
                @click="newSortByDate"
              >
                Дата продажи
                <i class="material-icons">swap_vert</i>
              </th>
              <th>Номер отслеживания</th>
              <th
                @click="sortByNotTracked"
                class="date-sold"
              >
                Статус отправления
                <i class="material-icons">swap_vert</i>
              </th>
              <th>Смотреть лот</th>
            </tr>
          </thead>

          <tbody @click="showMoreTitle($event)">
            <tr
              v-for="(order, index) of DATA.orders"
              :key="order.date"
            >
              <td>{{order.buyerName}}</td>
              <td class="more_info_title">
                  {{ normalizeTitle(order.title, order) }}
                  <i
                    :data-index="index"
                    title="Смотреть полное название товара."
                    class="material-icons"
                    id="for_more_title"
                  >
                    read_more
                  </i>
              </td>
              <td>{{normalizeOrderDate(order.date.slice(0, 10))}}</td>
              <td
                style="display:flex;justify-content: left"
                :class="{
                'brown-text darken-4': order.trackNumbers === null,
                 'text-blue': !!order.trackNumbers}"
              >
                <template v-if="order.trackNumbers === null">{{ helperText }}</template>
                <div style="display:flex;flex-direction:column" v-else>
                  <span style="display: block" v-for="track in order.trackNumbers">
                    {{track.number}}
                  </span>
                </div>
                <i
                  v-if="order.trackNumbers === null"
                  style="padding-left:5px;font-size: 18px;"
                  class="material-icons"
                >
                  info_outline
                </i>
              </td>
              <td
                :class="{
                  'red-text text-darken-1': typeof order['statusTrack'] !== 'undefined',
                  'green-text accent-2': typeof order['statusTrack'] === 'undefined'
                }"
              >
                <preloaderT v-if="preloader" />

                <div class="track-number-td">
                  <template v-if="manualCheckOrder(order)">
                    <span style="color: #212121">Статус заказа необходимо проверить вручную.</span>
                    <i :data-index="index"
                       title="Необходима ручная проверка"
                       class="material-icons yellow-text text-darken-3"
                    >
                      report_problem
                    </i>
                  </template>
                  <template v-else-if="!preloader">
                    {{typeof order['statusTrack'] !== 'undefined' ? notTracked : isOkText}}
                    <i :data-index="index"
                       title="Не отслеживается!."
                       class="material-icons"
                       :class="{'red-text text-darken-3': typeof order['statusTrack'] !== 'undefined'}"
                       v-if="typeof order['statusTrack'] !== 'undefined'"
                    >
                      report_problem
                    </i>
                    <i :data-index="index"
                       title="Посылка принята Укрпочтой."
                       class="material-icons"
                       :class="{'red-text text-darken-3': typeof order['statusTrack'] !== 'undefined'}"
                       v-if="typeof order['statusTrack'] === 'undefined'"
                    >
                      done_outline
                    </i>
                  </template>
                </div>
              </td>
              <td>
                <div class="open_in_new_tab">
                  <a :href="formatLinkOnListing(order)" target="_blank">
                    <i class="material-icons">open_in_new</i>
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </tab>
    </tabs>
    <div
      class="helper-text-for-data"
      v-if="DATA === ''"
    >
      Данные не загружены.
    </div>
    <div
      class="helper-text-for-data"
      v-if="isData"
    >
      С {{ fromDate }}  по  {{ toDate }}  заказы отсутствуют.
    </div>
  </div>
</template>

<script>
import config from "client/src/config/config";
import localize from "client/src/utils/localize";
import Preloader from 'client/src/components/preloader'
import preloaderT from "client/src/components/preloaderT";
import filter from "client/src/utils/filter";
import {dateFormat} from '@vuejs-community/vue-filter-date-format'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Home',
  components: {
    Preloader,
    preloaderT
  },
  data: () => ({
    sortByStatusTrack: true,
    sorting: true,
    tooltipNotShipped: 'В расчет не берутся трек номера UPS, замена трек номера на Укрпочте или не вбитые трек номера в систему Seller-online.',
    preloader: false,
    notDispatched: [],
    fromDate: '',
    toDate: '',
    currentShop: '',
    defaultShop: '',
    regexp: /&#11088;/gi,
    isShowTitle: false,
    helperText: 'Трек номер отсутствует в системе Seller-Online.',
    isVisible: true,
    notTracked: 'Трек номер отсутствует в системе Укрпочты.',
    isTracked: '',
    isOkText: 'Посылка принята в обработку',
    insertDateDesc: 'insert_date_desc'
  }),
  computed: {
    ...mapGetters(['SHOPS', 'DATA']),
    isData() {
      if (this.DATA !== '') {
        return this.DATA.orders.length === 0
      }
    },
    normalizeFromDate() {
      return dateFormat(
        new Date())
        .split(' ')[0]
        .split('-')
        .slice(0, 2)
        .join('-') + '-01'
    },
    normalizeDateTo() {
      return dateFormat(new Date()).split(' ')[0]
    }
  },
  methods: {
    ...mapActions(['MAIN', 'GET_DATA', 'TRACE']),
    formatLinkOnListing(order) {
      return order.payVia === 'ebay'
        ? `https://www.ebay.com/itm/${order.sku}`
        : order.payVia === 'etsy'
          ? `https://www.etsy.com/listing/${order.sku}`
          : '#'
    },
    // normalizedNotDispatched() {
    //   const acc = this.DATA.orders.filter(order => order.trackNumbers !== null && order.trackNumbers.length > 1)
    //   return this.totalNotShipped = (this.notDispatched.length - acc.length)
    // },
    manualCheckOrder(order) {
      return order.trackNumbers !== null
        && order.trackNumbers[0].number.includes('1Z')
        || order.trackNumbers !== null && order.trackNumbers.length > 1
    },
    makeActiveFirstTab() {
      const tabs = document.querySelector('.tabs-component-tabs')
      const el = tabs.querySelectorAll('a')[0]
      const evt = new Event('click', {'bubbles':true, 'cancelable':false});
      el.dispatchEvent(evt);
    },
    sortByNotTracked() {
      if(this.sortByStatusTrack) {
        this.$store.state.data.orders.sort(el => {
          return typeof el['statusTrack'] !== "undefined" ? -1 : 1
        })
        this.sortByStatusTrack = false
      } else {
        this.$store.state.data.orders.sort(el => {
          return typeof el['statusTrack'] !== "undefined" ? 1 : -1
        })
        this.sortByStatusTrack = true
      }
    },
    newSortByDate() {
      this.sortByStatusTrack = true
      const mapped = this.$store.state.data.orders.map(function(el, i) {
        return { index: i, value: new Date(el.date) }
      })
      if(this.sorting) {
        mapped.sort((a, b) => {
          return a.value - b.value
        })
        this.sorting = false
      } else {
        mapped.sort((a, b) => {
          return b.value - a.value
        })
        this.sorting = true
      }
      this.$store.state.data.orders = mapped.map( el => {
        return this.$store.state.data.orders[el.index]
      })
    },
    normalizeOrderDate(date) {
      return date.split('-').reverse().join('-')
    },
    useLocalStorage(fromDate, toDate, orderBy) {
      const currShop = this.currentShop || this.defaultShop
      localStorage.setItem(
        currShop,
        JSON.stringify({ fromDate, toDate, orderBy })
      )
    },
    async trace() {
      this.preloader = true
      for (const [index, order] of this.DATA.orders.entries()) {
        const obj = {
          name: order.trackNumbers !== null ? order.trackNumbers[0].number : ''
        }
        try {
          await this.TRACE(obj).then(res => {
            const key = Object.keys(res.data.BarcodeInfoService.lastoffice).length
            if(key === 0) {
              order.statusTrack = false
              this.notDispatched.push(order)
              this.$store.state.data.orders.splice(index, 1, order)
            }
          })
        } catch (e) {
          console.log(e)
        }
      }
      this.preloader = false

    },
    showMoreTitle(event) {
      if(event.target.className !== 'more_info_title' && event.target.id !== 'for_more_title') return
      const index = event.target.childNodes[1] ? event.target.childNodes[1].dataset.index : event.target.dataset.index
      const item = this.DATA.orders[index]
      if(item.showFullText === 'true') {
        item.showFullText = 'false'
        this.$store.state.data.orders.splice(index, 1, item)
        if(event.target.className === 'more_info_title') {
          event.target.style.position = ''
          event.target.style.backgroundColor = ''
        } else {
          event.target.parentNode.style.position = ''
          event.target.parentNode.style.backgroundColor = ''
        }
      } else {
        item.showFullText = 'true'
        this.$store.state.data.orders.splice(index, 1, item)
        if(event.target.className === 'more_info_title') {
          event.target.style.position = 'absolute'
          event.target.style.backgroundColor = 'white'
        } else {
          event.target.parentNode.style.position = 'absolute'
          event.target.parentNode.style.backgroundColor = 'white'
        }
      }
    },
    normalizeTitle (str, order) {
      if(order.showFullText === 'true') {
        return str.replace(this.regexp, '')
      } else {
        return str.replace(this.regexp, '').slice(0, 26) + '...'
      }
    },
    async getOrdersFromSellerOnlineApi() {
      const currShop = this.currentShop || this.defaultShop
      const data = JSON.parse(localStorage.getItem(currShop))
      if(data !== null) {
        await this.GET_DATA(filter(data.fromDate, data.toDate, currShop, data.orderBy))
      } else {
        await this.GET_DATA(filter(this.fromDate, this.toDate, this.defaultShop, this.insertDateDesc))
      }
    },
    getDataByDate (event) {
      this.isVisible = true
      this.notDispatched = []
      const el = event.target
      const _fromDate = el.querySelector('input#data1')
      const _toDate = el.querySelector('input#data2')
      this.fromDate = _fromDate.value.split(' ').join('-')
      this.toDate = _toDate.value.split(' ').join('-')
      this.useLocalStorage(this.fromDate, this.toDate, this.insertDateDesc)
      this.GET_DATA(filter(this.fromDate, this.toDate, this.currentShop || this.defaultShop, this.insertDateDesc))
        .then(() => {
          this.trace()
          _fromDate.value = ''
          _toDate.value = ''
        })
        .catch(e => console.log(e))
        .finally(() => this.isVisible = false)
    },
    tabClicked (selectedTab) {
      if(localStorage.getItem('seller-id') === config.ID_M) {
        this.SHOPS.forEach(i => {
          if(i.name === selectedTab.tab.name) {
            localStorage.setItem('Zx21tL2eRrtOvvQq', i.key)
          }
        })
      }
      this.notDispatched = []
      this.isVisible = true
      this.currentShop = selectedTab.tab.name
      const data = JSON.parse(localStorage.getItem(selectedTab.tab.name))
      if(data !== null) {
        this.GET_DATA(filter(data.fromDate, data.toDate, selectedTab.tab.name, data.orderBy))
            .then(() => this.trace())
            .catch(e => console.log(e))
            .finally(() => this.isVisible = false)
        this.fromDate = data.fromDate
        this.toDate = data.toDate
      } else {
        this.GET_DATA(filter(this.normalizeFromDate, this.normalizeDateTo, selectedTab.tab.name, this.insertDateDesc))
            .then(() => this.trace())
            .catch(e => console.log(e))
            .finally(() => this.isVisible = false)
        this.fromDate = this.normalizeFromDate
        this.toDate = this.normalizeDateTo
      }
    }
  },
  mounted() {
    this.isVisible = true
    this.MAIN()
      .then(() => {
        if(localStorage.getItem('seller-id') === config.ID_M) {
          localStorage.setItem('Zx21tL2eRrtOvvQq', this.SHOPS[0].key)
        }
        const data = JSON.parse(localStorage.getItem(this.SHOPS[0].name))
        if(data !== null) {
          this.fromDate = data.fromDate
          this.toDate = data.toDate
        } else {
          this.defaultShop = this.SHOPS[0].name
          this.fromDate = this.normalizeFromDate
          this.toDate = this.normalizeDateTo
        }
      })
      .then(() => this.getOrdersFromSellerOnlineApi())
      .then(() => this.trace())
      .then(() => this.makeActiveFirstTab())
      .catch(e => console.log(e))
      .finally(() => this.isVisible = false)

    const dataPickers = document.querySelectorAll('.datepicker');
    M.Datepicker.init(dataPickers, {
      showClearBtn: true,
      format: 'yyyy mm dd',
      i18n: localize
    })
    const tooltips = document.querySelectorAll('.tooltipped')
    M.Tooltip.init(tooltips)
  }
}
</script>
<style>
.open_in_new_tab {
  display: flex;
  justify-content: center;
  align-items: center;
}
table tbody tr {
  position:relative;
}
.material-tooltip {
  max-width: 280px;
}
.not-dispatched {
  position: relative;
  display: flex;
  align-items: center;
}
.not-dispatched-count {
  font-weight: bold;
  color: #C62828;
}
.date-sold {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.note-date {
  font-weight: bold;
}
.done-icon {
  position: absolute;
  right: 0;
  top: 30%;
}
.track-number-td {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.text-blue {
  color: darkblue;
}
.helper-text-for-data {
  text-align: center;
  font-size: 16px;
  margin:  0 auto;
  padding: 2rem 3rem;
  background-color: darkblue;
  color: white;
}
table {
  font-size: 12px;
}
.wrapper-note-date span {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.more_info_title {
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 999;
}
.btn-small {
  height: 25px;
  line-height: 26px;
  font-size: 11px;
  padding: 0 7px;
  top: 0;
  right: 0;
  margin-top: -8px;
}
.header-wrapper, .wrapper-datepicker {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-wrapper {
  margin-top: 3px;
  padding: 1em 0.5em;
}

.wrapper-datepicker input {
  width: 100px !important;
  height: 2rem !important;
  font-size: 12px !important;
  text-align: center !important;
}
.app-content {
  padding-top: 0 !important;
}
.tabs-component {
  margin: 0;
}

.tabs-component-tabs {
  border: solid 1px #ddd;
  border-radius: 6px;
  margin-bottom: 5px;
}

@media (min-width: 700px) {
  .tabs-component-tabs {
    border: 0;
    align-items: stretch;
    display: flex;
    justify-content: flex-start;
    margin-bottom: -1px;
  }
}

.tabs-component-tab {
  color: #999;
  font-size: 14px;
  font-weight: 600;
  margin-right: 0;
  list-style: none;
}

.tabs-component-tab:not(:last-child) {
  border-bottom: dotted 1px #ddd;
}

.tabs-component-tab:hover {
  color: #666;
}

.tabs-component-tab.is-active {
  color: #000;
}

.tabs-component-tab.is-disabled * {
  color: #cdcdcd;
  cursor: not-allowed !important;
}

@media (min-width: 700px) {
  .tabs-component-tab {
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 3px 3px 0 0;
    margin-right: .5em;
    transform: translateY(2px);
    transition: transform .3s ease;
  }

  .tabs-component-tab.is-active {
    border-bottom: solid 1px #fff;
    z-index: 2;
    transform: translateY(0);
  }
}

.tabs-component-tab-a {
  align-items: center;
  color: inherit;
  display: flex;
  padding: .50em 0.75em;
  text-decoration: none;
}

.tabs-component-panels {
  padding: 2em 0;
}

@media (min-width: 700px) {
  .tabs-component-panels {
    border-top-left-radius: 0;
    background-color: #fff;
    border: solid 1px #ddd;
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    padding: 1em 0.5em;
  }
}
</style>

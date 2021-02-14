import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: [
      {
        id: 'card1',
        name: 'Валентина',
        age: '75 років',
        text: 'Дитя, дай бабусі ліки від тиску за цим рецептом, але не дорогих, тих, що дешевші!'
      },
      {
        id: 'card2',
        name: 'Марія',
        age: '19 років',
        text: 'Бабуся приймає брендовий препарат від болю в суглобах, він допомагає, але занадто дорогий. У Вас є якісний аналог з нижчою ціною? Якщо ні — давайте бренд.'
      },
      {
        id: 'card3',
        name: 'Степан',
        age: '61 рік',
        text: 'Спросоння відсунув гарячий чайник рукою та обпікся. У Вас всі ліки від опіків такі дорогі? Можна хороший препарат недорого?'
      },
      {
        id: 'card4',
        name: 'Любов',
        age: '58 років',
        text: 'Лікар призначив препарат від артеріальної гіпертензії, а бренд дорого коштує. Тому мені потрібен аналог з хорошою ефективністю та приємною ціною.'
      },
      {
        id: 'card5',
        name: 'Олександр',
        age: '20 років',
        text: 'Порекомендуйте ефективний препарат від болю в горлі за розумну ціну.'
      },
      {
        id: 'card6',
        name: 'Ірина',
        age: '55 років',
        text: 'У мене часто невралгії, лікар призначив вітаміни групи В. Мені потрібен якісний аналог за прийнятною ціною.'
      }
    ],
    drugsSum: {
      cheapSum: 0,
      brandSum: 0,
      goodSum: 0
    }
  },
  mutations: {
    drugCount(state, type) {
      switch (type) {
        case "cheap":
          state.drugsSum.cheapSum++;
          break;
        case "brand":
          state.drugsSum.brandSum++;
          break;
        case "good":
          state.drugsSum.goodSum++;
          break;
      }
    },
    clearDrugs(state) {
      Object.keys(state.drugsSum).forEach(key => state.drugsSum[key] = 0)
    }
  },
  actions: {
  },
  getters: {
    getCard: (state) => (counter) => state.cards[counter],
    getCardsLength: (state) => state.cards.length,
    getDrugsSum: (state) => state.drugsSum
  },
})

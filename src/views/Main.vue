<template>
  <div class="page main-page">
    <aside class="sidebar">
      <div class="sidebar__header">
        <router-link tag="a" to="/" class="nav-btn">
          <svg class="nav-svg">
            <use xlink:href="../assets/images/svg/sprite.svg#home" />
          </svg>
        </router-link>
        <button type="button" class="nav-btn" @click="refresh">
          <svg class="nav-svg">
            <use xlink:href="../assets/images/svg/sprite.svg#refresh" />
          </svg>
        </button>
      </div>
      <div class="sidebar__params">
        Параметри:
        <div class="params">
          <div class="params__col">
            <div class="params__item">
              <div class="params__icon-block">
                <img
                  class="params__icon"
                  src="../assets/images/svg/cheap.svg"
                  alt="cheap"
                />
                <img
                  class="params__icon params__icon--absolute"
                  :class="{ animate: type === 'cheap' }"
                  src="../assets/images/svg/cheap.svg"
                  alt="cheap"
                />
              </div>
              <span class="params__counter">{{ drugsSum.cheapSum }}</span>
            </div>
          </div>
          <div class="params__col">
            <div class="params__item">
              <div class="params__icon-block">
                <img
                  class="params__icon"
                  src="../assets/images/svg/brand.svg"
                  alt="brand"
                />
                <img
                  class="params__icon params__icon--absolute"
                  :class="{ animate: type === 'brand' }"
                  src="../assets/images/svg/brand.svg"
                  alt="brand"
                />
              </div>
              <span class="params__counter">{{ drugsSum.brandSum }}</span>
            </div>
          </div>
          <div class="params__col">
            <div class="params__item">
              <div class="params__icon-block">
                <img
                  class="params__icon"
                  src="../assets/images/svg/good.svg"
                  alt="good"
                />
                <img
                  class="params__icon params__icon--absolute"
                  :class="{ animate: type === 'good' }"
                  src="../assets/images/svg/good.svg"
                  alt="good"
                />
              </div>
              <span class="params__counter">{{ drugsSum.goodSum }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar__footer">
        Осталось в очереди:
        <br />
        <span>{{ cardsLength - counter - 1 }}</span>
        /{{ cardsLength }}
      </div>
    </aside>
    <main class="main">
      <transition
        name="translate"
        :leave-to-class="'translate-leave-to-' + type"
      >
        <div v-if="show" class="card" v-touch:swipe="swipeHandler">
          <div class="card__photo-cover">
            <img
              class="card__photo"
              :src="require(`../assets/images/photos/${card.id}.jpg`)"
              alt="photo-1"
            />
          </div>
          <div class="card__text">
            <h3 class="card__title">{{ card.name }}, {{ card.age }}</h3>
            {{ card.text }}
          </div>
          <transition name="sticker">
            <div v-if="selected" class="card__sticker" :class="[type]">
              {{ whatType() }}
            </div>
          </transition>
        </div>
      </transition>
      <div class="controls" @click="controlsHandler">
        <button
          class="controls__btn controls__btn--cheap"
          type="button"
          data-type="cheap"
          :disabled="disabled"
        >
          Препарат 1
        </button>
        <button
          class="controls__btn controls__btn--brand"
          type="button"
          data-type="brand"
          :disabled="disabled"
        >
          Препарат 2
        </button>
        <button
          class="controls__btn controls__btn--good"
          type="button"
          data-type="good"
          :disabled="disabled"
        >
          Препарат 3
        </button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      show: false,
      counter: 0,
      selected: false,
      type: null,
      disabled: false,
    };
  },
  computed: {
    card() {
      return this.$store.getters.getCard(this.counter);
    },
    cardsLength() {
      return this.$store.getters.getCardsLength;
    },
    drugsSum() {
      return this.$store.getters.getDrugsSum;
    },
  },
  methods: {
    controlsHandler(event) {
      const { type } = event.target.dataset;
      if (!type) {
        return;
      }
      this.selectDrug(type);
    },
    swipeHandler(direction) {
      if (!this.disabled) {
        switch (direction) {
          case "left":
            this.selectDrug("cheap");
            break;
          case "top":
            this.selectDrug("brand");
            break;
          case "right":
            this.selectDrug("good");
            break;
        }
      }
    },
    selectDrug(type) {
      this.selected = true;
      this.type = type;
      this.$store.commit("drugCount", type);
      this.disabled = true;
      setTimeout(() => {
        this.show = false;
        this.counter++;
        if (this.counter === this.cardsLength) {
          this.$router.push("/final");
        }
      }, 1000);
    },
    whatType() {
      let result;
      switch (this.type) {
        case "cheap":
          result = "Препарат 1";
          break;
        case "brand":
          result = "Препарат 2";
          break;
        case "good":
          result = "Препарат 3";
          break;
      }
      return result;
    },
    refresh() {
      this.counter = 0;
      this.$store.commit("clearDrugs");
    },
  },
  mounted() {
    this.$store.commit("clearDrugs");
    setTimeout(() => (this.show = true), 1000);
  },
  watch: {
    counter() {
      this.selected = false;
      this.type = null;
      setTimeout(() => {
        this.show = true;
        this.disabled = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables";

.main-page {
  display: flex;
}
.sidebar {
  flex: 0 0 33%;
  background: $gradientMain;
  opacity: 0.7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Avenir Next Cyr";
  font-size: 36px;
  line-height: 44px;
  letter-spacing: 0.02em;
  color: $colorTextMain;

  &__header {
    padding: 70px 50px 20px 50px;
    display: flex;

    @media screen and (max-width: 1024px) {
      padding: 30px;
    }
  }
  &__params {
    padding: 0 30px 0 40px;
    font-weight: 700;

    @media screen and (max-width: 1024px) {
      padding: 0 30px;
    }
  }
  &__footer {
    font-weight: 300;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.15);
    padding: 23px;

    @media screen and (max-width: 1024px) {
      font-size: 28px;
      line-height: 34px;
      letter-spacing: 0;
    }
    @media screen and (max-width: 768px) {
      font-size: 24px;
    }
    & span {
      font-weight: 700;
    }
  }
}
.nav-btn {
  display: block;
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 50%;
  background-color: $colorTextMain;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 38px;
  outline: none;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
  &:hover,
  &:focus {
    box-shadow: inset 0 0 10px #ffabb1;
  }
}
.nav-svg {
  display: block;
  width: 36px;
  height: 36px;
  fill: rgba(255, 88, 99, 0.5);
}
.params {
  margin: 30px -10px 0 -10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  &__col {
    width: 50%;
    padding: 0 10px;
    margin-bottom: 40px;

    @media screen and (max-width: 1024px) {
      width: 100%;
    }
  }
  &__item {
    height: 80px;
    background: #ffffff;
    box-shadow: 0px 0px 50px rgba(131, 42, 64, 0.4);
    border-radius: 40px;
    display: flex;
    align-items: center;
    padding: 10px;
  }
  &__icon-block {
    position: relative;
    z-index: 1;
  }
  &__icon {
    display: block;
    width: 60px;
    height: 60px;

    &--absolute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
    &.animate {
      animation: icon 0.5s linear;
    }
  }
  &__counter {
    flex-grow: 1;
    font-size: 48px;
    color: $colorTextDark;
    text-align: center;
  }
}
.main {
  flex-grow: 1;
  position: relative;
  overflow: hidden;
}
.controls {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 64px;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;

  @media screen and (max-width: 1024px) {
    bottom: 20px;
  }
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
  &__btn {
    display: block;
    width: 280px;
    border: none;
    border-radius: 100px;
    font-size: 28px;
    font-weight: 700;
    line-height: 90px;
    color: $colorTextMain;
    outline: none;
    transition-duration: 0.3s;
    cursor: pointer;

    @media screen and (max-width: 1024px) {
      width: 180px;
      font-size: 24px;
      line-height: 80px;
    }
    @media screen and (max-width: 768px) {
      margin: 10px 10px 0 10px;
    }
    &--cheap {
      background: linear-gradient(266.19deg, #8049c7 0%, #ca57fd 100%);

      &:hover,
      &:focus {
        box-shadow: 0 0 20px $colorDrugCheap;
      }
    }
    &--brand {
      background: linear-gradient(266.19deg, #169ae4 0%, #0cc4fa 100%);

      &:hover,
      &:focus {
        box-shadow: 0 0 20px $colorDrugBrand;
      }
    }
    &--good {
      background: linear-gradient(
        90deg,
        #ffd748 0.02%,
        rgba(195, 199, 11, 0.961) 99.97%,
        #cac6ab 99.98%,
        #d3e9e1 99.99%
      );

      &:hover,
      &:focus {
        box-shadow: 0 0 20px $colorDrugGood;
      }
    }
    &:disabled {
      background: #ccc;
      box-shadow: none;
      cursor: default;
    }
  }
}
.card {
  position: absolute;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  width: 540px;
  height: 590px;
  background: #fff;
  box-shadow: 0px 0px 40px rgba(127, 127, 127, 0.4);
  border-radius: 40px;
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    top: 100px;
    width: 440px;
    height: 490px;
  }
  &__photo-cover {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: $gradientMain;
      opacity: 0.2;
    }
  }
  &__photo {
    display: block;
    width: 100%;
    height: 350px;
    object-fit: cover;

    @media screen and (max-width: 1024px) {
      height: 250px;
    }
  }
  &__text {
    flex-grow: 1;
    padding: 25px 60px 0 60px;
    font-size: 24px;
    font-weight: 300;
    color: $colorBrand;
    line-height: 29px;
    overflow-y: auto;
    margin-bottom: 25px;

    @media screen and (max-width: 1024px) {
      padding: 15px 20px 0 20px;
      margin-bottom: 15px;
    }
  }
  &__title {
    font-size: 32px;
    line-height: 39px;
    font-weight: 700;
    margin-bottom: 5px;
  }
  &__sticker {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 360px;
    height: 120px;
    border: 8px solid;
    font-size: 52px;
    font-weight: 700;
    transform-origin: bottom right;
    transform: translate(-50%, -50%) rotate(-15deg) scale(1);
    opacity: 1;

    &.cheap {
      color: $colorDrugCheap;
    }
    &.brand {
      color: $colorDrugBrand;
    }
    &.good {
      color: $colorDrugGood;
    }
  }
}
.sticker-enter {
  transform: translate(-20%, -100%) rotate(-15deg) scale(2);
  opacity: 0;
}
.sticker-enter-active {
  transition-duration: 0.3s;
}
.translate-enter {
  opacity: 0;
}
.translate-leave-active,
.translate-enter-active {
  transition-duration: 0.3s;
}
.translate-leave-to-cheap {
  transform: rotate(-15deg) translate(-150%, -200px);
}
.translate-leave-to-brand {
  transform: rotate(-15deg) translate(-50%, -100%);
}
.translate-leave-to-good {
  transform: rotate(-15deg) translate(100%, 100px);
}
@keyframes icon {
  100% {
    transform: translateY(-100%);
    opacity: 0;
  }
}
</style>
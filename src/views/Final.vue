<template>
  <div class="page final-page">
    <router-link tag="a" to="/" class="nav-btn">
      <svg class="nav-svg">
        <use xlink:href="../assets/images/svg/sprite.svg#home" />
      </svg>
    </router-link>
    <div class="body">
      <ul class="list">
        <li class="list__item">
          <div class="list__result">
            {{ Math.round((drugsSum.cheapSum / cardsLength) * 100) }}%
          </div>
          Препарат 1
        </li>
        <li class="list__item">
          <div class="list__result">
            {{ Math.round((drugsSum.brandSum / cardsLength) * 100) }}%
          </div>
          Препарат 2
        </li>
        <li class="list__item">
          <div class="list__result">
            {{ Math.round((drugsSum.goodSum / cardsLength) * 100) }}%
          </div>
          Препарат 3
        </li>
      </ul>
      <h2 class="body__caption">
        Ваш результат:
        <span>«Что я здесь делаю?»</span>
      </h2>
      <div class="body__text">
        Это тестовое задание, так что не будем углубляться в глубины проблем
        фармацевтов.
      </div>
    </div>
    <router-link tag="a" to="/main" class="nav-link">
      Попробовать еще
    </router-link>
    <div class="ellipse"></div>
  </div>
</template>

<script>
export default {
  name: "Final",
  computed: {
    drugsSum() {
      return this.$store.getters.getDrugsSum;
    },
    cardsLength() {
      return this.$store.getters.getCardsLength;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables";

.final-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 70px 50px 84px 50px;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    padding: 50px;
  }
}
.body {
  transform: translateY(-50px);
  margin-left: 80px;
  max-width: 580px;

  @media screen and (max-width: 1024px) {
    margin-left: 0;
    transform: translateY(0);
  }
  &__caption {
    font-size: 32px;
    color: $colorBrand;
    margin-bottom: 20px;

    & span {
      display: block;
      font-weight: 900;
      font-size: 40px;
    }
  }
  &__text {
    font-size: 24px;
    line-height: 29px;
    color: $colorTextDark;
  }
}
.list {
  list-style: none;
  display: flex;
  justify-content: space-around;
  padding-bottom: 50px;
  border-bottom: 2px solid #d9d9d9;
  margin-bottom: 40px;

  @media screen and (max-width: 1024px) {
    padding-bottom: 30px;
  }
  &__item {
    font-size: 16px;
    font-weight: 700;
    line-height: 40px;
    color: $colorTextDark;
    text-align: center;
  }
  &__result {
    font-size: 48px;
    font-weight: 400;
    line-height: 70px;
  }
}
.nav-btn {
  display: block;
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 50%;
  background: $gradientMain;
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
    box-shadow: inset 0 0 10px $colorTextMain;
  }
}
.nav-svg {
  display: block;
  width: 36px;
  height: 36px;
  fill: $colorTextMain;
}
.nav-link {
  display: block;
  margin-left: 80px;
  width: 270px;
  background: linear-gradient(90deg, #d9d9d9 0%, #a1a1a1 100%);
  border-radius: 100px;
  font-size: 24px;
  line-height: 60px;
  font-weight: 700;
  color: $colorTextMain;
  text-align: center;
  text-decoration: none;

  &:hover,
  &:focus {
    box-shadow: inset 0 0 10px #797979;
  }
}
.ellipse {
  z-index: -1;
  width: 820px;
  height: 820px;
  position: absolute;
  top: -100px;
  right: -150px;
  background-image: url("../assets/images/final-bg.jpg");
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  box-shadow: 0px 0px 40px #c4c4c4;
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    width: 580px;
    height: 580px;
  }
  @media screen and (max-width: 768px) {
    width: 500px;
    height: 500px;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $gradientMain;
    opacity: 0.25;
  }
}
</style>
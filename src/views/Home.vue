<template>
  <div class="page home-page">
    <transition name="bounce">
      <div class="ellipse" v-show="bounce">
        Добро пожаловать в игру
        <h1 class="caption">Помоги <span>Фармацевту</span></h1>
        <button class="btn" type="button" @click="start">Начать</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      bounce: false,
    };
  },
  methods: {
    start() {
      this.bounce = false;
      setTimeout(() => this.$router.push("/main"), 500);
    },
  },
  mounted() {
    setTimeout(() => (this.bounce = true), 500);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables";

.home-page {
  background-image: url("../assets/images/home-bg.jpg");
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $gradientMain;
    opacity: 0.35;
  }
}

.ellipse {
  font-family: "Avenir Next Cyr";
  font-size: 35px;
  font-weight: 300;
  letter-spacing: 0.2rem;
  color: $colorTextMain;
  display: flex;
  flex-direction: column;
  width: 860px;
  height: 860px;
  padding: 280px 150px 0 150px;
  position: absolute;
  top: -30px;
  left: 110px;
  background: $gradientMain;
  border-radius: 50%;

  @media screen and (max-width: 1024px) {
    left: 70px;
    width: 660px;
    height: 660px;
    padding: 100px 50px 0 50px;
    align-items: center;
    justify-content: center;
  }
}
.caption {
  font-size: 60px;
  margin: 29px 0 120px 0;

  @media screen and (max-width: 1024px) {
    margin-bottom: 70px;
  }
  & span {
    display: block;
    text-transform: uppercase;
  }
}
.btn {
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 90px;
  color: $colorBrand;
  display: block;
  width: 380px;
  margin: 0 auto;
  border: none;
  border-radius: 100px;
  background-color: #fff;
  outline: none;
  transition-duration: 0.3s;
  cursor: pointer;

  &:hover,
  &:focus {
    box-shadow: inset 0 0 15px $colorBrand;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>

